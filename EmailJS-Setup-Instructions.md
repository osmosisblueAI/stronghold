# EmailJS Setup Instructions for Quote Form

Follow these steps to connect your quote form to EmailJS so that submissions are sent to your email:

## 1. Create an EmailJS Account

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Verify your email address

## 2. Create an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the prompts to connect your email account

## 3. Create an Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your email template using the following variables:
   - {{name}}
   - {{email}}
   - {{phone}}
   - {{bestTime}}
   - {{address}}
   - {{city}}
   - {{zip}}
   - {{propertyType}}
   - {{serviceType}}
   - {{projectSize}}
   - {{timeline}}
   - {{budget}}
   - {{projectDescription}}
   - {{permits}}
   - {{blueprints}}
   - {{utilities}}
   - {{asbestos}}
   - {{hearAbout}}
4. Save your template

## 4. Update Your JavaScript Code

1. Open the `js/main.js` file
2. Replace the placeholders with your actual EmailJS credentials:
   - Replace `YOUR_USER_ID` with your actual EmailJS user ID (found in Account > API Keys)
   - Replace `YOUR_SERVICE_ID` with your email service ID
   - Replace `YOUR_TEMPLATE_ID` with your email template ID

```javascript
// Initialize EmailJS
emailjs.init("YOUR_USER_ID");

// When sending the email
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
```

## 5. Test Your Form

1. Submit a test request through your quote form
2. Check your email to ensure the message was delivered correctly
3. Check the browser console for any error messages if the form isn't working

## Additional Notes

- The free plan of EmailJS allows 200 emails per month
- For higher volume, you may need to upgrade to a paid plan
- You can customize the email template design in your EmailJS account
- Form data is securely transmitted via the EmailJS API

## Alternative: Connect to HubSpot Forms

Since you're already using HubSpot (as seen in your HTML), another option is to:
1. Create a form in HubSpot 
2. Replace your HTML form with the HubSpot embed code or
3. Use the HubSpot Forms API to submit your existing form to HubSpot 