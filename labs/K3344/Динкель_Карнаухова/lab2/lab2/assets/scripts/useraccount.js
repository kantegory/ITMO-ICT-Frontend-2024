let currentUser = JSON.parse(localStorage.getItem('currentUser '));

if (!currentUser) {
    alert('Пожалуйста, войдите в систему.');
    window.location.href = 'login.html';
}

async function getData(endpoint) {
    try {
        const response = await axios.get(`http://localhost:3000/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении данных с ${endpoint}:`, error);
        return [];
    }
}
async function displayCandidateInfo() {
    const candidateInfoSection = document.getElementById('user-info');
    const candidates = await getData('candidates');

    const candidate = candidates.find(candidate => candidate.username === currentUser.username);

    if (candidate) {
        candidateInfoSection.style.display = "block";
        document.getElementById('e-mail').textContent = candidate['e-mail'];
    } else {
        candidateInfoSection.style.display = "none";
    }
}
async function displayResumes() {
    const resumes = await getData('resumes'); // Получаем данные о резюме
    const resumesTableBody = document.getElementById('resumes-table-body'); 
    resumesTableBody.innerHTML = '';

    resumes.forEach((resume) => {
        // Проверяем, если резюме принадлежит текущему кандидату
        if (resume.candidateId === currentUser.id) {
            const row = resumesTableBody.insertRow();
            row.insertCell(0).innerText = resume.name;
            row.insertCell(1).innerText = resume.surname;
            row.insertCell(2).innerText = resume.phone;
            row.insertCell(3).innerText = resume.email;
            row.insertCell(4).innerText = resume.skills;
            row.insertCell(5).innerText = resume.education;
            row.insertCell(6).innerText = resume['work-experience'];
            row.insertCell(7).innerHTML = `<button class="delete-button" onclick="deleteResume('${resume.id}')">Удалить</button>`;
        }
    });
}

document.getElementById('submitResumeBtn').addEventListener('click', async function () {
    const name = document.getElementById('resumeName').value;
    const surname = document.getElementById('resumeSurname').value;
    const phone = document.getElementById('resumePhone').value;
    const email = document.getElementById('resumeEmail').value;
    const skills = document.getElementById('resumeSkills').value;
    const education = document.getElementById('resumeEducation').value;
    const experience = document.getElementById('resumeExperience').value;

    if (name && surname && phone && email && skills && education && experience) {
        document.getElementById('resumeForm').reset();
        $('#resumeModal').modal('hide');

        const newResume = {
            name: name,
            surname: surname,
            phone: phone,
            email: email,
            skills: skills,
            education: education,
            'work-experience': experience,
            candidateId: currentUser.id 
        };

        // Отправка нового резюме на сервер
        try {
            await axios.post('http://localhost:3000/resumes', newResume); 
            displayResumes();
        } catch (error) {
            console.error("Ошибка при добавлении резюме:", error);
        }
    } else {
        alert('Пожалуйста, заполните все поля перед отправкой.');
    }
});

async function deleteResume(resumeId) {
    try {
        await axios.delete(`http://localhost:3000/resumes/${resumeId}`); 
        displayResumes(); 
    } catch (error) {
        console.error("Ошибка при удалении резюме:", error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    displayCandidateInfo(); 
    displayResumes();
});