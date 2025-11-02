document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (header && nav) {
        document.body.appendChild(mobileMenuOverlay);
        
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        function closeMobileMenu() {
            nav.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
        
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        
        // Mobile dropdown toggle
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                        
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });
        
        // Close dropdowns when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // Star Background Animation for Main Page
    const starCanvas = document.getElementById('star-canvas');
    if (starCanvas) {
        const starCtx = starCanvas.getContext('2d');
        
        let stars = [];
        let shootingStars = [];
        
        function resizeCanvas() {
            starCanvas.width = window.innerWidth;
            starCanvas.height = window.innerHeight;
            starCanvas.style.position = 'fixed';
            starCanvas.style.top = '100vh';
            starCanvas.style.left = '0';
            starCanvas.style.zIndex = '-1';
            starCanvas.style.pointerEvents = 'none';
            initStars();
        }
        
        function initStars() {
            stars = [];
            const starCount = Math.min(150, Math.floor((starCanvas.width * starCanvas.height) / 3000));
            
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * starCanvas.width,
                    y: Math.random() * starCanvas.height,
                    size: Math.random() * 1.5 + 0.5,
                    speed: Math.random() * 0.3 + 0.1,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 0.05 + 0.02,
                    twinkleOffset: Math.random() * Math.PI * 2
                });
            }
        }

        function createShootingStar() {
            if (Math.random() < 0.01 && shootingStars.length < 2) {
                shootingStars.push({
                    x: Math.random() * starCanvas.width,
                    y: 0,
                    speedX: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
                    speedY: Math.random() * 1.5 + 1,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: 1,
                    trail: []
                });
            }
        }
        
        function updateStars() {
            stars.forEach(star => {
                star.twinkleOffset += star.twinkleSpeed;
                star.opacity = 0.2 + Math.sin(star.twinkleOffset) * 0.3;
            });
        
            shootingStars.forEach((star, index) => {
                star.x += star.speedX;
                star.y += star.speedY;
                star.opacity -= 0.02;
                
                star.trail.push({ x: star.x, y: star.y });
                if (star.trail.length > 8) {
                    star.trail.shift();
                }
                
                if (star.opacity <= 0 || star.x < 0 || star.x > starCanvas.width || star.y > starCanvas.height) {
                    shootingStars.splice(index, 1);
                }
            });
        }
        
        function drawStars() {
            starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
            
            // Draw static stars
            stars.forEach(star => {
                starCtx.beginPath();
                starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                starCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                starCtx.fill();
            });
            
            // Draw shooting stars
            shootingStars.forEach(star => {
                starCtx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
                starCtx.lineWidth = star.size;
                starCtx.beginPath();
                starCtx.moveTo(star.trail[0].x, star.trail[0].y);
                for (let i = 1; i < star.trail.length; i++) {
                    starCtx.lineTo(star.trail[i].x, star.trail[i].y);
                }
                starCtx.stroke();
            });
        }
        
        function animateStars() {
            updateStars();
            drawStars();
            createShootingStar();
            requestAnimationFrame(animateStars);
        }
        
        // Initialize star background
        resizeCanvas();
        initStars();
        animateStars();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initStars();
        });
    }

    // Enhanced Star Background for Main Content
    const enhancedStarCanvas = document.getElementById('enhancedStarCanvas');
    if (enhancedStarCanvas) {
        const enhancedCtx = enhancedStarCanvas.getContext('2d');
        
        enhancedStarCanvas.width = window.innerWidth;
        enhancedStarCanvas.height = window.innerHeight;
        enhancedStarCanvas.style.position = 'fixed';
        enhancedStarCanvas.style.top = '100vh';
        enhancedStarCanvas.style.left = '0';
        enhancedStarCanvas.style.zIndex = '-1';
        enhancedStarCanvas.style.pointerEvents = 'none';

        const enhancedStars = [];
        const enhancedStarCount = 80;

        class EnhancedStar {
            constructor() {
                this.x = Math.random() * enhancedStarCanvas.width;
                this.y = Math.random() * enhancedStarCanvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random() * 0.7 + 0.3;
                this.parallax = Math.random() * 0.8 + 0.2;
            }

            update(scrollY) {
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = enhancedStarCanvas.height;
                    this.x = Math.random() * enhancedStarCanvas.width;
                }
                this.x += (scrollY * this.parallax) * 0.005;
                this.opacity = Math.sin(Date.now() * 0.001 + this.x) * 0.4 + 0.6;
            }

            draw() {
                enhancedCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                enhancedCtx.beginPath();
                enhancedCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                enhancedCtx.fill();
                
                // Add glow effect for larger stars
                if (this.size > 1.5) {
                    enhancedCtx.shadowBlur = 8;
                    enhancedCtx.shadowColor = 'white';
                }
            }
        }

        function initEnhancedStars() {
            enhancedStars.length = 0;
            for (let i = 0; i < enhancedStarCount; i++) {
                enhancedStars.push(new EnhancedStar());
            }
        }

        function animateEnhancedStars() {
            enhancedCtx.clearRect(0, 0, enhancedStarCanvas.width, enhancedStarCanvas.height);
            const scrollY = window.scrollY || window.pageYOffset;
            enhancedStars.forEach(star => {
                star.update(scrollY);
                star.draw();
            });
            enhancedCtx.shadowBlur = 0;
            requestAnimationFrame(animateEnhancedStars);
        }

        initEnhancedStars();
        animateEnhancedStars();

        window.addEventListener('resize', () => {
            enhancedStarCanvas.width = window.innerWidth;
            enhancedStarCanvas.height = window.innerHeight;
            initEnhancedStars();
        });
    }

    // Star Background Animation for Specific Sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const canvas = section.querySelector('.section-stars');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');

        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;

        const stars = [];
        const starCount = 15;

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speed = Math.random() * 0.3 + 0.1;
                this.opacity = Math.random() * 0.5 + 0.5;
                this.parallax = Math.random() * 0.5 + 0.1;
            }

            update(scrollY) {
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
                this.x += (scrollY * this.parallax) * 0.01;
                this.opacity = Math.sin(Date.now() * 0.001 + this.x) * 0.3 + 0.7;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initStars() {
            stars.length = 0;
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }
        }

        function animateStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scrollY = window.scrollY || window.pageYOffset;
            stars.forEach(star => {
                star.update(scrollY);
                star.draw();
            });
            requestAnimationFrame(animateStars);
        }

        initStars();
        animateStars();

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                canvas.width = entry.contentRect.width;
                canvas.height = entry.contentRect.height;
                initStars();
            }
        });
        resizeObserver.observe(section);
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });

    // Scroll-Triggered Typing Effect for About FabLab
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const textToType = "أول معمل تصنيع رقمي متكامل في محافظة الأحساء يتيح لجميع أفراد المجتمع الفرصة لتنمية أفكارهم وتحويلها إلى واقع عن طريق أحدث آلات التصنيع الرقمي. يوفر فاب لاب الأحساء المساحة الإبداعية والبيئة المناسبة لتبادل الأفكار والحديث مع الخبراء في هذا المجال. وكذلك منصة للمساعدة في تسجيل براءات اختراع التي تنتج من عمل أفراد المجتمع على تقنيات التصنيع الرقمي الحديثة. وهو إحدى مبادرات مؤسسة عبد المنعم الراشد الإنسانية.";
        let charIndex = 0;
        let isTyping = false;

        function typeWriter() {
            if (charIndex < textToType.length && isTyping) {
                typingText.textContent += textToType.charAt(charIndex);
                charIndex++;
                const randomDelay = 40 + Math.random() * 20;
                setTimeout(typeWriter, randomDelay);
            } else if (isTyping) {
                typingText.style.opacity = 1;
                typingText.innerHTML += '<span class="typing-cursor"></span>';
            }
        }

        function checkScroll() {
            const section = document.getElementById('about-fablab');
            if (!section) return;
            
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75 && !isTyping) {
                isTyping = true;
                typeWriter();
            }
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
    }

    // Language Switch
    const languageSwitch = document.getElementById('languageSwitch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
            animateButton(languageSwitch);
        });
    }

    function toggleLanguage() {
        const html = document.documentElement;
        const currentLang = html.lang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
        
        html.lang = newLang;
        html.dir = newDir;
        if (languageSwitch) {
            languageSwitch.textContent = newLang === 'ar' ? 'EN' : 'AR';
        }
        
        const videoText = document.querySelector('.video-text h1');
        if (videoText) {
            videoText.textContent = newLang === 'ar' ? 'The Future of Creativity Begins Here' : 'مستقبل الإبداع يبدأ هنا';
        }
        
        const videoSubText = document.querySelector('.video-text p');
        if (videoSubText) {
            videoSubText.textContent = newLang === 'ar' ? 'Discover the Digital Manufacturing World with FabLab Al-Ahsa' : 'اكتشف عالم التصنيع الرقمي مع فاب لاب الأحساء';
        }
        
        localStorage.setItem('language', newLang);
    }

    function animateButton(element) {
        element.style.transform = 'scale(1.2) rotate(90deg)';
        setTimeout(() => {
            element.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }

    // Workshop Carousel Navigation
    const carousel = document.querySelector('.workshops-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carousel && prevBtn && nextBtn) {
        let itemWidth;
        
        function updateItemWidth() {
            if (window.innerWidth <= 480) {
                itemWidth = carousel.offsetWidth;
            } else if (window.innerWidth <= 768) {
                itemWidth = carousel.offsetWidth / 2;
            } else {
                itemWidth = carousel.offsetWidth / 3;
            }
        }
        
        updateItemWidth();
        
        prevBtn.addEventListener('click', () => {
            updateItemWidth();
            carousel.scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });
            updateIndicators();
        });
        
        nextBtn.addEventListener('click', () => {
            updateItemWidth();
            carousel.scrollBy({
                left: -itemWidth,
                behavior: 'smooth'
            });
            updateIndicators();
        });
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.getAttribute('data-index'));
                updateItemWidth();
                carousel.scrollTo({
                    left: index * itemWidth,
                    behavior: 'smooth'
                });
                updateIndicators();
            });
        });
        
        carousel.addEventListener('scroll', updateIndicators);
        
        function updateIndicators() {
            const scrollPosition = carousel.scrollLeft;
            updateItemWidth();
            const currentIndex = Math.round(scrollPosition / itemWidth);
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Touch drag support for mobile
        let isDragging = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDragging = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        window.addEventListener('resize', updateItemWidth);
    }

    // Workshop Card Interactions
    const workshopCards = document.querySelectorAll('.workshop-card');
    workshopCards.forEach(card => {
        card.addEventListener('click', function(e) {
            console.log('Workshop card clicked:', this.querySelector('h3').textContent);
        });
        
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Video Performance Optimization
    const video = document.getElementById('video-bg');
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(error => {
                console.log('Autoplay failed:', error);
            });
        });
        video.addEventListener('error', () => {
            console.log('Video loading error, falling back to static image');
            video.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.backgroundImage = 'url(https://placehold.co/1920x1080/1d1c0a/9C27B0?text=FabLab)';
            fallback.style.position = 'absolute';
            fallback.style.top = '0';
            fallback.style.left = '0';
            fallback.style.width = '100%';
            fallback.style.height = '100%';
            fallback.style.zIndex = '-1';
            document.querySelector('.video-container').appendChild(fallback);
        });
    }

    // Counter Animation for Achievements
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 500;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '');
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment) + '+';
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + '+';
                }
            };

            const section = document.getElementById('achievements');
            if (!section) return;
            
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75 && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                updateCount();
            }
        });
    }

    window.addEventListener('load', startCounters);
    window.addEventListener('scroll', startCounters);

    // Chatbot Functionality
    let conversationHistory = [];

    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle Chatbot Window
    if (chatbotToggle && chatbotContainer && chatbotClose) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });

        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    // دالة لإضافة رسالة إلى واجهة الدردشة
    function addMessage(text, isUser = false) {
        const message = document.createElement('div');
        message.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function sendMessageToHuggingFace(message) {
        try {
            const context = `أنت مساعد ذكي لفاب لاب الأحساء، أول معمل تصنيع رقمي في الأحساء. نساعد المجتمع في نمذجة المشاريع باستخدام أحدث آلات التصنيع الرقمي، بإشراف خبراء ومهندسين، ونقدم برامج تدريبية تقنية. الرسالة: نشر ثقافة الإبداع والاختراع. الرؤية: أن نكون الوجهة الأولى للمبدعين. رد بالعربية بأسلوب ودود ومختصر. السؤال: ${message}`;
            
            conversationHistory.push({ role: 'user', content: message });
            if (conversationHistory.length > 4) conversationHistory.shift();

            console.log('Sending request to OpenRouter with message:', message);

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'FabLab Chatbot'
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-3.2-3b-instruct',
                    messages: [{ role: 'user', content: context }],
                    max_tokens: 100,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                console.error('Response Status:', response.status, response.statusText);
                if (response.status === 401) {
                    throw new Error('401: مفتاح API غير صالح. تحقق من المفتاح في openrouter.ai.');
                } else if (response.status === 429) {
                    throw new Error('429: تم تجاوز الحد اليومي للطلبات. حاول غدًا أو تحقق من الرصيد في openrouter.ai.');
                } else if (response.status === 404) {
                    throw new Error('404: النموذج أو الـ endpoint غير متاح. تأكد من اسم النموذج meta-llama/llama-3.2-3b-instruct.');
                }
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            let botResponse = data.choices[0].message.content || 'عذرًا، لم أفهم السؤال. حاول صياغته بطريقة أخرى.';
            botResponse = botResponse.replace(/<[^>]+>/g, '').trim();
            if (botResponse.length > 200) {
                botResponse = botResponse.substring(0, 200) + '...';
            }

            conversationHistory.push({ role: 'assistant', content: botResponse });
            return botResponse;
        } catch (error) {
            console.error('خطأ في التواصل مع OpenRouter:', error.message);
            if (error.message.includes('401')) {
                return 'خطأ 401: مفتاح API غير صالح. أنشئ مفتاحًا جديدًا من openrouter.ai.';
            } else if (error.message.includes('429')) {
                return 'تم تجاوز الحد اليومي للطلبات. حاول غدًا أو تحقق من الرصيد في openrouter.ai.';
            } else if (error.message.includes('404')) {
                return 'خطأ 404: النموذج غير متاح. جرب نموذجًا آخر مثل xai/grok-3-mini أو تحقق من openrouter.ai.';
            } else if (error.message.includes('Failed to fetch')) {
                return 'خطأ في الاتصال (ربما CORS أو الشبكة). جرب خادم وسيط أو تحقق من الإنترنت.';
            }
            return `عذرًا، حدث خطأ: ${error.message}.`;
        }
    }

    if (chatbotSend && chatbotInput && chatbotMessages) {
        chatbotSend.addEventListener('click', async () => {
            const message = chatbotInput.value.trim();
            if (!message) return;

            addMessage(message, true);
            chatbotInput.value = '';

            const loadingMessage = document.createElement('div');
            loadingMessage.className = 'chatbot-message bot';
            loadingMessage.textContent = 'جارٍ المعالجة...';
            chatbotMessages.appendChild(loadingMessage);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            const botResponse = await sendMessageToHuggingFace(message);
            
            loadingMessage.remove();
            
            addMessage(botResponse);
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                chatbotSend.click();
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to larger screens
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    console.log('Fab Lab website initialized successfully');
});
