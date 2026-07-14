/* ==========================================================================
   COMPLIANCE INSIGHTS PODCAST SECTION — behaviour
   - Loads the YouTube IFrame API
   - List order never changes; activeIndex tracks whichever episode
     is currently playing, and its row gets the "is-active" highlight
   ========================================================================== */

(function () {
  "use strict";

  /* -----------------------------------------------------------------
     1) EPISODE DATA — paste your real YouTube link (or just the
     video ID) into "id" for each episode. Any of these formats work:
       - https://youtu.be/VIDEO_ID?si=xxxx
       - https://www.youtube.com/watch?v=VIDEO_ID&list=xxxx
       - just the plain VIDEO_ID
     Currently using public dummy videos just so the player/thumbnails
     work out of the box for testing.
     thumbnail is auto-generated from the video id, so you usually
     don't need to touch it.
  ----------------------------------------------------------------- */
  const playlist = [
    {
      // You can paste the FULL YouTube link here — no need to trim it manually
      id: "https://youtu.be/7kbExfkOKXY?si=j1EE5Ce_y_AzVeuw",
      epLabel: "EP 042 · 28 MINS",
      title: "The Future of EPR & Circular Economy",
      desc: "Analysing the new plastic waste management protocol for enterprises in India.",
      duration: "29:00",
    },
    {
      id: "https://youtu.be/xn3cbQIr1Lk?si=ziG6yclbby5W0u9n",
      epLabel: "EP 041 · 26 MINS",
      title: "Wireless Tech & WPC Licensing",
      desc: "What every electronics manufacturer needs to know before shipping wireless products.",
      duration: "34:00",
    },
    {
      id: "https://youtu.be/lmce5QlSg5M?si=KIEU1lxOHTWVB4X6",
      epLabel: "EP 040 · 22 MINS",
      title: "Standardization in Global Markets",
      desc: "How international standards shape market access strategy.",
      duration: "22:00",
    },
    {
      id: "https://youtu.be/hWOqxyEyk-I?si=oNGz0Nj6xpmJNQL0",
      epLabel: "EP 039 · 31 MINS",
      title: "Legal Updates for Compliance Leaders",
      desc: "Recent regulatory changes compliance leaders should track this quarter.",
      duration: "31:00",
    },
  ];

  /* -----------------------------------------------------------------
     1b) Accepts a full YouTube URL in any format (youtu.be/..,
     youtube.com/watch?v=.., with or without ?si=/&list=/etc.) OR a
     plain 11-character video ID, and always returns the clean ID.
     This runs once on the playlist above so you can paste full links
     directly into "id" without trimming them by hand.
  ----------------------------------------------------------------- */
  function extractVideoId(raw) {
    if (!raw) return raw;
    const value = String(raw).trim();

    // Already a plain ID (no slashes, no dots) — use as-is.
    if (/^[a-zA-Z0-9_-]{6,15}$/.test(value) && !value.includes(".")) {
      return value;
    }

    try {
      const url = new URL(value);

      // youtu.be/VIDEO_ID
      if (url.hostname.includes("youtu.be")) {
        return url.pathname.split("/").filter(Boolean)[0] || value;
      }

      // youtube.com/watch?v=VIDEO_ID
      if (url.searchParams.get("v")) {
        return url.searchParams.get("v");
      }

      // youtube.com/embed/VIDEO_ID or /shorts/VIDEO_ID
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts.includes("embed") || pathParts.includes("shorts")) {
        return pathParts[pathParts.length - 1];
      }

      return value;
    } catch (err) {
      // Not a valid URL — return whatever was given.
      return value;
    }
  }

  playlist.forEach((ep) => {
    ep.id = extractVideoId(ep.id);
  });

  const thumbUrl = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  /* -----------------------------------------------------------------
     2) DOM references
  ----------------------------------------------------------------- */
  const els = {
    videoWrap: document.getElementById("podcastVideoWrap"),
    thumb: document.getElementById("podcastThumb"),
    playerHost: document.getElementById("podcastPlayerHost"),
    playBtn: document.getElementById("podcastPlayBtn"),
    expandCorner: document.getElementById("podcastExpandCorner"),
    playlistEl: document.getElementById("podcastPlaylist"),
  };

  let ytPlayer = null;
  let ytReady = false;
  let hasStarted = false;
  let activeIndex = 0;
  let playerIsReady = false;

  /* -----------------------------------------------------------------
     3) Set the big player's thumbnail to whatever is currently active
  ----------------------------------------------------------------- */
  function renderNowPlayingInfo() {
    const ep = playlist[activeIndex];
    els.thumb.src = thumbUrl(ep.id);
  }

  /* -----------------------------------------------------------------
     4) Render the playlist rows in their fixed order; only the
        active row (by activeIndex) gets highlighted
  ----------------------------------------------------------------- */
  function renderPlaylist() {
    els.playlistEl.innerHTML = "";

    playlist.forEach((ep, index) => {
      const row = document.createElement("div");
      row.className =
        "podcast-playlist-item" + (index === activeIndex ? " is-active" : "");
      row.setAttribute("role", "button");
      row.setAttribute("tabindex", "0");

      row.innerHTML = `
        <span class="podcast-playlist-playcircle">
          <i class="fa-solid fa-play"></i>
        </span>
        <div class="podcast-playlist-thumb">
          <img src="${thumbUrl(ep.id)}" alt="${ep.title}" />
          <span class="play-dot"><i class="fa-solid fa-play"></i></span>
        </div>
        <div class="podcast-playlist-text">
          <div class="podcast-playlist-row-top">
            <span class="podcast-playlist-ep">${ep.epLabel}</span>
            <span class="podcast-playlist-time">${ep.duration}</span>
          </div>
          <div class="podcast-playlist-title">${ep.title}</div>
        </div>
        <button class="podcast-playlist-menu" aria-label="More options" type="button">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      `;

      row.addEventListener("click", (e) => {
        if (e.target.closest(".podcast-playlist-menu")) return;
        selectEpisode(index);
      });
      row.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") selectEpisode(index);
      });

      els.playlistEl.appendChild(row);
    });
  }

  /* -----------------------------------------------------------------
     5) Selecting an episode: just move the highlight + play it.
        The list order stays exactly as authored — no swapping.
  ----------------------------------------------------------------- */
  function selectEpisode(index) {
    activeIndex = index;
    renderNowPlayingInfo();
    renderPlaylist();
    playCurrent();
  }

  /* -----------------------------------------------------------------
     6) YouTube IFrame API setup
  ----------------------------------------------------------------- */
  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      onYouTubeReady();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = onYouTubeReady;
  }

  function onYouTubeReady() {
    ytReady = true;
  }

  function createPlayer(videoId) {
    els.playerHost.innerHTML = '<div id="podcastYtMount"></div>';
    playerIsReady = false;

    ytPlayer = new YT.Player("podcastYtMount", {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        controls: 1,
        fs: 1,
        iv_load_policy: 3,
      },
      events: {
        onReady: onPlayerReady,
        onError: onPlayerError,
      },
    });
  }

  function onPlayerReady() {
    playerIsReady = true;
    els.thumb.style.opacity = "0";
    els.playBtn.classList.add("is-hidden");
  }

  function onPlayerError() {
    // Video is blocked/unavailable for embedding — don't leave the
    // player stuck. Bring the thumbnail back so the UI stays usable
    // and the next click (any episode) can try again cleanly.
    els.thumb.style.opacity = "1";
    els.playBtn.classList.remove("is-hidden");
    ytPlayer = null;
    playerIsReady = false;
  }

  function playCurrent() {
    const ep = playlist[activeIndex];

    if (!ytReady) {
      // API script still loading — try again shortly.
      setTimeout(playCurrent, 200);
      return;
    }

    hasStarted = true;
    els.thumb.style.opacity = "0";
    els.playBtn.classList.add("is-hidden");

    // Always create a fresh player for the newly selected episode.
    // This avoids relying on loadVideoById on a player that may be
    // mid-initialisation or stuck in an error state from a previous
    // (embedding-blocked) video.
    createPlayer(ep.id);
  }

  /* -----------------------------------------------------------------
     7) Play button + fullscreen handlers
  ----------------------------------------------------------------- */
  function ensureStarted() {
    if (!hasStarted) {
      playCurrent();
      return true;
    }
    return false;
  }

  els.playBtn.addEventListener("click", () => {
    if (!ensureStarted()) playCurrent();
  });

  function goFullscreen() {
    if (els.videoWrap.requestFullscreen) {
      els.videoWrap.requestFullscreen();
    } else if (els.videoWrap.webkitRequestFullscreen) {
      els.videoWrap.webkitRequestFullscreen();
    }
  }

  els.expandCorner.addEventListener("click", goFullscreen);

  /* -----------------------------------------------------------------
     8) Init
  ----------------------------------------------------------------- */
  renderNowPlayingInfo();
  renderPlaylist();
  loadYouTubeAPI();
})();
