/* ==========================================================================
   GLOBE.JS
   Builds and drives the 3D globe: a photorealistic Earth (real day-map
   texture, ocean specular highlights, bump-mapped terrain, glowing night
   lights, and a slowly drifting cloud layer), orbital rings, glow, and
   per-office markers positioned from lat/lng. Exposes a small public API
   that main.js / popup.js drive — this module never touches office data
   directly beyond the array it's given, and never touches popup DOM.
   ========================================================================== */

import * as THREE from "three";
import { OFFICES } from "./office-data.js";

/* -----------------------------------------------------------------
   Real Earth texture set
   ------------------------------------------------------------------
   Instead of procedurally drawing a dotted world map at runtime, we
   load genuine high-resolution equirectangular Earth textures:

     image/earth-day.jpg       - true-color day map (continents/oceans)
     image/earth-normal.jpg    - normal map for terrain relief/shading
     image/earth-specular.jpg  - specular mask (bright oceans, dark land)
                                  so water catches light like real water
     image/earth-lights.png    - city lights, blended in as a subtle
                                  emissive glow so the night side isn't dead
     image/earth-clouds.png    - alpha cloud layer, rendered as its own
                                  sphere that drifts independently

   Drop these five files into your project's /image folder (same
   folder as the earth-water.png you already had — that file is no
   longer needed and can be removed).
----------------------------------------------------------------- */

const TEXTURE_PATHS = {
  day: "image/earthimages/earth-day.jpg",
  normal: "image/earthimages/earth-normal.jpg",
  specular: "image/earthimages/earth-specular.jpg",
  lights: "image/earthimages/earth-lights.png",
  clouds: "image/earthimages/earth-clouds.png",
};

const textureLoader = new THREE.TextureLoader();

function loadTexture(path, { srgb = false } = {}) {
  const tex = textureLoader.load(path);
  tex.anisotropy = 4;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* -----------------------------------------------------------------
   Coordinate conversion
   ------------------------------------------------------------------
   Converts latitude/longitude (degrees) to a position on a sphere of
   the given radius, using the same equirectangular UV convention as
   the Earth textures above (u=0.5 at lng=0, seam at lng=±180). This
   is the ONLY place marker positions are computed — nothing is ever
   hand-placed, so every marker lands exactly where the real map says
   that city sits.
----------------------------------------------------------------- */
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

/* ==========================================================================
   Globe class
   ========================================================================== */

export class Globe {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {HTMLElement} stageEl - the wrapping element (for sizing + drag cursor class)
   * @param {(officeId: string|null) => void} onMarkerActivate - called when a
   *        marker is clicked (office id) or the globe is clicked with no
   *        marker hit (null), so main.js/popup.js can react.
   */
  constructor(canvas, stageEl, onMarkerActivate) {
    this.canvas = canvas;
    this.stageEl = stageEl;
    this.onMarkerActivate = onMarkerActivate;

    this.radius = 2.6;
    this.markerMeshes = []; // { mesh, ring, office, basePosition }
    this.activeOfficeId = null;

    // Auto-rotation state
    this._autoRotateSpeed = 0.08; // radians per second — slow and elegant
    this._isHovering = false;
    this._isDragging = false;
    this._lastInteractionTime = 0;
    this._autoResumeDelay = 2.5; // seconds before auto-rotate resumes after user stops

    this._dragPrev = { x: 0, y: 0 };
    
    // Default starting rotation: Face the Head Office (India) instantly on load
    const headOffice = OFFICES.find((o) => o.type === "head") || OFFICES[0];
    const defaultTheta = (headOffice.lng + 180) * (Math.PI / 180);
    const defaultY = Math.PI / 2 - defaultTheta;
    // Positive X rotation tilts the top of the globe forward toward the camera.
    // To bring a specific latitude to the center of the screen, we rotate by that latitude.
    const defaultX = THREE.MathUtils.clamp(
      headOffice.lat * (Math.PI / 180),
      -1.1,
      1.1
    );

    this._targetRotation = { x: defaultX, y: defaultY };
    this._currentRotation = { x: defaultX, y: defaultY };
    
    this._clock = new THREE.Clock();
    this._disposed = false;

    this._initScene();
    this._buildGlobe();
    this._buildMarkers();
    this._bindEvents();
    this._resize();
    this._animate();
  }

  /* ---------------- Scene setup ---------------- */

  _initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    // Increased from 8.4 to 9.5 to make the globe appear more compact
    this.camera.position.set(0, 0, 9.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Premium lighting: soft ambient fill + a directional key light so the
    // real Earth texture reads with proper day/night shading instead of
    // looking flat.
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    this.scene.add(ambient);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.35);
    this.sunLight.position.set(5, 3, 6);
    this.scene.add(this.sunLight);

    const rim = new THREE.DirectionalLight(0x3f6fd6, 0.35);
    rim.position.set(-5, -3, -4);
    this.scene.add(rim);

    // Subtle fill from below so the terminator (day/night line) isn't harsh
    const fill = new THREE.DirectionalLight(0xdceaff, 0.18);
    fill.position.set(0, -5, 2);
    this.scene.add(fill);

    this.globeGroup = new THREE.Group();
    this.globeGroup.rotation.x = this._currentRotation.x;
    this.scene.add(this.globeGroup);
  }

  _buildGlobe() {
    /* 1) The real Earth — true-color day map, normal-mapped terrain,
       specular-masked oceans (so water actually catches the light
       while land stays matte), and a soft emissive night-lights layer
       so the globe never looks dead even on its unlit side. */
    const dayMap = loadTexture(TEXTURE_PATHS.day, { srgb: true });
    const normalMap = loadTexture(TEXTURE_PATHS.normal);
    const specularMap = loadTexture(TEXTURE_PATHS.specular);
    const lightsMap = loadTexture(TEXTURE_PATHS.lights, { srgb: true });

    const earthGeo = new THREE.SphereGeometry(this.radius, 96, 96);
    const earthMat = new THREE.MeshPhongMaterial({
      map: dayMap,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.75, 0.75),
      specularMap: specularMap,
      specular: new THREE.Color(0x2a3a55),
      shininess: 14,
      emissiveMap: lightsMap,
      emissive: new THREE.Color(0xffd699),
      emissiveIntensity: 0.55,
    });
    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    this.globeGroup.add(this.earthMesh);

    /* 2) Drifting cloud layer — its own slightly larger sphere with a
       transparent cloud texture, rotated a touch faster than the earth
       for a living, ambient feel. */
    const cloudsMap = loadTexture(TEXTURE_PATHS.clouds, { srgb: true });
    const cloudGeo = new THREE.SphereGeometry(this.radius * 1.012, 64, 64);
    const cloudMat = new THREE.MeshLambertMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    this.cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    this.globeGroup.add(this.cloudMesh);

    /* 3) Soft outer atmosphere glow (a slightly larger, very transparent
       backside sphere) for that premium "photographed from space" rim. */
    const glowGeo = new THREE.SphereGeometry(this.radius * 1.06, 48, 48);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x7fb0ff,
      transparent: true,
      opacity: 0.09,
      side: THREE.BackSide,
    });
    this.glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.globeGroup.add(this.glowMesh);

    // 4) Faint latitude/longitude grid lines for a technical, premium feel
    this._buildGraticule();

    // 5) Thin orbital rings around the globe (decorative, at different tilts)
    this._buildOrbitalRings();
  }

  _buildGraticule() {
    const graticuleGroup = new THREE.Group();
    const material = new THREE.LineBasicMaterial({
      color: 0xaac2f5,
      transparent: true,
      opacity: 0.12,
    });

    // Latitude circles
    for (let lat = -60; lat <= 60; lat += 30) {
      const points = [];
      for (let lng = -180; lng <= 180; lng += 4) {
        points.push(latLngToVector3(lat, lng, this.radius * 1.02));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      graticuleGroup.add(new THREE.Line(geo, material));
    }

    // Longitude meridians
    for (let lng = -180; lng < 180; lng += 30) {
      const points = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        points.push(latLngToVector3(lat, lng, this.radius * 1.02));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      graticuleGroup.add(new THREE.Line(geo, material));
    }

    this.globeGroup.add(graticuleGroup);
  }

  _buildOrbitalRings() {
    this.orbitalRingsGroup = new THREE.Group();

    // Orbital ring node dots (small spheres at ring intersections like reference)
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8faee6,
      transparent: true,
      opacity: 0.5,
    });

    const ringConfigs = [
      {
        radius: this.radius * 1.28,
        tiltX: 1.35,
        tiltZ: 0.1,
        opacity: 0.25,
        dash: false,
      },
      {
        radius: this.radius * 1.42,
        tiltX: 1.15,
        tiltZ: -0.25,
        opacity: 0.18,
        dash: true,
      },
      {
        radius: this.radius * 1.16,
        tiltX: 1.55,
        tiltZ: 0.3,
        opacity: 0.2,
        dash: false,
      },
    ];

    ringConfigs.forEach((cfg) => {
      const curve = new THREE.EllipseCurve(
        0,
        0,
        cfg.radius,
        cfg.radius,
        0,
        Math.PI * 2,
      );
      const points = curve
        .getPoints(128)
        .map((p) => new THREE.Vector3(p.x, 0, p.y));
      const geo = new THREE.BufferGeometry().setFromPoints(points);

      let mat;
      if (cfg.dash) {
        mat = new THREE.LineDashedMaterial({
          color: 0x8faee6,
          transparent: true,
          opacity: cfg.opacity,
          dashSize: 0.15,
          gapSize: 0.1,
        });
        const line = new THREE.LineLoop(geo, mat);
        line.computeLineDistances();
        line.rotation.x = cfg.tiltX;
        line.rotation.z = cfg.tiltZ;
        this.orbitalRingsGroup.add(line);
      } else {
        mat = new THREE.LineBasicMaterial({
          color: 0x8faee6,
          transparent: true,
          opacity: cfg.opacity,
        });
        const ring = new THREE.LineLoop(geo, mat);
        ring.rotation.x = cfg.tiltX;
        ring.rotation.z = cfg.tiltZ;
        this.orbitalRingsGroup.add(ring);
      }

      // Add small node dots at regular intervals along the ring
      const nodeCount = 6;
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const nx = cfg.radius * Math.cos(angle);
        const nz = cfg.radius * Math.sin(angle);
        const nodeGeo = new THREE.SphereGeometry(0.03, 8, 8);
        const node = new THREE.Mesh(nodeGeo, nodeMaterial);
        node.position.set(nx, 0, nz);

        const nodeGroup = new THREE.Group();
        nodeGroup.add(node);
        nodeGroup.rotation.x = cfg.tiltX;
        nodeGroup.rotation.z = cfg.tiltZ;
        this.orbitalRingsGroup.add(nodeGroup);
      }
    });

    this.scene.add(this.orbitalRingsGroup);
  }

  /* ---------------- Markers ---------------- */

  _buildMarkers() {
    this.markerGroup = new THREE.Group();
    this.globeGroup.add(this.markerGroup);

    OFFICES.forEach((office) => {
      const isHead = office.type === "head";
      // Reference: Head office = dark blue/navy, Branch = gold/amber
      const color = isHead ? 0x0a2a6e : 0xc9880a;
      const position = latLngToVector3(
        office.lat,
        office.lng,
        this.radius * 1.02,
      );

      const markerRoot = new THREE.Group();
      markerRoot.position.copy(position);
      // Orient the marker so its "up" axis points away from globe center,
      // which the pulse ring geometry below is built relative to.
      markerRoot.lookAt(position.clone().multiplyScalar(2));

      // Core dot
      const coreGeo = new THREE.SphereGeometry(isHead ? 0.058 : 0.044, 20, 20);
      const coreMat = new THREE.MeshBasicMaterial({ color });
      const core = new THREE.Mesh(coreGeo, coreMat);
      markerRoot.add(core);

      // White ring around the core (matches reference marker style)
      const ringGeo = new THREE.RingGeometry(
        isHead ? 0.068 : 0.054,
        isHead ? 0.088 : 0.07,
        32,
      );
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      markerRoot.add(ring);

      // Outer glow sprite
      const glowMat = new THREE.SpriteMaterial({
        map: this._getGlowTexture(),
        color,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      });
      const glow = new THREE.Sprite(glowMat);
      const glowScale = isHead ? 0.38 : 0.28;
      glow.scale.set(glowScale, glowScale, 1);
      markerRoot.add(glow);

      // Pulse ring (animated scale/opacity in the render loop)
      const pulseGeo = new THREE.RingGeometry(0.055, 0.065, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      markerRoot.add(pulse);

      // Second ripple ring for richer animation
      const rippleGeo = new THREE.RingGeometry(0.06, 0.068, 32);
      const rippleMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const ripple = new THREE.Mesh(rippleGeo, rippleMat);
      markerRoot.add(ripple);

      // Invisible larger hit-target sphere so clicking/tapping near the
      // marker registers even at small screen sizes.
      const hitGeo = new THREE.SphereGeometry(0.16, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitTarget = new THREE.Mesh(hitGeo, hitMat);
      hitTarget.userData.officeId = office.id;
      markerRoot.add(hitTarget);

      this.markerGroup.add(markerRoot);

      this.markerMeshes.push({
        office,
        root: markerRoot,
        core,
        ring,
        glow,
        pulse,
        ripple,
        hitTarget,
        pulsePhase: Math.random() * Math.PI * 2,
        baseCoreScale: 1,
      });
    });
  }

  _getGlowTexture() {
    if (this._glowTexture) return this._glowTexture;
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.35)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    this._glowTexture = new THREE.CanvasTexture(canvas);
    return this._glowTexture;
  }

  /* ---------------- Interaction ---------------- */

  _bindEvents() {
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2();

    window.addEventListener("resize", () => this._resize());

    this.canvas.addEventListener("pointerdown", (e) => this._onPointerDown(e));
    window.addEventListener("pointermove", (e) => this._onPointerMove(e));
    window.addEventListener("pointerup", (e) => this._onPointerUp(e));

    // Hover detection for slowing rotation
    this.canvas.addEventListener("mouseenter", () => {
      this._isHovering = true;
    });
    this.canvas.addEventListener("mouseleave", () => {
      this._isHovering = false;
    });
  }

  _onPointerDown(e) {
    this._isDragging = false; // becomes true only once movement exceeds threshold
    this._dragCandidate = true;
    this._dragPrev = { x: e.clientX, y: e.clientY };
    this._dragStart = { x: e.clientX, y: e.clientY };
    this._lastInteractionTime = this._clock.elapsedTime;
  }

  _onPointerMove(e) {
    if (!this._dragCandidate) return;

    const dx = e.clientX - this._dragPrev.x;
    const dy = e.clientY - this._dragPrev.y;

    const totalDx = e.clientX - this._dragStart.x;
    const totalDy = e.clientY - this._dragStart.y;
    if (Math.abs(totalDx) > 4 || Math.abs(totalDy) > 4) {
      this._isDragging = true;
      this.stageEl.classList.add("is-dragging");
    }

    if (this._isDragging) {
      this._targetRotation.y += dx * 0.005;
      this._targetRotation.x = THREE.MathUtils.clamp(
        this._targetRotation.x + dy * 0.005,
        -1.1,
        1.1,
      );
      this._lastInteractionTime = this._clock.elapsedTime;
    }

    this._dragPrev = { x: e.clientX, y: e.clientY };
  }

  _onPointerUp(e) {
    this.stageEl.classList.remove("is-dragging");

    if (!this._isDragging && this._dragCandidate) {
      // Treat as a click/tap — raycast for a marker under the pointer.
      this._handleClick(e);
    }

    this._dragCandidate = false;
    this._isDragging = false;
    this._lastInteractionTime = this._clock.elapsedTime;
  }

  _handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    this._pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this._pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this._raycaster.setFromCamera(this._pointer, this.camera);
    const hitTargets = this.markerMeshes.map((m) => m.hitTarget);
    const intersects = this._raycaster.intersectObjects(hitTargets, false);

    if (intersects.length > 0) {
      const officeId = intersects[0].object.userData.officeId;
      this.onMarkerActivate(officeId);
    } else {
      this.onMarkerActivate(null);
    }
  }

  /* ---------------- Public API ---------------- */

  /** Highlights the given office's marker (scales it up, brightens glow). */
  setActiveMarker(officeId) {
    this.activeOfficeId = officeId;
    this.markerMeshes.forEach((m) => {
      const isActive = m.office.id === officeId;
      m.baseCoreScale = isActive ? 1.4 : 1;
    });
  }

  /**
   * Smoothly rotates the globe so the given office's marker faces the
   * camera (front-center). If snap is true, rotates instantly.
   */
  focusOnOffice(officeId, snap = false) {
    const entry = this.markerMeshes.find((m) => m.office.id === officeId);
    if (!entry) return;
    const { lat, lng } = entry.office;

    // We want the marker's longitude to end up facing +Z (toward camera).
    // theta = (lng + 180) in our latLngToVector3 mapping. To bring it to
    // the front (90 degrees or PI/2), we need to rotate by PI/2 - theta.
    const theta = (lng + 180) * (Math.PI / 180);
    this._targetRotation.y = Math.PI / 2 - theta;

    // Tilt toward the marker's latitude to center it vertically.
    // Positive X tilts the globe forward, bringing the northern hemisphere down.
    this._targetRotation.x = THREE.MathUtils.clamp(
      lat * (Math.PI / 180),
      -1.1,
      1.1,
    );

    // Mark as interaction to pause auto-rotation briefly
    this._lastInteractionTime = this._clock.elapsedTime;

    if (snap) {
      this._currentRotation.x = this._targetRotation.x;
      this._currentRotation.y = this._targetRotation.y;
      if (this.globeGroup) {
        this.globeGroup.rotation.x = this._currentRotation.x;
        this.globeGroup.rotation.y = this._currentRotation.y;
        this.globeGroup.updateMatrixWorld(true);
      }
    }
  }

  /** Returns viewport-space {x, y} in px (relative to the stage element)
   *  for the given office's marker, so popup.js can position the popup. */
  getMarkerScreenPosition(officeId) {
    const entry = this.markerMeshes.find((m) => m.office.id === officeId);
    if (!entry) return null;

    const worldPos = new THREE.Vector3();
    entry.core.getWorldPosition(worldPos);

    const projected = worldPos.clone().project(this.camera);
    const rect = this.stageEl.getBoundingClientRect();

    const x = (projected.x * 0.5 + 0.5) * rect.width;
    const y = (-projected.y * 0.5 + 0.5) * rect.height;

    // Proper horizon test: is this marker on the hemisphere currently
    // facing the camera, or is it around the back of the (opaque) globe?
    // The globe is centered at the origin, so the outward surface normal
    // at the marker is simply its world position, normalized. The marker
    // is front-facing if that normal points at least a little bit toward
    // the camera. (A naive NDC-z check here is NOT reliable — projected.z
    // stays inside [-1, 1] for practically every point in the frustum,
    // front or back, so it never actually flags the back side.)
    const normal = worldPos.clone().normalize();
    const toCamera = this.camera.position.clone().sub(worldPos).normalize();
    const isFrontFacing = normal.dot(toCamera) > 0.05;

    return { x, y, visible: isFrontFacing };
  }

  dispose() {
    this._disposed = true;
    this.scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const materials = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        materials.forEach((mat) => {
          if (mat.map) mat.map.dispose();
          if (mat.normalMap) mat.normalMap.dispose();
          if (mat.specularMap) mat.specularMap.dispose();
          if (mat.emissiveMap) mat.emissiveMap.dispose();
          mat.dispose();
        });
      }
    });
    this.renderer.dispose();
  }

  /* ---------------- Sizing ---------------- */

  _resize() {
    const rect = this.stageEl.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /* ---------------- Render loop ---------------- */

  _animate() {
    if (this._disposed) return;
    requestAnimationFrame(() => this._animate());

    const delta = this._clock.getDelta();
    const elapsed = this._clock.elapsedTime;

    // Auto-rotation: slow elegant spin.
    // When hovering, speed is halved. When dragging, auto-rotate stops.
    // After user stops interacting, auto-rotate resumes after a delay.
    // Auto-rotation is disabled per user request
    const shouldAutoRotate = false;

    if (shouldAutoRotate) {
      // Smoothly ramp up auto-rotation speed
      let speed = this._autoRotateSpeed;
      if (this._isHovering) {
        speed *= 0.35; // Slow down on hover
      }
      this._targetRotation.y += speed * delta;
    }

    // Ease the actual rotation toward the target — this is what makes
    // drag input, hover-slowdown, and auto-resume all feel smooth instead
    // of snapping.
    const ease = 0.06;
    this._currentRotation.y +=
      (this._targetRotation.y - this._currentRotation.y) * ease;
    this._currentRotation.x +=
      (this._targetRotation.x - this._currentRotation.x) * ease;

    this.globeGroup.rotation.y = this._currentRotation.y;
    this.globeGroup.rotation.x = this._currentRotation.x;

    // Clouds drift independently, a touch faster than the earth's own
    // rotation, for a living, atmospheric feel.
    if (this.cloudMesh) {
      this.cloudMesh.rotation.y += delta * 0.012;
    }

    // Orbital rings drift slowly and independently for a living, ambient feel.
    if (this.orbitalRingsGroup) {
      this.orbitalRingsGroup.rotation.y = elapsed * 0.025;
    }

    // Animate marker pulses + ripples, and ease each marker's scale
    // toward its active/inactive target.
    this.markerMeshes.forEach((m) => {
      const pulse = (Math.sin(elapsed * 1.6 + m.pulsePhase) + 1) / 2; // 0..1
      const rippleScale = 1 + pulse * 1.0;
      m.pulse.scale.set(rippleScale, rippleScale, rippleScale);
      m.pulse.material.opacity = 0.4 * (1 - pulse);

      // Second ripple with offset phase
      const ripple2 =
        (Math.sin(elapsed * 1.6 + m.pulsePhase + Math.PI) + 1) / 2;
      const ripple2Scale = 1 + ripple2 * 1.3;
      m.ripple.scale.set(ripple2Scale, ripple2Scale, ripple2Scale);
      m.ripple.material.opacity = 0.25 * (1 - ripple2);

      const targetScale = m.baseCoreScale;
      const currentScale = m.core.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.15;
      m.core.scale.setScalar(nextScale);
      m.ring.scale.setScalar(nextScale);
      m.glow.scale.set(
        (m.office.type === "head" ? 0.38 : 0.28) *
          (0.9 + pulse * 0.15) *
          nextScale,
        (m.office.type === "head" ? 0.38 : 0.28) *
          (0.9 + pulse * 0.15) *
          nextScale,
        1,
      );
    });

    this.renderer.render(this.scene, this.camera);
  }
}
