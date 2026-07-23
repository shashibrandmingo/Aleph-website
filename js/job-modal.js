/* =========================================================
   JOB DETAIL MODAL — job-modal.js
   Job ka data job-data.js file se aata hai.
   ========================================================= */

/* NOTE: jobData variable job-data.js se load hota hai */


let currentJobTitle = "";

function buildDescriptionList(arr) {
  return arr.map(item => `<li>${item}</li>`).join("");
}

/* ---------- Open Modal ---------- */
function openJobModal(jobTitle) {
  const job = jobData[jobTitle];
  if (!job) return;

  currentJobTitle = jobTitle;

  /* Set title & tag */
  document.getElementById("modalJobTitle").textContent = jobTitle;

  /* Set badges */
  document.getElementById("jobModalBadges").innerHTML = `
    <span class="jm-badge jm-badge-location">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      ${job.location}
    </span>
    <span class="jm-badge jm-badge-type">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
      ${job.type}
    </span>`;

  /* Fill table body */
  document.getElementById("jobModalTableBody").innerHTML = `
    <tr>
      <td><ul class="jm-desc-list">${buildDescriptionList(job.description)}</ul></td>
      <td class="jm-exp-cell">${job.experience}</td>
      <td class="jm-qual-cell">${job.qualification}</td>
    </tr>`;

  /* Show overlay */
  const overlay = document.getElementById("jobModalOverlay");
  overlay.classList.add("is-active");
  document.body.classList.add("modal-open");
}

/* ---------- Close Modal ---------- */
function closeJobModal(event) {
  /* If event exists, only close when clicking the backdrop (not the box itself) */
  if (event && event.target !== document.getElementById("jobModalOverlay")) return;

  const overlay = document.getElementById("jobModalOverlay");
  overlay.classList.remove("is-active");
  document.body.classList.remove("modal-open");
}

/* ---------- Apply Now ---------- */
function applyNowFromModal() {
  /* 1. Close modal */
  const overlay = document.getElementById("jobModalOverlay");
  overlay.classList.remove("is-active");
  document.body.classList.remove("modal-open");

  /* 2. Auto-select the job in the "Post Applied For" dropdown */
  const postSelect = document.getElementById("postApplied");
  if (postSelect && currentJobTitle) {
    for (let i = 0; i < postSelect.options.length; i++) {
      if (postSelect.options[i].value === currentJobTitle) {
        postSelect.selectedIndex = i;
        break;
      }
    }
  }

  /* 3. Scroll to the apply section smoothly */
  const applySection = document.getElementById("apply-section");
  if (applySection) {
    setTimeout(() => {
      applySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120); /* small delay so modal close animation finishes first */
  }
}

/* ---------- ESC key to close ---------- */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const overlay = document.getElementById("jobModalOverlay");
    if (overlay && overlay.classList.contains("is-active")) {
      overlay.classList.remove("is-active");
      document.body.classList.remove("modal-open");
    }
  }
});
