document.addEventListener('DOMContentLoaded', () => {
    // Store original Arabic text for language toggle
    try {
        document.querySelectorAll('[data-en]').forEach(element => {
            if (!element.getAttribute('data-ar')) {
                element.setAttribute('data-ar', element.textContent.trim());
            }
        });
        const importantLinksTitle = document.querySelector('.links-section h2');
        if (importantLinksTitle && !importantLinksTitle.getAttribute('data-ar')) {
            importantLinksTitle.setAttribute('data-ar', 'روابط مهمة');
            importantLinksTitle.setAttribute('data-en', 'Important Links');
        }
        const statisticsTitle = document.querySelector('.statistics-section h2');
        if (statisticsTitle && !statisticsTitle.getAttribute('data-ar')) {
            statisticsTitle.setAttribute('data-ar', 'إحصائياتنا');
            statisticsTitle.setAttribute('data-en', 'Our Statistics');
        }
        const videosTitle = document.querySelector('.videos-section h2');
        if (videosTitle && !videosTitle.getAttribute('data-ar')) {
            videosTitle.setAttribute('data-ar', 'فيديوهاتنا');
            videosTitle.setAttribute('data-en', 'Our Videos');
        } else if (!videosTitle) {
            const videosSection = document.querySelector('.videos-section');
            if (videosSection) {
                const title = document.createElement('h2');
                title.textContent = 'فيديوهاتنا';
                title.setAttribute('data-ar', 'فيديوهاتنا');
                title.setAttribute('data-en', 'Our Videos');
                videosSection.prepend(title);
            }
        }
        document.querySelectorAll('.videos-carousel .carousel-item .video-title').forEach(title => {
            if (!title.getAttribute('data-ar')) {
                title.setAttribute('data-ar', title.textContent.trim());
                title.setAttribute('data-en', title.textContent.trim().replace('فيديو', 'Video'));
            }
        });
    } catch (error) {
        console.error('Error storing Arabic text:', error);
    }

    // Update Counters for visitors and programs
    async function updateCounters() {
        try {
            let visitors = parseInt(localStorage.getItem('visitors')) || 0;
            visitors++;
            localStorage.setItem('visitors', visitors);
            const visitorCountElement = document.getElementById('visitor-count');
            if (visitorCountElement) {
                visitorCountElement.textContent = visitors;
                visitorCountElement.setAttribute('data-ar', visitors);
                visitorCountElement.setAttribute('data-en', visitors);
            }

            let programs = 0;
            try {
                const response = await fetch('programs.json');
                if (!response.ok) throw new Error('Failed to fetch programs.json');
                const programsData = await response.json();
                programs = programsData.length;
            } catch (fetchError) {
                programs = document.querySelectorAll('.program-item').length;
            }

            const programCountElement = document.getElementById('program-count');
            if (programCountElement) {
                programCountElement.textContent = programs;
                programCountElement.setAttribute('data-ar', programs);
                programCountElement.setAttribute('data-en', programs);
            }
        } catch (error) {
            console.error('Error updating counters:', error);
        }
    }

    // Hamburger Menu Toggle
    const hamburgers = document.querySelectorAll('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburgers.forEach(hamburger => {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
        });
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburgers.forEach(hamburger => hamburger.classList.remove('active'));
            mobileMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
        });
    });

    // Initialize Carousels
    function initializeCarousels() {
        const carousels = document.querySelectorAll('.image-carousel');
        carousels.forEach(carousel => {
            const items = carousel.querySelectorAll('.carousel-item');
            const indicatorsContainer = carousel.querySelector('.carousel-indicators');
            const prevBtn = carousel.querySelector('.prev-btn');
            const nextBtn = carousel.querySelector('.next-btn');
            const carouselPrev = carousel.querySelector('.carousel-prev');
            const carouselNext = carousel.querySelector('.carousel-next');
            let currentIndex = 0;

            // Create indicators
            items.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                if (index === 0) indicator.classList.add('active');
                indicatorsContainer.appendChild(indicator);
            });

            const indicators = carousel.querySelectorAll('.carousel-indicator');

            function updateCarousel() {
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                    indicators[index].classList.toggle('active', index === currentIndex);
                });
            }

            function showNext() {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }

            function showPrev() {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            }

            if (prevBtn) prevBtn.addEventListener('click', showPrev);
            if (nextBtn) nextBtn.addEventListener('click', showNext);
            if (carouselPrev) carouselPrev.addEventListener('click', showPrev);
            if (carouselNext) carouselNext.addEventListener('click', showNext);

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                });
            });

            setInterval(showNext, 5000);
        });
    }

    // Fixed Navigation
    const fixedNav = document.querySelector('.fixed-nav');
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 200) {
            fixedNav.classList.add('scrolled');
        } else {
            fixedNav.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll);

    // Navigation Active Link
    function setActiveNavLink() {
        const sections = document.querySelectorAll('main > section');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    let isArabic = true;

    function toggleLanguage() {
        isArabic = !isArabic;
        document.documentElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', isArabic ? 'ar' : 'en');
        langToggle.innerHTML = isArabic ? '<i class="fas fa-globe"></i> English' : '<i class="fas fa-globe"></i> العربية';

        document.querySelectorAll('[data-en]').forEach(element => {
            const text = isArabic ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });

        document.querySelectorAll('.videos-carousel .carousel-item .video-title').forEach(title => {
            title.textContent = isArabic ? title.getAttribute('data-ar') : title.getAttribute('data-en');
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode')
            ? '<i class="fas fa-sun"></i> Light Mode'
            : '<i class="fas fa-moon"></i> Dark Mode';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    // Intersection Observer for Animations
    const isMobile = window.innerWidth <= 640;
    if (!isMobile) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.program-item, .link-card, .stat-card').forEach(item => {
            observer.observe(item);
        });
    } else {
        document.querySelectorAll('.program-item, .link-card, .stat-card').forEach(item => {
            item.classList.add('visible');
        });
    }

    // Optimize Video Background
    const video = document.querySelector('.video-iframe');
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(error => {
                console.error('Error playing video:', error);
                // Retry playing after a short delay
                setTimeout(() => {
                    video.play().catch(retryError => {
                        console.error('Retry failed:', retryError);
                    });
                }, 1000);
            });
        });
    }

    // Initialize Functions
    updateCounters();
    initializeCarousels();
    setActiveNavLink();
});