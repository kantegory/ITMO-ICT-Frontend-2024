document.getElementById('searchButton').addEventListener('click', function() {
    const level = document.getElementById('level').value;
    const type = document.getElementById('type').value;
    const duration = document.getElementById('duration').value;

    axios.get(`http://localhost:3000/workouts?level=${level}&type=${type}&duration=${duration}`)
        .then(response => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';

            if (response.data.length > 0) {
                response.data.forEach(workout => {
                    const workoutItem = `
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${workout.name}</h5>
                                <p class="card-text">${workout.description}</p>
                                <a href="workout.html?id=${workout.id}&type=${workout.type}" class="btn btn-primary">Подробнее</a>
                            </div>
                        </div>
                    `;
                    searchResults.insertAdjacentHTML('beforeend', workoutItem);
                });
            } else {
                searchResults.textContent = 'По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.';
            }

            $('#searchModal').modal('show');
        })
        .catch(error => {
            console.error('Произошла ошибка при поиске тренировок!', error);
        });
});
