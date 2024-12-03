function sendMessage() {
    const messageText = document.getElementById('messageText').value;
    // Logic to send the message to the server goes here

    // For demonstration, we'll just log it and clear the textarea
    console.log("Sending message:", messageText);
    document.getElementById('messageText').value = '';
    return false; // Prevent form submission for demonstration
}

function cancelMessage() {
    document.getElementById('messageText').value = ''; // Clear the textarea
}
