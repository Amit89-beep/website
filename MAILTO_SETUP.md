# Mailto Setup - Nagraja Homeopathy Website

## ✅ **Current Setup (Ready to Use!)**

Your website is now configured to use **direct mailto links** for appointment booking and contact forms.

### 🚀 **How It Works:**

1. **Patient fills out appointment form**
2. **Form validates all required fields**
3. **Patient's email client opens** with pre-filled appointment details
4. **Patient sends the email** to `info@nagrajahomoeopathic.com`
5. **You receive the appointment request** in your email

### 📧 **Email Addresses Used:**
- **Appointments**: `info@nagrajahomoeopathic.com`
- **Contact Form**: `info@nagrajahomoeopathic.com`

### 🔧 **To Change Email Address:**

#### Update Appointment Form:
In `appointment.html` (line 84):
```html
<form class="appointment-form-detailed" id="appointmentForm" action="mailto:YOUR_EMAIL@domain.com" method="post" enctype="text/plain">
```

#### Update Contact Form:
In `index.html` (line 319):
```html
<form class="contact-form" action="mailto:YOUR_EMAIL@domain.com" method="post" enctype="text/plain">
```

### 📋 **What Patients Will See:**

#### Appointment Email Template:
```
To: info@nagrajahomoeopathic.com
Subject: (empty - patient can add their own)

firstName=John
lastName=Doe
email=john.doe@example.com
phone=+919876543210
age=35
gender=male
appointmentDate=2024-01-15
appointmentTime=10:00 AM
consultationType=in-person
condition=skin-problems
symptoms=Acne and skin irritation
previousTreatment=Used over-the-counter creams
emergencyContact=Jane Doe +919876543211
newsletter=Yes
```

#### Contact Email Template:
```
To: info@nagrajahomoeopathic.com
Subject: (empty - patient can add their own)

name=John Doe
email=john.doe@example.com
phone=+919876543210
message=Hello, I would like to know more about your homeopathic treatments.
```

### ✅ **Advantages of Mailto Setup:**
- ✅ **No setup required** - works immediately
- ✅ **No monthly fees** - completely free
- ✅ **Works on all devices** - mobile, desktop, tablet
- ✅ **Patient controls** - they can edit the email before sending
- ✅ **Professional appearance** - forms look the same

### ⚠️ **Limitations:**
- ❌ **Requires email client** - patient must have email app installed
- ❌ **Manual process** - patient must send the email
- ❌ **No automatic confirmations** - you need to respond manually

### 🧪 **Testing:**

1. **Open your website** in a browser
2. **Fill out the appointment form** with test data
3. **Click "Book Appointment"**
4. **Your email client should open** with pre-filled details
5. **Send the test email** to yourself
6. **Check your inbox** for the appointment request

### 📱 **Mobile Testing:**
- **iOS**: Uses Mail app by default
- **Android**: Uses Gmail or default email app
- **Desktop**: Uses Outlook, Thunderbird, or default email client

### 🔄 **Upgrade to EmailJS Later:**

When you're ready for a more professional setup, you can:
1. **Follow the `EMAILJS_SETUP.md` guide**
2. **Replace mailto with EmailJS** for automatic email sending
3. **Keep the same forms** - just change the action attribute

### 📞 **Support:**

If you need help:
1. **Check the browser console** for any errors
2. **Test on different devices** to ensure compatibility
3. **Verify email addresses** are correct
4. **Check spam folder** for test emails

---

**Your appointment booking system is now live and ready to use!** 🎉
