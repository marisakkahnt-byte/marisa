// JavaScript for form validation and submission functionality for the custom order form

// Function to validate the form
function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var orderDetails = document.getElementById('orderDetails').value;
    
    if (name === '' || email === '' || orderDetails === '') {
        alert('All fields are required!');
        return false;
    }
    
    // Simple email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }
    
    return true;
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    
    if (validateForm()) {
        // Code to submit the form (e.g., AJAX request)
        alert('Form submitted successfully!');
        // Implement AJAX submission here
    }
}

// Attach event listener to the form
document.getElementById('customOrderForm').addEventListener('submit', submitForm);