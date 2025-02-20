document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded fired!");
    console.log("Script loaded!");

    const userName = document.getElementById('userName');
    const workoutCount = document.getElementById('workoutCount');
    const previousWorkouts = document.getElementById('previousWorkouts');
    const progressBar = document.getElementById('workoutProgress');
    const workoutGoal = document.getElementById('workoutGoal');

    console.log("Elements found:", { userName, workoutCount, previousWorkouts, progressBar, workoutGoal });

    if (!userName || !workoutCount || !previousWorkouts || !progressBar) {
        console.error("Some elements were not found! Check your HTML.");
        return;
    }

    // Sample user data
    const user = {
        name: "Александр",
        workouts: [
            { date: "2023-10-01", title: "Силовая тренировка" },
            { date: "2023-10-03", title: "Кардио тренировка" },
            { date: "2023-10-05", title: "Гибкость и растяжка" }
        ],
        workoutGoal: 10
    };

    console.log("User data loaded:", user);

    // Populate user name and workout count
    userName.textContent = user.name;
    workoutCount.textContent = user.workouts.length;
    workoutGoal.textContent = user.workoutGoal;


    // Debug: Check if workouts array exists
    console.log("User workouts:", user.workouts);

    if (!Array.isArray(user.workouts) || user.workouts.length === 0) {
        console.error("No workouts found!");
    }

    // Populate previous workouts
    user.workouts.forEach(workout => {
        console.log("Adding workout:", workout);
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${workout.date}: ${workout.title}`;
        previousWorkouts.appendChild(li);
    });

    // Debug: Check if workouts were added
    console.log("Final previous workouts list:", previousWorkouts.innerHTML);

    const workoutsCompleted = user.workouts.length;
    let progressPercentage = (workoutsCompleted / user.workoutGoal) * 100;
    progressPercentage = Math.min(progressPercentage, 100); // Max 100%

    // Update progress bar
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    progressBar.textContent = `${Math.round(progressPercentage)}%`;
});