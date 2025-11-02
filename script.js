// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mainNav = document.getElementById('mainNav');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listeners for mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // Handle dropdown menus on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                dropdownToggles.forEach(toggle => {
                    toggle.parentElement.classList.remove('active');
                });
            }
        }
    });
    
    // Star Background Animation
    function initStarBackground() {
        const canvas = document.getElementById('star-canvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const stars = [];
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.5,
                opacity: Math.random()
            });
        }
        
        function animateStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0a0f1d';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });
            
            requestAnimationFrame(animateStars);
        }
        
        animateStars();
    }
    
    // Enhanced Star Background
    function initEnhancedStarBackground() {
        const canvas = document.getElementById('enhancedStarCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const stars = [];
        const starCount = 300;
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                speed: Math.random() * 0.8,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.05
            });
        }
        
        function animateEnhancedStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                
                // Twinkle effect
                star.opacity += star.twinkleSpeed;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.twinkleSpeed = -star.twinkleSpeed;
                }
                
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });
            
            requestAnimationFrame(animateEnhancedStars);
        }
        
        animateEnhancedStars();
    }
    
    // Section Star Backgrounds
    function initSectionStars() {
        const sections = document.querySelectorAll('.section-stars');
        
        sections.forEach((canvas, index) => {
            const ctx = canvas.getContext('2d');
            
            function resizeCanvas() {
                const section = canvas.closest('.section');
                if (section) {
                    canvas.width = section.offsetWidth;
                    canvas.height = section.offsetHeight;
                }
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            const stars = [];
            const starCount = 50;
            
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.2,
                    speed: Math.random() * 0.3,
                    opacity: Math.random() * 0.6 + 0.2
                });
            }
            
            function animateSectionStars() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                stars.forEach(star => {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                    ctx.fill();
                    
                    star.y += star.speed;
                    if (star.y > canvas.height) {
                        star.y = 0;
                        star.x = Math.random() * canvas.width;
                    }
                });
                
                requestAnimationFrame(animateSectionStars);
            }
            
            animateSectionStars();
        });
    }
    
    // Typing Animation
    function initTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;
        
        const text = "فاب لاب الأحساء هو مساحة إبداعية مجهزة بأحدث تقنيات التصنيع الرقمي، حيث نوفر للطلاب والمخترعين ورواد الأعمال الأدوات والموارد اللازمة لتحويل أفكارهم إلى واقع ملموس. نحن نؤمن بقوة الإبداع وقدرته على تغيير العالم، ونسعى لتمكين المجتمع من خلال التكنولوجيا والتعليم.";
        let index = 0;
        const speed = 50;
        
        function typeWriter() {
            if (index < text.length) {
                typingText.innerHTML = text.substring(0, index + 1) + '<span class="typing-cursor"></span>';
                index++;
                setTimeout(typeWriter, speed);
            } else {
                typingText.innerHTML = text + '<span class="typing-cursor"></span>';
            }
        }
        
        // Start typing animation when element is in viewport
        function checkScroll() {
            const elementTop = typingText.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                typeWriter();
                window.removeEventListener('scroll', checkScroll);
            }
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on page load
    }
    
    // Counter Animation
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        function animateCounter(counter) {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(counter), 1);
            } else {
                counter.innerText = target + '+';
            }
        }
        
        function checkScroll() {
            counters.forEach(counter => {
                const elementTop = counter.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on page load
    }
    
    // Workshops Carousel
    function initWorkshopsCarousel() {
        const carousel = document.querySelector('.workshops-carousel');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!carousel) return;
        
        let currentIndex = 0;
        const items = document.querySelectorAll('.workshop-item');
        const itemWidth = items[0].offsetWidth + 30; // width + gap
        
        function updateCarousel() {
            carousel.scrollTo({
                left: currentIndex * itemWidth,
                behavior: 'smooth'
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Button events
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = Math.max(currentIndex - 1, 0);
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                updateCarousel();
            });
        }
        
        // Indicator events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Touch events for mobile
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (startX - endX > swipeThreshold) {
                // Swipe left - next
                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                updateCarousel();
            } else if (endX - startX > swipeThreshold) {
                // Swipe right - previous
                currentIndex = Math.max(currentIndex - 1, 0);
                updateCarousel();
            }
        }
        
        // Auto-play for carousel (optional)
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }, 5000);
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Start auto-play on desktop only
        if (window.innerWidth > 768) {
            startAutoPlay();
            
            // Pause auto-play on hover
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }
    }
    
    // Chatbot Functionality
    function initChatbot() {
        const chatbotToggle = document.querySelector('.chatbot-toggle');
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotClose = document.querySelector('.chatbot-close');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotMessages = document.getElementById('chatbot-messages');
        
        if (!chatbotToggle) return;
        
        // Toggle chatbot
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });
        
        // Close chatbot
        if (chatbotClose) {
            chatbotClose.addEventListener('click', () => {
                chatbotContainer.classList.remove('active');
            });
        }
        
        // Send message
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message === '') return;
            
            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const responses = [
                    "شكرًا لسؤالك! كيف يمكنني مساعدتك بشكل أفضل؟",
                    "هذا سؤال رائع! هل يمكنك تقديم المزيد من التفاصيل؟",
                    "أنا هنا لمساعدتك في أي استفسار حول فاب لاب الأحساء.",
                    "هل تريد معرفة المزيد عن ورش العمل أو الخدمات المتاحة؟",
                    "يمكنني مساعدتك في التسجيل أو تقديم معلومات عن البرامج."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 1000);
        }
        
        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chatbot-message', sender);
            messageDiv.textContent = text;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        // Send message events
        if (chatbotSend) {
            chatbotSend.addEventListener('click', sendMessage);
        }
        
        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
    
    // Sticky Header
    function initStickyHeader() {
        const header = document.querySelector('.header');
        const headerHeight = header.offsetHeight;
        
        function updateStickyHeader() {
            if (window.scrollY > headerHeight) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
        
        window.addEventListener('scroll', updateStickyHeader);
        updateStickyHeader(); // Check on page load
    }
    
    // Smooth Scrolling
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Contact Form Handling
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple form validation
                const name = this.querySelector('#footer-name').value;
                const email = this.querySelector('#footer-email').value;
                const message = this.querySelector('#footer-message').value;
                
                if (name && email && message) {
                    // Simulate form submission
                    alert('شكرًا لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
                    this.reset();
                } else {
                    alert('يرجى ملء جميع الحقول المطلوبة.');
                }
            });
        }
    }
    
    // Language Switch
    function initLanguageSwitch() {
        const languageSwitch = document.getElementById('languageSwitch');
        
        if (languageSwitch) {
            languageSwitch.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle between Arabic and English
                const currentLang = this.textContent;
                this.textContent = currentLang === 'EN' ? 'AR' : 'EN';
                
                // Here you would typically reload the page with the new language
                // or update the content dynamically
                alert('سيتم تغيير اللغة قريبًا');
            });
        }
    }
    
    // Initialize all functions
    function init() {
        initStarBackground();
        initEnhancedStarBackground();
        initSectionStars();
        initTypingAnimation();
        initCounterAnimation();
        initWorkshopsCarousel();
        initChatbot();
        initStickyHeader();
        initSmoothScrolling();
        initContactForm();
        initLanguageSwitch();
        
        // Handle resize events
        window.addEventListener('resize', function() {
            // Reinitialize carousel on resize
            initWorkshopsCarousel();
        });
    }
    
    // Start initialization when DOM is loaded
    init();
});

// Handle page load and transition
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading animation if any
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
});
