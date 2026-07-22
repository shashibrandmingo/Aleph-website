/**
 * Aleph India - Blog Detail Page Renderer
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof BLOG_DATABASE === 'undefined' && typeof BLOG_DETAIL_DATA === 'undefined') {
        console.warn('BLOG_DATABASE is not loaded.');
        return;
    }

    // Parse URL query parameter: ?id=...
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    // Fetch matching data from database or fallback to default
    const data = (blogId && BLOG_DATABASE && BLOG_DATABASE[blogId]) 
        ? BLOG_DATABASE[blogId] 
        : (BLOG_DATABASE["compliance-regulations-2026"] || BLOG_DETAIL_DATA);

    // Update Hero Banner Background Image if custom defined
    const heroBanner = document.querySelector('.blog-detail-hero-banner');
    if (heroBanner && data.bannerImage) {
        heroBanner.style.backgroundImage = `url('${data.bannerImage}')`;
    }

    // Render Breadcrumbs
    const breadcrumbsContainer = document.getElementById('blogDetailBreadcrumbs');
    if (breadcrumbsContainer && data.breadcrumbs) {
        breadcrumbsContainer.innerHTML = data.breadcrumbs.map((crumb, index) => {
            if (index === 0) {
                return `<a href="${crumb.url}"><svg class="crumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> ${crumb.name}</a>`;
            } else if (index === data.breadcrumbs.length - 1) {
                return `<span class="crumb-separator">/</span><span class="crumb-active">${crumb.name}</span>`;
            } else {
                return `<span class="crumb-separator">/</span><a href="${crumb.url}">${crumb.name}</a>`;
            }
        }).join('');
    }

    // Render Hero Banner Content
    const categoryBadge = document.getElementById('blogDetailCategory');
    const mainTitle = document.getElementById('blogDetailTitle');
    const subtitle = document.getElementById('blogDetailSubtitle');
    const dateMeta = document.getElementById('blogDetailDate');
    const readTimeMeta = document.getElementById('blogDetailReadTime');
    const viewsMeta = document.getElementById('blogDetailViews');

    if (categoryBadge) categoryBadge.textContent = data.category || 'Compliance';
    if (mainTitle) mainTitle.textContent = data.title || '';
    if (subtitle) subtitle.textContent = data.subtitle || '';
    if (dateMeta) dateMeta.textContent = data.date || '';
    if (readTimeMeta) readTimeMeta.textContent = data.readTime || '';
    if (viewsMeta) viewsMeta.textContent = data.views || '';

    // Render Article Main Body Sections
    const articleContainer = document.getElementById('blogArticleBody');
    if (articleContainer && data.sections) {
        let html = '';

        data.sections.forEach(sec => {
            html += `<div class="article-section-block">`;
            if (sec.heading) {
                html += `<h3 class="article-section-heading">${sec.heading}</h3>`;
            }
            if (sec.paragraphs) {
                sec.paragraphs.forEach(p => {
                    html += `<p class="article-paragraph">${p}</p>`;
                });
            }

            // Focus Box Widget
            if (sec.focusBox) {
                html += `
                    <div class="focus-box-card">
                        <div class="focus-box-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                        </div>
                        <div class="focus-box-content">
                            <h4>${sec.focusBox.title}</h4>
                            <ul class="focus-box-list">
                                ${sec.focusBox.items.map(item => `
                                    <li>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>${item}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            }

            // Bullets List (Dot Style)
            if (sec.bullets) {
                html += `
                    <ul class="article-bullet-list dot-style">
                        ${sec.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                `;
            }

            // Check Bullets List (Check Circle Style)
            if (sec.checkBullets) {
                html += `
                    <ul class="article-bullet-list check-circle-style">
                        ${sec.checkBullets.map(b => `
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span>${b}</span>
                            </li>
                        `).join('')}
                    </ul>
                `;
            }

            html += `</div>`;
        });

        // Add Feedback Box ("Was this article helpful?")
        html += `
            <div class="article-feedback-box">
                <span class="feedback-title">Was this article helpful?</span>
                <div class="feedback-buttons">
                    <button type="button" class="feedback-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        <span>Yes</span>
                    </button>
                    <button type="button" class="feedback-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                        </svg>
                        <span>No</span>
                    </button>
                </div>
            </div>

            <!-- Pagination Bar -->
            <div class="article-pagination-bar">
                <a href="#" class="pagination-prev">Previous</a>
                <a href="#" class="pagination-next">Next</a>
            </div>
        `;

        articleContainer.innerHTML = html;
    }

    // Render Author Card
    const authorCardContainer = document.getElementById('authorCardContainer');
    if (authorCardContainer && data.author) {
        authorCardContainer.innerHTML = `
            <h4 class="widget-card-title">About the Author</h4>
            <div class="author-card-header">
                <img src="${data.author.avatar}" alt="${data.author.name}" class="author-headshot-img">
                <div class="author-head-details">
                    <h5>${data.author.name}</h5>
                    <p>${data.author.role}</p>
                    <p style="color: #94a3b8; font-size: 0.76rem;">${data.author.company || ''}</p>
                </div>
            </div>
            <p class="author-bio-text">${data.author.bio || ''}</p>
            <div class="author-social-links">
                <a href="${data.author.linkedin || '#'}" target="_blank" class="author-social-icon" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
                    </svg>
                </a>
                <a href="${data.author.email || '#'}" class="author-social-icon" aria-label="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </a>
            </div>
        `;
    }

    // Render Categories Card
    const categoriesContainer = document.getElementById('categoriesCardContainer');
    if (categoriesContainer) {
        const categoriesList = [
            { name: "All Categories", active: false },
            { name: "Compliance", active: data.category === 'Compliance' },
            { name: "Quality", active: data.category === 'Quality' },
            { name: "Industry Insights", active: data.category === 'Industry Insights' },
            { name: "Regulations", active: data.category === 'Regulations' },
            { name: "Technology", active: false },
            { name: "Events", active: false }
        ];

        const getCategoryIcon = (catName) => {
            switch(catName.toLowerCase()) {
                case 'all categories':
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
                case 'compliance':
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
                case 'quality':
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
                case 'industry insights':
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>`;
                case 'regulations':
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
                case 'technology':
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`;
                case 'events':
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
                default:
                    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
            }
        };

        categoriesContainer.innerHTML = `
            <h4 class="widget-card-title">Categories</h4>
            <div class="sidebar-categories-list">
                ${categoriesList.map(cat => `
                    <a href="Blog-Listing.html" class="category-list-item ${cat.active ? 'active' : ''}">
                        ${getCategoryIcon(cat.name)}
                        <span>${cat.name}</span>
                    </a>
                `).join('')}
            </div>
        `;
    }

    // Render Recent Posts Card in Sidebar
    const recentPostsContainer = document.getElementById('recentPostsCardContainer');
    if (recentPostsContainer && typeof BLOG_DATABASE !== 'undefined') {
        const allBlogs = Object.values(BLOG_DATABASE);
        const recentBlogs = allBlogs.filter(b => b.id !== data.id).slice(0, 3);

        recentPostsContainer.innerHTML = `
            <h4 class="widget-card-title">Recent Posts</h4>
            <div class="recent-posts-stack">
                ${recentBlogs.map(post => `
                    <a href="Blog-Detail-Pages.html?id=${post.id}" class="recent-post-card">
                        <img src="${post.bannerImage || 'image/blog-listing/blog-1.png'}" alt="${post.title}" class="recent-post-thumb">
                        <div class="recent-post-meta">
                            <h5>${post.title}</h5>
                            <span class="recent-post-date">${post.date}</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }

    // Render Bottom Section: 4 Related Articles Grid
    const relatedGridContainer = document.getElementById('relatedArticlesGrid');
    if (relatedGridContainer && typeof BLOG_DATABASE !== 'undefined') {
        const allBlogs = Object.values(BLOG_DATABASE);
        const otherBlogs = allBlogs.filter(b => b.id !== data.id);
        const displayBlogs = (otherBlogs.length >= 4) ? otherBlogs.slice(0, 4) : allBlogs.slice(0, 4);

        relatedGridContainer.innerHTML = displayBlogs.map(b => `
            <article class="related-article-card">
                <div class="related-card-img-wrap">
                    <a href="Blog-Detail-Pages.html?id=${b.id}">
                        <img src="${b.bannerImage || 'image/blog-listing/blog-1.png'}" alt="${b.title}" class="related-card-img">
                    </a>
                    <span class="related-category-tag">${b.category || 'Compliance'}</span>
                </div>
                <div class="related-card-body">
                    <span class="related-card-date">${b.date || 'May 2026'}</span>
                    <h4 class="related-card-title">
                        <a href="Blog-Detail-Pages.html?id=${b.id}">${b.title}</a>
                    </h4>
                    <div class="related-card-footer">
                        <a href="Blog-Detail-Pages.html?id=${b.id}" class="related-card-arrow-btn" aria-label="Read Article">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');
    }
});
