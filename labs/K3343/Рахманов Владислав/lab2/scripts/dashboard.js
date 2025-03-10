document.addEventListener('DOMContentLoaded', function() {
    // Обработчик события для формы
    const plansForm = document.getElementById('plansForm');
    plansForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const cardioGoal = parseInt(document.getElementById('cardioGoal').value, 10) || 0;
        const cardioCompleted = parseInt(document.getElementById('cardioCompleted').value, 10) || 0;
        const strengthGoal = parseInt(document.getElementById('strengthGoal').value, 10) || 0;
        const strengthCompleted = parseInt(document.getElementById('strengthCompleted').value, 10) || 0;

        axios.patch('http://localhost:3000/progress/1', {
            cardioGoal: cardioGoal,
            cardioCompleted: cardioCompleted,
            strengthGoal: strengthGoal,
            strengthCompleted: strengthCompleted
        })
        .then(response => {
            updateProgress();
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.error('Ошибка 404: ресурс не найден!', error);
            } else {
                console.error('Ошибка при обновлении данных прогресса!', error);
            }
        });
    });

    // Обновление прогресса после загрузки страницы
    updateProgress();

    // Увеличение счетчика после открытия страницы тренировки
    const urlParams = new URLSearchParams(window.location.search);
    const workoutType = urlParams.get('type'); // Получаем тип тренировки из URL

    if (workoutType) {
        increaseWorkoutCount(workoutType);
    }
});

function updateProgress() {
    axios.get('http://localhost:3000/progress/1')
        .then(response => {
            const progress = response.data;
            const progressContainer = document.getElementById('progressContainer');
            progressContainer.textContent = `Кардио: ${progress.cardioCompleted}/${progress.cardioGoal}, Силовые: ${progress.strengthCompleted}/${progress.strengthGoal}`;

            // Обновление значений в форме
            document.getElementById('cardioGoal').value = progress.cardioGoal;
            document.getElementById('cardioCompleted').value = progress.cardioCompleted;
            document.getElementById('strengthGoal').value = progress.strengthGoal;
            document.getElementById('strengthCompleted').value = progress.strengthCompleted;
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.error('Ошибка 404: ресурс не найден!', error);
            } else {
                console.error('Ошибка при получении данных прогресса!', error);
            }
        });
}

function increaseWorkoutCount(type) {
    axios.get('http://localhost:3000/progress/1')
        .then(response => {
            const progress = response.data;

            if (type === 'cardio') {
                progress.cardioGoal += 1;
            } else if (type === 'strength') {
                progress.strengthGoal += 1;
            }

            axios.patch('http://localhost:3000/progress/1', {
                cardioGoal: progress.cardioGoal,
                cardioCompleted: progress.cardioCompleted,
                strengthGoal: progress.strengthGoal,
                strengthCompleted: progress.strengthCompleted
            })
            .then(response => {
                updateProgress();
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.error('Ошибка 404: ресурс не найден!', error);
                } else {
                    console.error('Ошибка при обновлении данных прогресса!', error);
                }
            });
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.error('Ошибка 404: ресурс не найден!', error);
            } else {
                console.error('Ошибка при получении данных прогресса!', error);
            }
        });
}
