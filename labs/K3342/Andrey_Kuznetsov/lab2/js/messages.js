import { API_BASE_URL } from './config.js';

async function loadDialogs() {
    try {
        const response = await fetch(`${API_BASE_URL}/dialogs`);
        const dialogs = await response.json();
        
        const dialogList = document.querySelector('.dialog-list');
        dialogList.innerHTML = '<h2>Dialogs</h2>';

        dialogs.forEach(dialog => {
            const dialogItem = document.createElement('div');
            dialogItem.classList.add('dialog-item');
            dialogItem.textContent = dialog.owner;
            dialogItem.onclick = () => openChat(dialog.id, dialog.owner);
            dialogList.appendChild(dialogItem);
        });
    } catch (error) {
        console.error('Error loading dialogs:', error);
    }
}

async function openChat(dialogId, owner) {
    document.getElementById('chat-owner').textContent = owner;

    const messagesResponse = await fetch(`${API_BASE_URL}/messages?dialogId=${dialogId}`);
    const messages = await messagesResponse.json();

    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.sender);
        messageElement.textContent = message.text;
        messagesContainer.appendChild(messageElement);
    });
}


async function sendMessage(event) {
    event.preventDefault();

    const inputField = document.getElementById('message-input');
    const messageText = inputField.value;
    const chatOwner = document.getElementById('chat-owner').textContent;

    if (chatOwner === 'Select a dialog') {
        alert('Please select a dialog before sending a message.');
        return;
    }

    if (!messageText || !chatOwner) return;

    const dialogResponse = await fetch(`${API_BASE_URL}/dialogs?owner=${chatOwner}`);
    const dialog = await dialogResponse.json();
    const dialogId = dialog[0].id;

    const newMessage = {
        dialogId: dialogId,
        sender: 'user', 
        text: messageText
    };

    await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    });

    inputField.value = '';
}

window.sendMessage = sendMessage;

document.addEventListener('DOMContentLoaded', loadDialogs);
