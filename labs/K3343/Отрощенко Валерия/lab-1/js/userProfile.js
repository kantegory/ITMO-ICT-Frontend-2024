document.addEventListener('DOMContentLoaded', () => {
    console.log('Профиль пользователя готов.');

    // Загрузка информации из localStorage
    const storedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    const nameSpan = document.getElementById('name');
    const emailSpan = document.getElementById('email');
    const skillsSpan = document.getElementById('skills');
    const experienceSpan = document.getElementById('experience');

    // Если данные из localStorage есть, показываем их
    nameSpan.textContent = storedProfile.name || 'Имя не указано';
    emailSpan.textContent = storedProfile.email || 'Email не указан';
    skillsSpan.textContent = storedProfile.skills || 'Навыки не указаны';
    experienceSpan.textContent = storedProfile.experience || 'Опыт не указан';

    const editProfileButton = document.getElementById('edit-btn');
    const editForm = document.getElementById('edit-form');
    const cancelButton = document.getElementById('cancel-btn');
    const profileForm = document.getElementById('profile-form');

    // Отображение формы редактирования
    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            // Показываем форму редактирования
            editForm.style.display = 'block';
            // Заполняем форму текущими данными из localStorage
            document.getElementById('edit-name').value = storedProfile.name || '';
            document.getElementById('edit-email').value = storedProfile.email || '';
            document.getElementById('edit-skills').value = storedProfile.skills || '';
            document.getElementById('edit-experience').value = storedProfile.experience || '';
        });
    }

    // Отмена редактирования
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            // Скрыть форму редактирования
            editForm.style.display = 'none';
        });
    }

    // Сохранение изменений
    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Сохраняем данные из формы в localStorage
            const updatedProfile = {
                name: document.getElementById('edit-name').value,
                email: document.getElementById('edit-email').value,
                skills: document.getElementById('edit-skills').value,
                experience: document.getElementById('edit-experience').value,
            };

            console.log('Сохранение данных в localStorage: ', updatedProfile); // Отладка

            // Сохраняем обновленный профиль в localStorage
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

            // Проверьте, что данные действительно сохранились
            const savedProfile = localStorage.getItem('userProfile');
            console.log('Сохраненные данные в localStorage: ', savedProfile);

            // Обновляем отображение информации на странице
            nameSpan.textContent = updatedProfile.name;
            emailSpan.textContent = updatedProfile.email;
            skillsSpan.textContent = updatedProfile.skills;
            experienceSpan.textContent = updatedProfile.experience;

            // Скрываем форму редактирования
            editForm.style.display = 'none';

            alert('Ваш профиль был обновлен!');
        });
    }

    // Загружаем отклики
    displayAppliedJobs();
});

function displayAppliedJobs() {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    const appliedJobsList = document.getElementById('applied-jobs');

    if (appliedJobs.length === 0) {
        appliedJobsList.innerHTML = '<li class="list-group-item">Вы ещё не откликнулись на вакансии.</li>';
    } else {
        appliedJobs.forEach(job => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `Откликнулись на: ${job}`;
            appliedJobsList.appendChild(li);
        });
    }
}