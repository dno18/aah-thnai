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
    
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
    
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

resizeCanvas();
initStars();
animateStars();

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
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

function updateThemeIcon() {
    const themeIcon = themeSwitch.querySelector('i');
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
        loginButton.textContent = 'مرحبًا';
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

// Chatbot Functionality with Hugging Face
let conversationHistory = []; // لتتبع السياق

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

// دالة لإرسال الرسائل إلى Hugging Face API
async function sendMessageToHuggingFace(message) {
    try {
        // سياق فاب لاب الأحساء
        const context = `أنت مساعد ذكي لفاب لاب الأحساء، أول معمل تصنيع رقمي في الأحساء. نساعد المجتمع في نمذجة المشاريع باستخدام أحدث آلات التصنيع الرقمي، بإشراف خبراء ومهندسين، ونقدم برامج تدريبية تقنية. الرسالة: نشر ثقافة الإبداع والاختراع. الرؤية: أن نكون الوجهة الأولى للمبدعين. الأهداف: نشر ثقافة التصنيع الرقمي، تنفيذ مشاريع لحل مشاكل المجتمع، عقد شراكات، وتوفير بيئة عمل آمنة. رد بالعربية بأسلوب ودود ومختصر، وتأكد من الإجابة بدقة. إذا كان السؤال عامًا، أجب بمعلومات دقيقة ومفيدة. السؤال: ${message}`;
        
        // إضافة السياق والسؤال إلى السجل
        conversationHistory.push({ role: 'user', content: message });
        if (conversationHistory.length > 6) conversationHistory.shift(); // الحفاظ على آخر 6 رسائل لتجنب التجاوز

        const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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', // استبدل بـ API Token من Hugging Face
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: `<s>[INST] ${context} [/INST]`,
                parameters: {
                    max_new_tokens: 150,
                    temperature: 0.7,
                    return_full_text: false,
                    top_p: 0.9
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let botResponse = data[0]?.generated_text || 'عذرًا، لم أفهم السؤال. يرجى صياغته بطريقة أخرى.';

        // تنظيف الرد إذا كان يحتوي على أجزاء غير مرغوب فيها
        botResponse = botResponse.replace(/<[^>]+>/g, '').trim();

        conversationHistory.push({ role: 'assistant', content: botResponse });
        return botResponse;
    } catch (error) {
        console.error('خطأ في التواصل مع Hugging Face:', error);
        if (error.message.includes('429')) {
            return 'تم تجاوز الحد اليومي للطلبات المجانية. حاول مرة أخرى غدًا.';
        }
        return 'عذرًا، حدث خطأ في الاتصال. تأكد من الإنترنت وحاول مرة أخرى.';
    }
}

// التعامل مع إدخال المستخدم
if (chatbotSend && chatbotInput && chatbotMessages) {
    chatbotSend.addEventListener('click', async () => {
        const message = chatbotInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        chatbotInput.value = '';

        // إضافة رسالة مؤقتة أثناء التحميل
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'chatbot-message bot';
        loadingMessage.textContent = 'جارٍ المعالجة...';
        chatbotMessages.appendChild(loadingMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        const botResponse = await sendMessageToHuggingFace(message);
        
        // إزالة رسالة التحميل
        loadingMessage.remove();
        
        addMessage(botResponse);
    });

    // دعم إرسال الرسالة بمفتاح Enter
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatbotSend.click();
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fab Lab About Page initialized successfully');
    
    // Check for saved language
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== 'ar') {
        toggleLanguage();
    }

    // Animation on Scroll for Value Cards
    const valueCards = document.querySelectorAll('.value-card-new');
    
    function checkScroll() {
        valueCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Floating Elements Animation Enhancement
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
});