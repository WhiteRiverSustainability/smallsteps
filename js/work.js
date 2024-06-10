
// Function to open the file preview modal
function openFilePreview(fileUrl) {
    const fileModal = document.getElementById('fileModal');
    const fileFrame = document.getElementById('fileFrame');

    // Set the source of the iframe to the file URL
    fileFrame.src = fileUrl;

    // Display the modal
    fileModal.style.display = 'block';
}

// Function to close the file preview modal
function closeFilePreview() {
    const fileModal = document.getElementById('fileModal');
    const fileFrame = document.getElementById('fileFrame');

    // Hide the modal
    fileModal.style.display = 'none';

    // Clear the iframe source
    fileFrame.src = '';
}

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
    const fileModal = document.getElementById('fileModal');
    if (event.target == fileModal) {
        closeFilePreview();
    }
}
