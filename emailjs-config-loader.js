// Secure EmailJS Configuration Loader
// This file loads configuration from external files

class EmailJSConfig {
    constructor() {
        this.config = null;
        this.loadConfig();
    }

    loadConfig() {
        try {
            // Try to load from config.js first
            if (typeof window.EMAILJS_CONFIG !== 'undefined') {
                this.config = window.EMAILJS_CONFIG;
                console.log('EmailJS configuration loaded from config.js');
                return;
            }

            // Fallback: Load from environment variables or default values
            this.config = {
                PUBLIC_KEY: this.getEnvVar('EMAILJS_PUBLIC_KEY') || 'CcyiN8nqCGSPsCFM3',
                SERVICE_ID: this.getEnvVar('EMAILJS_SERVICE_ID') || 'service_us5cu6t',
                TEMPLATES: {
                    APPOINTMENT: this.getEnvVar('EMAILJS_APPOINTMENT_TEMPLATE') || 'template_8xw5z0f',
                    CONTACT: this.getEnvVar('EMAILJS_CONTACT_TEMPLATE') || 'template_fi18lis'
                },
                API_URL: 'https://api.emailjs.com/api/v1.0/email/send'
            };
            console.log('EmailJS configuration loaded from fallback values');
        } catch (error) {
            console.warn('Could not load EmailJS configuration:', error);
            this.config = this.getDefaultConfig();
        }
    }

    getEnvVar(name) {
        // This would work in environments that support process.env
        // For static hosting, you'll need to use config.js approach
        return null;
    }

    getDefaultConfig() {
        return {
            PUBLIC_KEY: 'CcyiN8nqCGSPsCFM3',
            SERVICE_ID: 'service_us5cu6t',
            TEMPLATES: {
                APPOINTMENT: 'template_8xw5z0f',
                CONTACT: 'template_fi18lis'
            },
            API_URL: 'https://api.emailjs.com/api/v1.0/email/send'
        };
    }

    getPublicKey() {
        return this.config?.PUBLIC_KEY || 'CcyiN8nqCGSPsCFM3';
    }

    getServiceId() {
        return this.config?.SERVICE_ID || 'service_us5cu6t';
    }

    getTemplateId(type) {
        return this.config?.TEMPLATES?.[type] || (type === 'APPOINTMENT' ? 'template_8xw5z0f' : 'template_fi18lis');
    }

    isConfigured() {
        return this.config && 
               this.config.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE' &&
               this.config.SERVICE_ID !== 'YOUR_SERVICE_ID_HERE';
    }
}

// Create global instance
window.emailJSConfig = new EmailJSConfig();
