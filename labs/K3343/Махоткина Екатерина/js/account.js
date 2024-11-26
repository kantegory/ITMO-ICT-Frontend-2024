document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    const usersURL = 'http://localhost:3000/users';

    fetch(usersURL)
        .then(response => response.json())
        .then(data => {
            users = data;
            if (userId) {
                const user = users.find(user => user.id === userId);
                const avatarElement = document.querySelector('.profile-avatar');
                if (user.gender === 'male') {
                    avatarElement.src = "images/account-images/male-avatar.png";
                } else if (user.gender === 'female') {
                    avatarElement.src = "images/account-images/female-avatar.png";
                }
                document.querySelector('.profile-details h1').textContent = user.name;
                document.querySelector('.profile-details p:nth-child(2)').textContent = "Gender: " + user.gender;
                document.querySelector('.profile-details p:nth-child(3)').textContent = "Age: " + user.age;
                document.querySelector('.profile-details p:nth-child(4)').textContent = "Current Weight: " + user.currentWeight + " kg";
                document.querySelector('.profile-details p:nth-child(5)').textContent = "Completed Workouts: " + user.completedWorkouts;

                const tableBody = document.querySelector('table');
                const measurements = [
                    { label: 'Current weight', value: user.currentWeight },
                    { label: 'Waist circumference', value: user.waistCircumference || 0 },
                    { label: 'Hip circumference', value: user.hipCircumference || 0 },
                    { label: 'Chest circumference', value: user.chestCircumference || 0 }
                ];

                measurements.forEach(measurement => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${measurement.label}</td>
                    <td class="measures" contenteditable="true">${measurement.value}</td>
                `;
                    tableBody.appendChild(row);
                });

                document.getElementById('saveChangesButton').addEventListener('click', () => {
                    const updatedMeasurements = Array.from(tableBody.rows).map(row => ({
                        label: row.cells[0].textContent,
                        value: parseFloat(row.cells[1].textContent)
                    }));

                    updatedMeasurements.forEach(measurement => {
                        if (measurement.label === 'Current weight') user.currentWeight = measurement.value;
                        if (measurement.label === 'Current weight') user.weightProgress.push(measurement.value);
                        if (measurement.label === 'Waist circumference') user.waistCircumference = measurement.value;
                        if (measurement.label === 'Hip circumference') user.hipCircumference = measurement.value;
                        if (measurement.label === 'Chest circumference') user.chestCircumference = measurement.value;
                    });

                    fetch(`${usersURL}/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                });

                document.getElementById('currentWeight').textContent = user.currentWeight + " kg";
                const progressPercent = Math.round(((user.startWeight - user.currentWeight) / (user.startWeight - user.goalWeight)) * 100);
                document.getElementById('progressPercent').textContent = progressPercent + "%";
                document.getElementById('workoutsCompleted').textContent = user.completedWorkouts;
                const registrationDate = new Date(user.dateRegistration);
                const currentDate = new Date();
                const daysSinceRegistration = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));
                document.getElementById('registrationDate').textContent = daysSinceRegistration;

                const circles = [
                    { id: 'currentWeightCircle', value: user.currentWeight / user.startWeight * 100 },
                    { id: 'progressPercentCircle', value: progressPercent },
                    { id: 'workoutsCompletedCircle', value: user.completedWorkouts / 50 * 100 },
                    { id: 'registrationDateCircle', value: daysSinceRegistration / 365 * 100 },
                ];

                circles.forEach(circle => {
                    const circleElement = document.getElementById(circle.id);
                    const percentage = Math.min(circle.value, 100);
                    let color = '#1d7e33';

                    if (percentage <= 30) {
                        color = 'red';
                    } else if (percentage <= 60) {
                        color = 'orange';
                    } else if (percentage <= 80) {
                        color = 'yellow';
                }
                    circleElement.style.background = `conic-gradient(${color} 0% ${percentage}%, #444 ${percentage}% 100%)`;
                });

                const workoutList = document.getElementById('workout-list');
                if (user.frequentWorkouts.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = "No frequent workouts";
                    workoutList.appendChild(li);
                }
                user.frequentWorkouts.forEach(workout => {
                    const li = document.createElement('li');
                    li.textContent = workout;
                    workoutList.appendChild(li);
                });

                const ctx = document.getElementById('weightChart').getContext('2d');
                const weightChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: user.weightProgress.map((_, index) => `Month ${index + 1}`),
                        datasets: [{
                            label: 'Weight Progress (kg)',
                            data: user.weightProgress,
                            backgroundColor: 'rgba(40, 115, 69, 0.5)',
                            borderColor: '#1d7e33',
                            borderWidth: 4,
                            fill: true,
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        })
});