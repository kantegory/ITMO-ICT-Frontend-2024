const frequentWorkouts = [
    { name: "Lifting", link: "trainings.html" },
    { name: "Push up", link: "trainings.html" },
    { name: "Stretching", link: "trainings.html" }
];

const workoutList = document.getElementById("workout-list");
frequentWorkouts.forEach(workout => {
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.textContent = workout.name;
    anchor.href = workout.link;
    anchor.style.color = "#bbbbbb";
    anchor.style.textDecoration = "none";
    anchor.onmouseover = function() { anchor.style.color = "#28a745"; };
    anchor.onmouseout = function() { anchor.style.color = "#bbbbbb"; };
    li.appendChild(anchor);
    workoutList.appendChild(li);
});


const ctx = document.getElementById("weightChart").getContext("2d");
const weightChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Weight Change (kg)',
            data: [60, 58, 62, 61, 57, 54, 52, 51],
            backgroundColor: 'rgba(40, 167, 69, 0.5)',
            borderColor: '#28a745',
            borderWidth: 4,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                min: 30,
                max: 90
            }
        }
    }
});

const startingWeight = 60;
const currentWeight = 51;
const goalWeight = 45;
const progressPercentage = ((startingWeight - currentWeight) / (startingWeight - goalWeight) * 100).toFixed(1);
document.getElementById('progress-percentage').textContent = progressPercentage + '%';
