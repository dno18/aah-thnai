// media.js - ملف JavaScript الكامل للشات بوت في المركز الإعلامي

document.addEventListener('DOMContentLoaded', function() {
    // Initialize star background
    initStarBackground();
    
    // Initialize category switching
    initCategorySwitching();
    
    // Initialize sticky header
    initStickyHeader();
    
    // Initialize chat bot
    initChatBot();
    
    // Initialize dropdown menus
    initDropdownMenus();
    
    // Initialize video functionality
    initVideoModal();
    
    // Initialize load more functionality
    initLoadMore();
    
    // Initialize chatbot functionality
    initChatbot();
});

// Star Background Animation
function initStarBackground() {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 100;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const stars = [];
    const starCount = 200;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5,
            opacity: Math.random() * 0.8 + 0.2
        });
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            // Move stars
            star.y += star.speed;
            
            // Reset star if it goes off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
}

// Category Switching
function initCategorySwitching() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categories = document.querySelectorAll('.media-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected category
            categories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === `${category}-category`) {
                    cat.classList.add('active');
                }
            });
        });
    });
    
    // Set initial active category
    if (categoryBtns.length > 0) {
        categoryBtns[0].classList.add('active');
    }
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Chat Bot
function initChatBot() {
    const chatBot = document.getElementById('chatBot');
    if (!chatBot) return;
    
    const chatIcon = chatBot.querySelector('i');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.querySelector('.close-chat');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    
    // Toggle chat box
    chatIcon.addEventListener('click', function() {
        chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close chat box
    closeChat.addEventListener('click', function() {
        chatBox.style.display = 'none';
    });
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

// Send Chat Message
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.textContent = message;
    chatBody.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Simulate bot response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        
        // Simple response logic
        let response = '';
        if (message.includes('مرحبا') || message.includes('اهلا') || message.includes('السلام')) {
            response = 'مرحباً بك في فاب لاب الأحساء! كيف يمكنني مساعدتك؟';
        } else if (message.includes('دورة') || message.includes('تدريب') || message.includes('ورشة')) {
            response = 'نقدم مجموعة متنوعة من الدورات والورش التدريبية. يمكنك زيارة قسم الدورات على موقعنا لمزيد من المعلومات.';
        } else if (message.includes('سجل') || message.includes('تسجيل') || message.includes('انضم')) {
            response = 'للتسجيل في أي من برامجنا، يمكنك زيارة قسم "انضم إلينا" على موقعنا أو التواصل معنا عبر البريد الإلكتروني.';
        } else if (message.includes('ساعات') || message.includes('وقت') || message.includes('يفتح')) {
            response = 'فاب لاب الأحساء مفتوح من الأحد إلى الخميس من الساعة 8 صباحاً حتى 8 مساءً.';
        } else {
            response = 'شكراً لرسالتك! فريق الدعم سيرد عليك قريباً. للاستفسارات العاجلة، يمكنك الاتصال بنا على 40004-58-013';
        }
        
        botMessage.textContent = response;
        chatBody.appendChild(botMessage);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Dropdown Menus
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.visibility = 'visible';
                menu.style.opacity = '1';
            }, 10);
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.dropdown-menu');
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
            setTimeout(() => {
                menu.style.display = 'none';
            }, 300);
        });
    });
}

// Video Modal Functionality
function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-video">
                <iframe src="" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(videoModal);

    const closeModal = videoModal.querySelector('.close-modal');
    const modalIframe = videoModal.querySelector('iframe');

    // Open modal on video card click
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real implementation, you would use the actual video URL
            const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
            modalIframe.src = videoUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        videoModal.classList.remove('active');
        modalIframe.src = '';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });
}

// Load More Functionality
function initLoadMore() {
    // Load More News
    const loadMoreNews = document.getElementById('loadMoreNews');
    if (loadMoreNews) {
        loadMoreNews.addEventListener('click', function() {
            loadMoreItems('news', this);
        });
    }
    
    // Load More Videos
    const loadMoreVideos = document.querySelector('#media-category .load-more-btn');
    if (loadMoreVideos) {
        loadMoreVideos.addEventListener('click', function() {
            loadMoreItems('videos', this);
        });
    }
    
    // Load More Reports
    const loadMoreReports = document.getElementById('loadMoreReports');
    if (loadMoreReports) {
        loadMoreReports.addEventListener('click', function() {
            loadMoreItems('reports', this);
        });
    }
}

// Generic function to load more items
function loadMoreItems(type, button) {
    let grid, items, currentVisible, totalItems;
    
    switch(type) {
        case 'news':
            grid = document.querySelector('.news-grid');
            items = document.querySelectorAll('.news-card');
            break;
        case 'videos':
            grid = document.querySelector('.videos-grid');
            items = document.querySelectorAll('.video-card');
            break;
        case 'reports':
            grid = document.querySelector('.reports-grid');
            items = document.querySelectorAll('.report-card');
            break;
    }
    
    if (!grid || !items.length) return;
    
    // Calculate currently visible items
    currentVisible = Array.from(items).filter(item => 
        item.style.display !== 'none' && 
        window.getComputedStyle(item).display !== 'none'
    ).length;
    
    totalItems = items.length;
    
    // Show loading state
    button.classList.add('loading');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
    button.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        // Show next 3 items
        const nextIndex = currentVisible;
        const endIndex = Math.min(nextIndex + 3, totalItems);
        
        for (let i = nextIndex; i < endIndex; i++) {
            if (items[i]) {
                items[i].style.display = 'block';
            }
        }
        
        // Hide button if all items are visible
        if (endIndex >= totalItems) {
            button.classList.add('hidden');
        }
        
        // Reset button state
        button.classList.remove('loading');
        button.innerHTML = originalText;
        button.disabled = false;
        
    }, 800);
}

// Initialize items display on page load
function initItemsDisplay() {
    // Initially show only first 3 items in each category
    const categories = ['news', 'videos', 'reports'];
    
    categories.forEach(category => {
        let items;
        switch(category) {
            case 'news':
                items = document.querySelectorAll('.news-card');
                break;
            case 'videos':
                items = document.querySelectorAll('.video-card');
                break;
            case 'reports':
                items = document.querySelectorAll('.report-card');
                break;
        }
        
        // Show first 3 items
        items.forEach((item, index) => {
            if (index < 3) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Add more videos dynamically
function addMoreVideos() {
    const videosGrid = document.querySelector('.videos-grid');
    if (!videosGrid) return;
    
    const additionalVideos = [
        {
            title: "ورشة البرمجة للأطفال",
            description: "جولة داخل ورشة البرمجة المخصصة للأطفال التي تهدف إلى تنمية مهارات التفكير المنطقي.",
            date: "15 فبراير 2025",
            views: "4,321",
            duration: "4:50"
        },
        {
            title: "تصميم الدوائر الإلكترونية",
            description: "ورشة عملية لتعلم تصميم وبرمجة الدوائر الإلكترونية باستخدام الأردوينو.",
            date: "8 فبراير 2025",
            views: "5,678",
            duration: "6:15"
        },
        {
            title: "مشاريع التخرج المبتكرة",
            description: "عرض لأبرز مشاريع التخرج التي تم تطويرها في فاب لاب الأحساء.",
            date: "1 فبراير 2025",
            views: "7,890",
            duration: "5:30"
        }
    ];
    
    additionalVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <img src="{% static 'users/images/media/video-placeholder.jpg' %}" alt="${video.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-content">
                <h4>${video.title}</h4>
                <p>${video.description}</p>
                <div class="video-stats">
                    <span><i class="fas fa-calendar"></i> ${video.date}</span>
                    <span><i class="fas fa-eye"></i> ${video.views} مشاهدة</span>
                </div>
            </div>
        `;
        videosGrid.appendChild(videoCard);
    });
    
    // Re-initialize video modal for new videos
    initVideoModal();
}

// Language Switch (Placeholder)
const languageSwitch = document.getElementById('languageSwitch');
if (languageSwitch) {
    languageSwitch.addEventListener('click', function(e) {
        e.preventDefault();
        alert('سيتم إضافة خاصية تغيير اللغة قريباً');
    });
}

// Register/Login Buttons (Placeholder)
const registerButton = document.getElementById('registerButton');
if (registerButton) {
    registerButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('سيتم توجيهك إلى صفحة التسجيل قريباً');
    });
}

const loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('سيتم توجيهك إلى صفحة الدخول قريباً');
    });
}

// ========== CHATBOT FUNCTIONALITY ==========

let conversationHistory = [];

function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Check if all chatbot elements exist
    if (!chatbotToggle || !chatbotContainer || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotMessages) {
        console.warn('Some chatbot elements not found. Ensure all chatbot elements are present in the HTML.');
        return;
    }

    // Toggle chatbot container
    chatbotToggle.addEventListener('click', () => {
        console.log('Toggling chatbot container');
        chatbotContainer.classList.toggle('active');
    });

    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        console.log('Closing chatbot container');
        chatbotContainer.classList.remove('active');
    });

    // Send message on button click
    chatbotSend.addEventListener('click', async () => {
        await handleChatbotSend();
    });

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChatbotSend();
        }
    });
}

// Add message to chatbot
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

// Handle sending chatbot message
async function handleChatbotSend() {
    const chatbotInput = document.getElementById('chatbot-input');
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';

    // Show loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'chatbot-message bot';
    loadingMessage.textContent = 'جارٍ المعالجة...';
    document.getElementById('chatbot-messages').appendChild(loadingMessage);
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;

    // Get bot response
    const botResponse = await sendMessageToOpenRouter(message);
    
    // Remove loading message and add bot response
    setTimeout(() => {
        loadingMessage.remove();
        addMessage(botResponse);
    }, 500);
}

// Send message to OpenRouter API
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

// Initialize items display on page load
initItemsDisplay();