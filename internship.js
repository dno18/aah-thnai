// Star Background Animation
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];
function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
function initStars() {
    stars = [];
    if (!canvas) return;
  
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
    if (!canvas || !ctx) return;
  
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
// Chatbot Functionality
let conversationHistory = [];
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
            أجب عن أسئلة الزوار حول برامج التدريب التعاوني في فاب لاب الأحساء بما في ذلك:
            - برنامج التصميم والتصنيع الرقمي
            - برنامج برمجة وتطوير الروبوتات
            - برنامج تطوير التطبيقات والويب
            - برنامج الإلكترونيات والأنظمة المدمجة
            - برنامج التصميم الجرافيكي والوسائط المتعددة
            - برنامج إدارة المشاريع التقنية
          
            أجب بالعربية بأسلوب ودود ومختصر. السؤال: ${message}`;
          
            console.log('إرسال طلب إلى AI:', message);
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'FabLab Al-Ahsa Internship Chatbot'
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
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotMessages = document.getElementById('chatbot-messages');
      
        if (!chatbotInput || !chatbotMessages) return;
      
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
    updateFooterContent(lang);
    updateButtonsContent(lang);
    updateInternshipContent(lang);
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
            'internship': 'التدريب التعاوني',
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
            'internship': 'Co-op Training',
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
        else if (text === 'التدريب التعاوني' || text === 'Co-op Training') item.textContent = data.internship;
        else if (text === 'العضوية' || text === 'Membership') item.textContent = data.membership;
        else if (text === 'تواصل معنا' || text === 'Contact Us') item.textContent = data.contact;
    });
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
    const registerButtons = document.querySelectorAll('.btn-control');
    registerButtons.forEach(button => {
        const text = button.textContent.trim();
        if (text.includes('تسجيل') || text.includes('Register')) {
            button.innerHTML = `<i class="fas fa-user-plus"></i> ${buttonsData[lang].register}`;
        } else if (text.includes('دخول') || text.includes('Login')) {
            button.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${buttonsData[lang].login}`;
        }
    });
}
function updateInternshipContent(lang) {
    const internshipData = {
        'ar': {
            'heroTitle': 'برنامج التدريب التعاوني',
            'heroSubtitle': 'اكتسب خبرة عملية حقيقية في بيئة إبداعية واحترافية',
            'statTrainees': 'متدرب',
            'statUniversities': 'جامعة شريكة',
            'statEmployment': 'نسبة التوظيف',
            'browsePrograms': 'استعرض البرامج',
            'applyInternship': 'تقديم طلب التدريب',
            'aboutTitle': 'عن برنامج التدريب التعاوني',
            'aboutDescription': 'يهدف برنامج التدريب التعاوني في فاب لاب الأحساء إلى ربط الجانب النظري الأكاديمي بالجانب العملي، حيث نوفر للطلاب بيئة تدريبية متكاملة تحت إشراف مدربين متخصصين في مختلف المجالات التقنية والإبداعية.',
            'feature1Title': 'خبرة عملية حقيقية',
            'feature1Desc': 'تطبيق المعرفة الأكاديمية في مشاريع واقعية',
            'feature2Title': 'إشراف متخصص',
            'feature2Desc': 'متابعة مباشرة من مدربين ذوي خبرة',
            'feature3Title': 'شبكة علاقات مهنية',
            'feature3Desc': 'التواصل مع محترفين في المجال',
            'feature4Title': 'شهادة معتمدة',
            'feature4Desc': 'شهادة تدريب معتمدة من فاب لاب الأحساء',
            'trainingEnvironment': 'بيئة التدريب في فاب لاب',
            'programsTitle': 'برامج التدريب المتاحة',
            'programsSubtitle': 'اختر البرنامج الذي يتوافق مع تخصصك واهتماماتك',
            'program1Title': 'التصميم والتصنيع الرقمي',
            'program1Desc': 'برنامج متخصص في التصميم بمساعدة الحاسوب والتصنيع الرقمي باستخدام الطابعات ثلاثية الأبعاد، CNC، والليزر كت.',
            'program2Title': 'برمجة وتطوير الروبوتات',
            'program2Desc': 'تدريب عملي على تصميم وبرمجة الروبوتات، وتطوير أنظمة التحكم الآلي، وتطبيقات الذكاء الاصطناعي في الروبوتات.',
            'program3Title': 'تطوير التطبيقات والويب',
            'program3Desc': 'تطوير مهارات البرمجة وإنشاء تطبيقات ويب وموبايل متكاملة باستخدام أحدث التقنيات وأطر العمل الحديثة.',
            'program4Title': 'الإلكترونيات والأنظمة المدمجة',
            'program4Desc': 'تصميم وتطوير الدوائر الإلكترونية، وبرمجة الأنظمة المدمجة، وتطبيقات إنترنت الأشياء IoT.',
            'program5Title': 'التصميم الجرافيكي والوسائط المتعددة',
            'program5Desc': 'تطوير مهارات التصميم الجرافيكي، الرسوم المتحركة، وتحرير الفيديو باستخدام البرامج الاحترافية.',
            'program6Title': 'إدارة المشاريع التقنية',
            'program6Desc': 'تعلم منهجيات إدارة المشاريع التقنية، التخطيط، وإدارة الفرق في بيئات التطوير التقني.',
            'startDate': 'موعد البدء:',
            'duration': 'المدة:',
            'availableSeats': 'المقاعد المتاحة:',
            'forStudents': 'لطلاب:',
            'skillsGained': 'المهارات المكتسبة:',
            'applyProgram': 'تقديم للبرنامج',
            'programDetails': 'تفاصيل البرنامج',
            'processTitle': 'خطوات التقديم',
            'step1Title': 'التقديم الإلكتروني',
            'step1Desc': 'املأ نموذج التقديم عبر المنصة الإلكترونية وأرفق المستندات المطلوبة',
            'step2Title': 'مراجعة الطلب',
            'step2Desc': 'سيتم مراجعة طلبك من قبل فريق القبول خلال 5-7 أيام عمل',
            'step3Title': 'المقابلة الشخصية',
            'step3Desc': 'سيتم التواصل معك لإجراء مقابلة شخصية أو عبر الإنترنت',
            'step4Title': 'قبول الطلب',
            'step4Desc': 'ستتلقى رسالة قبول رسمية مع تفاصيل بدء البرنامج',
            'applicationTitle': 'تقديم طلب التدريب التعاوني',
            'applicationSubtitle': 'املأ النموذج أدناه لتقديم طلب الانضمام إلى برنامج التدريب التعاوني',
            'fullName': 'الاسم الكامل',
            'university': 'الجامعة',
            'major': 'التخصص',
            'gpa': 'المعدل التراكمي',
            'email': 'البريد الإلكتروني',
            'phone': 'رقم الجوال',
            'program': 'برنامج التدريب المطلوب',
            'chooseProgram': 'اختر برنامج التدريب',
            'motivation': 'رسالة الدافع',
            'motivationPlaceholder': 'أخبرنا عن دوافعك للانضمام إلى البرنامج وأهدافك من التدريب...',
            'experience': 'الخبرات السابقة (إن وجدت)',
            'experiencePlaceholder': 'اذكر أي خبرات أو مشاريع سابقة ذات صلة...',
            'requiredDocuments': 'المستندات المطلوبة',
            'transcript': 'كشف الدرجات',
            'cv': 'السيرة الذاتية',
            'letter': 'خطاب تعريف من الجامعة',
            'submitApplication': 'تقديم الطلب',
            'partnersTitle': 'الجامعات الشريكة'
        },
        'en': {
            'heroTitle': 'Cooperative Training Program',
            'heroSubtitle': 'Gain real practical experience in a creative and professional environment',
            'statTrainees': 'Trainees',
            'statUniversities': 'Partner Universities',
            'statEmployment': 'Employment Rate',
            'browsePrograms': 'Browse Programs',
            'applyInternship': 'Apply for Training',
            'aboutTitle': 'About the Cooperative Training Program',
            'aboutDescription': 'The cooperative training program at Fab Lab Al-Ahsa aims to link academic theoretical knowledge with practical application, providing students with an integrated training environment under the supervision of specialized trainers in various technical and creative fields.',
            'feature1Title': 'Real Practical Experience',
            'feature1Desc': 'Apply academic knowledge in real-world projects',
            'feature2Title': 'Specialized Supervision',
            'feature2Desc': 'Direct follow-up from experienced trainers',
            'feature3Title': 'Professional Network',
            'feature3Desc': 'Connect with professionals in the field',
            'feature4Title': 'Certified Certificate',
            'feature4Desc': 'Training certificate certified by Fab Lab Al-Ahsa',
            'trainingEnvironment': 'Training Environment at Fab Lab',
            'programsTitle': 'Available Training Programs',
            'programsSubtitle': 'Choose the program that matches your specialization and interests',
            'program1Title': 'Digital Design and Manufacturing',
            'program1Desc': 'Specialized program in computer-aided design and digital manufacturing using 3D printers, CNC, and laser cutting.',
            'program2Title': 'Robotics Programming and Development',
            'program2Desc': 'Practical training on designing and programming robots, developing automated control systems, and AI applications in robotics.',
            'program3Title': 'Application and Web Development',
            'program3Desc': 'Develop programming skills and create integrated web and mobile applications using the latest technologies and modern frameworks.',
            'program4Title': 'Electronics and Embedded Systems',
            'program4Desc': 'Design and develop electronic circuits, program embedded systems, and IoT applications.',
            'program5Title': 'Graphic Design and Multimedia',
            'program5Desc': 'Develop graphic design skills, animation, and video editing using professional software.',
            'program6Title': 'Technical Project Management',
            'program6Desc': 'Learn technical project management methodologies, planning, and team management in technical development environments.',
            'startDate': 'Start Date:',
            'duration': 'Duration:',
            'availableSeats': 'Available Seats:',
            'forStudents': 'For Students:',
            'skillsGained': 'Skills Gained:',
            'applyProgram': 'Apply for Program',
            'programDetails': 'Program Details',
            'processTitle': 'Application Steps',
            'step1Title': 'Online Application',
            'step1Desc': 'Fill out the application form through the online platform and attach required documents',
            'step2Title': 'Application Review',
            'step2Desc': 'Your application will be reviewed by the admissions team within 5-7 working days',
            'step3Title': 'Personal Interview',
            'step3Desc': 'You will be contacted to conduct a personal interview in person or online',
            'step4Title': 'Application Acceptance',
            'step4Desc': 'You will receive an official acceptance letter with program start details',
            'applicationTitle': 'Submit Cooperative Training Application',
            'applicationSubtitle': 'Fill out the form below to submit your application to join the cooperative training program',
            'fullName': 'Full Name',
            'university': 'University',
            'major': 'Major',
            'gpa': 'GPA',
            'email': 'Email',
            'phone': 'Phone Number',
            'program': 'Requested Training Program',
            'chooseProgram': 'Choose Training Program',
            'motivation': 'Motivation Letter',
            'motivationPlaceholder': 'Tell us about your motivations for joining the program and your training goals...',
            'experience': 'Previous Experience (if any)',
            'experiencePlaceholder': 'Mention any relevant previous experiences or projects...',
            'requiredDocuments': 'Required Documents',
            'transcript': 'Transcript',
            'cv': 'CV',
            'letter': 'University Recommendation Letter',
            'submitApplication': 'Submit Application',
            'partnersTitle': 'Partner Universities'
        }
    };
    
    const data = internshipData[lang];
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const statLabels = document.querySelectorAll('.stat-label');
    const heroActions = document.querySelectorAll('.hero-actions a');
    
    if (heroTitle) heroTitle.textContent = data.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = data.heroSubtitle;
    
    if (statLabels.length >= 3) {
        statLabels[0].textContent = data.statTrainees;
        statLabels[1].textContent = data.statUniversities;
        statLabels[2].textContent = data.statEmployment;
    }
    
    if (heroActions.length >= 2) {
        heroActions[0].textContent = data.browsePrograms;
        heroActions[1].textContent = data.applyInternship;
    }
    
    // Update about section
    const aboutTitle = document.querySelector('.about-internship .section-title');
    const aboutDescription = document.querySelector('.about-description');
    const features = document.querySelectorAll('.feature');
    const trainingEnvironment = document.querySelector('.image-placeholder p');
    
    if (aboutTitle) aboutTitle.textContent = data.aboutTitle;
    if (aboutDescription) aboutDescription.textContent = data.aboutDescription;
    if (trainingEnvironment) trainingEnvironment.textContent = data.trainingEnvironment;
    
    if (features.length >= 4) {
        features[0].querySelector('h4').textContent = data.feature1Title;
        features[0].querySelector('p').textContent = data.feature1Desc;
        features[1].querySelector('h4').textContent = data.feature2Title;
        features[1].querySelector('p').textContent = data.feature2Desc;
        features[2].querySelector('h4').textContent = data.feature3Title;
        features[2].querySelector('p').textContent = data.feature3Desc;
        features[3].querySelector('h4').textContent = data.feature4Title;
        features[3].querySelector('p').textContent = data.feature4Desc;
    }
    
    // Update programs section
    const programsTitle = document.querySelector('.internship-programs .section-title');
    const programsSubtitle = document.querySelector('.internship-programs .section-subtitle');
    
    if (programsTitle) programsTitle.textContent = data.programsTitle;
    if (programsSubtitle) programsSubtitle.textContent = data.programsSubtitle;
    
    const programCards = document.querySelectorAll('.program-card');
    if (programCards.length >= 6) {
        programCards[0].querySelector('.program-title').textContent = data.program1Title;
        programCards[0].querySelector('.program-description').textContent = data.program1Desc;
        programCards[1].querySelector('.program-title').textContent = data.program2Title;
        programCards[1].querySelector('.program-description').textContent = data.program2Desc;
        programCards[2].querySelector('.program-title').textContent = data.program3Title;
        programCards[2].querySelector('.program-description').textContent = data.program3Desc;
        programCards[3].querySelector('.program-title').textContent = data.program4Title;
        programCards[3].querySelector('.program-description').textContent = data.program4Desc;
        programCards[4].querySelector('.program-title').textContent = data.program5Title;
        programCards[4].querySelector('.program-description').textContent = data.program5Desc;
        programCards[5].querySelector('.program-title').textContent = data.program6Title;
        programCards[5].querySelector('.program-description').textContent = data.program6Desc;
    }
    
    // Update program details
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        const text = item.textContent.trim();
        if (text.includes('موعد البدء:') || text.includes('Start Date:')) {
            const span = item.querySelector('span');
            if (span) {
                const date = span.textContent.replace('موعد البدء:', '').replace('Start Date:', '').trim();
                span.textContent = `${data.startDate} ${date}`;
            }
        } else if (text.includes('المدة:') || text.includes('Duration:')) {
            const span = item.querySelector('span');
            if (span) {
                const duration = span.textContent.replace('المدة:', '').replace('Duration:', '').trim();
                span.textContent = `${data.duration} ${duration}`;
            }
        } else if (text.includes('المقاعد المتاحة:') || text.includes('Available Seats:')) {
            const span = item.querySelector('span');
            if (span) {
                const seats = span.textContent.replace('المقاعد المتاحة:', '').replace('Available Seats:', '').trim();
                span.textContent = `${data.availableSeats} ${seats}`;
            }
        } else if (text.includes('لطلاب:') || text.includes('For Students:')) {
            const span = item.querySelector('span');
            if (span) {
                const students = span.textContent.replace('لطلاب:', '').replace('For Students:', '').trim();
                span.textContent = `${data.forStudents} ${students}`;
            }
        }
    });
    
    // Update program skills and actions
    const skillsHeaders = document.querySelectorAll('.program-skills h4');
    skillsHeaders.forEach(header => {
        header.textContent = data.skillsGained;
    });
    
    const applyButtons = document.querySelectorAll('.program-actions .btn-primary');
    applyButtons.forEach(button => {
        button.textContent = data.applyProgram;
    });
    
    const detailsButtons = document.querySelectorAll('.program-actions .btn-secondary');
    detailsButtons.forEach(button => {
        button.textContent = data.programDetails;
    });
    
    // Update application process
    const processTitle = document.querySelector('.application-process .section-title');
    if (processTitle) processTitle.textContent = data.processTitle;
    
    const steps = document.querySelectorAll('.step');
    if (steps.length >= 4) {
        steps[0].querySelector('h3').textContent = data.step1Title;
        steps[0].querySelector('p').textContent = data.step1Desc;
        steps[1].querySelector('h3').textContent = data.step2Title;
        steps[1].querySelector('p').textContent = data.step2Desc;
        steps[2].querySelector('h3').textContent = data.step3Title;
        steps[2].querySelector('p').textContent = data.step3Desc;
        steps[3].querySelector('h3').textContent = data.step4Title;
        steps[3].querySelector('p').textContent = data.step4Desc;
    }
    
    // Update application form
    const applicationTitle = document.querySelector('.application-form .section-title');
    const applicationSubtitle = document.querySelector('.application-form .section-subtitle');
    const formLabels = document.querySelectorAll('.form-group label');
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    const submitButton = document.querySelector('.form-submit .btn-primary');
    
    if (applicationTitle) applicationTitle.textContent = data.applicationTitle;
    if (applicationSubtitle) applicationSubtitle.textContent = data.applicationSubtitle;
    if (submitButton) submitButton.textContent = data.submitApplication;
    
    formLabels.forEach(label => {
        const text = label.textContent.trim();
        if (text === 'الاسم الكامل' || text === 'Full Name') label.textContent = data.fullName;
        else if (text === 'الجامعة' || text === 'University') label.textContent = data.university;
        else if (text === 'التخصص' || text === 'Major') label.textContent = data.major;
        else if (text === 'المعدل التراكمي' || text === 'GPA') label.textContent = data.gpa;
        else if (text === 'البريد الإلكتروني' || text === 'Email') label.textContent = data.email;
        else if (text === 'رقم الجوال' || text === 'Phone Number') label.textContent = data.phone;
        else if (text === 'برنامج التدريب المطلوب' || text === 'Requested Training Program') label.textContent = data.program;
        else if (text === 'رسالة الدافع' || text === 'Motivation Letter') label.textContent = data.motivation;
        else if (text === 'الخبرات السابقة (إن وجدت)' || text === 'Previous Experience (if any)') label.textContent = data.experience;
        else if (text === 'المستندات المطلوبة' || text === 'Required Documents') label.textContent = data.requiredDocuments;
    });
    
    formInputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder === 'أخبرنا عن دوافعك للانضمام إلى البرنامج وأهدافك من التدريب...' || 
            placeholder === 'Tell us about your motivations for joining the program and your training goals...') {
            input.setAttribute('placeholder', data.motivationPlaceholder);
        } else if (placeholder === 'اذكر أي خبرات أو مشاريع سابقة ذات صلة...' || 
                   placeholder === 'Mention any relevant previous experiences or projects...') {
            input.setAttribute('placeholder', data.experiencePlaceholder);
        }
    });
    
    // Update select options
    const programSelect = document.getElementById('program');
    if (programSelect) {
        programSelect.innerHTML = `
            <option value="">${data.chooseProgram}</option>
            <option value="digital-design">${data.program1Title}</option>
            <option value="robotics">${data.program2Title}</option>
            <option value="web-development">${data.program3Title}</option>
            <option value="electronics">${data.program4Title}</option>
            <option value="graphic-design">${data.program5Title}</option>
            <option value="project-management">${data.program6Title}</option>
        `;
    }
    
    // Update document labels
    const documentLabels = document.querySelectorAll('.document-item label');
    if (documentLabels.length >= 3) {
        documentLabels[0].textContent = data.transcript;
        documentLabels[1].textContent = data.cv;
        documentLabels[2].textContent = data.letter;
    }
    
    // Update partners section
    const partnersTitle = document.querySelector('.partners-section .section-title');
    if (partnersTitle) partnersTitle.textContent = data.partnersTitle;
}
// Form Validation
function initializeFormValidation() {
    const form = document.querySelector('.internship-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f44336';
                } else {
                    field.style.borderColor = '#9C27B0';
                }
            });
            
            // GPA validation
            const gpaField = document.getElementById('gpa');
            if (gpaField && gpaField.value) {
                const gpa = parseFloat(gpaField.value);
                if (gpa < 0 || gpa > 5) {
                    isValid = false;
                    gpaField.style.borderColor = '#f44336';
                    alert('يرجى إدخال معدل تراكمي بين 0 و 5');
                }
            }
            
            if (isValid) {
                // Show success message
                alert('تم تقديم طلبك بنجاح! سنقوم بالتواصل معك قريبًا.');
                form.reset();
                
                // Reset all border colors
                requiredFields.forEach(field => {
                    field.style.borderColor = '#9C27B0';
                });
            } else {
                alert('يرجى ملء جميع الحقول المطلوبة بشكل صحيح.');
            }
        });
        
        // Reset border color on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#9C27B0';
            });
        });
    }
}
// Button Animation
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}
// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة التدريب التعاوني loaded');
  
    // Initialize chatbot
    initializeChatbot();
  
    // Initialize form validation
    initializeFormValidation();
  
    // Initialize language switch
    if (languageSwitch) {
        languageSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
            animateButton(languageSwitch);
        });
    }
  
    // Load saved language
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
    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header && window.scrollY > 50) {
            header.classList.add('sticky');
        } else if (header) {
            header.classList.remove('sticky');
        }
    });
    
    // Smooth scrolling for anchor links
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
});

