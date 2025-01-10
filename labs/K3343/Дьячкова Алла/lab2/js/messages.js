// async function loadUserMessages() {
//     const currentPath = window.location.pathname;
//     const basePath = currentPath.split('/messages')[0];  // Assuming '/messages' is part of the current path
//     const messageList = document.querySelector('#messageList');
//     const propertyId = new URLSearchParams(window.location.search).get('property_id');
//     const token = localStorage.getItem('accessToken');
//
//     if (!token) {
//         throw new Error('Не удалось получить токен');
//     }
//
//     const userIdResponse = await fetch('http://localhost:3000/find_user_id_', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//     });
//
//     if (!userIdResponse.ok) {
//         const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
//         loginModal.show()
//         throw new Error('Не удалось получить ID пользователя.');
//     }
//
//     const { id: userId } = await userIdResponse.json();
//
//     if (!userId) {
//         alert('Не удалось найти пользователя');
//         return;
//     }
//
//     try {
//         const messagesUrl = propertyId
//             ? `http://localhost:3000/messages?userId=${userId}&propertyId=${propertyId}`
//             : `http://localhost:3000/messages?userId=${userId}`;
//
//         const messagesResponse = await fetch(messagesUrl);
//
//         if (!messagesResponse.ok) {
//             messageList.innerHTML = '<p class="text-center">Нет сообщений для отображения.</p>';
//             // throw new Error('Не удалось загрузить сообщения');
//         }
//         else {
//             const { messages, propertyTitle } = await messagesResponse.json();
//             const propertyLink = document.getElementById('propertyLink');
//
//             if (propertyId) {
//                 propertyLink.href = `${basePath}/property.html?id=${propertyId}`;
//             }
//
//             try {
//                 const response = await fetch(`http://localhost:3000/properties/${propertyId}`);
//
//                 if (!response.ok) {
//                     throw new Error('Property not found');
//                 }
//
//                 const property = await response.json();
//                 if (property && property.title) {
//                     propertyLink.textContent = property.title;
//                     propertyLink.href = `${basePath}/property.html?id=${propertyId}`;  // Ensure the correct base path
//                 } else {
//                     propertyLink.textContent = 'Property not found';
//                 }
//             } catch (error) {
//                 console.error('Error loading property data:', error);
//                 propertyLink.textContent = 'Error loading property data';
//             }
//
//             messageList.innerHTML = '';
//
//             if (messages.length === 0) {
//                 messageList.innerHTML = '<p class="text-muted">Нет сообщений для отображения.</p>';
//             } else {
//                 messages.forEach((message) => {
//                     const bubbleClass = message.userId === userId ? 'sent' : 'received';
//                     const messageBubble = `
//                         <div class="message-bubble ${bubbleClass}">
//                             ${message.content}
//                         </div>
//                     `;
//                     messageList.innerHTML += messageBubble;
//                 });
//             }
//         }
//
//     } catch (error) {
//         console.error('Error loading messages:', error);
//         messageList.innerHTML = `<p class="text-danger">${error.message}</p>`;
//     }
// }
async function loadUserMessages() {
    const currentPath = window.location.pathname;
    const basePath = currentPath.split('/messages')[0];
    const messageList = document.querySelector('#messageList');
    messageList.innerHTML = '<p class="text-center">Загрузка сообщений...</p>';

    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('Не удалось получить токен. Пожалуйста, войдите в систему.');
        return;
    }

    try {
        const userIdResponse = await fetch('http://localhost:3000/find_user_id_', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!userIdResponse.ok) {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show()
            throw new Error('Не удалось получить ID пользователя.');
        }

        const { id: userId } = await userIdResponse.json();
        const propertyId = new URLSearchParams(window.location.search).get('property_id');

        const messagesUrl = propertyId
            ? `http://localhost:3000/messages?userId=${userId}&propertyId=${propertyId}`
            : `http://localhost:3000/messages?userId=${userId}`;

        const messagesResponse = await fetch(messagesUrl);
        if (!messagesResponse.ok) {
                messageList.innerHTML = '<p class="text-center">Нет сообщений для отображения.</p>';
                // throw new Error('Не удалось загрузить сообщения');
        } else {
            const { messages, propertyTitle } = await messagesResponse.json();
            const propertyLink = document.getElementById('propertyLink');

            if (propertyId) {
                propertyLink.href = `${basePath}/property.html?id=${propertyId}`;
            }
            try {
                const response = await fetch(`http://localhost:3000/properties/${propertyId}`);

                if (!response.ok) {
                    throw new Error('Property not found');
                }

                const property = await response.json();
                if (property && property.title) {
                    propertyLink.textContent = property.title;
                    propertyLink.href = `${basePath}/property.html?id=${propertyId}`;
                } else {
                    propertyLink.textContent = 'Property not found';
                }
            } catch (error) {
                console.error('Error loading property data:', error);
                propertyLink.textContent = 'Error loading property data';
            }
            messageList.innerHTML = '';

            if (!messages || messages.length === 0) {
                messageList.innerHTML = '<p class="text-muted">Нет сообщений для отображения.</p>';
                return;
            }

            messages.forEach((message) => {
                const bubbleClass = message.userId === userId ? 'sent' : 'received';
                const messageBubble = document.createElement('div');
                messageBubble.className = `message-bubble ${bubbleClass}`;
                messageBubble.textContent = message.content;
                messageList.appendChild(messageBubble);
            });

            messageList.scrollTop = messageList.scrollHeight;
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        messageList.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
}



async function sendMessage(event) {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('Не удалось получить токен');
    }

    const userIdResponse = await fetch('http://localhost:3000/find_user_id_', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!userIdResponse.ok) {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show()
        throw new Error('Не удалось получить ID пользователя.');
    }

    const { id: userId } = await userIdResponse.json();

    const messageText = document.getElementById('messageText').value;
    const propertyId = new URLSearchParams(window.location.search).get('property_id');

    if (!messageText || !userId || !propertyId) {
        alert('Пожалуйста, заполните сообщение и убедитесь, что все данные корректны');
        return;
    }

    try {
        const newMessage = {
            userId: userId,
            propertyId: Number(propertyId),
            content: messageText,
            timestamp: new Date().toISOString(),
        };

        const response = await fetch('http://localhost:3000/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        });

        if (!response.ok) {
            throw new Error('Не удалось отправить сообщение');
        }

        document.getElementById('messageText').value = '';
        await loadUserMessages();
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Ошибка при отправке сообщения');
    }
}
document.getElementById('modalLoginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('modalEmail').value;
        const password = document.getElementById('modalPassword').value;

        fetch('http://localhost:3000/enter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('loggedInUserId', data.userId);

            alert('Вход выполнен успешно!');
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();

            location.reload();
        })
        .catch(error => {
            console.error('Login error:', error);
            alert(error.message || 'Ошибка при входе в систему');
        });
});
document.addEventListener('DOMContentLoaded', loadUserMessages);
