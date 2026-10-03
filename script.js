// JavaScript for form validation and submission functionality for the say hi contact form

// Show a message under the form instead of a pop-up alert
function showStatus(message, type) {
    var status = document.getElementById('formStatus');
    status.textContent = message;
    status.className = 'form-status ' + type;
}

// Function to validate the form
function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var orderDetails = document.getElementById('orderDetails').value;
    
    if (name === '' || email === '' || orderDetails === '') {
        showStatus('All fields are required!', 'error');
        return false;
    }
    
    // Simple email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showStatus('Please enter a valid email address!', 'error');
        return false;
    }
    
    return true;
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    
    if (validateForm()) {
        // Open the visitor's email app with the note ready to send to Marisa
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('orderDetails').value;
        var body = message + '\n\n' + name + '\n' + email;
        window.location.href = 'mailto:marisakkahnt@gmail.com?subject=' +
            encodeURIComponent('Hello from ' + name) + '&body=' + encodeURIComponent(body);
        showStatus('Your email app is opening with your note ready to send ♡', 'success');
    }
}

// Attach event listener to the form
document.getElementById('customOrderForm').addEventListener('submit', submitForm);