document.addEventListener('DOMContentLoaded', async function () {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) {
        alert('Вы не авторизованы!');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await response.json();

        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;
        document.getElementById('registration-date').textContent = user.registrationDate;

        document.getElementById('edit-profile-btn').addEventListener('click', function () {
            document.getElementById('edit-profile-section').style.display = 'block';
            document.getElementById('edit-username').value = user.username;
            document.getElementById('edit-email').value = user.email;
        });

        document.getElementById('cancel-edit-btn').addEventListener('click', function () {
            document.getElementById('edit-profile-section').style.display = 'none';
        });

        document.getElementById('edit-profile-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const updatedUsername = document.getElementById('edit-username').value;
            const updatedEmail = document.getElementById('edit-email').value;

            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: updatedUsername, email: updatedEmail })
                });

                if (response.ok) {
                    alert('Профиль обновлен!');
                    window.location.reload();
                } else {
                    throw new Error('Не удалось обновить профиль');
                }
            } catch (error) {
                console.error('Ошибка редактирования профиля:', error);
            }
        });

        // Удаление профиля
        document.getElementById('delete-profile-btn').addEventListener('click', async function () {
            if (confirm('Вы уверены, что хотите удалить свой профиль?')) {
                try {
                    const response = await fetch(`http://localhost:3000/users/${userId}`, { method: 'DELETE' });

                    if (response.ok) {
                        alert('Профиль удален!');
                        localStorage.removeItem('currentUserId');
                        window.location.href = 'register.html';
                    } else {
                        throw new Error('Не удалось удалить профиль');
                    }
                } catch (error) {
                    console.error('Ошибка удаления профиля:', error);
                }
            }
        });

        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('currentUserId');

            window.location.href = 'main_page.html';
        });


    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
    }
});
