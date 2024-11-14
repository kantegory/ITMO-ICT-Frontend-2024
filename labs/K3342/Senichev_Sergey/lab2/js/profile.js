const API_BASE_URL = 'http://localhost:3000';

async function loadUserProfile() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            return;
        }

        const userId = currentUser.id;
        const workoutsResponse = await fetch(`${API_BASE_URL}/userWorkouts?userId=${userId}`)

        if (!workoutsResponse.ok) {
            throw new Error('Ошибка при загрузке данных тренировок');
        }

        const workouts = await workoutsResponse.json();

        renderProfile(currentUser);
        renderStats(workouts.length);
        renderWorkoutList(workouts);

    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        showError('Произошла ошибка при загрузке данных профиля');
    }
}

function renderProfile(userData) {
    document.querySelector('.profile-name').textContent = userData.name;
    document.querySelector('.profile-email').textContent = userData.email;

    if (userData.image) {
        document.querySelector('.profile-image img').src = userData.image;
    }
}

function renderStats(workoutsCount) {
    document.querySelector('.profile-stats').innerHTML = `
        <div class="stat-item">
            <div class="stat-number">${workoutsCount}</div>
            <div class="stat-label">Тренировок</div>
        </div>
    `;
}

function renderWorkoutList(workouts) {
    const workoutList = document.querySelector('.workout-list');
    if (workouts.length == 0) {
        workoutList.innerHTML = workouts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(workout => `
            <div class="workout-item card mb-2">
                <p class="card-text">
                    Пока вы не завершили ни одной тренировки
                </p>
            </div>
        `)
        .join('');
    }
    else {
        workoutList.innerHTML = workouts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(workout => `
            <div class="workout-item card mb-2">
                <div class="card-body">
                    <h5 class="card-title">${workout.title}</h5>
                </div>
            </div>
        `)
        .join('');
    }
}

function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger mt-3';
    alertDiv.role = 'alert';
    alertDiv.textContent = message;
    document.querySelector('.profileData');
}

document.addEventListener('DOMContentLoaded', loadUserProfile);


