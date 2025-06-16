 document.addEventListener('DOMContentLoaded', () => {
            // Store original Arabic text in data-ar
            document.querySelectorAll('[data-en]').forEach(element => {
                if (!element.getAttribute('data-ar')) {
                    element.setAttribute('data-ar', element.textContent.trim());
                }
            });

            // Language Toggle
            const langToggle = document.getElementById('langToggle');
            let isEnglish = false;

            if (langToggle) {
                langToggle.addEventListener('click', () => {
                    isEnglish = !isEnglish;
                    document.documentElement.lang = isEnglish ? 'en' : 'ar';
                    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';
                    langToggle.innerHTML = isEnglish ? '<i class="fas fa-globe"></i> العربية' : '<i class="fas fa-globe"></i> English';

                    document.querySelectorAll('[data-en]').forEach(element => {
                        const enText = element.getAttribute('data-en');
                        const arText = element.getAttribute('data-ar');
                        if (enText && arText) {
                            element.textContent = isEnglish ? enText : arText;
                        }
                    });
                });
            }

            // Dark Mode Toggle
            const darkModeToggle = document.getElementById('darkModeToggle');
            let isDarkMode = localStorage.getItem('darkMode') === 'true';
            if (darkModeToggle) {
                if (isDarkMode) {
                    document.body.classList.add('dark-mode');
                    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
                }

                darkModeToggle.addEventListener('click', () => {
                    isDarkMode = !isDarkMode;
                    document.body.classList.toggle('dark-mode', isDarkMode);
                    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
                    localStorage.setItem('darkMode', isDarkMode);
                });
            }

            // Hamburger Menu Toggle - الإصلاح هنا
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile-menu');
            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                    // Toggle body scroll lock
                    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
                });
                
                // إغلاق القائمة عند النقر على رابط
                const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
            }

            // Sticky Nav
            const stickyNav = document.querySelector('.sticky-nav');
            if (stickyNav) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 100) {
                        stickyNav.classList.add('scrolled');
                        stickyNav.classList.add('visible');
                    } else {
                        stickyNav.classList.remove('scrolled');
                        stickyNav.classList.remove('visible');
                    }
                });
            }

            // Sequential appearance for panels
            const panels = document.querySelectorAll('.ad-panel');
            panels.forEach((panel, index) => {
                setTimeout(() => {
                    panel.classList.add('visible');
                }, index * 300);
            });
        });