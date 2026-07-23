/* ==========================================================================
   SECTION NAME: Payment Gateway Section JS (Payment-Page.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* 1. Region Toggle (Domestic / International) */
  const regionBtns = document.querySelectorAll(".region-btn");
  regionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      regionBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  /* 2. Main Method Tabs Switch (UPI, Cards, Net Banking, Wallets) */
  const methodTabs = document.querySelectorAll(".method-tab");
  const methodPanels = document.querySelectorAll(".method-content-panel");

  methodTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetMethod = this.getAttribute("data-method");

      methodTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      methodPanels.forEach((panel) => {
        panel.classList.remove("active");
        if (panel.id === `panel-${targetMethod}`) {
          panel.classList.add("active");
        }
      });
    });
  });

  /* 3. Verify UPI ID Functionality */
  const btnVerifyUpi = document.getElementById("btnVerifyUpi");
  const upiIdInput = document.getElementById("upiIdInput");
  const upiStatusMsg = document.getElementById("upiStatusMsg");

  if (btnVerifyUpi && upiIdInput) {
    btnVerifyUpi.addEventListener("click", function () {
      const val = upiIdInput.value.trim();
      if (!val) {
        upiStatusMsg.textContent = "Please enter a valid UPI ID";
        upiStatusMsg.className = "upi-status-message error";
      } else {
        upiStatusMsg.textContent = "✓ UPI ID Verified Successfully (" + val + "@upi)";
        upiStatusMsg.className = "upi-status-message success";
      }
    });
  }
});

/* 4. Copy UPI Handle Text Functionality */
function copyText(elementId, btnElement) {
  const textToCopy = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(textToCopy).then(
    function () {
      const origText = btnElement.innerText;
      btnElement.innerText = "COPIED!";
      btnElement.style.backgroundColor = "#16a34a";
      btnElement.style.color = "#ffffff";
      btnElement.style.borderColor = "#16a34a";

      setTimeout(() => {
        btnElement.innerText = origText;
        btnElement.style.backgroundColor = "";
        btnElement.style.color = "";
        btnElement.style.borderColor = "";
      }, 2000);
    },
    function () {
      alert("Failed to copy UPI handle");
    }
  );
}

/* 5. Update File Name in Custom File Input */
function updateFileName(input) {
  const label = document.getElementById("receiptFileName");
  if (input.files && input.files.length > 0) {
    label.textContent = input.files[0].name;
    label.style.color = "#0f172a";
  } else {
    label.textContent = "No file chosen";
    label.style.color = "#94a3b8";
  }
}

/* 6. Form Submission Handler */
function handlePaymentSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("fullName").value;
  alert("Thank you " + name + "! Processing secure payment of ₹590.00...");
}
