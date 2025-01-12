document.addEventListener("DOMContentLoaded", function () {
    // Ищем все кнопки "Подробнее" в списке вакансий
    const detailsButtons = document.querySelectorAll('.btn-details');

    // Привязываем обработчик событий для каждой кнопки
    detailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Получаем название вакансии из атрибута data-job
            const jobTitle = button.getAttribute('data-job');

            // Генерируем ссылку на страницу вакансии (в зависимости от названия вакансии)
            let jobPage = '';

            switch(jobTitle) {
                case 'Frontend Developer':
                    jobPage = 'frontend.html';
                    break;
                case 'Backend Developer':
                    jobPage = 'backend.html';
                    break;
                case 'UI/UX Designer':
                    jobPage = 'design.html';
                    break;
            }

            if (jobPage) {
                window.location.href = jobPage;
            }
        });
    });
});