 // تبديل الوضع الداكن
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const btn = document.getElementById('darkModeToggle');
            btn.innerHTML = document.body.classList.contains('dark-mode')
                ? '<i class="fas fa-sun"></i> Light Mode'
                : '<i class="fas fa-moon"></i> Dark Mode';
        });

        // التحكم في شريط التنقل اللاصق
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

        // تبديل اللغة
        document.getElementById('langToggle').addEventListener('click', () => {
            const elements = document.querySelectorAll('[data-en]');
            elements.forEach(el => {
                const enText = el.getAttribute('data-en');
                const arText = el.textContent;
                el.textContent = el.textContent === enText ? arText : enText;
            });
            const btn = document.getElementById('langToggle');
            btn.innerHTML = btn.textContent.includes('English')
                ? '<i class="fas fa-globe"></i> العربية'
                : '<i class="fas fa-globe"></i> English';
        });

        // تأثير الظهور التسلسلي للبطاقات
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.training-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            });
        });

        // التحكم في قائمة الهامبرغر
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
    