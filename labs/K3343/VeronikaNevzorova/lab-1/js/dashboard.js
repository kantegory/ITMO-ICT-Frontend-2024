document.getElementById("edit-btn").addEventListener("click", function() {
    var resumeInfo = document.getElementById("resume-info");

    resumeInfo.style.display = 'none';

    var editForm = document.createElement('div');
    editForm.classList.add('edit-form');

    editForm.innerHTML = `
        <h3>Редактировать резюме</h3>
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
            <button type="submit" class="btn btn-success">Сохранить изменения</button>
            <button type="button" class="btn btn-secondary mt-2" id="cancel-btn">Отменить</button>
        </form>
    `;

    resumeInfo.parentNode.appendChild(editForm);

    document.getElementById("cancel-btn").addEventListener("click", function() {
        // Восстанавливаем информацию и скрываем форму редактирования
        resumeInfo.style.display = 'block';
        editForm.remove();
    });

    document.getElementById("edit-resume-form").addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById('name').innerText = document.getElementById('edit-name').value;
        document.getElementById('email').innerText = document.getElementById('edit-email').value;
        document.getElementById('skills').innerText = document.getElementById('edit-skills').value;
        document.getElementById('experience').innerText = document.getElementById('edit-experience').value;

        resumeInfo.style.display = 'block';
        editForm.remove();
    });

    document.getElementById('view-jobs-btn').addEventListener('click', function() {
        window.location.href = 'job-list.html';
    });
});