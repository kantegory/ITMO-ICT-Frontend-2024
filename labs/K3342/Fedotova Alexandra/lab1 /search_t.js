document.addEventListener('DOMContentLoaded', function() {
    const levelFilter = document.getElementById('levelFilter');
    const typeFilter = document.getElementById('typeFilter');
    const durationFilter = document.getElementById('durationFilter');
    
    const workouts = [
        { title: 'Beginner Cardio Workout', type: 'Cardio', level: 'Beginner', duration: 'short', description: 'A perfect cardio workout for beginners, focusing on building endurance. Duration: 30 mins', img: 'workout1.jpg', link: 'workout-page.html' },
        { title: 'Advanced Strength Training', type: 'Strength', level: 'Advanced', duration: 'long', description: 'High-intensity strength workout targeting all major muscle groups. Duration: 75 mins', img: 'workout2.jpg', link: 'workout-page.html' },
    ];
    
    // Реализация фильтрации
    function renderWorkouts() {
        const selectedLevel = levelFilter.value;
        const selectedType = typeFilter.value;
        const selectedDuration = durationFilter.value;
        const workoutResults = document.getElementById('workoutResults');
        workoutResults.innerHTML = '';

        const filteredWorkouts = workouts.filter(workout => {
            return (selectedLevel === 'Choose level...' || workout.level.toLowerCase() === selectedLevel) &&
                   (selectedType === 'Choose type...' || workout.type.toLowerCase() === selectedType) &&
                   (selectedDuration === 'Choose duration...' || workout.duration === selectedDuration);
        });

        filteredWorkouts.forEach(workout => {
            const workoutCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${workout.img}" class="card-img-top" alt="Workout Image">
                        <div class="card-body">
                            <h5 class="card-title">${workout.title}</h5>
                            <p class="card-text">${workout.description}</p>
                            <p><strong>Type:</strong> ${workout.type} | <strong>Level:</strong> ${workout.level}</p>
                            <a href="${workout.link}" class="btn btn-primary">Start Workout</a>
                        </div>
                    </div>
                </div>
            `;
            workoutResults.innerHTML += workoutCard;
        });
    }

    levelFilter.addEventListener('change', renderWorkouts);
    typeFilter.addEventListener('change', renderWorkouts);
    durationFilter.addEventListener('change', renderWorkouts);
    
    renderWorkouts();
});
