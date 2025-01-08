document.getElementById('submitVacanciesBtn').addEventListener('click', function () {
    const name = document.getElementById('vacanciesName').value;
    const description = document.getElementById('vacanciesDescription').value;
    const salary = document.getElementById('vacanciesSalary').value;
    const experience = document.getElementById('vacanciesExperience').value;

    if (name && description && salary && experience) {
        document.getElementById('vacanciesForm').reset();

        $('#vacanciesModal').modal('hide');

        document.getElementById('name').textContent = name;
        document.getElementById('description').textContent = description;
        document.getElementById('salary').textContent = salary;
        document.getElementById('experience').textContent = experience;

    } else {
        alert('Пожалуйста, заполните все поля перед отправкой.');
    }
});

let responses = [
    {
        candidateName: "Иван Иванов",
        email: "ivanov@example.com",
        resumeLink: "https://example.com/resume1.pdf",
        jobTitle: "Разработчик"
    },
    {
        candidateName: "Петр Петров",
        email: "petrov@example.com",
        resumeLink: "https://example.com/resume2.pdf",
        jobTitle: "Менеджер"
    }
];

function addResponse(candidateName, email, resumeLink, jobTitle) {
    const response = {
        candidateName,
        email,
        resumeLink,
        jobTitle
    };
    responses.push(response);
    displayResponses();
}

function displayResponses() {
    const responsesTableBody = document.getElementById('responses-table').getElementsByTagName('tbody')[0];
    responsesTableBody.innerHTML = '';

    responses.forEach((response, index) => {
        const row = responsesTableBody.insertRow();
        row.insertCell(0).innerText = response.candidateName;
        row.insertCell(1).innerText = response.email;
        row.insertCell(2).innerHTML = `<a href="${response.resumeLink}" target="_blank">Посмотреть резюме</a>`;
        row.insertCell(3).innerText = response.jobTitle;
        row.insertCell(4).innerHTML = `<button class="delete-button" onclick="deleteResponse(${index})">Удалить</button>`;
    });
}

function deleteResponse(index) {
    responses.splice(index, 1); 
    displayResponses();
}

// Отображаем начальные отклики при загрузке страницы
displayResponses();