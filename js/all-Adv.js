 document.addEventListener('DOMContentLoaded', () => {
            // Initialize news cards with fade-in effect
            const cards = document.querySelectorAll('.news-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            });

            // Handle expand/collapse for news cards
            document.querySelectorAll('.news-read-more-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const card = button.closest('.news-card');
                    const expandedContent = card.querySelector('.news-expanded-content');
                    card.classList.toggle('expanded');
                    expandedContent.style.display = card.classList.contains('expanded') ? 'block' : 'none';
                    if (card.classList.contains('expanded')) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });

            document.querySelectorAll('.news-collapse-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const card = button.closest('.news-card');
                    const expandedContent = card.querySelector('.news-expanded-content');
                    card.classList.remove('expanded');
                    expandedContent.style.display = 'none';
                });
            });

            // Sticky nav scroll behavior
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('.sticky-nav');
                if (window.scrollY > 300) {
                    nav.classList.add('scrolled');
                    nav.classList.add('visible');
                } else {
                    nav.classList.remove('scrolled');
                    nav.classList.remove('visible');
                }
            });

            // Dark mode toggle
            const darkModeToggle = document.getElementById('darkModeToggle');
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                darkModeToggle.innerHTML = document.body.classList.contains('dark-mode')
                    ? '<i class="fas fa-sun"></i> Light Mode'
                    : '<i class="fas fa-moon"></i> Dark Mode';
            });

            // Language toggle
            const langToggle = document.getElementById('langToggle');
            let isEnglish = false;
            langToggle.addEventListener('click', () => {
                isEnglish = !isEnglish;
                document.querySelectorAll('[data-en]').forEach(element => {
                    element.textContent = isEnglish ? element.getAttribute('data-en') : element.getAttribute('data-ar') || element.textContent;
                });
                document.documentElement.setAttribute('lang', isEnglish ? 'en' : 'ar');
                document.documentElement.setAttribute('dir', isEnglish ? 'ltr' : 'rtl');
                langToggle.innerHTML = isEnglish
                    ? '<i class="fas fa-globe"></i> العربية'
                    : '<i class="fas fa-globe"></i> English';
            });

            // Store original Arabic text
            document.querySelectorAll('[data-en]').forEach(element => {
                element.setAttribute('data-ar', element.textContent);
            });

            // Hamburger menu toggle
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinks = document.querySelectorAll('.mobile-menu .nav-link');

            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', () => {
                    const isActive = hamburger.classList.toggle('active');
                    mobileMenu.classList.toggle('active', isActive);
                    hamburger.setAttribute('aria-expanded', isActive);
                    document.body.style.overflow = isActive ? 'hidden' : 'auto';
                });

                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = 'auto';
                    });
                });

                document.addEventListener('click', (e) => {
                    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });