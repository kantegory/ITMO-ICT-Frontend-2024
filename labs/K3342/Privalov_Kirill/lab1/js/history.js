document.addEventListener('DOMContentLoaded', function() {
    const historyContainer = document.getElementById('history');

// В качестве примера введем вот эти данные.
    const visitHistory = [
        { date: '2023-06-12', doctor: 'Иванов И.И.', service: 'Лечение кариеса' },
        { date: '2023-05-10', doctor: 'Сидорова О.О.', service: 'Удаление зуба' },
        { date: '2023-03-22', doctor: 'Петров П.П.', service: 'Чистка зубов' }
    ];

    if (visitHistory.length > 0) {
        visitHistory.forEach(visit => {
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
        });
    } else {
        historyContainer.innerHTML = '<p>История посещений отсутствует.</p>';
    }
});
