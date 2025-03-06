// This file manages the user dashboard features, including tracking progress and displaying workout plans.

document.addEventListener('DOMContentLoaded', function() {
    const userProgress = document.getElementById('userProgress');
    const workoutPlans = document.getElementById('workoutPlans');

    // Sample data for user progress and workout plans
    const progressData = {
        completedWorkouts: 10,
        totalWorkouts: 20,
        progressPercentage: 50
    };

    const plansData = [
        { name: 'Beginner Strength Training', duration: '4 weeks', level: 'Beginner' },
        { name: 'Intermediate Cardio Plan', duration: '6 weeks', level: 'Intermediate' },
        { name: 'Advanced HIIT Training', duration: '8 weeks', level: 'Advanced' }
    ];

    // Function to display user progress
    function displayUserProgress() {
        userProgress.innerHTML = `
            <h3>Ваш прогресс</h3>
            <p>Завершенные тренировки: ${progressData.completedWorkouts} из ${progressData.totalWorkouts}</p>
            <p>Процент прогресса: ${progressData.progressPercentage}%</p>
        `;
    }

    // Function to display workout plans
    function displayWorkoutPlans() {
        workoutPlans.innerHTML = '<h3>Ваши планы тренировок</h3>';
        plansData.forEach(plan => {
            workoutPlans.innerHTML += `
                <div class="workout-plan">
                    <h4>${plan.name}</h4>
                    <p>Длительность: ${plan.duration}</p>
                    <p>Уровень: ${plan.level}</p>
                </div>
            `;
        });
    }

    // Initialize dashboard
    displayUserProgress();
    displayWorkoutPlans();
});