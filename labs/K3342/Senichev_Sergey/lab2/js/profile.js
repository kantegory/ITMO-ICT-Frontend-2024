const API_BASE_URL = 'http://localhost:3000';

async function loadUserProfile() {

    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('currentUser:', currentUser);

        if (!currentUser) {
            console.log('No current user found');
            return;
        }

        const userId = currentUser.id;
        console.log('userId:', userId); // Проверяем ID пользователя

        const userWorkoutsResponse = await fetch(`${API_BASE_URL}/userWorkouts?userId=${userId}`);
        console.log('userWorkoutsResponse status:', userWorkoutsResponse.status);

        if (!userWorkoutsResponse.ok) {
            throw new Error('Ошибка при загрузке данных тренировок');
        }

        const userWorkouts = await userWorkoutsResponse.json();
        console.log('userWorkouts:', userWorkouts);

        const workoutList = document.querySelector('.workout-list');
        const profileName = document.querySelector('.profile-name');
        const profileEmail = document.querySelector('.profile-email');
        const profileStats = document.querySelector('.profile-stats');

        console.log('DOM elements found:', {
            workoutList: !!workoutList,
            profileName: !!profileName,
            profileEmail: !!profileEmail,
            profileStats: !!profileStats
        });

        if (userWorkouts.length === 0) {
            console.log('No workouts found');
            renderProfile(currentUser);
            renderStats(0);
            renderWorkoutList([]);
            return;
        }

        const workouts = [];
        for (const userWorkout of userWorkouts) {
            console.log('Fetching workout:', userWorkout.workoutId);
            try {
                const workoutResponse = await fetch(`${API_BASE_URL}/workouts/${userWorkout.workoutId}`);
                console.log('Workout response status:', workoutResponse.status);

                if (workoutResponse.ok) {
                    const workout = await workoutResponse.json();
                    console.log('Workout data:', workout);
                    workouts.push(workout);
                }
            } catch (error) {
                console.error(`Ошибка при загрузке тренировки ${userWorkout.workoutId}:`, error);
            }
        }

        console.log('All workouts loaded:', workouts);

        renderProfile(currentUser);
        renderStats(workouts.length);
        renderWorkoutList(workouts);

    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        showError('Произошла ошибка при загрузке данных профиля');
    }
}

function renderProfile(userData) {
    console.log('renderProfile called with:', userData);
    const profileName = document.querySelector('.profile-name');
    const profileEmail = document.querySelector('.profile-email');
    const profileImage = document.querySelector('.profile-image img');

    if (profileName) profileName.textContent = userData.name;
    if (profileEmail) profileEmail.textContent = userData.email;
    if (profileImage && userData.image) profileImage.src = userData.image;
}

function renderStats(workoutsCount) {
    console.log('renderStats called with:', workoutsCount);
    const statsElement = document.querySelector('.profile-stats');
    if (statsElement) {
        statsElement.innerHTML = `
            <div class="stat-item">
                <div class="stat-number">${workoutsCount}</div>
                <div class="stat-label">Тренировок</div>
            </div>
        `;
    } else {
        console.log('.profile-stats element not found');
    }
}

function renderWorkoutList(workouts) {
    console.log('renderWorkoutList called with:', workouts);
    const workoutList = document.querySelector('.workout-list');

    if (!workoutList) {
        console.log('.workout-list element not found');
        return;
    }
    console.log(workouts.length === 0)
    if (workouts.length === 0) {
        workoutList.innerHTML = `
            <div class="workout-item card mb-2">
            <a href="../pages/workouts.html" class="card-title">Пока вы не завершили ни одной тренировки. Начните сейчас</a>
            </div>
        `;
    } else {
        workoutList.innerHTML = workouts
            .slice(0, 5)
            .map(workout => {
                console.log('Rendering workout item:', workout);
                if (!workout || !workout.title) {
                    console.log('Invalid workout data:', workout);
                    return `
                        <div class="workout-item card mb-2">
                            <div class="card-body">
                                <h5 class="card-title">Ошибка загрузки данных</h5>
                            </div>
                        </div>
                    `;
                }
                return `
                    <div class="workout-item card mb-2">
                        <div class="card-body">
                            <a href="../pages/workout-details.html?id=${workout.id}" class="card-title">${workout.title}</a>
                        </div>
                    </div>
                `;
            })
            .join('');
    }
}

function showError(message) {
    console.log('showError called with:', message);
    const profileData = document.querySelector('.profileData');
    if (!profileData) {
        console.log('.profileData element not found');
        return;
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger mt-3';
    alertDiv.role = 'alert';
    alertDiv.textContent = message;
    profileData.appendChild(alertDiv);
}

console.log('Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    loadUserProfile();
});