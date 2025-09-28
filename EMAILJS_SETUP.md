# EmailJS Setup Guide for Nagraja Homeopathy Website

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook**
   - **Yahoo**
   - Or any other supported provider
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Templates

### Template 1: Appointment Booking Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template:

**Template ID**: `appointment_template` (or your custom name)

**Subject**: `New Appointment Request from {{from_name}}`

**Content**:
```
Dear Dr. Ajay Chamoli,

You have received a new appointment request:

Patient Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Age: {{age}}
- Gender: {{gender}}

Appointment Details:
- Preferred Date: {{appointment_date}}
- Preferred Time: {{appointment_time}}
- Consultation Type: {{consultation_type}}
- Condition: {{condition}}

Symptoms/Concerns:
{{symptoms}}

Previous Treatments:
{{previous_treatment}}

Emergency Contact:
{{emergency_contact}}

Please contact the patient to confirm the appointment.

Best regards,
Nagraja Homeopathy Website
```

### Template 2: Contact Form Template

1. Create another template
2. Use this template:

**Template ID**: `contact_template` (or your custom name)

**Subject**: `New Contact Message from {{from_name}}`

**Content**:
```
Dear Dr. Ajay Chamoli,

You have received a new contact message:

Contact Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

Message:
{{message}}

Please respond to the patient as soon as possible.

Best regards,
Nagraja Homeopathy Website
```

## Step 4: Get Your Public Key

1. Go to **Account** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `user_xxxxxxxxxxxxxxxx`)
3. Copy this key

## Step 5: Update Your Website Code

### Update script.js

Replace the following placeholders in `script.js`:

1. **Line 4**: Replace `YOUR_PUBLIC_KEY` with your actual public key:
```javascript
emailjs.init('user_xxxxxxxxxxxxxxxx'); // Your actual public key
```

2. **Line 499**: Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID`:
```javascript
return emailjs.send('service_xxxxxxx', 'appointment_template', templateParams);
```

3. **Line 513**: Replace `YOUR_SERVICE_ID` and `YOUR_CONTACT_TEMPLATE_ID`:
```javascript
return emailjs.send('service_xxxxxxx', 'contact_template', templateParams);
```

## Step 6: Test Your Setup

1. Open your website
2. Try submitting the appointment form
3. Try submitting the contact form
4. Check your email for the messages
5. Check browser console for any errors

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error**:
   - Make sure the EmailJS script is loaded before your script.js
   - Check that the CDN link is correct

2. **"Service not found" error**:
   - Verify your Service ID is correct
   - Make sure the service is active in your EmailJS dashboard

3. **"Template not found" error**:
   - Verify your Template ID is correct
   - Make sure the template is published in your EmailJS dashboard

4. **Emails not being sent**:
   - Check your email service configuration
   - Verify your email provider settings
   - Check the EmailJS dashboard for error logs

### Testing Tips:

1. Use browser developer tools (F12) to check console for errors
2. Test with different email addresses
3. Check spam folder for test emails
4. Verify all form fields are being captured correctly

## EmailJS Limits (Free Plan)

- **200 emails per month**
- **2 email services**
- **2 email templates**
- **Rate limit**: 200 requests per day

## Support

If you need help:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Contact EmailJS support
3. Check browser console for specific error messages

## Security Notes

- Never expose your private keys in client-side code
- Only use public keys in your website
- Consider upgrading to a paid plan for production use
- Monitor your email usage to avoid hitting limits