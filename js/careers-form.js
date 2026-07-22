/**
 * Aleph India - Careers Application Form Handler
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('careersApplyForm');
    const resumeInput = document.getElementById('resume');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    // Update resume file name display and validate size
    if (resumeInput && fileNameDisplay) {
        resumeInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileSizeMB = file.size / (1024 * 1024);

                if (fileSizeMB > 2) {
                    alert('File size exceeds 2 MB limit. Please upload a smaller PDF file.');
                    resumeInput.value = '';
                    fileNameDisplay.textContent = 'No file chosen';
                    fileNameDisplay.style.color = '#64748b';
                    return;
                }

                if (!file.name.toLowerCase().endsWith('.pdf')) {
                    alert('Invalid file format. Only PDF files are allowed.');
                    resumeInput.value = '';
                    fileNameDisplay.textContent = 'No file chosen';
                    fileNameDisplay.style.color = '#64748b';
                    return;
                }

                fileNameDisplay.textContent = file.name;
                fileNameDisplay.style.color = '#2563eb';
                fileNameDisplay.style.fontWeight = '600';
            } else {
                fileNameDisplay.textContent = 'No file chosen';
                fileNameDisplay.style.color = '#64748b';
                fileNameDisplay.style.fontWeight = 'normal';
            }
        });
    }

    // -------------------------------------------------------------
    // Custom Rounded Select Dropdowns for Form
    // -------------------------------------------------------------
    const initCustomSelects = () => {
        const selectWrappers = document.querySelectorAll('.select-wrapper');

        selectWrappers.forEach(wrapper => {
            const select = wrapper.querySelector('select');
            if (!select) return;

            // Remove any existing custom trigger/dropdown to prevent duplication
            wrapper.querySelectorAll('.custom-select-trigger, .custom-select-dropdown').forEach(el => el.remove());

            select.style.display = 'none';

            const trigger = document.createElement('div');
            trigger.className = 'custom-select-trigger';

            const selectedOption = select.options[select.selectedIndex];
            const triggerText = document.createElement('span');
            triggerText.className = 'custom-select-text';
            triggerText.textContent = selectedOption ? selectedOption.text : 'Select an option';
            if (!select.value) {
                triggerText.style.color = '#94a3b8';
            }

            const arrow = document.createElement('span');
            arrow.className = 'custom-select-arrow';
            arrow.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

            trigger.appendChild(triggerText);
            trigger.appendChild(arrow);
            wrapper.appendChild(trigger);

            const dropdownList = document.createElement('div');
            dropdownList.className = 'custom-select-dropdown';

            Array.from(select.options).forEach((opt) => {
                if (opt.disabled && opt.value === '') return;

                const optionItem = document.createElement('div');
                optionItem.className = 'custom-select-option';
                if (opt.selected && opt.value !== '') {
                    optionItem.classList.add('selected');
                }
                optionItem.textContent = opt.text;
                optionItem.dataset.value = opt.value;

                optionItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    select.value = opt.value;
                    triggerText.textContent = opt.text;
                    triggerText.style.color = '#0f172a';

                    dropdownList.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
                    optionItem.classList.add('selected');

                    select.dispatchEvent(new Event('change', { bubbles: true }));

                    dropdownList.classList.remove('open');
                    trigger.classList.remove('active');
                });

                dropdownList.appendChild(optionItem);
            });

            wrapper.appendChild(dropdownList);

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdownList.classList.contains('open');

                document.querySelectorAll('.custom-select-dropdown.open').forEach(d => d.classList.remove('open'));
                document.querySelectorAll('.custom-select-trigger.active').forEach(t => t.classList.remove('active'));

                if (!isOpen) {
                    dropdownList.classList.add('open');
                    trigger.classList.add('active');
                }
            });
        });
    };

    initCustomSelects();

    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-dropdown.open').forEach(d => d.classList.remove('open'));
        document.querySelectorAll('.custom-select-trigger.active').forEach(t => t.classList.remove('active'));
    });

    // Reset and Submission handlers
    if (form) {
        form.addEventListener('reset', () => {
            if (fileNameDisplay) {
                fileNameDisplay.textContent = 'No file chosen';
                fileNameDisplay.style.color = '#64748b';
                fileNameDisplay.style.fontWeight = 'normal';
            }
            setTimeout(initCustomSelects, 10);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const firstName = document.getElementById('firstName')?.value || '';
            const lastName = document.getElementById('lastName')?.value || '';

            alert(`Thank you ${firstName} ${lastName}! Your application has been submitted successfully. Our HR team will contact you soon.`);

            form.reset();
        });
    }
});
