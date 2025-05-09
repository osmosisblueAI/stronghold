# HubSpot Form Integration Instructions

Since you already have HubSpot integrated on your site, this might be an easier option for connecting your quote form.

## Option 1: Replace with a HubSpot Form

1. Log in to your HubSpot account
2. Navigate to Marketing > Lead Capture > Forms
3. Create a new form with fields matching your current quote form
4. Customize the form design to match your site
5. Get the embed code from HubSpot
6. Replace your current form HTML with the HubSpot embed code

## Option 2: Submit Your Existing Form to HubSpot (Recommended)

This option lets you keep your current form design but sends the data to HubSpot.

1. Add the HubSpot tracking code to your form's JS (you already have the general HubSpot script)
2. Modify your form submission code in main.js:

```javascript
// Quote Form Handler (for quote.html)
const quoteForm = document.getElementById('quote-request-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const formElements = quoteForm.elements;
        
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].type !== 'submit' && formElements[i].required && !formElements[i].value.trim()) {
                isValid = false;
                formElements[i].classList.add('is-invalid');
            } else if (formElements[i].type !== 'submit') {
                formElements[i].classList.remove('is-invalid');
            }
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            // Prepare the data for HubSpot
            const hsFormData = {
                submittedAt: Date.now(),
                fields: [
                    {
                        name: "firstname",
                        value: document.getElementById('name').value.split(' ')[0]
                    },
                    {
                        name: "lastname",
                        value: document.getElementById('name').value.split(' ').slice(1).join(' ')
                    },
                    {
                        name: "email",
                        value: document.getElementById('email').value
                    },
                    {
                        name: "phone",
                        value: document.getElementById('phone').value
                    },
                    {
                        name: "address",
                        value: document.getElementById('address').value
                    },
                    {
                        name: "city",
                        value: document.getElementById('city').value
                    },
                    {
                        name: "zip",
                        value: document.getElementById('zip').value
                    },
                    {
                        name: "service_type",
                        value: document.getElementById('service-type').value
                    },
                    {
                        name: "project_description",
                        value: document.getElementById('project-description').value
                    }
                    // Add other fields as needed
                ],
                context: {
                    pageUri: window.location.href,
                    pageName: document.title
                }
            };
            
            // Replace YOUR_PORTAL_ID and YOUR_FORM_ID with your actual HubSpot IDs
            const portalId = 'YOUR_PORTAL_ID'; // e.g., '242684951'
            const formId = 'YOUR_FORM_ID';
            
            // Send to HubSpot
            fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hsFormData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                
                // Replace form with success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-4';
                successMessage.innerHTML = '<h4>Thank you for your quote request!</h4>' +
                    '<p>One of our representatives will contact you within 24 hours to discuss your project needs.</p>';
                
                quoteForm.innerHTML = '';
                quoteForm.appendChild(successMessage);
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger mt-4';
                errorMessage.innerHTML = '<h4>There was an error sending your request</h4>' +
                    '<p>Please try again or contact us directly at (216) 407-5014.</p>';
                
                // Reset submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Add error message above the submit button
                const submitContainer = quoteForm.querySelector('button[type="submit"]').parentNode;
                submitContainer.prepend(errorMessage);
            });
        }
    });
}
```

## Finding Your HubSpot IDs

1. **Portal ID**: Your portal ID is visible in the URL when you're logged into HubSpot (e.g., https://app.hubspot.com/portal/YOUR_PORTAL_ID/)
   - It may also be in your existing HubSpot tracking code (look for 'js-na2.hs-scripts.com/YOUR_PORTAL_ID.js')

2. **Form ID**: When you create a form in HubSpot, the form ID will be provided in the embed code or can be found in the form URL

## Testing the Integration

1. Submit a test request through your form
2. Log in to HubSpot and check if the contact and form submission appeared
3. If it worked correctly, the contact information should be visible in your HubSpot contacts

## Additional Resources

- [HubSpot Forms API Documentation](https://developers.hubspot.com/docs/api/marketing/forms)
- [HubSpot Form Fields Reference](https://legacydocs.hubspot.com/docs/methods/forms/form_fields) 