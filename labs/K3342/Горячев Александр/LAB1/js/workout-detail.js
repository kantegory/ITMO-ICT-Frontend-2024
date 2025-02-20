document.addEventListener('DOMContentLoaded', function() {
    const workouts = [
        { id: 1, name: 'Beginner Yoga', level: 'beginner', type: 'flexibility', duration: 30 },
        { id: 2, name: 'Intermediate HIIT', level: 'intermediate', type: 'cardio', duration: 45 },
        { id: 3, name: 'Advanced Strength Training', level: 'advanced', type: 'strength', duration: 60 },
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const workoutId = parseInt(urlParams.get('id'), 10);

    const workout = workouts.find(w => w.id === workoutId);

    if (workout) {
        document.getElementById('workoutTitle').textContent = workout.name;

        // Check each element before updating it
        const workoutLevel = document.getElementById('workoutLevel');
        const workoutType = document.getElementById('workoutType');
        const workoutDuration = document.getElementById('workoutDuration');
        

        if (workoutLevel) workoutLevel.textContent = workout.level;
        if (workoutType) workoutType.textContent = workout.type;
        if (workoutDuration) workoutDuration.textContent = workout.duration;
    } else {
        document.querySelector('.container').innerHTML = '<p class="text-danger">Тренировка не найдена.</p>';
    }
});