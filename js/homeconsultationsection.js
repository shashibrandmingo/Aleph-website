(function () {
  "use strict";

  const form = document.getElementById("consultationForm");
  const submitBtn = document.getElementById("cSubmitBtn");

  const fields = {
    fullName: {
      input: document.getElementById("cFullName"),
      error: document.getElementById("cFullNameError"),
      field: document
        .getElementById("cFullName")
        .closest(".consultation-field"),
    },
    companyName: {
      input: document.getElementById("cCompanyName"),
      error: document.getElementById("cCompanyNameError"),
      field: document
        .getElementById("cCompanyName")
        .closest(".consultation-field"),
    },
    mobile: {
      input: document.getElementById("cMobile"),
      error: document.getElementById("cMobileError"),
      field: document.getElementById("cMobile").closest(".consultation-field"),
    },
    email: {
      input: document.getElementById("cEmail"),
      error: document.getElementById("cEmailError"),
      field: document.getElementById("cEmail").closest(".consultation-field"),
    },
    service: {
      input: document.getElementById("cService"),
      error: document.getElementById("cServiceError"),
      field: document.getElementById("cService").closest(".consultation-field"),
    },
    requirement: {
      input: document.getElementById("cRequirement"),
      error: document.getElementById("cRequirementError"),
      field: document
        .getElementById("cRequirement")
        .closest(".consultation-field"),
    },
  };

  const requirementCount = document.getElementById("cRequirementCount");
  const REQUIREMENT_MAX = 1000;

  /* -----------------------------------------------------------------
     1) Validation rules — each returns an error message string, or
     "" (empty) if the value is valid.
  ----------------------------------------------------------------- */
  function validateFullName(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter your full name.";
    if (trimmed.length < 2) return "Name looks too short.";
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed))
      return "Name can only contain letters, spaces, and ' . -";
    return "";
  }

  function validateCompanyName(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter your company name.";
    if (trimmed.length < 2) return "Company name looks too short.";
    return "";
  }

  function validateMobile(value) {
    const digitsOnly = value.trim();
    if (!digitsOnly) return "Please enter your mobile number.";
    if (!/^\d+$/.test(digitsOnly))
      return "Mobile number can only contain digits.";
    if (digitsOnly.length !== 10)
      return "Mobile number must be exactly 10 digits.";
    if (!/^[6-9]/.test(digitsOnly))
      return "Please enter a valid Indian mobile number.";
    return "";
  }

  function validateEmail(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter your email address.";
    // Standard, practical email pattern.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed))
      return "Please enter a valid email address.";
    return "";
  }

  function validateService(value) {
    if (!value) return "Please select a service.";
    return "";
  }

  function validateRequirement(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Please tell us about your requirement.";
    if (trimmed.length < 10)
      return "Please provide a bit more detail (min 10 characters).";
    if (trimmed.length > REQUIREMENT_MAX)
      return `Requirement must be under ${REQUIREMENT_MAX} characters.`;
    return "";
  }

  const validators = {
    fullName: validateFullName,
    companyName: validateCompanyName,
    mobile: validateMobile,
    email: validateEmail,
    service: validateService,
    requirement: validateRequirement,
  };

  /* -----------------------------------------------------------------
     2) Show / clear error state for a single field
  ----------------------------------------------------------------- */
  function setFieldError(key, message) {
    const { field, error } = fields[key];
    if (message) {
      field.classList.add("has-error");
      error.textContent = message;
    } else {
      field.classList.remove("has-error");
      error.textContent = "";
    }
  }

  function validateField(key) {
    const value = fields[key].input.value;
    const message = validators[key](value);
    setFieldError(key, message);
    return !message;
  }

  /* -----------------------------------------------------------------
     3) Mobile input — restrict to digits only as the user types,
     and hard-cap at 10 digits (maxlength already helps, this is a
     stronger guarantee across browsers/paste events).
  ----------------------------------------------------------------- */
  fields.mobile.input.addEventListener("input", () => {
    const digitsOnly = fields.mobile.input.value
      .replace(/\D/g, "")
      .slice(0, 10);
    fields.mobile.input.value = digitsOnly;
  });

  /* -----------------------------------------------------------------
     4) Service select — toggle placeholder styling once a real value
     is chosen (matches the reference's darker text once selected)
  ----------------------------------------------------------------- */
  fields.service.input.addEventListener("change", () => {
    fields.service.input.classList.toggle(
      "has-value",
      !!fields.service.input.value,
    );
  });

  /* -----------------------------------------------------------------
     5) Requirement textarea — live character counter
  ----------------------------------------------------------------- */
  fields.requirement.input.addEventListener("input", () => {
    const len = fields.requirement.input.value.length;
    requirementCount.textContent = `${len} / ${REQUIREMENT_MAX}`;
  });

  /* -----------------------------------------------------------------
     6) Validate on blur (so errors appear as the user moves through
     the form, not only on submit) and clear as soon as it's fixed
  ----------------------------------------------------------------- */
  Object.keys(fields).forEach((key) => {
    const { input } = fields[key];
    input.addEventListener("blur", () => validateField(key));
    input.addEventListener("input", () => {
      // Only re-validate live once an error is already showing, so we
      // don't nag the user before they've finished typing.
      if (fields[key].field.classList.contains("has-error")) {
        validateField(key);
      }
    });
  });

  /* -----------------------------------------------------------------
     7) Submit handler
  ----------------------------------------------------------------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const isValid = results.every(Boolean);

    if (!isValid) {
      // Scroll to the first invalid field for a clear next action.
      const firstErrorField = document.querySelector(
        ".consultation-field.has-error",
      );
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    const payload = {
      fullName: fields.fullName.input.value.trim(),
      companyName: fields.companyName.input.value.trim(),
      mobile: fields.mobile.input.value.trim(),
      email: fields.email.input.value.trim(),
      service: fields.service.input.value,
      requirement: fields.requirement.input.value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    // TODO: submit — replace this with your real endpoint, e.g.:
    // fetch("/api/consultation", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then(() => onSubmitSuccess())
    //   .catch(() => onSubmitError());

    // Simulated success for now so the flow is testable out of the box.
    setTimeout(() => {
      console.log("Consultation form submitted:", payload);
      onSubmitSuccess();
    }, 900);
  });

  function onSubmitSuccess() {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent!';
    setTimeout(() => {
      submitBtn.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> Get Free Expert Advice';
      form.reset();
      requirementCount.textContent = `0 / ${REQUIREMENT_MAX}`;
      fields.service.input.classList.remove("has-value");
      Object.keys(fields).forEach((key) => setFieldError(key, ""));
    }, 2200);
  }
})();
