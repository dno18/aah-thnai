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
    
    localStorage.setItem('language', newLang);
}

function animateButton(element) {
    element.style.transform = 'scale(1.2) rotate(90deg)';
    setTimeout(() => {
        element.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

// Theme Switching
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

if (themeSwitch) {
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    updateThemeIcon();

    themeSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const themeIcon = themeSwitch?.querySelector('i');
    if (!themeIcon) return;
    
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Registration and Login Modals
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');

if (registerButton) {
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterModal();
        animateButton(registerButton);
    });
}

if (loginButton) {
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginModal();
        animateButton(loginButton);
    });
}

function showRegisterModal() {
    const registerModal = document.createElement('div');
    registerModal.className = 'modal-overlay';
    registerModal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h3>إنشاء حساب</h3>
            <form class="modal-form">
                <input type="text" placeholder="اسم المستخدم" required>
                <input type="email" placeholder="البريد الإلكتروني" required>
                <input type="password" placeholder="كلمة المرور" required>
                <button type="submit" class="btn-primary">تسجيل</button>
            </form>
        </div>
    `;
    document.body.appendChild(registerModal);

    registerModal.querySelector('.close-modal').addEventListener('click', () => {
        registerModal.remove();
    });

    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.remove();
        }
    });

    registerModal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم إنشاء الحساب بنجاح!');
        registerModal.remove();
    });
}

function showLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.className = 'modal-overlay';
    loginModal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h3>تسجيل الدخول</h3>
            <form class="modal-form">
                <input type="text" placeholder="اسم المستخدم" required>
                <input type="password" placeholder="كلمة المرور" required>
                <button type="submit" class="btn-primary">دخول</button>
            </form>
        </div>
    `;
    document.body.appendChild(loginModal);

    loginModal.querySelector('.close-modal').addEventListener('click', () => {
        loginModal.remove();
    });

    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.remove();
        }
    });

    loginModal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم تسجيل الدخول بنجاح!');
        if (loginButton) {
            loginButton.textContent = 'مرحبًا';
        }
        loginModal.remove();
    });
}

// Mobile Dropdown Toggle
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.innerWidth <= 768) {
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('شكراً لتواصلكم! سنرد عليكم في أقرب وقت ممكن.');
        this.reset();
    });
}

// نظام الحجز
let currentStep = 1;

function nextStep(step) {
    if (step === 1) {
        const service = document.getElementById('service')?.value;
        const serviceType = document.getElementById('service-type')?.value;
        
        if (!service || !serviceType) {
            alert('يرجى اختيار الخدمة ونوع الخدمة');
            return;
        }
    } else if (step === 2) {
        const date = document.getElementById('booking-date')?.value;
        const time = document.getElementById('booking-time')?.value;
        
        if (!date || !time) {
            alert('يرجى اختيار التاريخ والوقت');
            return;
        }
    } else if (step === 3) {
        const name = document.getElementById('full-name')?.value;
        const email = document.getElementById('email')?.value;
        const phone = document.getElementById('phone')?.value;
        
        if (!name || !email || !phone) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        // تحديث ملخص الحجز
        updateBookingSummary();
    }
    
    // الانتقال للخطوة التالية
    const currentStepEl = document.getElementById(`step${step}`);
    const nextStepEl = document.getElementById(`step${step + 1}`);
    
    if (currentStepEl && nextStepEl) {
        currentStepEl.classList.remove('active');
        nextStepEl.classList.add('active');
        
        // تحديث خطوات الحجز
        const currentStepIndicator = document.querySelector(`.step[data-step="${step}"]`);
        const nextStepIndicator = document.querySelector(`.step[data-step="${step + 1}"]`);
        
        if (currentStepIndicator && nextStepIndicator) {
            currentStepIndicator.classList.remove('active');
            nextStepIndicator.classList.add('active');
        }
        
        currentStep = step + 1;
    }
}

function prevStep(step) {
    const currentStepEl = document.getElementById(`step${step}`);
    const prevStepEl = document.getElementById(`step${step - 1}`);
    
    if (currentStepEl && prevStepEl) {
        currentStepEl.classList.remove('active');
        prevStepEl.classList.add('active');
        
        const currentStepIndicator = document.querySelector(`.step[data-step="${step}"]`);
        const prevStepIndicator = document.querySelector(`.step[data-step="${step - 1}"]`);
        
        if (currentStepIndicator && prevStepIndicator) {
            currentStepIndicator.classList.remove('active');
            prevStepIndicator.classList.add('active');
        }
        
        currentStep = step - 1;
    }
}

function updateBookingSummary() {
    const elements = {
        service: document.getElementById('summary-service'),
        type: document.getElementById('summary-type'),
        date: document.getElementById('summary-date'),
        time: document.getElementById('summary-time'),
        duration: document.getElementById('summary-duration'),
        name: document.getElementById('summary-name'),
        email: document.getElementById('summary-email'),
        phone: document.getElementById('summary-phone')
    };

    const inputs = {
        service: document.getElementById('service'),
        type: document.getElementById('service-type'),
        date: document.getElementById('booking-date'),
        time: document.getElementById('booking-time'),
        duration: document.getElementById('duration'),
        name: document.getElementById('full-name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone')
    };

    Object.keys(elements).forEach(key => {
        if (elements[key] && inputs[key]) {
            elements[key].textContent = inputs[key].value;
        }
    });
}

function submitBooking() {
    alert('تم تقديم طلب الحجز بنجاح! سنتواصل معكم قريباً لتأكيد الحجز.');
    // إعادة تعيين النموذج
    document.querySelectorAll('.booking-form').forEach(form => form.classList.remove('active'));
    const step1 = document.getElementById('step1');
    if (step1) {
        step1.classList.add('active');
    }
    
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    const step1Indicator = document.querySelector('.step[data-step="1"]');
    if (step1Indicator) {
        step1Indicator.classList.add('active');
    }
    
    currentStep = 1;
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.reset();
    }
}

// أزرار الحجز من البطاقات
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-book').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const serviceSelect = document.getElementById('service');
            if (serviceSelect && service) {
                serviceSelect.value = service;
            }
            
            // التمرير إلى قسم الحجز
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // تهيئة تاريخ الحجز لتكون من اليوم فصاعداً
    const bookingDate = document.getElementById('booking-date');
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.min = today;
    }
    
    // تحسين تجربة المستخدم للقوائم المنسدلة
    const serviceSelect = document.getElementById('service');
    const serviceTypeSelect = document.getElementById('service-type');
    
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#FFC107';
                this.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
            }
        });
    }
    
    if (serviceTypeSelect) {
        serviceTypeSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#FFC107';
                this.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
            }
        });
    }
});

// Chatbot Functionality with OpenRouter
let conversationHistory = [];

function addMessage(text, isUser = false) {
    const chatbotMessages = document.getElementById('chatbot-messages');
    if (chatbotMessages) {
        const message = document.createElement('div');
        message.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}

async function sendMessageToOpenRouter(message) {
    try {
        const context = `أنت مساعد ذكي لفاب لاب الأحساء، أول معمل تصنيع رقمي في الأحساء. نساعد المجتمع في نمذجة المشاريع باستخدام أحدث آلات التصنيع الرقمي، بإشراف خبراء ومهندسين، ونقدم برامج تدريبية تقنية. الرسالة: نشر ثقافة الإبداع والاختراع. الرؤية: أن نكون الوجهة الأولى للمبدعين. رد بالعربية بأسلوب ودود ومختصر. السؤال: ${message}`;
        
        conversationHistory.push({ role: 'user', content: message });
        if (conversationHistory.length > 2) conversationHistory.shift();

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
        return `عذرًا، حدث خطأ: ${error.message}. حاول مرة أخرى لاحقًا.`;
    }
}

// Initialize Chatbot
function initializeChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    console.log('Initializing chatbot...');
    console.log('Toggle:', chatbotToggle);
    console.log('Container:', chatbotContainer);
    console.log('Close:', chatbotClose);
    console.log('Input:', chatbotInput);
    console.log('Send:', chatbotSend);
    console.log('Messages:', chatbotMessages);

    if (chatbotToggle && chatbotContainer && chatbotClose && chatbotInput && chatbotSend && chatbotMessages) {
        // زر التبديل
        chatbotToggle.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Toggle button clicked');
            chatbotContainer.classList.toggle('active');
        });

        // زر الإغلاق
        chatbotClose.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Close button clicked');
            chatbotContainer.classList.remove('active');
        });

        // زر الإرسال
        chatbotSend.addEventListener('click', async (e) => {
            e.preventDefault();
            const message = chatbotInput.value.trim();
            console.log('Send button clicked, message:', message);
            
            if (!message) return;

            addMessage(message, true);
            chatbotInput.value = '';

            const loadingMessage = document.createElement('div');
            loadingMessage.className = 'chatbot-message bot';
            loadingMessage.textContent = 'جارٍ المعالجة...';
            chatbotMessages.appendChild(loadingMessage);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            try {
                const botResponse = await sendMessageToOpenRouter(message);
                
                setTimeout(() => {
                    loadingMessage.remove();
                    addMessage(botResponse);
                }, 500);
            } catch (error) {
                loadingMessage.remove();
                addMessage('عذرًا، حدث خطأ في الاتصال. حاول مرة أخرى.');
            }
        });

        // إرسال بالضغط على Enter
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                chatbotSend.click();
            }
        });

        console.log('Chatbot initialized successfully');
    } else {
        console.error('Chatbot elements not found:', {
            toggle: !!chatbotToggle,
            container: !!chatbotContainer,
            close: !!chatbotClose,
            input: !!chatbotInput,
            send: !!chatbotSend,
            messages: !!chatbotMessages
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fab Lab Services Page initialized successfully');
    
    // Check for saved language
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== 'ar') {
        toggleLanguage();
    }
    
    // Initialize chatbot
    initializeChatbot();
});