// Star Background Animation
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let shootingStars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 2000));
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.05 + 0.02,
            twinkleOffset: Math.random() * Math.PI * 2
        });
    }
}

function createShootingStar() {
    if (Math.random() < 0.02 && shootingStars.length < 2) {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: 0,
            speedX: (Math.random() * 3 + 2) * (Math.random() > 0.5 ? 1 : -1),
            speedY: Math.random() * 2 + 2,
            size: Math.random() * 2 + 1,
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
        if (star.trail.length > 10) {
            star.trail.shift();
        }
        
        if (star.opacity <= 0 || star.x < 0 || star.x > canvas.width || star.y > canvas.height) {
            shootingStars.splice(index, 1);
        }
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw static stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
    
    // Draw shooting stars
    shootingStars.forEach(star => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = star.size;
        ctx.beginPath();
        ctx.moveTo(star.trail[0].x, star.trail[0].y);
        for (let i = 1; i < star.trail.length; i++) {
            ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }
        ctx.stroke();
    });
}

function animateStars() {
    updateStars();
    drawStars();
    createShootingStar();
    requestAnimationFrame(animateStars);
}

// Initialize star background
if (canvas) {
    resizeCanvas();
    initStars();
    animateStars();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
    });
}

// Chatbot Functionality - Fixed Version
let conversationHistory = [];

// دالة للتأكد من وجود العناصر
function initializeChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    console.log('تهيئة الشات بوت:', {
        chatbotToggle: !!chatbotToggle,
        chatbotContainer: !!chatbotContainer,
        chatbotClose: !!chatbotClose,
        chatbotInput: !!chatbotInput,
        chatbotSend: !!chatbotSend,
        chatbotMessages: !!chatbotMessages
    });

    // Toggle Chatbot Window
    if (chatbotToggle && chatbotContainer && chatbotClose) {
        chatbotToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('نقر على زر الشات بوت');
            chatbotContainer.classList.toggle('active');
            // Focus on input when opening
            if (chatbotContainer.classList.contains('active')) {
                setTimeout(() => {
                    if (chatbotInput) chatbotInput.focus();
                }, 300);
            }
        });

        chatbotClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            chatbotContainer.classList.remove('active');
        });
    }

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotToggle = document.querySelector('.chatbot-toggle');
        
        if (chatbotContainer && chatbotContainer.classList.contains('active') &&
            !chatbotContainer.contains(e.target) && 
            e.target !== chatbotToggle) {
            chatbotContainer.classList.remove('active');
        }
    });

    // دالة محسنة لإضافة رسالة إلى واجهة الدردشة
    function addMessage(text, isUser = false) {
        if (!chatbotMessages) return;
        
        const message = document.createElement('div');
        message.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        message.textContent = text;
        
        // Add smooth appearance
        message.style.opacity = '0';
        message.style.transform = 'translateY(10px)';
        
        chatbotMessages.appendChild(message);
        
        // Animate message appearance
        setTimeout(() => {
            message.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 10);
        
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Enhanced chatbot function
    async function sendMessageToAI(message) {
        try {
            const context = `أنت مساعد ذكي لفاب لاب الأحساء. 
            أجب عن أسئلة الزوار حول مرافق فاب لاب الأحساء بما في ذلك:
            - معمل الأطفال (للأعمار 6-12 سنة)
            - نادي الروبوتات
            - قاعات التدريب
            - قاعة الترفيه
            - قاعة الرقمنة
            
            أجب بالعربية بأسلوب ودود ومختصر. السؤال: ${message}`;
            
            console.log('إرسال طلب إلى AI:', message);

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'FabLab Al-Ahsa Facilities Chatbot'
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-3.2-3b-instruct',
                    messages: [{ role: 'user', content: context }],
                    max_tokens: 150,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`خطأ في الخادم: ${response.status}`);
            }

            const data = await response.json();
            let botResponse = data.choices[0].message.content || 'عذرًا، لم أتمكن من معالجة سؤالك. يرجى المحاولة مرة أخرى.';
            
            botResponse = botResponse.replace(/<[^>]+>/g, '').trim();
            
            if (botResponse.length > 250) {
                botResponse = botResponse.substring(0, 250) + '...';
            }

            return botResponse;
            
        } catch (error) {
            console.error('خطأ في التواصل مع خدمة الذكاء الاصطناعي:', error);
            return 'عذرًا، حدث خطأ تقني. يرجى المحاولة مرة أخرى لاحقًا.';
        }
    }

    // Enhanced message handling
    if (chatbotSend && chatbotInput && chatbotMessages) {
        chatbotSend.addEventListener('click', handleChatbotSend);
        
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleChatbotSend();
            }
        });
    }

    async function handleChatbotSend() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // إضافة رسالة المستخدم
        addMessage(message, true);
        chatbotInput.value = '';
        
        // إظهار رسالة التحميل
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'chatbot-message bot';
        loadingMessage.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> جارٍ المعالجة...';
        chatbotMessages.appendChild(loadingMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        try {
            const botResponse = await sendMessageToAI(message);
            loadingMessage.remove();
            addMessage(botResponse);
        } catch (error) {
            loadingMessage.remove();
            addMessage('عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
        }
    }

    
}

// Language Switching
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
    
    // Update all page content based on language
    updateLanguageContent(newLang);
    
    localStorage.setItem('language', newLang);
}

function updateLanguageContent(lang) {
    updateNavigationContent(lang);
    updateFacilitiesContent(lang);
    updateSectionHeader(lang);
    updateInfoCards(lang);
    updateFooterContent(lang);
    updateButtonsContent(lang);
}

function updateNavigationContent(lang) {
    const navigationData = {
        'ar': {
            'home': 'الرئيسية',
            'about': 'من نحن',
            'about-fablab': 'عن فاب لاب',
            'paths': 'مساراتنا',
            'sections': 'أقسامنا',
            'facilities': 'مرافقنا',
            'services': 'الخدمات',
            'courses': 'الدورات',
            'our-services': 'خدماتنا',
            'media': 'المركز الإعلامي',
            'success': 'قصص النجاح',
            'join': 'انضم إلينا',
            'volunteer': 'التطوع',
            'membership': 'العضوية',
            'contact': 'تواصل معنا'
        },
        'en': {
            'home': 'Home',
            'about': 'About Us',
            'about-fablab': 'About Fab Lab',
            'paths': 'Our Paths',
            'sections': 'Our Sections',
            'facilities': 'Our Facilities',
            'services': 'Services',
            'courses': 'Courses',
            'our-services': 'Our Services',
            'media': 'Media Center',
            'success': 'Success Stories',
            'join': 'Join Us',
            'volunteer': 'Volunteering',
            'membership': 'Membership',
            'contact': 'Contact Us'
        }
    };

    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        const data = navigationData[lang];
        
        if (text === 'الرئيسية' || text === 'Home') link.textContent = data.home;
        else if (text === 'من نحن' || text === 'About Us') link.textContent = data.about;
        else if (text === 'الخدمات' || text === 'Services') link.textContent = data.services;
        else if (text === 'المركز الإعلامي' || text === 'Media Center') link.textContent = data.media;
        else if (text === 'قصص النجاح' || text === 'Success Stories') link.textContent = data.success;
        else if (text === 'انضم إلينا' || text === 'Join Us') link.textContent = data.join;
    });

    const dropdownItems = document.querySelectorAll('.dropdown-menu a');
    dropdownItems.forEach(item => {
        const text = item.textContent.trim();
        const data = navigationData[lang];
        
        if (text === 'عن فاب لاب' || text === 'About Fab Lab') item.textContent = data['about-fablab'];
        else if (text === 'مساراتنا' || text === 'Our Paths') item.textContent = data.paths;
        else if (text === 'أقسامنا' || text === 'Our Sections') item.textContent = data.sections;
        else if (text === 'مرافقنا' || text === 'Our Facilities') item.textContent = data.facilities;
        else if (text === 'الدورات' || text === 'Courses') item.textContent = data.courses;
        else if (text === 'خدماتنا' || text === 'Our Services') item.textContent = data['our-services'];
        else if (text === 'التطوع' || text === 'Volunteering') item.textContent = data.volunteer;
        else if (text === 'العضوية' || text === 'Membership') item.textContent = data.membership;
        else if (text === 'تواصل معنا' || text === 'Contact Us') item.textContent = data.contact;
    });
}

function updateFacilitiesContent(lang) {
    const facilitiesData = {
        'kids-lab': {
            ar: {
                title: 'معمل الأطفال',
                description: 'مساحة تعليمية تفاعلية مصممة خصيصًا للأطفال من عمر 6 إلى 12 سنة. بيئة آمنة ومحفزة لاكتشاف عالم التكنولوجيا والابتكار من خلال أنشطة تعليمية ممتعة ومناسبة لأعمارهم.',
                features: ['أنشطة تعليمية تفاعلية', 'ورش عمل إبداعية', 'برمجة مبسطة للأطفال', 'بيئة آمنة ومشرفة']
            },
            en: {
                title: 'Kids Lab',
                description: 'An interactive educational space specially designed for children aged 6 to 12. A safe and stimulating environment to discover the world of technology and innovation through fun and age-appropriate educational activities.',
                features: ['Interactive Educational Activities', 'Creative Workshops', 'Simplified Programming for Kids', 'Safe and Supervised Environment']
            }
        },
        'robotics-club': {
            ar: {
                title: 'نادي الروبوتات',
                description: 'مركز متخصص في تعلم وتطوير مهارات البرمجة والروبوتات. نقدم أحدث التقنيات في مجال الذكاء الاصطناعي والروبوتات للمبتدئين والمتقدمين على حد سواء.',
                features: ['روبوتات متطورة', 'برمجة متقدمة', 'مسابقات محلية ودولية', 'فرق عمل متخصصة']
            },
            en: {
                title: 'Robotics Club',
                description: 'A specialized center for learning and developing programming and robotics skills. We offer the latest technologies in artificial intelligence and robotics for both beginners and advanced learners.',
                features: ['Advanced Robots', 'Advanced Programming', 'Local and International Competitions', 'Specialized Teams']
            }
        },
        'training-halls': {
            ar: {
                title: 'قاعات التدريب',
                description: 'مساحات تدريبية مجهزة بأحدث التقنيات لتقديم دورات وورش عمل متخصصة في مختلف مجالات التصنيع الرقمي والتكنولوجيا. بيئة محفزة للتعلم وتبادل المعرفة.',
                features: ['أجهزة متطورة', 'أنظمة عرض متكاملة', 'اتصال إنترنت فائق السرعة', 'سعة استيعابية كبيرة']
            },
            en: {
                title: 'Training Halls',
                description: 'Training spaces equipped with the latest technologies to provide specialized courses and workshops in various fields of digital manufacturing and technology. A stimulating environment for learning and knowledge exchange.',
                features: ['Advanced Equipment', 'Integrated Display Systems', 'High-Speed Internet', 'Large Capacity']
            }
        },
        'entertainment-hall': {
            ar: {
                title: 'قاعة الترفيه',
                description: 'مساحة ترفيهية متكاملة مجهزة بأحدث أجهزة الألعاب وتقنيات الواقع الافتراضي. بيئة مثالية للاسترخاء والترفيه مع مجموعة متنوعة من الأنشطة الترفيهية المناسبة لجميع الأعمار.',
                features: ['أجهزة الواقع الافتراضي', 'ألعاب إلكترونية متطورة', 'ألعاب ذهنية وتفاعلية', 'مساحات استرخاء مريحة']
            },
            en: {
                title: 'Entertainment Hall',
                description: 'A comprehensive entertainment space equipped with the latest gaming devices and virtual reality technologies. An ideal environment for relaxation and entertainment with a variety of recreational activities suitable for all ages.',
                features: ['Virtual Reality Devices', 'Advanced Electronic Games', 'Mental and Interactive Games', 'Comfortable Relaxation Spaces']
            }
        },
        'digitalization-hall': {
            ar: {
                title: 'قاعة الرقمنة',
                description: 'مركز متخصص في التحول الرقمي وتقنيات المستقبل. تجهيزات متكاملة لدعم المشاريع الرقمية والذكاء الاصطناعي، مع بيئة محفزة للإبداع التقني والابتكار في عالم الرقمنة.',
                features: ['أنظمة الذكاء الاصطناعي', 'حلول الحوسبة السحابية', 'مراكز بيانات متطورة', 'أنظمة أمن سيبراني']
            },
            en: {
                title: 'Digitalization Hall',
                description: 'A specialized center for digital transformation and future technologies. Comprehensive equipment to support digital projects and artificial intelligence, with an environment that stimulates technical creativity and innovation in the world of digitalization.',
                features: ['AI Systems', 'Cloud Computing Solutions', 'Advanced Data Centers', 'Cybersecurity Systems']
            }
        }
    };

    Object.keys(facilitiesData).forEach(facility => {
        const data = facilitiesData[facility][lang];
        const card = document.querySelector(`[data-facility="${facility}"]`);
        if (card) {
            card.querySelector('.facility-title').textContent = data.title;
            card.querySelector('.facility-description').textContent = data.description;
            
            const features = card.querySelectorAll('.feature span');
            data.features.forEach((feature, index) => {
                if (features[index]) {
                    features[index].textContent = feature;
                }
            });
        }
    });
}

function updateSectionHeader(lang) {
    const header = document.querySelector('.section-header h1');
    const intro = document.querySelector('.intro-text');
    if (header && intro) {
        if (lang === 'ar') {
            header.textContent = 'مرافق فاب لاب الأحساء';
            intro.textContent = 'اكتشف مرافقنا المتطورة المصممة لدعم الابتكار والتعلم في بيئة محفزة وإبداعية. نقدم مساحات متخصصة تلبي احتياجات جميع الفئات العمرية والمستويات.';
        } else {
            header.textContent = 'Fab Lab Al-Ahsa Facilities';
            intro.textContent = 'Discover our advanced facilities designed to support innovation and learning in a stimulating and creative environment. We offer specialized spaces that meet the needs of all age groups and levels.';
        }
    }
}

function updateInfoCards(lang) {
    const infoCards = document.querySelectorAll('.info-card');
    if (infoCards.length > 0) {
        const infoData = {
            ar: {
                users: ['الفئات المستفيدة', 'طلاب المدارس والجامعات', 'المهتمين بالتكنولوجيا', 'رواد الأعمال والمخترعين'],
                booking: ['الحجز المسبق', 'يجب الحجز المسبق لجميع المرافق', 'خصومات للمجموعات', 'برامج خاصة للجهات التعليمية']
            },
            en: {
                users: ['Target Groups', 'School and University Students', 'Technology Enthusiasts', 'Entrepreneurs and Inventors'],
                booking: ['Advance Booking', 'Advance booking required for all facilities', 'Group discounts', 'Special programs for educational institutions']
            }
        };

        infoCards.forEach((card, index) => {
            const data = Object.values(infoData[lang])[index];
            if (data) {
                card.querySelector('h4').textContent = data[0];
                const paragraphs = card.querySelectorAll('p');
                data.slice(1).forEach((text, i) => {
                    if (paragraphs[i]) {
                        paragraphs[i].textContent = text;
                    }
                });
            }
        });
    }
}

function updateFooterContent(lang) {
    const footerData = {
        'ar': {
            'map': 'موقعنا على الخريطة',
            'contact': 'معلومات الاتصال',
            'hours': ['أوقات العمل', 'الأحد - الخميس: 10:00 ص - 8:00 م'],
            'email': 'البريد الإلكتروني:',
            'phone': 'الهاتف:',
            'address': 'العنوان:',
            'sendMessage': 'أرسل لنا رسالة',
            'fullName': 'اسمك الكامل',
            'emailPlaceholder': 'بريدك الإلكتروني',
            'message': 'رسالتك هنا...',
            'send': 'إرسال الرسالة',
            'programmers': 'المبرمجون',
            'copyright': '© 2025 فاب لاب الأحساء - مبادرة مؤسسة عبد المنعم الراشد الإنسانية'
        },
        'en': {
            'map': 'Our Location on Map',
            'contact': 'Contact Information',
            'hours': ['Working Hours', 'Sunday - Thursday: 10:00 AM - 8:00 PM'],
            'email': 'Email:',
            'phone': 'Phone:',
            'address': 'Address:',
            'sendMessage': 'Send Us a Message',
            'fullName': 'Your Full Name',
            'emailPlaceholder': 'Your Email',
            'message': 'Your message here...',
            'send': 'Send Message',
            'programmers': 'Programmers',
            'copyright': '© 2025 Fab Lab Al-Ahsa - Initiative of Abdulmunem Al-Rashed Humanitarian Foundation'
        }
    };

    const data = footerData[lang];

    // Update footer headings
    const footerHeadings = document.querySelectorAll('.footer-section h3, .working-hours h4');
    footerHeadings.forEach(heading => {
        const text = heading.textContent.trim();
        if (text === 'موقعنا على الخريطة' || text === 'Our Location on Map') {
            heading.textContent = data.map;
        } else if (text === 'معلومات الاتصال' || text === 'Contact Information') {
            heading.textContent = data.contact;
        } else if (text === 'أرسل لنا رسالة' || text === 'Send Us a Message') {
            heading.textContent = data.sendMessage;
        } else if (text === 'أوقات العمل' || text === 'Working Hours') {
            heading.textContent = data.hours[0];
        } else if (text === 'المبرمجون' || text === 'Programmers') {
            heading.textContent = data.programmers;
        }
    });

    // Update contact information
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        const paragraphs = contactInfo.querySelectorAll('p');
        paragraphs.forEach(p => {
            const text = p.textContent;
            if (text.includes('البريد الإلكتروني:') || text.includes('Email:')) {
                p.innerHTML = `<i class="fas fa-envelope"></i> ${data.email} info@fablabahsa.org`;
            } else if (text.includes('الهاتف:') || text.includes('Phone:')) {
                p.innerHTML = `<i class="fas fa-phone"></i> ${data.phone} 40004-58-013`;
            } else if (text.includes('العنوان:') || text.includes('Address:')) {
                p.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.address} Al-Ahsa - Al-Hizam Al-Thahabi District - Ain Najm Street`;
            }
        });
    }

    // Update working hours
    const workingHours = document.querySelector('.working-hours');
    if (workingHours) {
        const paragraphs = workingHours.querySelectorAll('p');
        data.hours.slice(1).forEach((text, i) => {
            if (paragraphs[i]) {
                paragraphs[i].textContent = text;
            }
        });
    }

    // Update contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const nameInput = contactForm.querySelector('#footer-name');
        const emailInput = contactForm.querySelector('#footer-email');
        const messageInput = contactForm.querySelector('#footer-message');
        const submitBtn = contactForm.querySelector('.submit-btn');

        if (nameInput) nameInput.placeholder = data.fullName;
        if (emailInput) emailInput.placeholder = data.emailPlaceholder;
        if (messageInput) messageInput.placeholder = data.message;
        if (submitBtn) submitBtn.textContent = data.send;
    }

    // Update copyright
    const copyright = document.querySelector('.footer-copyright p');
    if (copyright) {
        copyright.textContent = data.copyright;
    }
}

function updateButtonsContent(lang) {
    const buttonsData = {
        'ar': {
            'register': 'تسجيل',
            'login': 'دخول'
        },
        'en': {
            'register': 'Register',
            'login': 'Login'
        }
    };

    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');

    if (registerButton) {
        registerButton.innerHTML = `<i class="fas fa-user-plus"></i> ${buttonsData[lang].register}`;
    }
    if (loginButton) {
        loginButton.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${buttonsData[lang].login}`;
    }
}

// Button Animation
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

// Facility Card Animations
const facilityCards = document.querySelectorAll('.facility-card');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

facilityCards.forEach(card => {
    observer.observe(card);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة المرافع loaded');
    
    // Initialize chatbot
    initializeChatbot();
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        const html = document.documentElement;
        html.lang = savedLanguage;
        html.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        if (languageSwitch) {
            languageSwitch.textContent = savedLanguage === 'ar' ? 'EN' : 'AR';
        }
        updateLanguageContent(savedLanguage);
    }
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header && window.scrollY > 50) {
        header.classList.add('sticky');
    } else if (header) {
        header.classList.remove('sticky');
    }
});