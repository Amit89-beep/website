// Simple Chatbot for Dr. Ajay Chamoli's Website
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.isQuickQuestionsOpen = false;
        this.messages = [];
        this.lastMessageTime = 0;
        this.messageCooldown = 1000; // 1 second cooldown between messages
        this.isMobile = window.innerWidth <= 768;
        this.quickQuestions = [
            { icon: 'fas fa-calendar-alt', text: 'How do I book an appointment?' },
            { icon: 'fas fa-map-marker-alt', text: 'What is your clinic address?' },
            { icon: 'fas fa-clock', text: 'What are your clinic hours?' },
            { icon: 'fas fa-phone', text: 'How can I contact you?' },
            { icon: 'fas fa-pills', text: 'What treatments do you offer?' },
            { icon: 'fas fa-heart', text: 'Do you treat chronic conditions?' },
            { icon: 'fas fa-child', text: 'Do you treat children?' },
            { icon: 'fas fa-female', text: 'Do you treat women\'s health issues?' },
            { icon: 'fas fa-leaf', text: 'What is homeopathy?' },
            { icon: 'fas fa-shield-alt', text: 'Is homeopathy safe?' }
        ];
        this.responses = {
            greeting: [
                "Hello! I'm Dr. Ajay Chamoli's assistant. How can I help you today?",
                "Hi there! Welcome to Nagraja Homeopathy. What would you like to know?",
                "Good day! I'm here to help with any questions about our homeopathic treatments."
            ],
            appointment: [
                "To book an appointment, you can call us at +91-9997815851 or use our online booking form.",
                "You can schedule an appointment by visiting our appointment page or calling our clinic directly.",
                "For appointments, please contact us at +91-9997815851 or fill out the appointment form on our website."
            ],
            location: [
                "Our clinic is located at 45, Dehradun Rd, Manvendera Nagar, Rishikesh, Uttarakhand 249201.",
                "We're situated in Rishikesh, Uttarakhand. You can find us at 45, Dehradun Rd, Manvendera Nagar.",
                "Visit us at 45, Dehradun Rd, Manvendera Nagar, Rishikesh, Uttarakhand 249201."
            ],
            treatment: [
                "Dr. Ajay Chamoli specializes in various homeopathic treatments including chronic conditions, skin problems, thyroid issues, and more.",
                "We offer comprehensive homeopathic treatment for allergies, arthritis, cancer care, child health, and many other conditions.",
                "Our treatments cover a wide range of conditions. You can explore our treatment pages to learn more about specific areas."
            ],
            contact: [
                "You can reach us at +91-9997815851 or email us at drajaychamoli90@gmail.com",
                "Contact us via phone at +91-9997815851 or email at drajaychamoli90@gmail.com",
                "Get in touch with us at +91-9997815851 or drajaychamoli90@gmail.com"
            ],
            hours: [
                "Our clinic hours are Monday to Sunday, 9:00 AM to 7:00 PM.",
                "We're open Monday through Sunday from 9 AM to 7 PM.",
                "Clinic hours: Monday-Sunday 9:00 AM - 7:00 PM."
            ],
            default: [
                "I'm here to help! You can ask me about appointments, treatments, location, or contact information.",
                "Feel free to ask about our services, book an appointment, or get contact details.",
                "How can I assist you today? I can help with appointments, treatments, or general information."
            ]
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.hideBadge();
        this.setupResizeListener();
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbotToggle');
        const close = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');
        const quickQuestionsBtn = document.getElementById('quickQuestionsBtn');

        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChat());
        }

        if (close) {
            close.addEventListener('click', () => this.closeChat());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        if (quickQuestionsBtn) {
            quickQuestionsBtn.addEventListener('click', () => this.toggleQuickQuestions());
        }

        // Add event listeners for common question buttons
        this.setupCommonQuestionButtons();
    }

    setupCommonQuestionButtons() {
        const questionButtons = document.querySelectorAll('.question-btn');
        questionButtons.forEach(button => {
            // Remove any existing event listeners to prevent duplicates
            button.removeEventListener('click', this.handleQuestionClick);
            // Add the event listener
            button.addEventListener('click', this.handleQuestionClick.bind(this));
        });
    }

    handleQuestionClick(event) {
        const question = event.target.getAttribute('data-question');
        if (question) {
            this.selectCommonQuestion(question);
        }
    }

    selectCommonQuestion(questionText) {
        const currentTime = Date.now();
        
        // Prevent duplicate messages within cooldown period
        if (currentTime - this.lastMessageTime < this.messageCooldown) {
            return;
        }
        
        this.lastMessageTime = currentTime;
        
        // Hide common questions after selection
        this.hideCommonQuestions();
        
        // Add user message
        this.addMessage(questionText, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(questionText);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    hideCommonQuestions() {
        const commonQuestions = document.getElementById('commonQuestions');
        if (commonQuestions) {
            commonQuestions.style.display = 'none';
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbotWindow');
        
        if (this.isOpen) {
            window.classList.add('active');
            this.hideBadge();
            this.closeQuickQuestions(); // Close quick questions when opening chat
            
            // Mobile-specific improvements
            if (this.isMobile) {
                // Add mobile-specific class for styling
                window.classList.add('mobile-active');
            }
            
            // Focus on input
            setTimeout(() => {
                const input = document.getElementById('chatbotInput');
                if (input) {
                    input.focus();
                    // Prevent zoom on iOS when focusing input
                    if (this.isMobile) {
                        input.style.fontSize = '16px';
                    }
                }
            }, 300);
        } else {
            window.classList.remove('active');
            this.closeQuickQuestions();
            
            // Remove mobile-specific class
            if (this.isMobile) {
                window.classList.remove('mobile-active');
            }
        }
    }

    toggleQuickQuestions() {
        this.isQuickQuestionsOpen = !this.isQuickQuestionsOpen;
        const panel = document.getElementById('quickQuestionsPanel');
        
        if (this.isQuickQuestionsOpen) {
            this.createQuickQuestionsPanel();
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    }

    createQuickQuestionsPanel() {
        const panel = document.getElementById('quickQuestionsPanel');
        if (!panel) {
            const quickQuestionsContainer = document.querySelector('.chatbot-quick-questions');
            const newPanel = document.createElement('div');
            newPanel.id = 'quickQuestionsPanel';
            newPanel.className = 'quick-questions-panel';
            
            this.quickQuestions.forEach(question => {
                const questionItem = document.createElement('div');
                questionItem.className = 'quick-question-item';
                questionItem.innerHTML = `
                    <i class="${question.icon}"></i>
                    ${question.text}
                `;
                questionItem.addEventListener('click', () => {
                    this.selectQuickQuestion(question.text);
                });
                newPanel.appendChild(questionItem);
            });
            
            quickQuestionsContainer.appendChild(newPanel);
        }
    }

    selectQuickQuestion(questionText) {
        // Add user message
        this.addMessage(questionText, 'user');
        
        // Close quick questions panel
        this.closeQuickQuestions();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(questionText);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    closeQuickQuestions() {
        this.isQuickQuestionsOpen = false;
        const panel = document.getElementById('quickQuestionsPanel');
        if (panel) {
            panel.classList.remove('active');
        }
    }

    closeChat() {
        this.isOpen = false;
        const window = document.getElementById('chatbotWindow');
        window.classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;

        const currentTime = Date.now();
        
        // Prevent duplicate messages within cooldown period
        if (currentTime - this.lastMessageTime < this.messageCooldown) {
            return;
        }
        
        this.lastMessageTime = currentTime;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Generate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store message
        this.messages.push({ text, sender, timestamp: now });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <p>Dr. Ajay Chamoli is typing...</p>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for keywords and return appropriate response
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return this.getRandomResponse('greeting');
        }
        
        if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
            return this.getRandomResponse('appointment');
        }
        
        if (message.includes('location') || message.includes('address') || message.includes('where') || message.includes('rishikesh')) {
            return this.getRandomResponse('location');
        }
        
        if (message.includes('treatment') || message.includes('therapy') || message.includes('medicine') || message.includes('homeopathy')) {
            return this.getRandomResponse('treatment');
        }
        
        if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('call')) {
            return this.getRandomResponse('contact');
        }
        
        if (message.includes('hours') || message.includes('time') || message.includes('open') || message.includes('closed')) {
            return this.getRandomResponse('hours');
        }
        
        // Default response
        return this.getRandomResponse('default');
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    showBadge() {
        const badge = document.getElementById('chatbotBadge');
        if (badge) {
            badge.style.display = 'flex';
        }
    }

    hideBadge() {
        const badge = document.getElementById('chatbotBadge');
        if (badge) {
            badge.style.display = 'none';
        }
    }
}

// Initialize chatbot when DOM is loaded
let chatbotInstance = null;

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize chatbot on desktop devices (screen width > 768px)
    if (window.innerWidth > 768) {
        chatbotInstance = new Chatbot();
    }
});

// Show badge after 5 seconds if user hasn't interacted (desktop only)
setTimeout(() => {
    if (chatbotInstance && !chatbotInstance.isOpen) {
        chatbotInstance.showBadge();
    }
}, 5000);
