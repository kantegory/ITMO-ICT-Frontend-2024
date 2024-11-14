document.addEventListener('DOMContentLoaded', function() {
    const workoutId = new URLSearchParams(window.location.search).get('id');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    async function loadWorkoutDetails() {
        try {
            const response = await fetch(`http://localhost:3000/workouts/${workoutId}`);
            const workout = await response.json();

            let isFavorite = false;
            if (currentUser) {
                const favResponse = await fetch(
                    `http://localhost:3000/favorites?userId=${currentUser.id}&workoutId=${workoutId}`
                );
                const favData = await favResponse.json();
                isFavorite = favData.length > 0;
            }

            const similarResponse = await fetch(
                `http://localhost:3000/workouts?type=${workout.type}&id_ne=${workoutId}&_limit=3`
            );
            const similarWorkouts = await similarResponse.json();

            updateUI(workout, isFavorite, similarWorkouts);
        } catch (error) {
            console.error('Ошибка при загрузке данных тренировки:', error);
        }
    }

    function updateUI(workout, isFavorite, similarWorkouts) {
        document.querySelector('.breadcrumb li:last-child').textContent = workout.title;

        document.querySelector('h1').textContent = workout.title;
        document.querySelector('.workout-meta').innerHTML = `
            <span class="badge bg-primary me-2">${workout.duration} минут</span>
            <span class="badge bg-success me-2">${workout.difficulty} уровень</span>
            <span class="badge bg-info">${workout.type}</span>
        `;

        document.querySelector('.workout-info p').textContent = workout.description;

        const accordionContainer = document.getElementById('workoutSteps');
        accordionContainer.innerHTML = workout.program.map((section, index) => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#step${section.id}">
                        ${section.title} (${section.duration})
                    </button>
                </h2>
                <div id="step${section.id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
                    <div class="accordion-body">
                        <ul>
                            ${section.steps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');

        const trainer = workout.trainer;
        document.querySelector('.card-body .rounded-circle').src = trainer.image;
        document.querySelector('h5').textContent = trainer.name;
        document.querySelector('.small').textContent = trainer.title;
        document.querySelector('.card-body > p').textContent = trainer.experience;

        const equipmentList = document.querySelector('.card-body ul');
        if (equipmentList) {
            equipmentList.innerHTML = workout.equipment
                .map(item => `<li>${item}</li>`)
                .join('');
        }

        // Обновление кнопок действий
        const actionButtons = document.querySelector('.card:last-child .card-body');
        actionButtons.innerHTML = `
            ${currentUser ? `
                <button class="btn btn-outline-primary w-100 ${isFavorite ? 'active' : ''}" 
                        onclick="toggleFavorite(${workout.id})">
                    ${isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                </button>
            ` : `
                <a href="../pages/login.html" class="btn btn-primary w-100">Войдите, чтобы начать</a>
            `}
        `;

        const similarContainer = document.querySelector('.similar-workouts .row');
        similarContainer.innerHTML = similarWorkouts.map(similar => `
            <div class="col-md-4">
                <div class="card workout-card">
                    <img src="${similar.imageUrl}" class="card-img-top" alt="${similar.title}">
                    <div class="card-body">
                        <h5 class="card-title">${similar.title}</h5>
                        <span class="badge bg-primary">${similar.duration} минут</span>
                        <span class="badge bg-success">${similar.difficulty} уровень</span>
                        <a href="workout-details.html?id=${similar.id}" class="btn btn-primary mt-2">Подробнее</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.toggleFavorite = async function(workoutId) {
        if (!currentUser) {
            window.location.href = '../pages/login.html';
            return;
        }

        try {
            const favResponse = await fetch(
                `http://localhost:3000/favorites?userId=${currentUser.id}&workoutId=${workoutId}`
            );
            const favData = await favResponse.json();

            if (favData.length > 0) {
                await fetch(`http://localhost:3000/favorites/${favData[0].id}`, {
                    method: 'DELETE'
                });
            } else {
                await fetch('http://localhost:3000/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUser.id,
                        workoutId: workoutId,
                        createdAt: new Date().toISOString()
                    })
                });
            }

            loadWorkoutDetails();
        } catch (error) {
            console.error('Ошибка при обновлении избранного:', error);
        }
    };

    if (workoutId) {
        loadWorkoutDetails();
    } else {
        console.error('ID тренировки не указан');
    }
});