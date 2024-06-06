// Function to open the file preview modal
function openFilePreview(fileName) {
    const fileModal = document.getElementById('fileModal');
    const fileFrame = document.getElementById('fileFrame');

    // Set the source of the iframe to the file path
    fileFrame.src = `/path/to/your/files/${fileName}`;

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
