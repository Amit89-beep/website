// EmailJS Configuration - Your Current Keys
// This file contains your actual EmailJS keys and templates

const EMAILJS_CONFIG = {
    // Your EmailJS Public Key
    PUBLIC_KEY: 'CcyiN8nqCGSPsCFM3',
    
    // Your EmailJS Service ID
    SERVICE_ID: 'service_us5cu6t',
    
    // Your Email Templates
    TEMPLATES: {
        APPOINTMENT: 'template_8xw5z0f',
        CONTACT: 'template_fi18lis'
    },
    
    // EmailJS API URL
    API_URL: 'https://api.emailjs.com/api/v1.0/email/send'
};

// Make it available globally
window.EMAILJS_CONFIG = EMAILJS_CONFIG;
