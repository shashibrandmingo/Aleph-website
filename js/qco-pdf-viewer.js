/**
 * QCO Pages PDF Viewer and Interactive Button Script
 */
document.addEventListener('DOMContentLoaded', function () {
    const pdfModal = document.getElementById('qcoPdfModal');
    const closeBtn = document.getElementById('qcoClosePdfModal');
    const modalTitle = document.getElementById('qcoPdfModalTitle');
    const pdfIframe = document.getElementById('qcoPdfIframe');
    const openBtns = document.querySelectorAll('.js-open-pdf');
    const downloadBtns = document.querySelectorAll('.js-download-pdf');

    const defaultPdfPath = 'image/QCO-page/BeeShip - Ship Smarter, Grow Faster52.pdf';

    // Open PDF Modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const title = this.getAttribute('data-pdf-title') || 'Official QCO Document Viewer';
            const pdfSrc = this.getAttribute('data-pdf-src') || defaultPdfPath;
            
            if (modalTitle) {
                modalTitle.textContent = title;
            }
            if (pdfIframe) {
                pdfIframe.src = pdfSrc;
            }
            if (pdfModal) {
                pdfModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close PDF Modal
    if (closeBtn && pdfModal) {
        closeBtn.addEventListener('click', function () {
            pdfModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on clicking backdrop
        pdfModal.addEventListener('click', function (e) {
            if (e.target === pdfModal) {
                pdfModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Download PDF Action
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            
            const link = document.createElement('a');
            link.href = defaultPdfPath;
            link.download = 'BeeShip - Ship Smarter, Grow Faster52.pdf';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    // Key Provisions Accordion Toggle
    const provHeaders = document.querySelectorAll('.qco-prov-header');
    provHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const parentItem = this.closest('.qco-provision-item');
            if (parentItem) {
                // Toggle active class on clicked item
                const isActive = parentItem.classList.contains('active');
                
                // Close other open provision items
                document.querySelectorAll('.qco-provision-item').forEach(item => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    parentItem.classList.add('active');
                }
            }
        });
    });
});
