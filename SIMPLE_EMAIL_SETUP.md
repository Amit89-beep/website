# Simple Email Setup (No EmailJS Required)

## 🚀 **Quick Alternative Setup (2 minutes)**

If you prefer not to use EmailJS, here's a simpler approach using direct email links:

### Option 1: Direct Mailto Links

#### Update Appointment Form
Replace the form submission with a mailto link:

```html
<!-- In appointment.html, replace the form with: -->
<form class="appointment-form-detailed" id="appointmentForm" action="mailto:info@nagrajahomoeopathic.com" method="post" enctype="text/plain">
    <!-- Keep all your existing form fields -->
</form>
```

#### Update Contact Form
```html
<!-- In index.html, replace the contact form with: -->
<form class="contact-form" action="mailto:info@nagrajahomoeopathic.com" method="post" enctype="text/plain">
    <!-- Keep all your existing form fields -->
</form>
```

### Option 2: Formspree Integration (Recommended)

#### Step 1: Sign up for Formspree
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Verify your email

#### Step 2: Create Forms
1. Create a new form for appointments
2. Create a new form for contact messages
3. Get your form endpoints (e.g., `https://formspree.io/f/abc123`)

#### Step 3: Update Forms
```html
<!-- Appointment form -->
<form class="appointment-form-detailed" id="appointmentForm" action="https://formspree.io/f/YOUR_APPOINTMENT_FORM_ID" method="POST">
    <!-- Keep all your existing form fields -->
</form>

<!-- Contact form -->
<form class="contact-form" action="https://formspree.io/f/YOUR_CONTACT_FORM_ID" method="POST">
    <!-- Keep all your existing form fields -->
</form>
```

### Option 3: Netlify Forms (If hosting on Netlify)

#### Step 1: Add netlify attribute
```html
<!-- Add netlify attribute to forms -->
<form class="appointment-form-detailed" id="appointmentForm" name="appointment" method="POST" netlify>
    <!-- Keep all your existing form fields -->
</form>

<form class="contact-form" name="contact" method="POST" netlify>
    <!-- Keep all your existing form fields -->
</form>
```

#### Step 2: Deploy to Netlify
1. Upload your files to Netlify
2. Forms will automatically work
3. Check Netlify dashboard for submissions

## 📧 **Email Templates for Manual Setup**

### Appointment Email Template
```
Subject: New Appointment Request - [Patient Name]

New Appointment Request Received!

Patient Details:
- Name: [First Name] [Last Name]
- Email: [Email]
- Phone: [Phone]
- Age: [Age]
- Gender: [Gender]

Appointment Details:
- Date: [Appointment Date]
- Time: [Appointment Time]
- Type: [Consultation Type]
- Condition: [Condition]

Medical Information:
- Symptoms: [Symptoms]
- Previous Treatment: [Previous Treatment]
- Emergency Contact: [Emergency Contact]
- Newsletter Subscription: [Newsletter]

Please contact the patient to confirm the appointment.

Best regards,
Nagraja Homeopathy Website
```

### Contact Email Template
```
Subject: New Contact Form Submission - [Name]

New Contact Form Submission!

Contact Details:
- Name: [Name]
- Email: [Email]
- Phone: [Phone]

Message:
[Message]

Please respond to this inquiry.

Best regards,
Nagraja Homeopathy Website
```

## ✅ **Testing**

1. Fill out the forms
2. Submit them
3. Check your email for the submissions
4. Verify all data is included

## 🔧 **Advantages of Each Method**

### EmailJS
- ✅ Real-time email sending
- ✅ Professional appearance
- ✅ No page redirects
- ❌ Requires setup

### Mailto
- ✅ No setup required
- ✅ Works immediately
- ❌ Opens email client
- ❌ Less professional

### Formspree
- ✅ Professional appearance
- ✅ No page redirects
- ✅ Easy setup
- ❌ Limited free plan

### Netlify Forms
- ✅ Free unlimited
- ✅ Professional appearance
- ❌ Requires Netlify hosting

---

**Choose the method that works best for your needs!**
