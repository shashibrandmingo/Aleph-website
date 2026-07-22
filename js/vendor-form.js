/* ==========================================================================
   VENDOR REGISTRATION FORM INTERACTIVITY (vendor-form.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Character Counter for Textarea
  const serviceDetailsInput = document.getElementById("vf-service-details");
  const charCounter = document.getElementById("vf-char-counter");

  if (serviceDetailsInput && charCounter) {
    serviceDetailsInput.addEventListener("input", () => {
      const len = serviceDetailsInput.value.length;
      charCounter.textContent = `${len} / 1000`;
    });
  }

  // 2. "Same as Registered Office Address" Checkbox Handler
  const sameAddressCheckbox = document.getElementById("vf-same-address");
  if (sameAddressCheckbox) {
    sameAddressCheckbox.addEventListener("change", () => {
      if (sameAddressCheckbox.checked) {
        document.getElementById("vf-corp-address").value = document.getElementById("vf-reg-address").value;
        document.getElementById("vf-corp-country").value = document.getElementById("vf-reg-country").value;
        document.getElementById("vf-corp-state").value = document.getElementById("vf-reg-state").value;
        document.getElementById("vf-corp-city").value = document.getElementById("vf-reg-city").value;
        document.getElementById("vf-corp-pincode").value = document.getElementById("vf-reg-pincode").value;
        document.getElementById("vf-corp-contact").value = document.getElementById("vf-reg-contact").value;
        document.getElementById("vf-corp-email").value = document.getElementById("vf-reg-email").value;
      }
    });
  }

  // 3. Collapsible / Accordion Section Headers
  const accordionHeaders = document.querySelectorAll(".vf-accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const targetId = header.getAttribute("data-target");
      const targetBody = document.getElementById(targetId);
      const chevron = header.querySelector(".vf-chevron-icon");

      if (targetBody) {
        const isCollapsed = targetBody.classList.contains("collapsed");
        if (isCollapsed) {
          targetBody.classList.remove("collapsed");
          header.classList.remove("collapsed");
          if (chevron) chevron.style.transform = "rotate(0deg)";
        } else {
          targetBody.classList.add("collapsed");
          header.classList.add("collapsed");
          if (chevron) chevron.style.transform = "rotate(180deg)";
        }
      }
    });
  });

  // 4. File input label dynamic filename display
  const fileInputs = document.querySelectorAll(".vf-file-input");
  fileInputs.forEach(input => {
    input.addEventListener("change", () => {
      const fileNameSpan = input.nextElementSibling;
      if (fileNameSpan && fileNameSpan.classList.contains("vf-file-name")) {
        if (input.files && input.files.length > 0) {
          fileNameSpan.textContent = input.files[0].name;
          fileNameSpan.style.color = "#2563eb";
          fileNameSpan.style.fontWeight = "600";
        } else {
          fileNameSpan.textContent = "No file chosen";
          fileNameSpan.style.color = "#94a3b8";
          fileNameSpan.style.fontWeight = "normal";
        }
      }
    });
  });

  // 5. Production-Ready reCAPTCHA v2 Interactive Widget Handler
  const recaptchaBtn = document.getElementById("g-recaptcha-btn");
  const recaptchaLabel = document.getElementById("g-recaptcha-label-btn");
  const recaptchaHiddenInput = document.getElementById("g-recaptcha-verified-val");
  const recaptchaWidget = document.getElementById("g-recaptcha-widget");
  let isCaptchaVerified = false;
  let isVerifying = false;

  function handleCaptchaClick() {
    if (isVerifying) return;

    if (isCaptchaVerified) {
      // Reset state if clicked again
      isCaptchaVerified = false;
      if (recaptchaHiddenInput) recaptchaHiddenInput.checked = false;
      recaptchaBtn.classList.remove("verified", "verifying");
      recaptchaWidget.classList.remove("error-shake");
      return;
    }

    // Start verification animation
    isVerifying = true;
    recaptchaBtn.classList.add("verifying");
    recaptchaWidget.classList.remove("error-shake");

    setTimeout(() => {
      isVerifying = false;
      isCaptchaVerified = true;
      recaptchaBtn.classList.remove("verifying");
      recaptchaBtn.classList.add("verified");
      if (recaptchaHiddenInput) recaptchaHiddenInput.checked = true;
    }, 1100);
  }

  if (recaptchaBtn) {
    recaptchaBtn.addEventListener("click", handleCaptchaClick);
    recaptchaBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCaptchaClick();
      }
    });
  }

  if (recaptchaLabel) {
    recaptchaLabel.addEventListener("click", handleCaptchaClick);
  }

  // 6. Form Submit Validation & Notification
  const vendorForm = document.getElementById("vendor-registration-form");
  if (vendorForm) {
    vendorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!isCaptchaVerified) {
        if (recaptchaWidget) {
          recaptchaWidget.classList.add("error-shake");
          recaptchaWidget.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        alert("Please check the 'I'm not a robot' box before submitting.");
        return;
      }

      alert("Thank you! Your Vendor Registration Form has been submitted successfully. Our team will review your application.");
    });
  }
});

