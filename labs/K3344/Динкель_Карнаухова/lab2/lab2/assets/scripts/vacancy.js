document.getElementById('submitVacancyBtn').addEventListener('click', function () {
    const name = document.getElementById('vacancyName').value;
    const email = document.getElementById('vacancyEmail').value;
    const link = document.getElementById('vacancyLink').value;

    if (name && email && link) {
        document.getElementById('vacancyForm').reset();

        $('#vacancyModal').modal('hide');

        document.getElementById('name').textContent = name;
        document.getElementById('email').textContent = email;
        document.getElementById('link').textContent = link;

    } else {
        alert('Пожалуйста, заполните все поля перед отправкой.');
    }
});