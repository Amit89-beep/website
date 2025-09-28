# EmailJS Template Creation - Step by Step Guide

## Step 1: Access EmailJS Dashboard

1. **Go to**: https://www.emailjs.com/
2. **Sign in** to your account
3. **Click on "Email Templates"** in the left sidebar

## Step 2: Create First Template (Appointment Booking)

### 2.1 Create New Template
1. **Click "Create New Template"** button
2. **Template Name**: `appointment_template` (or any name you prefer)
3. **Click "Create"**

### 2.2 Template Settings
1. **Template ID**: This will be auto-generated (e.g., `template_xxxxxxx`)
2. **Copy this Template ID** - you'll need it for script.js

### 2.3 Template Content

**Subject Line**:
```
New Appointment Request from {{from_name}}
```

**Email Body** (copy and paste this exactly):
```
Dear Dr. Ajay Chamoli,

You have received a new appointment request:

PATIENT DETAILS:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Age: {{age}}
- Gender: {{gender}}

APPOINTMENT DETAILS:
- Preferred Date: {{appointment_date}}
- Preferred Time: {{appointment_time}}
- Consultation Type: {{consultation_type}}
- Condition: {{condition}}

SYMPTOMS/CONCERNS:
{{symptoms}}

PREVIOUS TREATMENTS:
{{previous_treatment}}

EMERGENCY CONTACT:
{{emergency_contact}}

Please contact the patient to confirm the appointment.

Best regards,
Nagraja Homeopathy Website
```

### 2.4 Save Template
1. **Click "Save"** button
2. **Note down the Template ID** (starts with `template_`)

## Step 3: Create Second Template (Contact Form)

### 3.1 Create New Template
1. **Click "Create New Template"** again
2. **Template Name**: `contact_template` (or any name you prefer)
3. **Click "Create"**

### 3.2 Template Content

**Subject Line**:
```
New Contact Message from {{from_name}}
```

**Email Body** (copy and paste this exactly):
```
Dear Dr. Ajay Chamoli,

You have received a new contact message:

CONTACT DETAILS:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

MESSAGE:
{{message}}

Please respond to the patient as soon as possible.

Best regards,
Nagraja Homeopathy Website
```

### 3.3 Save Template
1. **Click "Save"** button
2. **Note down the Template ID** (starts with `template_`)

## Step 4: Update Your Website Code

### 4.1 Update script.js
Replace the template IDs in your `script.js` file:

**Find this line (around line 500)**:
```javascript
return emailjs.send('serviceID', 'YOUR_TEMPLATE_ID', templateParams);
```

**Replace with**:
```javascript
return emailjs.send('serviceID', 'template_xxxxxxx', templateParams);
```
(Replace `template_xxxxxxx` with your actual appointment template ID)

**Find this line (around line 514)**:
```javascript
return emailjs.send('serviceID', 'YOUR_CONTACT_TEMPLATE_ID', templateParams);
```

**Replace with**:
```javascript
return emailjs.send('serviceID', 'template_yyyyyyy', templateParams);
```
(Replace `template_yyyyyyy` with your actual contact template ID)

## Step 5: Test Your Setup

1. **Open your website**
2. **Try submitting the contact form**
3. **Try submitting the appointment form**
4. **Check your email** for the messages
5. **Check browser console** (F12) for any errors

## Troubleshooting Common Issues

### Issue 1: "Template not found" error
**Solution**: 
- Double-check the template ID in script.js
- Make sure the template is saved in EmailJS dashboard
- Ensure there are no extra spaces in the template ID

### Issue 2: "Service not found" error
**Solution**:
- Verify your service ID is correct (`service_us5cu6t`)
- Make sure your email service is active in EmailJS dashboard

### Issue 3: Templates not sending emails
**Solution**:
- Check that your email service is properly configured
- Verify your email provider settings
- Check EmailJS dashboard for error logs

### Issue 4: Variables not showing in emails
**Solution**:
- Make sure variable names match exactly (case-sensitive)
- Use double curly braces: `{{variable_name}}`
- Check that form field names match the variables

## Template Variable Reference

### Appointment Form Variables:
- `{{from_name}}` - Patient's full name
- `{{from_email}}` - Patient's email
- `{{phone}}` - Patient's phone number
- `{{age}}` - Patient's age
- `{{gender}}` - Patient's gender
- `{{appointment_date}}` - Preferred appointment date
- `{{appointment_time}}` - Preferred appointment time
- `{{consultation_type}}` - Type of consultation
- `{{condition}}` - Medical condition
- `{{symptoms}}` - Patient's symptoms
- `{{previous_treatment}}` - Previous treatments
- `{{emergency_contact}}` - Emergency contact info

### Contact Form Variables:
- `{{from_name}}` - Contact person's name
- `{{from_email}}` - Contact person's email
- `{{phone}}` - Contact person's phone
- `{{message}}` - Contact message content

## Quick Checklist

- [ ] Created appointment template with correct content
- [ ] Created contact template with correct content
- [ ] Copied template IDs from EmailJS dashboard
- [ ] Updated script.js with actual template IDs
- [ ] Tested contact form submission
- [ ] Tested appointment form submission
- [ ] Received emails in your inbox
- [ ] No errors in browser console

## Need Help?

If you're still having trouble:
1. **Check browser console** (F12) for specific error messages
2. **Verify all IDs** are correct in script.js
3. **Test with simple template** first (just basic variables)
4. **Contact EmailJS support** if needed

## Example Template IDs

Your template IDs will look something like this:
- Appointment: `template_abc123`
- Contact: `template_def456`

Make sure to use your actual template IDs, not these examples!
