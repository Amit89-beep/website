// EmailJS Configuration Example
// Copy this file to config.js and add your actual keys

const EMAILJS_CONFIG = {
    // Your EmailJS Public Key (starts with 'user_')
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
    
    // Your EmailJS Service ID (starts with 'service_')
    SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
    
    // Your Email Templates
    TEMPLATES: {
        APPOINTMENT: 'YOUR_APPOINTMENT_TEMPLATE_ID',
        CONTACT: 'YOUR_CONTACT_TEMPLATE_ID'
    },
    
    // EmailJS API URL
    API_URL: 'https://api.emailjs.com/api/v1.0/email/send'
};

// Make it available globally
window.EMAILJS_CONFIG = EMAILJS_CONFIG;
