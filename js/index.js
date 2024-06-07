document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Prepare the email data
        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        // Send the email
        emailjs.send('service_v2wmdxr', 'template_p9vrqt4', templateParams)
            .then(function(response) {
                alert('Email sent successfully!');
                // Clear the form after successful submission
                document.getElementById('contact-form').reset();
            }, function(error) {
                alert('Failed to send email. Please try again.');
            });
    });
});
