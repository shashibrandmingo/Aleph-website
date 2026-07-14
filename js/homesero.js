(function () {
  const applyTab = document.getElementById("applyTab");
  const formPanel = document.getElementById("formPanel");
  const formOverlay = document.getElementById("formOverlay");
  const formClose = document.getElementById("formClose");
  const consultBtn = document.getElementById("heroConsultBtn");
  const consultForm = document.getElementById("consultForm");
  const formPanelInner = document.querySelector(".form-panel-inner");
  const formDefaultView = document.getElementById("formDefaultView");
  const formSuccessView = document.getElementById("formSuccessView");
  const formSuccessClose = document.getElementById("formSuccessClose");

  /* ---------- Keep the form panel clear of the real site header ---------- */
  /* Measures the actual fixed/sticky header on the page (falls back to a
     safe default if none is found) and writes its height + a small gap
     into a CSS custom property that the panel's padding-top and
     max-height both read from. This keeps the popup correctly placed on
     every screen size/zoom level instead of relying on a guessed number. */
  function updateFormPanelTopGap() {
    const header =
      document.querySelector("header") ||
      document.querySelector(".header") ||
      document.querySelector(".navbar") ||
      document.querySelector("[class*='header']");
    const headerHeight = header ? header.getBoundingClientRect().height : 64;
    const gap = Math.round(headerHeight + 16); // small breathing room below header
    document.documentElement.style.setProperty(
      "--form-panel-top-gap",
      gap + "px",
    );
  }

  updateFormPanelTopGap();
  window.addEventListener("resize", updateFormPanelTopGap);

  /* ---------- Open / close modal ---------- */
  function openPanel() {
    updateFormPanelTopGap();
    formPanel.classList.add("is-open");
    formOverlay.classList.add("is-open");
    applyTab.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    const firstField = formPanel.querySelector("input");
    if (firstField) setTimeout(() => firstField.focus(), 350);
  }
  function closePanel() {
    formPanel.classList.remove("is-open");
    formOverlay.classList.remove("is-open");
    applyTab.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    applyTab.focus();
    // Small delay so the reset happens after the close transition,
    // avoiding a visible flicker back to the form while fading out.
    setTimeout(showDefaultView, 300);
  }

  /* ---------- Switch between the form view and the thank-you view ---------- */
  function showSuccessView() {
    if (!formSuccessView || !formDefaultView) return;
    formDefaultView.hidden = true;
    formSuccessView.hidden = false;
    if (formPanelInner) formPanelInner.classList.add("is-success");
  }
  function showDefaultView() {
    if (!formSuccessView || !formDefaultView) return;
    formDefaultView.hidden = false;
    formSuccessView.hidden = true;
    if (formPanelInner) formPanelInner.classList.remove("is-success");
  }
  applyTab.addEventListener("click", openPanel);
  if (consultBtn) consultBtn.addEventListener("click", openPanel);
  formClose.addEventListener("click", closePanel);
  formOverlay.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && formPanel.classList.contains("is-open"))
      closePanel();
  });
  /* ---------- Form validation ---------- */
  if (consultForm) {
    const fields = {
      fullName: {
        el: document.getElementById("fullName"),
        validate: (v) => /^[A-Za-z\s]{2,50}$/.test(v.trim()),
      },
      mobile: {
        el: document.getElementById("mobile"),
        validate: (v) => /^\+91[6-9]\d{9}$/.test(v.trim()),
      },
      service: {
        el: document.getElementById("service"),
        validate: (v) => v !== "",
      },
    };
    function isFieldEmpty(key) {
      return fields[key].el.value.trim() === "";
    }
    function setFieldState(key, isValid) {
      const field = fields[key].el.closest(".form-field");
      const empty = isFieldEmpty(key);
      // Empty fields stay neutral (no red) — red only appears once the
      // user has actually entered something that fails validation.
      field.classList.toggle("is-invalid", !isValid && !empty);
      field.classList.toggle("is-valid", isValid);
    }
    function validateField(key) {
      const { el, validate } = fields[key];
      const isValid = validate(el.value);
      setFieldState(key, isValid);
      return isValid;
    }
    function showEmptyRequiredState(key) {
      // Used on submit: marks empty required fields so the error text
      // shows, without turning the icon/border red like a wrong-value error.
      const field = fields[key].el.closest(".form-field");
      field.classList.add("is-empty-required");
      field.classList.remove("is-invalid", "is-valid");
    }
    function clearEmptyRequiredState(key) {
      fields[key].el
        .closest(".form-field")
        .classList.remove("is-empty-required");
    }
    // Auto-prefix +91 for convenience on the mobile field
    fields.mobile.el.addEventListener("focus", function () {
      if (!this.value) this.value = "+91";
    });
    // Validate as the user types/selects (after first interaction)
    Object.keys(fields).forEach((key) => {
      const { el } = fields[key];
      const eventName = el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(eventName, () => {
        clearEmptyRequiredState(key);
        validateField(key);
      });
      el.addEventListener("blur", () => {
        clearEmptyRequiredState(key);
        validateField(key);
      });
    });
    consultForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let allValid = true;
      Object.keys(fields).forEach((key) => {
        if (isFieldEmpty(key)) {
          allValid = false;
          showEmptyRequiredState(key);
        } else if (!validateField(key)) {
          allValid = false;
        } else {
          clearEmptyRequiredState(key);
        }
      });
      if (!allValid) {
        const firstInvalid = consultForm.querySelector(
          ".is-invalid input, .is-invalid select, .is-empty-required input, .is-empty-required select",
        );
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      // Show the inline thank-you view instead of a native browser alert.
      showSuccessView();
      consultForm.reset();
      Object.keys(fields).forEach((key) => {
        fields[key].el
          .closest(".form-field")
          .classList.remove("is-invalid", "is-valid", "is-empty-required");
      });
    });
  }

  if (formSuccessClose) {
    formSuccessClose.addEventListener("click", closePanel);
  }
})();
