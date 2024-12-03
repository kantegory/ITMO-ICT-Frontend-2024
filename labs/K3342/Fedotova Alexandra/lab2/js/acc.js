document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные о пользователе из localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        // Если пользователь не найден, перенаправляем на страницу входа
        window.location.href = 'login.html';
        return;
    }
    
    const welcomeHeader = document.getElementById('welcomeHeader');
    if (welcomeHeader) {
        welcomeHeader.textContent = `Welcome, ${user.name}`;
    }
    
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userWeightInput = document.getElementById('userWeight');
    const userHeightInput = document.getElementById('userHeight');
    const fitnessLevelEditInput = document.getElementById('fitnessLevelEdit');
    const userGoalsInput = document.getElementById('userGoals');
    const userProgressInput = document.getElementById('userProgress');

    if (userNameInput) userNameInput.value = user.name || '';
    if (userEmailInput) userEmailInput.value = user.email || '';
    if (userWeightInput) userWeightInput.value = user.weight || '';
    if (userHeightInput) userHeightInput.value = user.height || '';
    if (fitnessLevelEditInput) fitnessLevelEditInput.value = user.fitnessLevel || '';
    if (userGoalsInput) userGoalsInput.value = user.goals || '';
    if (userProgressInput) userProgressInput.value = user.progress || '';

    // Обработчик для кнопки "Save Changes"
    const saveChangesButton = document.querySelector('button[type="submit"]');
    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', async (e) => {
            e.preventDefault(); 
            
            const newProfile = {
                profile_id: Date.now(), 
                user_id: user.id,
                height: userHeightInput.value.trim(),
                weight: userWeightInput.value.trim(),
                fitness_level: fitnessLevelEditInput.value.trim(),
                goals: userGoalsInput.value.trim(),
                progress: userProgressInput.value.trim(),
            };
            
            const updatedUser = {
                ...user,
                profiles: user.profiles
                    ? [...user.profiles, newProfile] 
                    : [newProfile],
            };

            try {
                // Отправляем обновленные данные на сервер
                const response = await fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const updatedUserData = await response.json();
                
                localStorage.setItem('loggedInUser', JSON.stringify(updatedUserData));
                
                if (userNameInput) userNameInput.value = updatedUserData.name || '';
                if (userEmailInput) userEmailInput.value = updatedUserData.email || '';
                if (userWeightInput) userWeightInput.value = updatedUserData.weight || '';
                if (userHeightInput) userHeightInput.value = updatedUserData.height || '';
                if (fitnessLevelEditInput) fitnessLevelEditInput.value = updatedUserData.fitnessLevel || '';
                if (userGoalsInput) userGoalsInput.value = updatedUserData.goals || '';
                if (userProgressInput) userProgressInput.value = updatedUserData.progress || '';
                
                alert('Profile changes saved successfully!');
                // Закрыть модальное окно после сохранения
                const modalCloseButton = document.querySelector('#editProfileModal .btn-close');
                if (modalCloseButton) modalCloseButton.click();
            } catch (error) {
                console.error('Error updating user data:', error);
                alert('Failed to save profile changes. Please try again.');
            }
        });
    }
});
