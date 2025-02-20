// workout.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const workoutId = urlParams.get('id');

    if (workoutId) {
        axios.get(`http://localhost:3000/workouts/${workoutId}`)
            .then(response => {
                const workout = response.data;
                document.getElementById('workoutTitle').textContent = workout.name;
                document.getElementById('workoutVideo').src = workout.videoUrl;
                document.getElementById('workoutDescription').textContent = workout.description;
                document.getElementById('workoutDuration').textContent = `${workout.duration} минут`;
                document.getElementById('workoutLevel').textContent = workout.level;
                document.getElementById('workoutType').textContent = workout.type;
            })
            .catch(error => {
                console.error('Произошла ошибка при загрузке данных тренировки!', error);
            });
    } else {
        alert('Тренировка не найдена!');
    }
});
