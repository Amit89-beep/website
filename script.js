// Initialize EmailJS
(function() {
    // Load configuration from external config files
    console.log('Loading EmailJS configuration...');
    console.log('window.emailJSConfig:', window.emailJSConfig);
    
    const publicKey = window.emailJSConfig ? window.emailJSConfig.getPublicKey() : 'CcyiN8nqCGSPsCFM3';
    console.log('Using public key:', publicKey);
    
    // Only initialize if a real key is provided
    if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(publicKey);
        window.emailjsConfigured = true;
        console.log('EmailJS initialized successfully with public key:', publicKey.substring(0, 8) + '...');
    } else {
        window.emailjsConfigured = false;
        console.warn('EmailJS not configured. Please update your public key in config.js');
    }
})();

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
const appointmentModal = document.getElementById('appointmentModal');
const modalClose = document.getElementById('modalClose');
const appointmentForm = document.querySelector('.appointment-form');

// Mobile menu elements
const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupSmoothScrolling();
    setupFormValidation();
    setupContactForm();
});

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close menu when clicking on links
        const navLinks = mainNav.querySelectorAll('.main-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Legacy mobile menu toggle (if exists)
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', closeAppointmentModal);
    }
    if (appointmentModal) {
        appointmentModal.addEventListener('click', function(e) {
            if (e.target === appointmentModal) {
                closeAppointmentModal();
            }
        });
    }
    
    // Appointment form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmission);
    }
    
    // Contact form submission - handled by setupContactForm()
    // Removed duplicate handler to prevent double submission
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            nav.classList.remove('active');
        });
    });
}

// Open Appointment Modal
function openAppointmentModal() {
    appointmentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Appointment Modal
function closeAppointmentModal() {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Handle Appointment Form Submission
function handleAppointmentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(appointmentForm);
    const appointmentData = {
        name: formData.get('name') || document.querySelector('input[type="text"]').value,
        email: formData.get('email') || document.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || document.querySelector('input[type="tel"]').value,
        date: formData.get('date') || document.querySelector('input[type="date"]').value,
        time: formData.get('time') || document.querySelector('select').value,
        reason: formData.get('reason') || document.querySelector('textarea').value
    };
    
    // Validate form
    if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || !appointmentData.date || !appointmentData.time) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate appointment booking
    showNotification('Appointment booked successfully! We will contact you soon to confirm.', 'success');
    
    // Reset form
    appointmentForm.reset();
    
    // Close modal
    setTimeout(() => {
        closeAppointmentModal();
    }, 2000);
}

// Handle Contact Form Submission - REMOVED
// This function was causing conflicts by opening mailto instead of using EmailJS
// Contact form is now handled by setupContactForm() function

// Handle Newsletter Subscription
function handleNewsletterSubmission(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    // Simulate subscription
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    
    // Reset form
    e.target.reset();
}

// Form Validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

// Validate Individual Field
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update field appearance
    if (isValid) {
        field.classList.remove('error');
        field.style.borderColor = '#4a7c59';
        removeErrorMessage(field);
    } else {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show Field Error
function showFieldError(field, message) {
    removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.25rem;';
    
    field.parentNode.appendChild(errorDiv);
}

// Remove Field Error
function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#4a7c59'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add CSS for animations and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        padding: 1rem;
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav.active .nav-link {
        display: block;
        padding: 0.5rem;
        border-bottom: 1px solid #eee;
    }
    
    .nav.active .nav-link:last-child {
        border-bottom: none;
    }
    
    .field-error {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
    
    input.error,
    textarea.error,
    select.error {
        border-color: #e74c3c !important;
    }
    
    .notification {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
        
        .nav.active {
            display: block;
        }
    }
`;
document.head.appendChild(style);

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2c5530, #4a7c59);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 1000;
    display: none;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

scrollToTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
});


// Global toggle function for HTML onclick
function toggleMenu() {
    console.log('toggleMenu function called'); // Debug log
    const mainNav = document.querySelector('.main-nav');
    const menuBtn = document.querySelector('.menu-btn');
    
    console.log('mainNav found:', !!mainNav); // Debug log
    console.log('menuBtn found:', !!menuBtn); // Debug log
    
    if (mainNav) {
        console.log('Before toggle - mainNav classes:', mainNav.className); // Debug log
        mainNav.classList.toggle('active');
        console.log('After toggle - mainNav classes:', mainNav.className); // Debug log
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
        console.log('Menu active:', mainNav.classList.contains('active')); // Debug log
    } else {
        console.error('mainNav element not found!'); // Debug log
    }
}

// EmailJS Functions
function sendAppointmentEmail(formData) {
    const templateParams = {
        to_name: 'Dr. Ajay Chamoli',
        from_name: formData.get('firstName') + ' ' + formData.get('lastName'),
        from_email: formData.get('email'),
        phone: formData.get('phone'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        appointment_date: formData.get('appointmentDate'),
        appointment_time: formData.get('appointmentTime'),
        consultation_type: formData.get('consultationType'),
        condition: formData.get('condition'),
        symptoms: formData.get('symptoms'),
        previous_treatment: formData.get('previousTreatment'),
        emergency_contact: formData.get('emergencyContact'),
        message: `New appointment request from ${formData.get('firstName')} ${formData.get('lastName')}`
    };

    // Get service ID and template ID from configuration
    const serviceId = window.emailJSConfig ? window.emailJSConfig.getServiceId() : 'service_us5cu6t';
    const templateId = window.emailJSConfig ? window.emailJSConfig.getTemplateId('APPOINTMENT') : 'template_8xw5z0f';
    
    console.log('Sending appointment email with:', { serviceId, templateId, templateParams });
    
    return emailjs.send(serviceId, templateId, templateParams);
}

function sendContactEmail(formData) {
    const templateParams = {
        to_name: 'Dr. Ajay Chamoli',
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Get service ID and template ID from configuration
    const serviceId = window.emailJSConfig ? window.emailJSConfig.getServiceId() : 'service_us5cu6t';
    const templateId = window.emailJSConfig ? window.emailJSConfig.getTemplateId('CONTACT') : 'template_fi18lis';
    
    console.log('Sending contact email with:', { serviceId, templateId, templateParams });
    
    return emailjs.send(serviceId, templateId, templateParams);
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Contact Form Setup
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('Setting up contact form with EmailJS...');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            console.log('Contact form submitted, preventing default behavior');
            
            // Check if EmailJS is properly configured
            if (!window.emailjsConfigured || !emailjs) {
                console.error('EmailJS not configured');
                showNotification('Email service is not configured yet. Please contact us directly at drajaychamoli90@gmail.com', 'error');
                return;
            }
            
            // Validate form
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#4a7c59';
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = new FormData(contactForm);
            
            // Send email using EmailJS
            sendContactEmail(formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Message sent successfully! We will get back to you soon.', 'success');
                    contactForm.reset(); // Reset the form
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    showNotification('Failed to send message. Please try again or contact us directly at drajaychamoli90@gmail.com', 'error');
                })
                .finally(function() {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

