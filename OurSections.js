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

// Language Switching - Enhanced
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
    // Update navigation menu
    updateNavigationContent(lang);
    
    // Update section header and tabs
    updateSectionsContent(lang);
    
    // Update footer content
    updateFooterContent(lang);
    
    // Update buttons and controls
    updateButtonsContent(lang);
    
    // Update chatbot content
    updateChatbotContent(lang);
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

    // Update main navigation
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

    // Update dropdown menus
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

function updateSectionsContent(lang) {
    const sectionsData = {
        'ar': {
            'header': 'أقسام فاب لاب الأحساء',
            'intro': 'استكشف أقسامنا المتنوعة التي توفر أحدث التقنيات لدعم الابتكار والإبداع. اختر قسماً لمعرفة المزيد.',
            'tabs': {
                'electronics': 'قسم الإلكترونيات والبرمجة',
                'printing': 'قسم الطباعة ثلاثية الأبعاد',
                'carving': 'قسم النحت والقطع',
                'laser': 'قسم الليزر للحرق والقص',
                'vinyl': 'قسم القطع بالفينيل',
                'studio': 'قسم الاستوديو',
                'brainstorming': 'غرفة العصف الذهني'
            },
            'electronics': {
                'title': 'قسم الإلكترونيات والبرمجة',
                'description': 'في هذا القسم، تجد كل ما يتعلق بالإلكترونيات من قطع إلكترونية مثل الأردوينو، المتحكمات الدقيقة، أجهزة التلحيم، الراسبيري باي، الإضاءات، والقطع الأخرى. تعلم كيفية برمجتها وتطوير مشاريع إلكترونية متقدمة.',
                'features': ['أدوات برمجة متقدمة', 'معدات تلحيم احترافية', 'دعم للمشاريع الإبداعية']
            },
            'printing': {
                'title': 'قسم الطباعة ثلاثية الأبعاد',
                'description': 'يحتوي هذا القسم على طابعات متنوعة ثلاثية الأبعاد بأحجام مختلفة ومزايا متعددة. استخدمها لطباعة تصاميمك الإبداعية وتحويل أفكارك إلى واقع ملموس.',
                'features': ['طابعات عالية الدقة', 'مواد طباعة متنوعة', 'دعم فني متخصص']
            },
            'carving': {
                'title': 'قسم النحت والقطع',
                'description': 'يحتوى هذا القسم على الات النحت والقطع القادرة على قطع اخشاب والمواد الاخرى مثل البلاستيك و النحت عليها.',
                'features': ['آلات نحت متقدمة', 'دعم للتصاميم الإبداعية']
            },
            'laser': {
                'title': 'قسم الليزر للحرق والقص',
                'description': 'في هذا القسم تجد آلات القطع بالليزر التي تمكنك من قطع مواد مثل الخشب والبلاستيك والنحت على المعادن المطلية والجلد وغيرها.',
                'features': ['آلات ليزر عالية الدقة', 'قطع ونحت متنوع', 'مواد آمنة ومتنوعة']
            },
            'vinyl': {
                'title': 'قسم القطع بالفينيل',
                'description': 'باستخدام آلات قطع الفينيل بإمكانك اعمالك الفنية إضافة لمسة جمالية لهوية مشروعك.',
                'features': ['آلات قطع فينيل احترافية', 'أعمال فنية مخصصة', 'تعزيز هوية المشروع']
            },
            'studio': {
                'title': 'قسم الاستوديو',
                'description': 'يحتوي هذا القسم على المعدات التي تمكنك من تسجيل محتواك الصوتي الخاص بك بالإضافة إلى أجهزة حاسوب بإمكانيات عالية لعمليات المونتاج والهندسة الصوتية وجدارية الكروما الخضراء للعزل في التصوير وإضاءات تصوير عالية الجودة.',
                'features': ['تسجيل صوتي احترافي', 'كروما وإضاءات تصوير']
            },
            'brainstorming': {
                'title': 'غرفة العصف الذهني',
                'description': 'تقع هذه الغرفة في قلب فاب لاب الأحساء في هذه الغرفة بإمكانك أن تستغل كل جزء من الحوائط الزجاجية أو الطاولة الذكية لتفعيل العصف الذهني مع فريقك وتتناقش حول مشروعك.',
                'features': ['حوائط زجاجية للكتابة', 'طاولة ذكية', 'جلسات فريقية']
            }
        },
        'en': {
            'header': 'Fab Lab Al-Ahsa Sections',
            'intro': 'Explore our diverse sections that provide the latest technologies to support innovation and creativity. Choose a section to learn more.',
            'tabs': {
                'electronics': 'Electronics and Programming Section',
                'printing': '3D Printing Section',
                'carving': 'Carving and Cutting Section',
                'laser': 'Laser Burning and Cutting Section',
                'vinyl': 'Vinyl Cutting Section',
                'studio': 'Studio Section',
                'brainstorming': 'Brainstorming Room'
            },
            'electronics': {
                'title': 'Electronics and Programming Section',
                'description': 'In this section, you will find everything related to electronics including electronic components like Arduino, microcontrollers, soldering equipment, Raspberry Pi, lighting, and other components. Learn how to program them and develop advanced electronic projects.',
                'features': ['Advanced programming tools', 'Professional soldering equipment', 'Support for creative projects']
            },
            'printing': {
                'title': '3D Printing Section',
                'description': 'This section contains various 3D printers of different sizes and multiple features. Use them to print your creative designs and turn your ideas into tangible reality.',
                'features': ['High-resolution printers', 'Various printing materials', 'Specialized technical support']
            },
            'carving': {
                'title': 'Carving and Cutting Section',
                'description': 'This section contains carving and cutting machines capable of cutting wood and other materials like plastic and carving on them.',
                'features': ['Advanced carving machines', 'Support for creative designs']
            },
            'laser': {
                'title': 'Laser Burning and Cutting Section',
                'description': 'In this section, you will find laser cutting machines that enable you to cut materials like wood, plastic, and engrave on coated metals, leather, and more.',
                'features': ['High-precision laser machines', 'Various cutting and engraving', 'Safe and diverse materials']
            },
            'vinyl': {
                'title': 'Vinyl Cutting Section',
                'description': 'Using vinyl cutting machines, you can add an aesthetic touch to your project identity through your artistic work.',
                'features': ['Professional vinyl cutting machines', 'Custom artistic work', 'Project identity enhancement']
            },
            'studio': {
                'title': 'Studio Section',
                'description': 'This section contains equipment that enables you to record your audio content in addition to high-performance computers for editing and audio engineering processes, green chroma key wall for isolation in photography, and high-quality photography lighting.',
                'features': ['Professional audio recording', 'Chroma key and photography lighting']
            },
            'brainstorming': {
                'title': 'Brainstorming Room',
                'description': 'This room is located in the heart of Fab Lab Al-Ahsa. In this room, you can utilize every part of the glass walls or the smart table to activate brainstorming with your team and discuss your project.',
                'features': ['Glass writing walls', 'Smart table', 'Team sessions']
            }
        }
    };

    const data = sectionsData[lang];

    // Update section header
    const header = document.querySelector('.section-header h1');
    const intro = document.querySelector('.intro-text');
    if (header && intro) {
        header.textContent = data.header;
        intro.textContent = data.intro;
    }

    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        const tabId = button.getAttribute('data-tab');
        if (data.tabs[tabId]) {
            button.textContent = data.tabs[tabId];
        }
    });

    // Update tab content
    Object.keys(data.tabs).forEach(tabId => {
        const tabData = data[tabId];
        const tabPane = document.getElementById(tabId);
        if (tabPane && tabData) {
            // Update title
            const title = tabPane.querySelector('h2');
            if (title) {
                title.textContent = tabData.title;
            }

            // Update description
            const description = tabPane.querySelector('p');
            if (description) {
                description.textContent = tabData.description;
            }

            // Update features list
            const featuresList = tabPane.querySelectorAll('.features-list li');
            featuresList.forEach((li, index) => {
                if (tabData.features[index]) {
                    li.textContent = tabData.features[index];
                    // Keep the icon
                    const icon = li.querySelector('i');
                    if (icon) {
                        li.prepend(icon);
                    }
                }
            });
        }
    });
}

function updateFooterContent(lang) {
    const footerData = {
        'ar': {
            'map': 'موقعنا على الخريطة',
            'contact': 'معلومات الاتصال',
            'email': 'البريد الإلكتروني:',
            'phone': 'الهاتف:',
            'address': 'العنوان:',
            'sendMessage': 'أرسل لنا رسالة',
            'fullName': 'اسمك الكامل',
            'emailPlaceholder': 'بريدك الإلكتروني',
            'message': 'رسالتك هنا...',
            'send': 'إرسال الرسالة',
            'programmers': 'المبرمجون',
            'programmer1': 'باسم المشموم',
            'programmer2': 'علي العبودي',
            'copyright': '© 2025 فاب لاب الأحساء - مبادرة مؤسسة عبد المنعم الراشد الإنسانية',
            'workingHours': 'أوقات العمل',
            'workingTime': 'الأحد - الخميس: 10:00 ص - 8:00 م'
        },
        'en': {
            'map': 'Our Location on Map',
            'contact': 'Contact Information',
            'email': 'Email:',
            'phone': 'Phone:',
            'address': 'Address:',
            'sendMessage': 'Send Us a Message',
            'fullName': 'Your Full Name',
            'emailPlaceholder': 'Your Email',
            'message': 'Your message here...',
            'send': 'Send Message',
            'programmers': 'Programmers',
            'programmer1': 'Bassam Al-Mashmoum',
            'programmer2': 'Ali Al-Aboudi',
            'copyright': '© 2025 Fab Lab Al-Ahsa - Initiative of Abdulmunem Al-Rashed Humanitarian Foundation',
            'workingHours': 'Working Hours',
            'workingTime': 'Sunday - Thursday: 10:00 AM - 8:00 PM'
        }
    };

    const data = footerData[lang];

    // Update footer headings
    const footerHeadings = document.querySelectorAll('.footer-section h3');
    footerHeadings.forEach(heading => {
        const text = heading.textContent.trim();
        if (text === 'موقعنا على الخريطة' || text === 'Our Location on Map') {
            heading.textContent = data.map;
        } else if (text === 'معلومات الاتصال' || text === 'Contact Information') {
            heading.textContent = data.contact;
        } else if (text === 'أرسل لنا رسالة' || text === 'Send Us a Message') {
            heading.textContent = data.sendMessage;
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

    // Update contact form placeholders
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder === 'اسمك الكامل' || placeholder === 'Your Full Name') {
            input.setAttribute('placeholder', data.fullName);
        } else if (placeholder === 'بريدك الإلكتروني' || placeholder === 'Your Email') {
            input.setAttribute('placeholder', data.emailPlaceholder);
        } else if (placeholder === 'رسالتك هنا...' || placeholder === 'Your message here...') {
            input.setAttribute('placeholder', data.message);
        }
    });

    // Update send button
    const sendButton = document.querySelector('.submit-btn');
    if (sendButton) {
        sendButton.textContent = data.send;
    }

    // Update programmers section
    const programmersHeading = document.querySelector('.programmers-section h4');
    const programmerLinks = document.querySelectorAll('.programmer-link');
    
    if (programmersHeading) {
        programmersHeading.textContent = data.programmers;
    }
    
    if (programmerLinks.length >= 2) {
        programmerLinks[0].innerHTML = `<i class="fab fa-whatsapp"></i> ${data.programmer1}`;
        programmerLinks[1].innerHTML = `<i class="fab fa-whatsapp"></i> ${data.programmer2}`;
    }

    // Update working hours
    const workingHoursHeading = document.querySelector('.working-hours .section-heading');
    const workingHoursText = document.querySelector('.working-hours p');
    
    if (workingHoursHeading) {
        workingHoursHeading.textContent = data.workingHours;
    }
    if (workingHoursText) {
        workingHoursText.textContent = data.workingTime;
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

    const data = buttonsData[lang];

    // Update control buttons
    const registerBtn = document.querySelector('#registerButton');
    const loginBtn = document.querySelector('#loginButton');
    
    if (registerBtn) {
        registerBtn.innerHTML = `<i class="fas fa-user-plus"></i> ${data.register}`;
    }
    if (loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${data.login}`;
    }
}

function updateChatbotContent(lang) {
    const chatData = {
        'ar': {
            'header': 'دردشة فاب لاب الأحساء - مدعومة بالذكاء الاصطناعي',
            'placeholder': 'اكتب سؤالك هنا...',
            'send': 'إرسال',
            'welcome': 'مرحبًا! أنا مساعد فاب لاب الأحساء. اسألني عن أي شيء، سواء عن فاب لاب أو أي موضوع آخر!'
        },
        'en': {
            'header': 'Fab Lab Al-Ahsa Chat - Powered by AI',
            'placeholder': 'Type your question here...',
            'send': 'Send',
            'welcome': 'Hello! I am Fab Lab Al-Ahsa assistant. Ask me anything about Fab Lab or any other topic!'
        }
    };

    const data = chatData[lang];
    
    const chatbotHeader = document.querySelector('.chatbot-header span');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send');
    const welcomeMessage = document.querySelector('.chatbot-message.bot');
    
    if (chatbotHeader) chatbotHeader.textContent = data.header;
    if (chatbotInput) chatbotInput.setAttribute('placeholder', data.placeholder);
    if (chatbotSendBtn) chatbotSendBtn.textContent = data.send;
    if (welcomeMessage) welcomeMessage.textContent = data.welcome;
}

function animateButton(element) {
    element.style.transform = 'scale(1.2) rotate(90deg)';
    setTimeout(() => {
        element.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

// Registration and Login
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

    // Close modal functionality
    registerModal.querySelector('.close-modal').addEventListener('click', () => {
        registerModal.remove();
    });

    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.remove();
        }
    });

    // Form submission
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

    // Close modal functionality
    loginModal.querySelector('.close-modal').addEventListener('click', () => {
        loginModal.remove();
    });

    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.remove();
        }
    });

    // Form submission
    loginModal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم تسجيل الدخول بنجاح!');
        loginModal.remove();
    });
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
});

// Tab Functionality for Sections
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
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
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentLang = document.documentElement.lang;
        const message = currentLang === 'ar' ? 'شكراً لتواصلكم! سنرد عليكم في أقرب وقت ممكن.' : 'Thank you for contacting us! We will respond to you as soon as possible.';
        alert(message);
        this.reset();
    });
}

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
document.querySelectorAll('.fablab-sections-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fab Lab Sections page initialized successfully');
    
    // Check for saved language
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== 'ar') {
        toggleLanguage();
    }

    // Hide old chat bot if exists
    const oldChatBot = document.getElementById('chatBot');
    const oldChatBox = document.getElementById('chatBox');
    if (oldChatBot) oldChatBot.style.display = 'none';
    if (oldChatBox) oldChatBox.style.display = 'none';
});