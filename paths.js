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

// Language Switching
const languageSwitch = document.getElementById('languageSwitch');
languageSwitch.addEventListener('click', (e) => {
    e.preventDefault();
    // Add language switching logic here
    alert('سيتم تفعيل تبديل اللغة قريباً');
});

// Check login status on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (isLoggedIn === 'true' && username) {
        // Hide register button
        if (registerButton) {
            registerButton.style.display = 'none';
        }
        
        // Update login button to show username
        if (loginButton) {
            loginButton.innerHTML = `<i class="fas fa-user"></i> ${username}`;
            loginButton.style.background = '#4CAF50';
            loginButton.style.borderColor = '#4CAF50';
            
            // Change click behavior to logout
            loginButton.onclick = function(e) {
                e.preventDefault();
                showLogoutConfirmation();
            };
        }
    }
}

// Logout confirmation
function showLogoutConfirmation() {
    const username = localStorage.getItem('username');
    const confirmLogout = confirm(`مرحباً ${username}!\nهل تريد تسجيل الخروج؟`);
    
    if (confirmLogout) {
        logout();
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // Show register button again
    if (registerButton) {
        registerButton.style.display = 'flex';
    }
    
    // Reset login button
    if (loginButton) {
        loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> دخول';
        loginButton.style.background = '';
        loginButton.style.borderColor = '#9C27B0';
        
        // Reset click behavior to login
        loginButton.onclick = function(e) {
            e.preventDefault();
            showLoginModal();
            animateButton(loginButton);
        };
    }
    
    // Reload the page to reflect changes
    setTimeout(() => {
        window.location.reload();
    }, 500);
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

// Registration and Login
const registerButton = document.getElementById('registerButton');
if (registerButton) {
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterModal();
        animateButton(registerButton);
    });
}

function showRegisterModal() {
    const registerModal = document.createElement('div');
    registerModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: #240230e6; padding: 2rem; border-radius: 15px; text-align: center; max-width: 400px; position: relative;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; left: 10px; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
                <h3>إنشاء حساب</h3>
                <input type="text" id="regUsername" placeholder="اسم المستخدم" style="width: 100%; padding: 0.8rem; margin: 0.5rem 0; border: 1px solid #9C27B0;" pattern="[A-Za-z0-9]+" title="يجب أن يحتوي اسم المستخدم على أحرف إنجليزية وأرقام فقط">
                <input type="email" id="regEmail" placeholder="البريد الإلكتروني" style="width: 100%; padding: 0.8rem; margin: 0.5rem 0; border: 1px solid #9C27B0;" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" title="يجب أن يكون البريد الإلكتروني صالحًا ويحتوي على أحرف إنجليزية وأرقام فقط">
                <input type="password" id="regPassword" placeholder="كلمة المرور" style="width: 100%; padding: 0.8rem; margin: 0.5rem 0; border: 1px solid #9C27B0;" pattern="^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$" title="كلمة المرور يجب أن تكون 8 خانات على الأقل وتحتوي على رمز واحد على الأقل ">
                <div id="regError" style="color: #FFC107; font-size: 0.9rem; margin: 0.5rem 0; display: none;"></div>
                <button id="regSubmit" disabled style="width: 100%; padding: 0.8rem; background: #9C27B0; color: white; border: none; border-radius: 5px; margin: 0.5rem 0; opacity: 0.5; cursor: not-allowed;">تسجيل</button>
            </div>
        </div>
    `;
    document.body.appendChild(registerModal);

    const usernameInput = document.getElementById('regUsername');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const submitButton = document.getElementById('regSubmit');
    const errorDiv = document.getElementById('regError');

    function checkFormValidity() {
        const usernameValid = /^[A-Za-z0-9]+$/.test(usernameInput.value.trim());
        const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailInput.value.trim());
        const passwordValid = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(passwordInput.value.trim());

        if (!usernameValid && usernameInput.value.trim()) {
            errorDiv.textContent = 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية وأرقام فقط';
            errorDiv.style.display = 'block';
        } else if (!emailValid && emailInput.value.trim()) {
            errorDiv.textContent = 'البريد الإلكتروني يجب أن يكون صالحًا ويحتوي على أحرف إنجليزية وأرقام فقط';
            errorDiv.style.display = 'block';
        } else if (!passwordValid && passwordInput.value.trim()) {
            errorDiv.textContent = 'كلمة المرور يجب أن تكون 8 خانات على الأقل وتحتوي على رمز واحد على الأقل';
            errorDiv.style.display = 'block';
        } else {
            errorDiv.style.display = 'none';
        }

        const isValid = usernameValid && emailValid && passwordValid && 
                        usernameInput.value.trim() !== '' &&
                        emailInput.value.trim() !== '' &&
                        passwordInput.value.trim() !== '';
        
        submitButton.disabled = !isValid;
        submitButton.style.opacity = isValid ? 1 : 0.5;
        submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
    }

    usernameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);

    submitButton.addEventListener('click', () => {
        if (!submitButton.disabled) {
            register();
        }
    });
}

// Registration function
async function register() {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    const result = await window.authManager.register({
        username: username,
        email: email,
        password: password
    });

    if (result.success) {
        // Close modal and clean up
        document.querySelector('.register-modal')?.remove();
    } else {
        // Show error message
        const errorDiv = document.getElementById('regError');
        if (errorDiv) {
            errorDiv.textContent = result.message;
            errorDiv.style.display = 'block';
        }
    }
}

// Login function
async function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const result = await window.authManager.login({
        username: username,
        password: password
    });

    if (result.success) {
        // Close modal and clean up
        document.querySelector('.register-modal')?.remove();
    } else {
        // Show error message
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = result.message;
            errorDiv.style.display = 'block';
        }
    }
}

function showLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: #240230e6; padding: 2rem; border-radius: 15px; text-align: center; max-width: 400px; position: relative;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; left: 10px; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
                <h3>تسجيل الدخول</h3>
                <input type="text" id="loginUsername" placeholder="اسم المستخدم" style="width: 100%; padding: 0.8rem; margin: 0.5rem 0; border: 1px solid #9C27B0;" pattern="[A-Za-z0-9]+" title="يجب أن يحتوي اسم المستخدم على أحرف إنجليزية وأرقام فقط">
                <input type="password" id="loginPassword" placeholder="كلمة المرور" style="width: 100%; padding: 0.8rem; margin: 0.5rem 0; border: 1px solid #9C27B0;" pattern="^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$" title="كلمة المرور يجب أن تكون 8 خانات على الأقل وتحتوي على رمز واحد على الأقل">
                <div id="loginError" style="color: #FFC107; font-size: 0.9rem; margin: 0.5rem 0; display: none;"></div>
                <button id="loginSubmit" disabled style="width: 100%; padding: 0.8rem; background: #9C27B0; color: white; border: none; border-radius: 5px; margin: 0.5rem 0; opacity: 0.5; cursor: not-allowed;">دخول</button>
            </div>
        </div>
    `;
    document.body.appendChild(loginModal);

    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const submitButton = document.getElementById('loginSubmit');
    const errorDiv = document.getElementById('loginError');

    function checkFormValidity() {
        const usernameValid = /^[A-Za-z0-9]+$/.test(usernameInput.value.trim());
        const passwordValid = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(passwordInput.value.trim());

        if (!usernameValid && usernameInput.value.trim()) {
            errorDiv.textContent = 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية وأرقام فقط';
            errorDiv.style.display = 'block';
        } else if (!passwordValid && passwordInput.value.trim()) {
            errorDiv.textContent = 'كلمة المرور يجب أن تكون 8 خانات على الأقل وتحتوي على رمز واحد على الأقل';
            errorDiv.style.display = 'block';
        } else {
            errorDiv.style.display = 'none';
        }

        const isValid = usernameValid && passwordValid && 
                        usernameInput.value.trim() !== '' &&
                        passwordInput.value.trim() !== '';
        
        submitButton.disabled = !isValid;
        submitButton.style.opacity = isValid ? 1 : 0.5;
        submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
    }

    usernameInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);

    submitButton.addEventListener('click', () => {
        if (!submitButton.disabled) {
            login();
        }
    });
}

// Button Animation
function animateButton(element) {
    element.style.transform = 'scale(1.2)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Timeline Functionality
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.dot');
    const descriptions = document.querySelectorAll('.description');
    const redLine = document.querySelector('.red-line');
    const timeline = document.querySelector('.timeline');
    const spacerContainer = document.querySelector('.spacer-container');
    const timelineTop = timeline.getBoundingClientRect().top + window.scrollY;
    const totalHeight = timeline.scrollHeight;

    function revealOnScroll() {
        const scrollPosition = window.scrollY;

        // إخفاء المسافات العلوية عند النزول
        if (scrollPosition > timelineTop) {
            spacerContainer.classList.add('hidden');
        } else {
            spacerContainer.classList.remove('hidden');
        }

        items.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top + scrollPosition - timelineTop;
            if (scrollPosition > itemTop - window.innerHeight + 200) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }

            // تحويل الدائرة إلى حمراء وإظهار التعريف عند وصول الخط الأحمر
            const dotPosition = (itemTop + (item.offsetHeight / 2)) / totalHeight * 100;
            const scrollPercentage = (scrollPosition - timelineTop + window.innerHeight / 2) / totalHeight * 100;

            if (scrollPercentage >= dotPosition) {
                dots[index].classList.add('red');
                descriptions[index].classList.add('visible');
            } else {
                dots[index].classList.remove('red');
                descriptions[index].classList.remove('visible');
            }
        });

        // تحديث طول الخط الأحمر
        const scrollPercentage = Math.min((scrollPosition - timelineTop + window.innerHeight / 2) / totalHeight * 100, 100);
        redLine.style.height = `${scrollPercentage}%`;
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // تشغيل أولي
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('شكراً لتواصلكم! سنرد عليكم في أقرب وقت ممكن.');
    this.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Chatbot Functionality with Hugging Face
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

// Initialize chatbot on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fab Lab Paths Page with Chatbot initialized successfully');
    
    // Initialize chatbot if elements exist
    if (chatbotToggle && chatbotContainer) {
        console.log('Chatbot initialized successfully');
    }
});