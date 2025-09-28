# Secure EmailJS Setup Guide

## 🔒 Keeping Your EmailJS Keys Secure

This guide shows you how to keep your EmailJS keys secure when uploading to GitHub.

## 📁 Files Created

1. **`config.example.js`** - Template for your actual configuration
2. **`config.env.example`** - Environment variables template  
3. **`emailjs-config-loader.js`** - Secure configuration loader
4. **`.gitignore`** - Excludes sensitive files from Git

## 🚀 Setup Steps

### Step 1: Create Your Configuration File

1. **Copy the example file:**
   ```bash
   cp config.example.js config.js
   ```

2. **Edit `config.js` with your actual EmailJS keys:**
   ```javascript
   const EMAILJS_CONFIG = {
       PUBLIC_KEY: 'user_your_actual_public_key_here',
       SERVICE_ID: 'service_your_actual_service_id_here',
       TEMPLATES: {
           APPOINTMENT: 'your_appointment_template_id',
           CONTACT: 'your_contact_template_id'
       },
       API_URL: 'https://api.emailjs.com/api/v1.0/email/send'
   };
   
   window.EMAILJS_CONFIG = EMAILJS_CONFIG;
   ```

### Step 2: Update Your HTML Files

Add the configuration loader to your HTML files **before** your main script:

```html
<!-- Add this BEFORE script.js -->
<script src="emailjs-config-loader.js"></script>
<script src="config.js"></script>
<script src="script.js"></script>
```

### Step 3: Update Your JavaScript

Modify your `script.js` to use the secure configuration:

```javascript
// Replace hardcoded keys with:
const publicKey = window.emailJSConfig.getPublicKey();
const serviceId = window.emailJSConfig.getServiceId();
const appointmentTemplate = window.emailJSConfig.getTemplateId('APPOINTMENT');
const contactTemplate = window.emailJSConfig.getTemplateId('CONTACT');

// Initialize EmailJS
emailjs.init(publicKey);

// Send appointment email
return emailjs.send(serviceId, appointmentTemplate, templateParams);

// Send contact email  
return emailjs.send(serviceId, contactTemplate, templateParams);
```

## 🔐 Security Benefits

✅ **Keys not in Git** - `config.js` is in `.gitignore`  
✅ **Easy deployment** - Just add `config.js` to your server  
✅ **Environment flexibility** - Can use different keys for dev/prod  
✅ **No hardcoded secrets** - All sensitive data externalized  

## 📤 GitHub Upload

When you upload to GitHub:

1. **Only these files go to GitHub:**
   - `config.example.js` (template)
   - `config.env.example` (template)
   - `emailjs-config-loader.js` (loader)
   - `.gitignore` (excludes sensitive files)
   - All your other website files

2. **These files stay local/server only:**
   - `config.js` (your actual keys)
   - `config.env` (if you use environment variables)

## 🌐 Deployment Options

### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)
- Upload `config.js` to your hosting platform
- Set environment variables in hosting dashboard
- Use the configuration loader

### Option 2: Server Deployment
- Upload `config.js` to your server
- Set environment variables on server
- Use the configuration loader

### Option 3: CDN/External Config
- Store `config.js` on a CDN
- Load it dynamically
- Use the configuration loader

## 🧪 Testing

1. **Local testing:**
   ```bash
   # Make sure config.js exists with real keys
   # Test forms work locally
   ```

2. **Production testing:**
   ```bash
   # Upload to hosting platform
   # Add config.js to hosting platform
   # Test forms work in production
   ```

## ⚠️ Important Notes

- **Never commit `config.js`** to Git
- **Always use `.gitignore`** to exclude sensitive files
- **Test locally first** before deploying
- **Keep backups** of your configuration files
- **Use different keys** for development and production

## 🔧 Troubleshooting

### "EmailJS is not defined"
- Make sure `emailjs-config-loader.js` loads before `script.js`
- Check that `config.js` is properly loaded

### "Configuration not found"
- Verify `config.js` exists and has correct format
- Check browser console for errors

### "Keys not working"
- Verify keys are correct in `config.js`
- Check EmailJS dashboard for active services/templates

## 📞 Support

If you need help:
1. Check EmailJS documentation
2. Verify your configuration files
3. Test with browser developer tools
4. Check hosting platform documentation
