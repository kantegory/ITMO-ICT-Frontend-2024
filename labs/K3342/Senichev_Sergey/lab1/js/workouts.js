document.addEventListener('DOMContentLoaded', function() {
  const workoutsList = document.getElementById('workoutsList');
  const searchInput = document.querySelector('.workout-search');

  let activeFilters = {
    difficulty: 'Все уровни',
    type: 'Все типы',
    duration: 'Любая длительность'
  };

  function extractMinutes(text) {
    const minutes = text.match(/\d+/);
    return minutes ? parseInt(minutes[0]) : 0;
  }

  function filterWorkouts() {
    console.log('Активные фильтры:', activeFilters);

    const workoutCards = workoutsList.querySelectorAll('.workout-card');

    workoutCards.forEach(card => {
      const meta = card.querySelector('.workout-meta');
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const badges = Array.from(meta.querySelectorAll('.badge')).map(b => b.textContent.trim());

      const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
      const matchesSearch = !searchQuery || title.includes(searchQuery);

      const matchesDifficulty = activeFilters.difficulty === 'Все уровни' || badges.some(badge => {
        const normalizedBadge = badge.toLowerCase();
        const normalizedFilter = activeFilters.difficulty.toLowerCase();
        return normalizedBadge.includes(normalizedFilter);
      });

      const matchesType = activeFilters.type === 'Все типы' || badges.some(badge => {
        return badge.toLowerCase() === activeFilters.type.toLowerCase();
      });

      const matchesDuration = activeFilters.duration === 'Любая длительность' || badges.some(badge => {
        const minutes = extractMinutes(badge);
        switch (activeFilters.duration) {
          case '15-30 минут': return minutes >= 15 && minutes <= 30;
          case '30-60 минут': return minutes > 30 && minutes <= 60;
          case '60+ минут': return minutes > 60;
          default: return true;
        }
      });

      const cardContainer = card.closest('.col-md-4');
      const shouldShow = matchesSearch && matchesDifficulty && matchesType && matchesDuration;

      if (cardContainer) {
        cardContainer.style.display = shouldShow ? 'block' : 'none';
      }
    });
  }

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
      activeFilters[this.name] = this.value;
      filterWorkouts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterWorkouts();
    });
  }

  filterWorkouts();

  const loadMoreBtn = document.querySelector('.btn-primary');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      console.log('Нажата кнопка "Загрузить ещё"');
    });
  }
});
