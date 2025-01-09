document.addEventListener('DOMContentLoaded', function () {
    const historyContainer = document.getElementById('history');

    fetch('http://localhost:8080/api/v1/user/visits', {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при получении истории посещений');
        }
        return response.json();
    }).then(data => {
        if (data.length > 0) {
            data.forEach(visit => {
                const visitElement = document.createElement('div');
                visitElement.classList.add('card', 'mb-3');
                visitElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${visit.date}</h5>
                    <p class="card-text"><strong>Врач:</strong> ${visit.doctor}</p>
                    <p class="card-text"><strong>Услуга:</strong> ${visit.service}</p>
                </div>
            `;
                historyContainer.appendChild(visitElement);
            })
        } else {
            historyContainer.innerHTML = '<p>История посещений отсутствует.</p>';
        }
    }).catch(error => {
        historyContainer.innerHTML = `<p>${error.message}</p>`;
    });
});
