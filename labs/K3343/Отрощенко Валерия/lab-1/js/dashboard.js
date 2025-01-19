// Установить начальную тему
const savedTheme = localStorage.getItem('theme') || 'light';
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('use');

// Установить начальную тему и иконку
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.setAttribute('href', savedTheme === 'dark' ? 'sprite.svg#icon-dark-mode' : 'sprite.svg#icon-light-mode');

// Переключение темы
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Обновить тему
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Обновить иконку
    themeIcon.setAttribute('href', newTheme === 'dark' ? 'sprite.svg#icon-dark-mode' : 'sprite.svg#icon-light-mode');
});
// Получение откликов из localStorage
const appliedJobsList = document.getElementById("applied-jobs");
const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

// Отображение списка откликов
function renderAppliedJobs() {
    appliedJobsList.innerHTML = ""; // Очистить текущий список
    if (appliedJobs.length === 0) {
        appliedJobsList.innerHTML = "<li class='list-group-item'>Вы ещё не откликнулись ни на одну вакансию.</li>";
    } else {
        appliedJobs.forEach((job) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.textContent = job;
            appliedJobsList.appendChild(listItem);
        });
    }
}

// Отображение откликов при загрузке страницы
renderAppliedJobs();

// Обработка кнопки редактирования резюме
document.getElementById("edit-btn").addEventListener("click", function () {
    const resumeInfo = document.getElementById("resume-info");
    const editButton = document.getElementById("edit-btn");

    editButton.style.display = "none";
    resumeInfo.style.display = 'none';

    // Создать форму для редактирования резюме
    const editForm = document.createElement('div');
    editForm.classList.add('edit-form');

    editForm.innerHTML = `
        <form id="edit-resume-form">
            <div class="mb-3">
                <label for="edit-name" class="form-label">Имя</label>
                <input type="text" class="form-control" id="edit-name" value="${document.getElementById('name').innerText}" required>
            </div>
            <div class="mb-3">
                <label for="edit-email" class="form-label">Email</label>
                <input type="email" class="form-control" id="edit-email" value="${document.getElementById('email').innerText}" required>
            </div>
            <div class="mb-3">
                <label for="edit-skills" class="form-label">Навыки</label>
                <input type="text" class="form-control" id="edit-skills" value="${document.getElementById('skills').innerText}" required>
            </div>
            <div class="mb-3">
                <label for="edit-experience" class="form-label">Опыт</label>
                <input type="text" class="form-control" id="edit-experience" value="${document.getElementById('experience').innerText}" required>
            </div>
            <div class="button-group">
                <button type="submit" class="btn btn-success">Сохранить изменения</button>
                <button type="button" class="btn btn-secondary" id="cancel-btn">Отменить</button>
            </div>
        </form>
    `;

    // Добавить форму под информацией о резюме
    resumeInfo.parentNode.appendChild(editForm);

    // Обработка кнопки "Отменить"
    document.getElementById("cancel-btn").addEventListener("click", function () {
        // Удалить форму
        editForm.remove();

        // Показать информацию о резюме
        resumeInfo.style.display = "block";

        // Показать кнопку "Редактировать резюме"
        editButton.style.display = "block";
    });

    // Обработка сохранения изменений
    document.getElementById("edit-resume-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Обновить данные резюме
        document.getElementById("name").innerText = document.getElementById("edit-name").value;
        document.getElementById("email").innerText = document.getElementById("edit-email").value;
        document.getElementById("skills").innerText = document.getElementById("edit-skills").value;
        document.getElementById("experience").innerText = document.getElementById("edit-experience").value;

        // Удалить форму
        editForm.remove();

        // Показать информацию о резюме
        resumeInfo.style.display = "block";

        // Показать кнопку "Редактировать резюме"
        editButton.style.display = "block";
    });
});