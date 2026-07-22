/* ==========================================================================
   QCO-WTO-Order TABLE DATA & RENDERING (qco-table-data.js)
   ========================================================================== */

// 1. QCO Data Array
const qcoData = [
  {
    id: 1,
    productName: "BIS QCO for the Cookware and Utensils (Three piece round open top metal cans for foods and beverages)",
    indianStandard: "IS 18427:2024",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "14 Mar 2024",
    issueOrderLink: "#",
    extensionOrder: "30 Mar 2026",
    extensionOrderLink: "#",
    implementationDate: "General Implementation: 1st October, 2025\nSmall Enterprises: 1st January, 2026\nMicro Enterprises: 1st April, 2026",
    ministryKey: "commerce"
  },
  {
    id: 2,
    productName: "BIS QCO for Fire-resistant Cabinets (Fire Resisting (Insulating) Filing Cabinets — Specification)",
    indianStandard: "IS 14561 : 2014",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "23 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 3,
    productName: "BIS QCO for Fire-resistant Cabinets (Fire Resisting Record Protection Cabinets — Specification)",
    indianStandard: "IS 14203 : 2023",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "23 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 4,
    productName: "BIS QCO for Mechanical Type Gas Leak Detector for use with Low Pressure Liquefied Petroleum Gas Burning Appliances",
    indianStandard: "IS 13432: 2023",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "23 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 5,
    productName: "BIS QCO for Steel Wire Ropes, Strands, Ring Net Panels, Rope Net panels and Rolls (Galvanized Strand for Earthing)",
    indianStandard: "IS 12776: 2002",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "17 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 6,
    productName: "BIS QCO for Steel Wire Ropes, Strands, Ring Net Panels, Rope Net panels and Roll (Steel Wire Ring Net Panels)",
    indianStandard: "IS/ISO 17745: 2016",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "17 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 7,
    productName: "BIS QCO for Steel Wire Ropes, Strands, Ring Net Panels, Rope Net panels and Rolls (Steel Wire Rope Net Panels and Rolls)",
    indianStandard: "IS/ISO 17746: 2016",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "17 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 8,
    productName: "BIS QCO for Steel Wire Ropes, Strands, Ring Net Panels, Rope Net panels and Rolls (Wire Ropes and Strands for General Structural Applications Including Cable Supported Bridges)",
    indianStandard: "IS 9282: 2024",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "17 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 9,
    productName: "BIS QCO for Steel Wire Ropes, Strands, Ring Net Panels, Rope Net panels and Rolls (Steel Wire Ropes)",
    indianStandard: "IS/ISO 2408: 2017",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "17 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 10,
    productName: "BIS QCO for Solvent Cement for UPVC Pipe",
    indianStandard: "IS 14182: 1994",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "16 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 11,
    productName: "BIS QCO for Synthetic Resin Adhesives",
    indianStandard: "IS 848: 2006",
    concernMinistry: "Ministry of Commerce and Industry",
    issueOrder: "15 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "commerce"
  },
  {
    id: 12,
    productName: "QCO for Portland Pozzolana Cement",
    indianStandard: "IS 1489 (Part 1): 2015",
    concernMinistry: "Ministry of Steel",
    issueOrder: "10 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "steel"
  },
  {
    id: 13,
    productName: "QCO for Ordinary Portland Cement",
    indianStandard: "IS 269: 2015",
    concernMinistry: "Ministry of Steel",
    issueOrder: "10 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "steel"
  },
  {
    id: 14,
    productName: "QCO for Portland Slag Cement",
    indianStandard: "IS 455: 2015",
    concernMinistry: "Ministry of Steel",
    issueOrder: "10 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "steel"
  },
  {
    id: 15,
    productName: "QCO for Woven Wire Cloth (Industrial Purpose)",
    indianStandard: "IS 460 (Part 1): 2020",
    concernMinistry: "Ministry of Textiles",
    issueOrder: "08 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "textiles"
  },
  {
    id: 16,
    productName: "QCO for PVC Insulated Cables for Working Voltages",
    indianStandard: "IS 694: 2020",
    concernMinistry: "Dept of Chemicals & Petrochemicals",
    issueOrder: "05 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "chemicals"
  },
  {
    id: 17,
    productName: "QCO for Diesel Engines for Agricultural Purposes",
    indianStandard: "IS 11170: 2018",
    concernMinistry: "Ministry of Heavy Industries",
    issueOrder: "03 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "heavy-ind"
  },
  {
    id: 18,
    productName: "QCO for Iron Ore Pellets",
    indianStandard: "IS 8625: 2019",
    concernMinistry: "Ministry of Mines",
    issueOrder: "01 Jul 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "mines"
  },
  {
    id: 19,
    productName: "QCO for Plywood for General Purposes",
    indianStandard: "IS 303: 1989",
    concernMinistry: "Ministry of Env, Forest & Climate Change",
    issueOrder: "28 Jun 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "environment"
  },
  {
    id: 20,
    productName: "QCO for Solar Photovoltaic Modules",
    indianStandard: "IS/IEC 61215: 2021",
    concernMinistry: "Ministry of New & Renewable Energy",
    issueOrder: "25 Jun 2025",
    issueOrderLink: "#",
    extensionOrder: "-",
    extensionOrderLink: "",
    implementationDate: "Draft Order",
    ministryKey: "renewable"
  }
];

// 2. Ministry icons map (Font Awesome icons)
const ministryIcons = {
  "all":         "fa-solid fa-building-columns",
  "steel":       "fa-solid fa-industry",
  "textiles":    "fa-solid fa-shirt",
  "commerce":    "fa-solid fa-handshake",
  "chemicals":   "fa-solid fa-flask",
  "heavy-ind":   "fa-solid fa-gears",
  "mines":       "fa-solid fa-gem",
  "environment": "fa-solid fa-leaf",
  "renewable":   "fa-solid fa-solar-panel"
};

// 3. State
let currentMinistry = "all";
let currentSearchQuery = "";
let currentPage = 1;
const rowsPerPageOptions = [15, 25, 50];
let rowsPerPage = 15;
let currentSort = { col: null, dir: "asc" };

// 4. DOM references
const qcoSearchInput   = document.getElementById("qco-search-input");
const qcoSearchBar     = document.getElementById("qco-search-bar");
const qcoCategoryBtn   = document.getElementById("qco-category-btn");
const qcoCategoryMenu  = document.getElementById("qco-category-menu");
const qcoCategoryLabel = document.getElementById("qco-category-label");
const qcoTableBody     = document.getElementById("qco-table-body");
const qcoResultsCount  = document.getElementById("qco-results-count");
const qcoPagination    = document.getElementById("qco-pagination");
const qcoRowsSelect    = document.getElementById("qco-rows-select");
const qcoStdFilter     = document.getElementById("qco-std-filter-btn");
const qcoFilterBtn     = document.getElementById("qco-filter-btn");
const qcoRefreshBtn    = document.getElementById("qco-refresh-btn");
const qcoExportBtn     = document.getElementById("qco-export-btn");
const qcoClearBtn      = document.getElementById("qco-clear-btn");

// 5. Build Ministry list (for the "All" category dropdown)
function buildMinistryList() {
  const counts = {};
  qcoData.forEach(d => {
    counts[d.ministryKey] = (counts[d.ministryKey] || 0) + 1;
  });

  const ministries = [
    { key: "all",        name: "All Ministries", count: qcoData.length },
    { key: "steel",      name: "Ministry of Steel" },
    { key: "textiles",   name: "Ministry of Textiles" },
    { key: "commerce",   name: "Ministry of Commerce & I..." },
    { key: "chemicals",  name: "Dept of Chemicals & Petr..." },
    { key: "heavy-ind",  name: "Ministry of Heavy Industri..." },
    { key: "mines",      name: "Ministry of Mines" },
    { key: "environment",name: "Ministry of Env, Forest & ..." },
    { key: "renewable",  name: "Ministry of New & Renew..." }
  ];

  if (!qcoCategoryMenu) return;
  qcoCategoryMenu.innerHTML = "";

  ministries.forEach(m => {
    const c = m.key === "all" ? qcoData.length : (counts[m.key] || 0);
    const li = document.createElement("li");
    li.className = "qco-category-item" + (m.key === currentMinistry ? " active" : "");
    li.setAttribute("data-key", m.key);
    li.innerHTML = `
      <span class="qco-category-item-left">
        <i class="${ministryIcons[m.key] || 'fa-solid fa-building'}"></i>
        <span>${m.name}</span>
      </span>
      <span class="qco-category-badge">${c}</span>
    `;
    li.addEventListener("click", () => {
      currentMinistry = m.key;
      currentPage = 1;
      qcoCategoryLabel.textContent = m.key === "all" ? "All" : m.name;
      closeDropdown();
      renderAll();
    });
    qcoCategoryMenu.appendChild(li);
  });
}

// 6. Filter + Sort data
function getFilteredData() {
  let filtered = [...qcoData];

  // Ministry filter
  if (currentMinistry !== "all") {
    filtered = filtered.filter(d => d.ministryKey === currentMinistry);
  }

  // Search filter
  if (currentSearchQuery) {
    const q = currentSearchQuery.toLowerCase();
    filtered = filtered.filter(d =>
      d.productName.toLowerCase().includes(q) ||
      d.indianStandard.toLowerCase().includes(q) ||
      d.concernMinistry.toLowerCase().includes(q) ||
      d.implementationDate.toLowerCase().includes(q)
    );
  }

  // Sort
  if (currentSort.col !== null) {
    const key = currentSort.col;
    const dir = currentSort.dir === "asc" ? 1 : -1;
    filtered.sort((a, b) => {
      const va = (a[key] || "").toString().toLowerCase();
      const vb = (b[key] || "").toString().toLowerCase();
      return va < vb ? -dir : va > vb ? dir : 0;
    });
  }

  return filtered;
}

// 7. Render table rows
function renderTable() {
  if (!qcoTableBody) return;
  const filtered = getFilteredData();
  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const pageData = filtered.slice(start, start + rowsPerPage);

  if (pageData.length === 0) {
    qcoTableBody.innerHTML = `
      <tr class="qco-empty-row">
        <td colspan="6">
          <div class="qco-empty-state">
            <i class="fa-solid fa-inbox"></i>
            <p>No QCO orders found matching your criteria.</p>
          </div>
        </td>
      </tr>
    `;
  } else {
    qcoTableBody.innerHTML = pageData.map((d, i) => {
      const icon = ministryIcons[d.ministryKey] || "fa-solid fa-building";
      const issueLink = d.issueOrderLink
        ? `<div>${d.issueOrder}</div><a href="${d.issueOrderLink}" class="qco-link">Click Here</a>`
        : d.issueOrder;
      const extLink = d.extensionOrderLink
        ? `<div>${d.extensionOrder}</div><a href="${d.extensionOrderLink}" class="qco-link">Click Here</a>`
        : (d.extensionOrder || "-");
      const implDate = (d.implementationDate || "-").replace(/\n/g, "<br>");

      return `
        <tr class="qco-table-row fade-in" style="animation-delay: ${i * 0.03}s">
          <td class="qco-td-product">
            <div class="qco-product-cell">
              <span class="qco-product-icon"><i class="${icon}"></i></span>
              <span>${d.productName}</span>
            </div>
          </td>
          <td>${d.indianStandard}</td>
          <td>${d.concernMinistry}</td>
          <td>${issueLink}</td>
          <td>${extLink}</td>
          <td>${implDate}</td>
        </tr>
      `;
    }).join("");
  }

  // Results count
  if (qcoResultsCount) {
    const end = Math.min(start + rowsPerPage, filtered.length);
    qcoResultsCount.textContent = `Showing ${filtered.length === 0 ? 0 : start + 1} to ${end} of ${filtered.length} entries`;
  }

  renderPagination(filtered.length, totalPages);
}

// 8. Render pagination
function renderPagination(total, totalPages) {
  if (!qcoPagination) return;
  qcoPagination.innerHTML = "";

  if (totalPages <= 1) return;

  // Prev button
  const prev = makePageBtn("<", currentPage - 1, currentPage <= 1);
  qcoPagination.appendChild(prev);

  // Page numbers
  const pages = getPaginationRange(currentPage, totalPages);
  pages.forEach(p => {
    if (p === "...") {
      const dots = document.createElement("span");
      dots.className = "qco-page-dots";
      dots.textContent = "...";
      qcoPagination.appendChild(dots);
    } else {
      const btn = makePageBtn(p, p, false, p === currentPage);
      qcoPagination.appendChild(btn);
    }
  });

  // Next button
  const next = makePageBtn(">", currentPage + 1, currentPage >= totalPages);
  qcoPagination.appendChild(next);
}

function makePageBtn(label, page, disabled, active) {
  const btn = document.createElement("button");
  btn.className = "qco-page-btn" + (active ? " active" : "");
  btn.textContent = label;
  btn.disabled = disabled;
  if (!disabled) {
    btn.addEventListener("click", () => {
      currentPage = page;
      renderTable();
      // Scroll to top of table
      document.querySelector(".qco-table-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  return btn;
}

function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

// 9. Render everything
function renderAll() {
  buildMinistryList();
  renderTable();
}

// 10. Dropdown toggle
function toggleDropdown() {
  qcoCategoryMenu?.classList.toggle("open");
  qcoCategoryBtn?.classList.toggle("open");
}

function closeDropdown() {
  qcoCategoryMenu?.classList.remove("open");
  qcoCategoryBtn?.classList.remove("open");
}

// 11. Sort handler
function handleSort(colKey) {
  if (currentSort.col === colKey) {
    currentSort.dir = currentSort.dir === "asc" ? "desc" : "asc";
  } else {
    currentSort.col = colKey;
    currentSort.dir = "asc";
  }
  currentPage = 1;
  renderTable();

  // Update sort icons
  document.querySelectorAll(".qco-sort-btn").forEach(btn => {
    btn.classList.remove("sorted-asc", "sorted-desc");
    if (btn.dataset.col === colKey) {
      btn.classList.add(currentSort.dir === "asc" ? "sorted-asc" : "sorted-desc");
    }
  });
}

// 12. Event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderAll();

  // Category dropdown toggle
  qcoCategoryBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!qcoCategoryMenu?.contains(e.target) && !qcoCategoryBtn?.contains(e.target)) {
      closeDropdown();
    }
  });

  // Search input
  qcoSearchInput?.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value.trim();
    currentPage = 1;
    renderTable();
  });

  // Clear all filters
  qcoClearBtn?.addEventListener("click", () => {
    currentMinistry = "all";
    currentSearchQuery = "";
    currentPage = 1;
    currentSort = { col: null, dir: "asc" };
    if (qcoSearchInput) qcoSearchInput.value = "";
    if (qcoCategoryLabel) qcoCategoryLabel.textContent = "All";
    document.querySelectorAll(".qco-sort-btn").forEach(b => b.classList.remove("sorted-asc", "sorted-desc"));
    renderAll();
  });

  // Rows per page
  qcoRowsSelect?.addEventListener("change", (e) => {
    rowsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderTable();
  });

  // Sort buttons
  document.querySelectorAll(".qco-sort-btn").forEach(btn => {
    btn.addEventListener("click", () => handleSort(btn.dataset.col));
  });

  // Refresh
  qcoRefreshBtn?.addEventListener("click", () => {
    renderAll();
  });

  // Export (simple CSV download)
  qcoExportBtn?.addEventListener("click", () => {
    const filtered = getFilteredData();
    const headers = ["Product Name", "Indian Standard", "Concern Ministry", "Issue Order", "Extension Order", "Implementation Date"];
    const rows = filtered.map(d => [
      `"${d.productName}"`,
      `"${d.indianStandard}"`,
      `"${d.concernMinistry}"`,
      `"${d.issueOrder}"`,
      `"${d.extensionOrder || '-'}"`,
      `"${d.implementationDate.replace(/\n/g, '; ')}"`
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "QCO-WTO-Orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
});
