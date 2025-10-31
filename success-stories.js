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
   
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
       
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-active');
        }
    });
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

// Success Stories Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const storyCards = document.querySelectorAll('.story-card');
   
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
           
            // Add active class to clicked button
            this.classList.add('active');
           
            const filterValue = this.getAttribute('data-filter');
           
            storyCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
   
    // Load More Stories
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more stories
            this.textContent = 'جاري التحميل...';
            this.disabled = true;
           
            setTimeout(() => {
                // In a real implementation, you would fetch more data from a server
                // For now, we'll just show an alert
                alert('تم تحميل المزيد من القصص بنجاح!');
                this.textContent = 'تحميل المزيد من القصص';
                this.disabled = false;
            }, 1500);
        });
    }
   
    // Share Story Button
    const shareStoryBtn = document.querySelector('.share-story-btn');
    if (shareStoryBtn) {
        shareStoryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showShareStoryModal();
        });
    }
   
    // Trigger scroll event to check for elements to fade in
    window.dispatchEvent(new Event('scroll'));
});

// Share Story Modal
function showShareStoryModal() {
    const shareModal = document.createElement('div');
    shareModal.className = 'modal-overlay';
    shareModal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h3>شارك قصتك</h3>
            <form class="modal-form">
                <input type="text" placeholder="اسمك الكامل" required>
                <input type="email" placeholder="بريدك الإلكتروني" required>
                <input type="text" placeholder="عنوان قصتك" required>
                <textarea placeholder="شاركنا قصتك الملهمة..." rows="6" required></textarea>
                <div class="form-group">
                    <label for="story-category">تصنيف القصة:</label>
                    <select id="story-category" required>
                        <option value="">اختر تصنيف</option>
                        <option value="technology">التكنولوجيا</option>
                        <option value="design">التصميم</option>
                        <option value="entrepreneurship">ريادة الأعمال</option>
                        <option value="innovation">الابتكار</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="story-image">صورة القصة (اختياري):</label>
                    <input type="file" id="story-image" accept="image/*">
                </div>
                <button type="submit" class="btn-primary">إرسال القصة</button>
            </form>
        </div>
    `;
    document.body.appendChild(shareModal);
    shareModal.querySelector('.close-modal').addEventListener('click', () => {
        shareModal.remove();
    });
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            shareModal.remove();
        }
    });
    shareModal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لمشاركة قصتك! سنراجعها ونعود إليك قريباً.');
        shareModal.remove();
    });
}

// Chatbot Functionality with OpenRouter
let conversationHistory = [];

const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

function addMessage(text, isUser = false) {
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

if (chatbotToggle && chatbotContainer && chatbotClose && chatbotInput && chatbotSend && chatbotMessages) {
    chatbotToggle.addEventListener('click', () => {
        console.log('Toggling chatbot container');
        chatbotContainer.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        console.log('Closing chatbot container');
        chatbotContainer.classList.remove('active');
    });

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

        const botResponse = await sendMessageToOpenRouter(message);
        
        setTimeout(() => {
            loadingMessage.remove();
            addMessage(botResponse);
        }, 500);
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatbotSend.click();
        }
    });
} else {
    console.warn('Chatbot elements not found. Ensure chatbot-toggle, chatbot-container, chatbot-close, chatbot-input, chatbot-send, and chatbot-messages are present in the HTML.');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fab Lab Success Stories Page initialized successfully');
   
    // Check for saved language
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== 'ar') {
        toggleLanguage();
    }
   
    // Add CSS for modals
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        .modal-content {
            background: #1d1c0a;
            padding: 2rem;
            border-radius: 15px;
            width: 90%;
            max-width: 500px;
            position: relative;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .close-modal {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
        }
        .modal-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .modal-form input, .modal-form textarea, .modal-form select {
            padding: 0.8rem;
            border: 1px solid #9C27B0;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            font-family: 'Cairo', sans-serif;
        }
        .modal-form label {
            color: #FFC107;
            margin-bottom: 0.5rem;
        }
        .btn-primary {
            padding: 0.8rem 1.5rem;
            background: #9C27B0;
            color: #fff;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            background: #FFC107;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
});