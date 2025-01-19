// Установить тему из localStorage при загрузке страницы
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

let applications = [];

function applyForJob(jobTitle) {
    applications.push(jobTitle);
    alert(`Вы откликнулись на вакансию: ${jobTitle}`);

    localStorage.setItem('applications', JSON.stringify(applications));
}

document.querySelectorAll('.btn-outline-primary').forEach(button => {
    button.addEventListener('click', function() {
        const jobTitle = this.getAttribute('data-job');

        let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
        appliedJobs.push(jobTitle);
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));

        const notification = document.getElementById('notification');
        notification.classList.remove('d-none');

        setTimeout(() => {
            notification.classList.add('d-none');
        }, 3000);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const applyButtons = document.querySelectorAll('.job-card .btn-outline-primary');
    const alreadyAppliedButtons = document.querySelectorAll('.job-card .already-applied');
    const notification = document.getElementById('notification');

    // Загрузка списка вакансий, на которые пользователь откликнулся
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];

    // Скрываем кнопки отклика на вакансии, на которые уже откликнулись
    applyButtons.forEach(button => {
        const jobTitle = button.getAttribute('data-job');
        if (appliedJobs.includes(jobTitle)) {
            button.classList.add('d-none'); // Скрыть кнопку отклика
            const alreadyAppliedButton = button.closest('.job-card').querySelector('.already-applied');
            alreadyAppliedButton.classList.remove('d-none'); // Показать кнопку "вы уже откликнулись"
        }

        button.addEventListener('click', function() {
            // Добавляем вакансию в список откликов
            appliedJobs.push(jobTitle);
            localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));

            // Показать уведомление
            notification.textContent = `Вы успешно откликнулись на вакансию ${jobTitle}.`;
            notification.classList.remove('d-none');
            setTimeout(() => {
                notification.classList.add('d-none');
            }, 3000);

            // Скрыть кнопку отклика и показать кнопку "вы уже откликнулись"
            button.classList.add('d-none');
            const alreadyAppliedButton = button.closest('.job-card').querySelector('.already-applied');
            alreadyAppliedButton.classList.remove('d-none');
        });
    });

    alreadyAppliedButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert("Вы не можете откликнуться на вакансию несколько раз");
        });
    });
});