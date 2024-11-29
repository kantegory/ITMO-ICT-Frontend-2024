// Конфигурация API
const config = {
    apiKey: '1b34cb9c',
    apiUrl: 'http://www.omdbapi.com/'
};

// Доступные фильтры
const genres = ["action", "adventure", "animation", "biography", "comedy", "crime", "documentary", "drama", "family", "fantasy", "film-noir", "history", "horror", "musical", "mystery", "romance", "sci-fi", "sport", "thriller", "war", "western"];
const decades = ["2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s"];
const ratings = Array.from({ length: 9 }, (_, i) => `> ${i + 1}`);

// Отображение кнопок фильтров
function displayFilters() {
    const genreContainer = document.getElementById('genreButtons');
    const decadeContainer = document.getElementById('decadeButtons');
    const ratingContainer = document.getElementById('ratingButtons');

    genres.forEach(genre => {
        const button = createFilterButton(genre);
        genreContainer.appendChild(button);
    });

    decades.forEach(decade => {
        const button = createFilterButton(decade);
        decadeContainer.appendChild(button);
    });

    ratings.forEach(rating => {
        const button = createFilterButton(rating, true);
        ratingContainer.appendChild(button);
    });
}

// Создание кнопки для одного фильтра
function createFilterButton(text, isSingleSelect = false) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('filter-button');
    button.addEventListener('click', () => {
        if (isSingleSelect) {
            document.querySelectorAll('.selected').forEach(btn => btn.classList.remove('selected'));
        }
        button.classList.toggle('selected');
    });
    return button;
}

// Сбор выбранных фильтров
function getSelectedFilters() {
    const selectedGenres = Array.from(document.querySelectorAll('#genreButtons .selected')).map(button => button.textContent.toLowerCase());
    const selectedDecades = Array.from(document.querySelectorAll('#decadeButtons .selected')).map(button => button.textContent);
    const selectedRating = document.querySelector('#ratingButtons .selected')?.textContent.replace('>', '').trim() || null;

    return { genres: selectedGenres, decades: selectedDecades, rating: selectedRating };
}

// Применение выбранных фильтров к списку фильмов
async function applyFilters() {
    const filters = getSelectedFilters();
    const movieGrid = document.querySelector('.movie-grid');
    movieGrid.innerHTML = ''; // Очистка существующих фильмов

    for (const title of popularMovies) {
        const movieData = await fetchMovieData(title);

        if (!movieData) continue;

        // Проверка, соответствует ли фильм выбранным фильтрам
        const matchesGenre = filters.genres.length === 0 || filters.genres.some(genre => movieData.Genre?.toLowerCase().includes(genre));
        const matchesDecade = filters.decades.length === 0 || filters.decades.some(decade => movieData.Year?.startsWith(decade.slice(0, 3)));
        const matchesRating = !filters.rating || parseFloat(movieData.imdbRating) >= parseFloat(filters.rating);

        if (matchesGenre && matchesDecade && matchesRating) {
            addMovieToGrid(movieData);
        }
    }

    document.getElementById('filterModal').style.display = 'none';
}

// Добавление фильма в сетку
function addMovieToGrid(movieData) {
    const movieGrid = document.querySelector('.movie-grid');
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.style.backgroundImage = `url(${movieData.Poster !== "N/A" ? movieData.Poster : "images/default-poster.png"})`;

    movieItem.addEventListener('click', () => {
        window.location.href = `movie.html?imdbID=${movieData.imdbID}`;
    });

    movieGrid.appendChild(movieItem);
}

// Инициализация фильтров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayFilters();

    const applyButton = document.getElementById('applyFiltersButton');
    applyButton.addEventListener('click', applyFilters);

    document.getElementById('filterButton').addEventListener('click', () => {
        document.getElementById('filterModal').style.display = 'block';
    });

    document.getElementById('closeButton').addEventListener('click', () => {
        document.getElementById('filterModal').style.display = 'none';
    });
});
