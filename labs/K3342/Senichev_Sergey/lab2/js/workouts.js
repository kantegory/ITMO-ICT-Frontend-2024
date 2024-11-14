document.addEventListener('DOMContentLoaded', function() {
  const workoutsList = document.getElementById('workoutsList');
  const searchInput = document.querySelector('.workout-search');
  const loadMoreBtn = document.querySelector('.btn-primary');
  
  let currentPage = 1;
  const perPage = 6;
  
  let activeFilters = {
    difficulty: 'Все уровни',
    type: 'Все типы',
    duration: 'Любая длительность',
    search: ''
  };

  async function fetchWorkouts() {
    let queryParams = new URLSearchParams();
    
    // Добавляем параметры фильтрации
    if (activeFilters.difficulty !== 'Все уровни') {
      queryParams.append('difficulty', activeFilters.difficulty);
    }
    if (activeFilters.type !== 'Все типы') {
      queryParams.append('type', activeFilters.type);
    }
    if (activeFilters.duration !== 'Любая длительность') {
      const [min, max] = getDurationRange(activeFilters.duration);
      queryParams.append('duration_gte', min);
      if (max) queryParams.append('duration_lte', max);
    }
    if (activeFilters.search) {
      queryParams.append('q', activeFilters.search);
    }
    
    // Добавляем пагинацию
    queryParams.append('_page', currentPage);
    queryParams.append('_limit', perPage);
    
    try {
      const response = await fetch(`http://localhost:3000/workouts?${queryParams}`);
      const workouts = await response.json();
      const total = response.headers.get('X-Total-Count');
      
      renderWorkouts(workouts);
      updateLoadMoreButton(total);
    } catch (error) {
      console.error('Ошибка при загрузке тренировок:', error);
    }
  }

  function getDurationRange(duration) {
    switch (duration) {
      case '15-30 минут': return [15, 30];
      case '30-60 минут': return [31, 60];
      case '60+ минут': return [61, null];
      default: return [0, null];
    }
  }

  function renderWorkouts(workouts) {
    if (currentPage === 1) {
      workoutsList.innerHTML = '';
    }
    
    workouts.forEach(workout => {
      const workoutCard = `
        <div class="col-md-4 mb-4">
          <div class="card workout-card">
            <img src="${workout.imageUrl}" class="card-img-top" alt="Тренировка">
            <div class="card-body">
              <h4 class="card-title">${workout.title}</h4>
              <div class="workout-meta">
                <span class="badge bg-primary me-2">${workout.duration} минут</span>
                <span class="badge bg-success me-2">${workout.difficulty} уровень</span>
                <span class="badge bg-info">${workout.type}</span>
              </div>
              <p>${workout.description}</p>
              <a href="../pages/workout-details.html?id=${workout.id}" class="btn btn-primary mt-2">Подробнее</a>
            </div>
          </div>
        </div>
      `;
      workoutsList.insertAdjacentHTML('beforeend', workoutCard);
    });
  }

  function updateLoadMoreButton(total) {
    const totalPages = Math.ceil(total / perPage);
    if (loadMoreBtn) {
      loadMoreBtn.style.display = currentPage >= totalPages ? 'none' : 'block';
    }
  }

  // Обработчики событий
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
      currentPage = 1;
      activeFilters[this.name] = this.value;
      fetchWorkouts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentPage = 1;
      activeFilters.search = this.value;
      fetchWorkouts();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      currentPage++;
      fetchWorkouts();
    });
  }

  // Инициализация
  fetchWorkouts();
});