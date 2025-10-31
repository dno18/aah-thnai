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
    updateVolunteerContent(lang);
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
function updateVolunteerContent(lang) {
    const volunteerData = {
        'ar': {
            'heroTitle': 'التطوع في فاب لاب الأحساء',
            'heroSubtitle': 'انضم إلى فريقنا من المتطوعين وساهم في بناء مجتمع مبتكر',
            'statVolunteers': 'متطوع',
            'statProjects': 'مشروع تطوعي',
            'statHours': 'ساعة تطوع',
            'opportunitiesTitle': 'فرص التطوع المتاحة',
            'opportunitiesSubtitle': 'اختر الفرصة المناسبة لمهاراتك واهتماماتك',
            'badgeUrgent': 'مطلوب بشدة',
            'badgeNew': 'جديد',
            'badgeRemote': 'عن بعد',
            'badgeLimited': 'محدود',
            'badgeSeasonal': 'موسمي',
            'startDate': 'تاريخ البدء:',
            'duration': 'مدة التطوع:',
            'volunteersNeeded': 'عدد المتطوعين المطلوبين:',
            'requirements': 'المتطلبات:',
            'registerOpportunity': 'تسجيل في الفرصة',
            'moreDetails': 'المزيد من التفاصيل',
            'benefitsTitle': 'مزايا التطوع في فاب لاب الأحساء',
            'benefitCertificate': 'شهادة تطوع',
            'benefitCertificateDesc': 'احصل على شهادة معتمدة تثبت خبرتك التطوعية في فاب لاب الأحساء',
            'benefitTraining': 'تدريب مجاني',
            'benefitTrainingDesc': 'استفد من الدورات والورش التدريبية المجانية في مختلف المجالات التقنية',
            'benefitNetwork': 'شبكة علاقات',
            'benefitNetworkDesc': 'انضم إلى مجتمع من المبتكرين وابنِ شبكة علاقات مهنية قوية',
            'benefitOpportunities': 'فرص وظيفية',
            'benefitOpportunitiesDesc': 'احصل على أولوية في التوظيف عند توفر فرص عمل في فاب لاب أو شركائنا',
            'faqTitle': 'الأسئلة الشائعة',
            'faq1Question': 'ما هي شروط التطوع في فاب لاب الأحساء؟',
            'faq1Answer': 'يشترط للتطوع في فاب لاب الأحساء أن يكون المتطوع عمره 18 سنة فما فوق، وأن يمتلك المهارات المطلوبة للفرصة التطوعية، وأن يكون لديه الرغبة الحقيقية في المساهمة في بناء المجتمع.',
            'faq2Question': 'هل يمكنني التطوع عن بعد؟',
            'faq2Answer': 'نعم، نوفر فرص تطوع عن بعد في مجالات مثل إدارة وسائل التواصل الاجتماعي، التصميم الجرافيكي، البرمجة، وغيرها من المجالات التي لا تتطلب الحضور الشخصي.',
            'faq3Question': 'كم عدد ساعات التطوع المطلوبة أسبوعياً؟',
            'faq3Answer': 'يختلف عدد الساعات المطلوبة حسب الفرصة التطوعية، ولكن معظم الفرص تتطلب من 5 إلى 10 ساعات أسبوعياً. يمكنك اختيار الفرصة التي تناسب وقتك وتوافرك.',
            'faq4Question': 'هل أحتاج إلى خبرة سابقة للتطوع؟',
            'faq4Answer': 'تختلف المتطلبات حسب الفرصة التطوعية. بعض الفرص تتطلب خبرة سابقة، بينما نوفر فرصاً أخرى للمبتدئين مع تقديم التدريب اللازم.'
        },
        'en': {
            'heroTitle': 'Volunteering at Fab Lab Al-Ahsa',
            'heroSubtitle': 'Join our team of volunteers and contribute to building an innovative community',
            'statVolunteers': 'Volunteers',
            'statProjects': 'Volunteer Projects',
            'statHours': 'Volunteer Hours',
            'opportunitiesTitle': 'Available Volunteer Opportunities',
            'opportunitiesSubtitle': 'Choose the opportunity that matches your skills and interests',
            'badgeUrgent': 'Urgently Needed',
            'badgeNew': 'New',
            'badgeRemote': 'Remote',
            'badgeLimited': 'Limited',
            'badgeSeasonal': 'Seasonal',
            'startDate': 'Start Date:',
            'duration': 'Duration:',
            'volunteersNeeded': 'Volunteers Needed:',
            'requirements': 'Requirements:',
            'registerOpportunity': 'Register for Opportunity',
            'moreDetails': 'More Details',
            'benefitsTitle': 'Benefits of Volunteering at Fab Lab Al-Ahsa',
            'benefitCertificate': 'Volunteer Certificate',
            'benefitCertificateDesc': 'Get a certified certificate proving your volunteer experience at Fab Lab Al-Ahsa',
            'benefitTraining': 'Free Training',
            'benefitTrainingDesc': 'Benefit from free courses and training workshops in various technical fields',
            'benefitNetwork': 'Networking',
            'benefitNetworkDesc': 'Join a community of innovators and build a strong professional network',
            'benefitOpportunities': 'Career Opportunities',
            'benefitOpportunitiesDesc': 'Get priority in employment when job opportunities become available at Fab Lab or our partners',
            'faqTitle': 'Frequently Asked Questions',
            'faq1Question': 'What are the conditions for volunteering at Fab Lab Al-Ahsa?',
            'faq1Answer': 'To volunteer at Fab Lab Al-Ahsa, the volunteer must be 18 years or older, possess the required skills for the volunteer opportunity, and have a genuine desire to contribute to community building.',
            'faq2Question': 'Can I volunteer remotely?',
            'faq2Answer': 'Yes, we provide remote volunteering opportunities in areas such as social media management, graphic design, programming, and other fields that do not require physical presence.',
            'faq3Question': 'How many volunteer hours are required weekly?',
            'faq3Answer': 'The number of required hours varies depending on the volunteer opportunity, but most opportunities require 5 to 10 hours per week. You can choose the opportunity that fits your time and availability.',
            'faq4Question': 'Do I need previous experience to volunteer?',
            'faq4Answer': 'Requirements vary by volunteer opportunity. Some opportunities require previous experience, while we provide other opportunities for beginners with necessary training.'
        }
    };
    
    const data = volunteerData[lang];
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const statLabels = document.querySelectorAll('.stat-label');
    
    if (heroTitle) heroTitle.textContent = data.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = data.heroSubtitle;
    
    if (statLabels.length >= 3) {
        statLabels[0].textContent = data.statVolunteers;
        statLabels[1].textContent = data.statProjects;
        statLabels[2].textContent = data.statHours;
    }
    
    // Update opportunities section
    const opportunitiesTitle = document.querySelector('.volunteer-opportunities .section-title');
    const opportunitiesSubtitle = document.querySelector('.volunteer-opportunities .section-subtitle');
    
    if (opportunitiesTitle) opportunitiesTitle.textContent = data.opportunitiesTitle;
    if (opportunitiesSubtitle) opportunitiesSubtitle.textContent = data.opportunitiesSubtitle;
    
    // Update opportunity cards
    const opportunityBadges = document.querySelectorAll('.opportunity-badge');
    opportunityBadges.forEach(badge => {
        const text = badge.textContent.trim();
        if (text === 'مطلوب بشدة' || text === 'Urgently Needed') {
            badge.textContent = data.badgeUrgent;
        } else if (text === 'جديد' || text === 'New') {
            badge.textContent = data.badgeNew;
        } else if (text === 'عن بعد' || text === 'Remote') {
            badge.textContent = data.badgeRemote;
        } else if (text === 'محدود' || text === 'Limited') {
            badge.textContent = data.badgeLimited;
        } else if (text === 'موسمي' || text === 'Seasonal') {
            badge.textContent = data.badgeSeasonal;
        }
    });
    
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        const text = item.textContent.trim();
        if (text.includes('تاريخ البدء:') || text.includes('Start Date:')) {
            const span = item.querySelector('span');
            if (span) {
                const date = span.textContent.replace('تاريخ البدء:', '').replace('Start Date:', '').trim();
                span.textContent = `${data.startDate} ${date}`;
            }
        } else if (text.includes('مدة التطوع:') || text.includes('Duration:')) {
            const span = item.querySelector('span');
            if (span) {
                const duration = span.textContent.replace('مدة التطوع:', '').replace('Duration:', '').trim();
                span.textContent = `${data.duration} ${duration}`;
            }
        } else if (text.includes('عدد المتطوعين المطلوبين:') || text.includes('Volunteers Needed:')) {
            const span = item.querySelector('span');
            if (span) {
                const count = span.textContent.replace('عدد المتطوعين المطلوبين:', '').replace('Volunteers Needed:', '').trim();
                span.textContent = `${data.volunteersNeeded} ${count}`;
            }
        }
    });
    
    const requirementsHeaders = document.querySelectorAll('.opportunity-requirements h4');
    requirementsHeaders.forEach(header => {
        header.textContent = data.requirements;
    });
    
    const registerButtons = document.querySelectorAll('.btn-primary');
    registerButtons.forEach(button => {
        button.textContent = data.registerOpportunity;
    });
    
    const moreDetailsButtons = document.querySelectorAll('.btn-secondary');
    moreDetailsButtons.forEach(button => {
        button.textContent = data.moreDetails;
    });
    
    // Update benefits section
    const benefitsTitle = document.querySelector('.benefits-section .section-title');
    if (benefitsTitle) benefitsTitle.textContent = data.benefitsTitle;
    
    const benefitCards = document.querySelectorAll('.benefit-card');
    if (benefitCards.length >= 4) {
        benefitCards[0].querySelector('h3').textContent = data.benefitCertificate;
        benefitCards[0].querySelector('p').textContent = data.benefitCertificateDesc;
        
        benefitCards[1].querySelector('h3').textContent = data.benefitTraining;
        benefitCards[1].querySelector('p').textContent = data.benefitTrainingDesc;
        
        benefitCards[2].querySelector('h3').textContent = data.benefitNetwork;
        benefitCards[2].querySelector('p').textContent = data.benefitNetworkDesc;
        
        benefitCards[3].querySelector('h3').textContent = data.benefitOpportunities;
        benefitCards[3].querySelector('p').textContent = data.benefitOpportunitiesDesc;
    }
    
    // Update FAQ section
    const faqTitle = document.querySelector('.faq-section .section-title');
    if (faqTitle) faqTitle.textContent = data.faqTitle;
    
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length >= 4) {
        faqItems[0].querySelector('.faq-question h3').textContent = data.faq1Question;
        faqItems[0].querySelector('.faq-answer p').textContent = data.faq1Answer;
        
        faqItems[1].querySelector('.faq-question h3').textContent = data.faq2Question;
        faqItems[1].querySelector('.faq-answer p').textContent = data.faq2Answer;
        
        faqItems[2].querySelector('.faq-question h3').textContent = data.faq3Question;
        faqItems[2].querySelector('.faq-answer p').textContent = data.faq3Answer;
        
        faqItems[3].querySelector('.faq-question h3').textContent = data.faq4Question;
        faqItems[3].querySelector('.faq-answer p').textContent = data.faq4Answer;
    }
}
// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
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
    console.log('صفحة التطوع loaded');
  
    // Initialize chatbot
    initializeChatbot();
  
    // Initialize FAQ
    initializeFAQ();
  
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
});