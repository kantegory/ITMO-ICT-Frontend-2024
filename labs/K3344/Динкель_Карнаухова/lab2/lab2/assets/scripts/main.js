// Функция фильтрации вакансий
function filterVacancies() {
    const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
    const industryFilter = document.getElementById('industry-filter').value;
    const salaryFilter = document.getElementById('salary-filter').value;

    const vacancies = document.querySelectorAll('.vacancy');

    vacancies.forEach(vacancy => {
        const title = vacancy.querySelector('.card-title').textContent.toLowerCase();
        const industry = vacancy.getAttribute('data-industry');
        const salary = vacancy.getAttribute('data-salary');

        const matchesSearch = title.includes(searchQuery);
        const matchesIndustry = industryFilter === '' || industry === industryFilter;
        const matchesSalary = salaryFilter === '' || salary === salaryFilter;

        // Показываем или скрываем вакансию в зависимости от фильтров
        if (matchesSearch && matchesIndustry && matchesSalary) {
            vacancy.style.display = 'block';
        } else {
            vacancy.style.display = 'none';
        }
    });
}

// Обработчик формы поиска
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    filterVacancies(); // Вызываем фильтрацию
});