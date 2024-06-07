document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your public key
    emailjs.init('5K7UV5PpWCzKLAHFH');

    // Get modal elements
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('open-form-btn');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Open the modal
    openBtn.onclick = function() {
        modal.style.display = 'block';
    }

    // Close the modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close the modal when clicking outside of the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Handle form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Check if any field is empty
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Prepare the email data
        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        // Send the email
        emailjs.send('service_v2wmdr', 'template_p9vrqt4', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Email sent successfully!');
                // Clear the form after successful submission
                document.getElementById('contact-form').reset();
                // Close the modal
                modal.style.display = 'none';
            }, function(error) {
                console.error('Failed to send email:', error);
                alert('Failed to send email. Please check the console for details.');
            });
    });
});
