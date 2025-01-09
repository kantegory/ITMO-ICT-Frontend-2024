let currentUser = JSON.parse(localStorage.getItem('currentUser '));

if (!currentUser) {
    alert('Пожалуйста, войдите в систему.');
    window.location.href = 'login.html';
}

// Функция для получения данных из db.json с помощью axios
async function getData(endpoint) {
    try {
        const response = await axios.get(`http://localhost:3000/${endpoint}`); 
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении данных с ${endpoint}:`, error);
        return [];
    }
}

// Функция для отображения информации о компании
async function displayCompanyInfo() {
    const companyInfoSection = document.getElementById('company-info');
    const companies = await getData('companies');

    // Проверяем, является ли текущий пользователь работодателем с нужным email
    const company = companies.find(company => company.username === currentUser.username);

    if (company) {
        companyInfoSection.style.display = "block"; // Показываем секцию
        document.getElementById('company-name').textContent = company.name;
        document.getElementById('company-description').textContent = company.description;
        document.getElementById('company-contacts').textContent = company.contacts;
    } else {
        companyInfoSection.style.display = "none"; // Скрываем секцию, если компания не найдена
    }
}
// Функция для отображения вакансий
async function displayVacancies() {
    const vacancies = await getData('vacancies');
    const vacanciesTableBody = document.getElementById('vacancies-table-body'); 
    vacanciesTableBody.innerHTML = ''; 

    vacancies.forEach((vacancy) => {
        // Проверяем, если вакансия принадлежит текущему работодателю
        if (vacancy.employerId === currentUser.id) {
            const row = vacanciesTableBody.insertRow();
            row.insertCell(0).innerText = vacancy.title;
            row.insertCell(1).innerText = vacancy.description;
            row.insertCell(2).innerText = vacancy.salary;
            row.insertCell(3).innerText = vacancy.experience;
            row.insertCell(4).innerHTML = `<button class="delete-button" onclick="deleteVacancy('${vacancy.id}')">Удалить</button>`;
        }
    });
}
document.getElementById('submitVacanciesBtn').addEventListener('click', async function () {
    const name = document.getElementById('vacanciesName').value;
    const description = document.getElementById('vacanciesDescription').value;
    const salary = document.getElementById('vacanciesSalary').value;
    const experience = document.getElementById('vacanciesExperience').value;

    if (name && description && salary && experience) {
        document.getElementById('vacanciesForm').reset();
        $('#vacanciesModal').modal('hide');

        const vacancy = {
            title: name,
            description: description,
            salary: salary,
            experience: experience,
            employerId: currentUser.id 
        };

        // Отправка новой вакансии на сервер
        try {
            await axios.post('http://localhost:3000/vacancies', vacancy); 
            displayVacancies();
        } catch (error) {
            console.error("Ошибка при добавлении вакансии:", error);
        }
    } else {
        alert('Пожалуйста, заполните все поля перед отправкой.');
    }
});

// Функция для отображения откликов
async function displayResponses() {
    const responses = await getData('responses');
    const responsesTableBody = document.getElementById('responses-table').getElementsByTagName('tbody')[0];
    responsesTableBody.innerHTML = '';

    responses.forEach((response) => {
        if (response.employerId === currentUser.id) {
            const row = responsesTableBody.insertRow();
            row.insertCell(0).innerText = response.candidateName;
            row.insertCell(1).innerText = response.email;
            row.insertCell(2).innerHTML = `<a href="${response.resumeLink}" target="_blank" style="color: #0056b3;">Посмотреть резюме</a>`;
            row.insertCell(3).innerText = response.jobTitle;
            row.insertCell(4).innerHTML = `<button class="delete-button" onclick="deleteResponse('${response.id}')">Удалить</button>`;
        }
    });
}
// Функция для удаления вакансии
async function deleteVacancy(vacancyId) {
    try {
        await axios.delete(`http://localhost:3000/vacancies/${vacancyId}`); 
        displayVacancies(); 
    } catch (error) {
        console.error("Ошибка при удалении вакансии:", error);
    }
}

// Функция для удаления отклика
async function deleteResponse(responseId) {
    try {
        await axios.delete(`http://localhost:3000/responses/${responseId}`);
        displayResponses();
    } catch (error) {
        console.error("Ошибка при удалении отклика:", error);
    }
}

// Отображаем начальные данные при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    displayCompanyInfo();
    displayResponses();
    displayVacancies();
});