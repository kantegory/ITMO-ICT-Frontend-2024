document.getElementById('submitResumeBtn').addEventListener('click', function () {
    const name = document.getElementById('resumeName').value;
    const surname = document.getElementById('resumeSurname').value;
    const phone = document.getElementById('resumePhone').value;
    const email = document.getElementById('resumeEmail').value;
    const experience = document.getElementById('resumeExperience').value;
    const education = document.getElementById('resumeEducation').value;
    const skills = document.getElementById('resumeSkills').value;

    if (name && surname && phone && email && experience && education && skills) {
        document.getElementById('resumeForm').reset();

        $('#resumeModal').modal('hide');

        document.getElementById('name').textContent = name;
        document.getElementById('surname').textContent = surname;
        document.getElementById('phone').textContent = phone;
        document.getElementById('email').textContent = email;
        document.getElementById('skills').textContent = skills;
        document.getElementById('education').textContent = education;
        document.getElementById('work-experience').textContent = experience;

    } else {
        alert('Пожалуйста, заполните все поля перед отправкой.');
    }
});