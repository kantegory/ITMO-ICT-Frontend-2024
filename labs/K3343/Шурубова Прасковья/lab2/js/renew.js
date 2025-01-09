const saveButton = document.querySelector('.button-save');

saveButton.addEventListener('click', async function() {
    const updatedUserData = {
        username: document.getElementById('register-username').value,
        surname: document.getElementById('register-surname').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        const userId = currentUser.id;

        try {
            const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            const updatedUserDataFromServer = await updateResponse.json();
            const updatedCurrentUser = {
                ...currentUser,
                ...updatedUserDataFromServer,
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

            console.log('Профиль обновлен:', updatedUserDataFromServer);

        } catch (error) {
            console.error('Ошибка обновления профиля:', error);
        }
    }
});
