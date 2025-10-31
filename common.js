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

const controls = document.querySelector('.controls');

// متغيرات النظام
let lastNotificationTime = 0;
const NOTIFICATION_COOLDOWN = 10000; // 10 ثواني فقط للاختبار
let processedChanges = new Set();
let initialLoad = true;

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/check-auth/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log('🔐 حالة المصادقة:', result);
        
        if (result.is_authenticated && controls) {
            updateControlsAfterAuth(result.user.username);
            fetchNotifications();
        } else {
            updateControlsForGuest();
        }
    } catch (error) {
        console.error('Authentication check error:', error);
        updateControlsForGuest();
    }
}

function updateControlsAfterAuth(username) {
    if (controls) {
        controls.innerHTML = `
            <span class="user-greeting">مرحبًا، ${username}</span>
            <a href="#" id="notificationBell" class="btn-control notification-bell">
                <i class="fas fa-bell"></i>
                <span class="notification-count" id="notificationCount" style="display: none;">0</span>
            </a>
            <a href="#" id="languageSwitch" class="btn-control">EN</a>
            <a href="#" id="logoutButton" class="btn-control"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a>
        `;
        console.log('✅ تم تحديث عناصر التحكم للمستخدم:', username);

        // إعداد الأحداث
        setupControlEvents();
    } else {
        console.error('❌ عناصر التحكم غير موجودة');
    }
}

function updateControlsForGuest() {
    if (controls) {
        controls.innerHTML = `
            <a href="#" id="languageSwitch" class="btn-control">EN</a>
            <a href="/register_view" id="registerButton" class="btn-control"><i class="fas fa-user-plus"></i> تسجيل</a>
            <a href="/login_view" id="loginButton" class="btn-control"><i class="fas fa-sign-in-alt"></i> دخول</a>
        `;
        console.log('✅ تم تحديث عناصر التحكم للضيف');

        setupControlEvents();
    }
}

function setupControlEvents() {
    const languageSwitch = document.getElementById('languageSwitch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
            animateButton(languageSwitch);
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/api/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });
                if (response.ok) {
                    updateControlsForGuest();
                    alert('تم تسجيل الخروج بنجاح!');
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        });
    }

    const notificationBell = document.getElementById('notificationBell');
    if (notificationBell) {
        notificationBell.addEventListener('click', (e) => {
            e.preventDefault();
            toggleNotificationPopover();
        });
    }

    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');

    if (registerButton) {
        registerButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const isAuthenticated = await checkIfAuthenticated();
            if (!isAuthenticated) {
                window.location.href = registerButton.getAttribute('href');
            } else {
                alert('أنت مسجل بالفعل!');
            }
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const isAuthenticated = await checkIfAuthenticated();
            if (!isAuthenticated) {
                window.location.href = loginButton.getAttribute('href');
            } else {
                alert('أنت مسجل بالفعل!');
            }
        });
    }
}

async function checkIfAuthenticated() {
    try {
        const response = await fetch('/api/check-auth/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result.is_authenticated;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
}

async function fetchNotifications() {
    try {
        const response = await fetch('/api/notifications/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const notifications = await response.json();
        updateNotificationUI(notifications);
        console.log('📥 تم جلب الإشعارات:', notifications.length);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        updateNotificationUI([]);
    }
}

function updateNotificationUI(notifications) {
    const notificationCount = document.getElementById('notificationCount');
    const notificationMessages = document.getElementById('notificationMessages');

    if (notificationCount && notificationMessages) {
        notificationCount.textContent = notifications.length;
        notificationCount.style.display = notifications.length > 0 ? 'flex' : 'none';

        notificationMessages.innerHTML = '';
        if (notifications.length === 0) {
            const message = document.createElement('div');
            message.className = 'notification-message';
            message.textContent = 'لا توجد إشعارات جديدة';
            notificationMessages.appendChild(message);
        } else {
            notifications.forEach(notification => {
                const message = document.createElement('div');
                message.className = 'notification-message';
                message.textContent = notification.message;
                notificationMessages.appendChild(message);
            });
        }
    }
}

function toggleNotificationPopover() {
    const popover = document.getElementById('notificationPopover');
    if (popover) {
        const isActive = popover.classList.contains('active');
        popover.classList.toggle('active');
        popover.style.display = isActive ? 'none' : 'flex';
        console.log('🔔 نافذة الإشعارات:', isActive ? 'مغلقة' : 'مفتوحة');
    }
}

function toggleLanguage() {
    const html = document.documentElement;
    const currentLang = html.lang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    html.lang = newLang;
    html.dir = newDir;
    
    const languageSwitch = document.getElementById('languageSwitch');
    if (languageSwitch) {
        languageSwitch.textContent = newLang === 'ar' ? 'EN' : 'AR';
    }
    
    localStorage.setItem('language', newLang);
    console.log('🌐 تم تغيير اللغة إلى:', newLang);
}

function animateButton(element) {
    element.style.transform = 'scale(1.2) rotate(90deg)';
    setTimeout(() => {
        element.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

// 🎯 نظام الاكتشاف - إصدار مبسط وفعال
function initializeContentMonitoring() {
    console.log('🚀 بدء نظام مراقبة المحتوى...');
    
    // تخزين المحتوى الأولي
    storeInitialContent();
    
    // بدء المراقبة الدورية
    setInterval(() => {
        if (isUserAuthenticated()) {
            checkForContentChanges();
        }
    }, 30000); // كل 30 ثانية
    
    console.log('✅ نظام المراقبة جاهز');
}

function isUserAuthenticated() {
    return document.querySelector('.user-greeting') !== null;
}

function storeInitialContent() {
    console.log('💾 تخزين المحتوى الأولي...');
    
    const sections = {
        'about-fablab': 'عن فاب لاب',
        'vision': 'الرسالة والرؤية', 
        'workshops': 'ورش العمل',
        'achievements': 'الإنجازات',
        'partners': 'الشركاء'
    };
    
    Object.keys(sections).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const content = getSectionContent(section);
            localStorage.setItem(`initial_${sectionId}`, content);
            console.log(`✅ تم تخزين: ${sections[sectionId]}`);
        }
    });
}

function getSectionContent(section) {
    // أخذ النص فقط مع بعض المعالجة
    return section.textContent
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 500); // الحد الأقصى 500 حرف
}

function checkForContentChanges() {
    if (!isUserAuthenticated()) {
        console.log('👤 المستخدم غير مسجل - تخطي الفحص');
        return;
    }
    
    console.log('🔍 فحص التغييرات...');
    let changesDetected = false;
    
    const sections = {
        'about-fablab': 'عن فاب لاب',
        'vision': 'الرسالة والرؤية',
        'workshops': 'ورش العمل',
        'achievements': 'الإنجازات', 
        'partners': 'الشركاء'
    };
    
    Object.keys(sections).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const currentContent = getSectionContent(section);
            const storedContent = localStorage.getItem(`initial_${sectionId}`);
            
            if (storedContent && currentContent !== storedContent) {
                console.log(`🎯 اكتشاف تغيير في: ${sections[sectionId]}`);
                sendNotification(`تم تحديث قسم ${sections[sectionId]}`);
                changesDetected = true;
                // تحديث التخزين
                localStorage.setItem(`initial_${sectionId}`, currentContent);
            }
        }
    });
    
    if (!changesDetected) {
        console.log('✅ لا توجد تغييرات');
    }
}

// 🎯 إرسال الإشعارات - إصدار مبسط
async function sendNotification(message) {
    const now = Date.now();
    if (now - lastNotificationTime < NOTIFICATION_COOLDOWN) {
        console.log('⏰ تخطي الإشعار - وقت التبريد');
        return;
    }
    
    console.log('📤 إرسال إشعار:', message);
    
    try {
        const response = await fetch('/api/notifications/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                message: message,
                type: 'content_update',
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            console.log('✅ تم إرسال الإشعار بنجاح');
            lastNotificationTime = now;
            fetchNotifications(); // تحديث الواجهة
            
            // إظهار تنبيه فوري
            showQuickAlert('إشعار جديد: ' + message);
        } else {
            console.error('❌ فشل إرسال الإشعار:', response.status);
        }
    } catch (error) {
        console.error('❌ خطأ في إرسال الإشعار:', error);
    }
}

function showQuickAlert(message) {
    // إنشاء تنبيه سريع
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #9C27B0;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        font-family: 'Cairo', sans-serif;
        max-width: 300px;
    `;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    // إخفاء بعد 3 ثواني
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// 🎯 محاكاة التغيير للاختبار
function simulateContentChange() {
    console.log('🧪 محاكاة تغيير المحتوى...');
    
    const testSections = ['about-fablab', 'vision', 'workshops'];
    const randomSection = testSections[Math.floor(Math.random() * testSections.length)];
    
    sendNotification(`تغيير اختباري في قسم ${randomSection} - ${new Date().toLocaleTimeString()}`);
}

// 🎯 التهيئة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 تهيئة النظام...');
    
    // تحميل اللغة المحفوظة
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== 'ar') {
        toggleLanguage();
    }
    
    // التحقق من المصادقة
    checkAuthStatus();
    
    // بدء نظام المراقبة بعد تأخير
    setTimeout(() => {
        initialLoad = false;
        initializeContentMonitoring();
        
        // إعداد نافذة الإشعارات
        setupNotificationPopover();
        
        console.log('✅ النظام جاهز تماماً');
        console.log('💡 للمساعدة: اكتب testSystem() في الكونسول');
        
    }, 2000);
});

function setupNotificationPopover() {
    const markReadButton = document.getElementById('markNotificationsRead');
    if (markReadButton) {
        markReadButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                await fetch('/api/notifications/clear/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });
                updateNotificationUI([]);
                const popover = document.getElementById('notificationPopover');
                if (popover) {
                    popover.classList.remove('active');
                    popover.style.display = 'none';
                }
            } catch (error) {
                console.error('Error clearing notifications:', error);
            }
        });
    }

    const popoverClose = document.querySelector('.popover-close');
    if (popoverClose) {
        popoverClose.addEventListener('click', (e) => {
            e.stopPropagation();
            const popover = document.getElementById('notificationPopover');
            if (popover) {
                popover.classList.remove('active');
                popover.style.display = 'none';
            }
        });
    }
}

// 🎯 واجهة الاختبار
window.testSystem = function() {
    console.log('🧪 بدء اختبار النظام...');
    console.log('1. ✅ فحص المصادقة...');
    console.log('2. ✅ فحص عناصر التحكم...');
    console.log('3. 🧪 إرسال إشعار اختبار...');
    
    simulateContentChange();
    
    setTimeout(() => {
        console.log('4. ✅ فحص تحديث الواجهة...');
        fetchNotifications();
    }, 1000);
};

window.forceNotification = function(message = 'إشعار تجريبي من النظام') {
    sendNotification(message);
};

window.checkSections = function() {
    console.log('🔍 فحص الأقسام...');
    const sections = ['about-fablab', 'vision', 'workshops', 'achievements', 'partners'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            console.log(`✅ ${sectionId}: موجود`);
        } else {
            console.log(`❌ ${sectionId}: غير موجود`);
        }
    });
};

console.log('🎛️ أوامر الاختبار المتاحة:');
console.log('   testSystem()       - اختبار كامل للنظام');
console.log('   forceNotification() - إرسال إشعار فوري');
console.log('   checkSections()    - فحص وجود الأقسام');