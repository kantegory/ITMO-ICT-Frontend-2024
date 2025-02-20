document.addEventListener('DOMContentLoaded', function() {
    const workoutList = document.getElementById('workoutList');
    const filterLevel = document.getElementById('filterLevel');
    const filterType = document.getElementById('filterType');
    const filterDuration = document.getElementById('filterDuration');
    const searchButton = document.getElementById('searchButton');

    // Sample workout data
    const workouts = [
        { id: 1, name: 'Beginner Yoga', level: 'beginner', type: 'flexibility', duration: 30 },
        { id: 2, name: 'Intermediate HIIT', level: 'intermediate', type: 'cardio', duration: 45 },
        { id: 3, name: 'Advanced Strength Training', level: 'advanced', type: 'strength', duration: 60 },
    ];

    // Function to display workouts
    function displayWorkouts(filteredWorkouts) {
        workoutList.innerHTML = ''; // Clear previous results
        if (filteredWorkouts.length === 0) {
            workoutList.innerHTML = '<p class="text-muted">Нет результатов</p>';
            return;
        }
        filteredWorkouts.forEach(workout => {
            const workoutItem = document.createElement('li');
            workoutItem.className = 'list-group-item';
            workoutItem.innerHTML = `
                <h5>${workout.name}</h5>
                <p><strong>Уровень:</strong> ${workout.level}</p>
                <p><strong>Тип:</strong> ${workout.type}</p>
                <p><strong>Длительность:</strong> ${workout.duration} мин</p>
                <a href="workout-detail.html?id=${workout.id}" class="btn btn-info btn-sm">Подробнее</a>
            `;
            workoutList.appendChild(workoutItem);
        });
    }

    // Function to filter workouts
    function filterWorkouts() {
        const level = filterLevel.value;
        const type = filterType.value;
        const duration = filterDuration.value ? parseInt(filterDuration.value, 10) : null;

        const filteredWorkouts = workouts.filter(workout => {
            return (!level || workout.level === level) &&
                   (!type || workout.type === type) &&
                   (!duration || workout.duration <= duration);
        });

        displayWorkouts(filteredWorkouts);
    }

    // Event listener for filters
    searchButton.addEventListener('click', filterWorkouts);

    // Initial display of workouts
    displayWorkouts(workouts);
});