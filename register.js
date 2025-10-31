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

if (canvas) {
    resizeCanvas();
    initStars();
    animateStars();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
    });
}

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

const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
} else {
    body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

if (themeSwitch) {
    updateThemeIcon();

    themeSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon();
        animateButton(themeSwitch);
    });
}

function updateThemeIcon() {
    const themeIcon = themeSwitch.querySelector('i');
    const currentTheme = body.getAttribute('data-theme');
    
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.className = 'fas fa-eye-slash';
        } else {
            icon.className = 'fas fa-eye';
        }
    });
}

const registerForm = document.querySelector('.auth-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const agreeTermsInput = document.getElementById('agree-terms');

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('التحقق ناجح، يتم إرسال نموذج التسجيل');
            this.submit();
        } else {
            console.log('فشل التحقق في نموذج التسجيل');
        }
    });
}

function validateForm() {
    let isValid = true;
    
    clearErrors();
    
    if (!usernameInput.value.trim()) {
        showError('username-error', 'يرجى إدخال اسم المستخدم');
        isValid = false;
    } else if (usernameInput.value.length < 3) {
        showError('username-error', 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
        isValid = false;
    }
    
    if (!emailInput.value.trim()) {
        showError('email-error', 'يرجى إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError('email-error', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    if (!passwordInput.value) {
        showError('password-error', 'يرجى إدخال كلمة المرور');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError('password-error', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        isValid = false;
    }
    
    if (!confirmPasswordInput.value) {
        showError('confirm-password-error', 'يرجى تأكيد كلمة المرور');
        isValid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        showError('confirm-password-error', 'كلمات المرور غير متطابقة');
        isValid = false;
    }
    
    if (agreeTermsInput && !agreeTermsInput.checked) {
        showError('terms-error', 'يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

if (usernameInput) {
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.length > 0 && usernameInput.value.length < 3) {
            showError('username-error', 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
        } else {
            clearError('username-error');
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('input', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            showError('email-error', 'يرجى إدخال بريد إلكتروني صحيح');
        } else {
            clearError('email-error');
        }
    });
}

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value && passwordInput.value.length < 6) {
            showError('password-error', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        } else {
            clearError('password-error');
        }
        
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            showError('confirm-password-error', 'كلمات المرور غير متطابقة');
        } else if (confirmPasswordInput.value) {
            clearError('confirm-password-error');
        }
    });
}

if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            showError('confirm-password-error', 'كلمات المرور غير متطابقة');
        } else {
            clearError('confirm-password-error');
        }
    });
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

const googleButton = document.querySelector('.btn-google');
const facebookButton = document.querySelector('.btn-facebook');

if (googleButton) {
    googleButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('سيتم تنفيذ تسجيل الدخول عبر Google قريباً');
        animateButton(googleButton);
    });
}

if (facebookButton) {
    facebookButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('سيتم تنفيذ تسجيل الدخول عبر Facebook قريباً');
        animateButton(facebookButton);
    });
}

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

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrength(strength);
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 4);
}

function updatePasswordStrength(strength) {
}

document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languageSwitch) {
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        languageSwitch.textContent = savedLanguage === 'ar' ? 'EN' : 'AR';
    }
});

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/check-auth/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.is_authenticated) {
                window.location.href = '/';
            }
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}