/**
 * Aleph India - Blog Listing Page Handler
 */
document.addEventListener('DOMContentLoaded', () => {
    // Custom Select Dropdowns Handler
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

            if (wrapper.classList.contains('blogs-sort-wrapper') || select.id === 'blogsSortSelect') {
                const filterIcon = document.createElement('span');
                filterIcon.className = 'custom-select-filter-icon';
                filterIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`;
                trigger.appendChild(filterIcon);
            }

            const selectedOption = select.options[select.selectedIndex];
            const triggerText = document.createElement('span');
            triggerText.className = 'custom-select-text';
            triggerText.textContent = selectedOption ? selectedOption.text : 'Select';

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

    // Client-side Blog Search Filtering
    const searchInput = document.getElementById('blogsSearchInput');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchInput && blogCards.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            blogCards.forEach(card => {
                const title = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
                const category = card.querySelector('.blog-category-tag')?.textContent.toLowerCase() || '';
                const excerpt = card.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';

                if (title.includes(query) || category.includes(query) || excerpt.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
