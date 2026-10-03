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
        // Code to submit the form (e.g., AJAX request)
        showStatus('Thank you! Your note is on its way ♡', 'success');
        // Implement AJAX submission here
    }
}

// Attach event listener to the form
document.getElementById('customOrderForm').addEventListener('submit', submitForm);