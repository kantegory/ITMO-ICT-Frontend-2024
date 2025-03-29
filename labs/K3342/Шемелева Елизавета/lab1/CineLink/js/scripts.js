// Конфигурация API
const config = {
    apiKey: '1b34cb9c',
    apiUrl: 'http://www.omdbapi.com/'
};

// Список популярных фильмов для загрузки на главную страницу
const popularMovies = [
    "8½", "Stalker", "Persona", "Melancholia", "Breathless", "Barry Lyndon", 
    "Solaris", "Kinds of Kindness", "Chungking Express", 
    "Blue Velvet", "Andrei Rublev", "In the Mood for Love", "Mirror", "2001: A Space Odyssey", 
    "We'll Live Till Monday", "The Passion of Joan of Arc", "Mulholland Drive", "Tokyo Story", 
    "Aftersun", "The Spirit of the Beehive", "Playtime", "AntiChrist", "Fanny and Alexander", 
    "Ikiru", "Ordet", "A Man Escaped", "Au Hasard Balthazar", "The Seventh Seal", "Poor Things", 
    "The Rules of the Game", "Citizen Kane", "Sunset Boulevard", "Blade Runner", "Close-Up", "The Red Shoes", "Metropolis", "The Conformist", 
    "Days of Heaven", "Ivan's Childhood", "Wings of Desire", "Wild Strawberries", 
    "The 400 Blows", "City Lights", "L'Atalante", "Sansho the Bailiff", "A Brighter Summer Day", 
    "Pierrot le Fou", "Hiroshima Mon Amour", "Faces", "Le Samouraï", "Elevator to the Gallows", 
    "Yi Yi", "Ran", "The Travelling Players", "Autumn Sonata", "The Leopard"
];

// Сделаем переменную глобальной
window.popularMovies = popularMovies;

// Функция для получения данных о фильме по названию и возврата нужных данных
async function fetchMovieData(title) {
    try {
        const response = await fetch(`${config.apiUrl}?apikey=${config.apiKey}&t=${encodeURIComponent(title)}`);
        const data = await response.json();
        
        // Проверяем, что запрос выполнен успешно и возвращаем нужные данные
        if (data.Response === "True") {
            return {
                imdbID: data.imdbID,
                Title: data.Title,
                Poster: data.Poster
            };
        } else {
            console.log(`Фильм с названием "${title}" не найден.`);
            return null;
        }
    } catch (error) {
        console.error('Ошибка при получении данных о фильме:', error);
        return null;
    }
}

window.fetchMovieData = fetchMovieData

// Функция для загрузки данных по списку популярных фильмов
async function loadMainPageMovies(movieTitles) {
    const movieGrid = document.querySelector('.movie-grid');
    movieGrid.innerHTML = ''; // Очистка существующего контента

    for (const title of movieTitles) {
        const movieData = await fetchMovieData(title);

        // Проверяем, если данные о фильме получены, добавляем на страницу
        if (movieData) {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.style.backgroundImage = `url(${movieData.Poster !== "N/A" ? movieData.Poster : "images/default-poster.png"})`; // Используем изображение по умолчанию, если постер отсутствует

            // Добавить событие клика для перехода на страницу фильма с использованием imdbID
            movieItem.addEventListener('click', () => {
                window.location.href = `movie.html?imdbID=${encodeURIComponent(movieData.imdbID)}`;
            });

            movieGrid.appendChild(movieItem);
        } else {
            console.log(`Данные не найдены для фильма: ${title}`);
        }
    }
}

// Вызов функции загрузки фильмов при загрузке главной страницы
if (window.location.pathname.endsWith("main.html")) {
    loadMainPageMovies(popularMovies);
}

// Поиск
document.addEventListener('DOMContentLoaded', () => {
    // Обработчик для кнопки поиска
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", (event) => {
            event.preventDefault();
            const query = document.querySelector(".search-input").value.trim();
            if (query) {
                window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
            }
        });
    }

    // Функция для получения результатов поиска из базы данных
    async function fetchSearchResults(query) {
        try {
            const response = await fetch(`${config.apiUrl}?apikey=${config.apiKey}&s=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data.Response === "True" ? data.Search : [];
        } catch (error) {
            console.error('Error fetching search results:', error);
            return [];
        }
    }

    // Функция для загрузки результатов на странице поиска
    async function loadSearchResults() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get("query");

        if (query) {
            const searchResults = await fetchSearchResults(query);
            const movieGrid = document.getElementById("searchResults");
            const noResults = document.getElementById("noResults");

            movieGrid.innerHTML = ""; // Очистка предыдущих результатов

            if (searchResults.length > 0) {
                noResults.style.display = "none";
                searchResults.forEach(movie => {
                    const movieItemContainer = document.createElement("div");
                    movieItemContainer.classList.add("movie-item-container");

                    const movieItem = document.createElement("div");
                    movieItem.classList.add("movie-item");
                    movieItem.style.backgroundImage = `url(${movie.Poster !== "N/A" ? movie.Poster : 'images/default-poster.png'})`;
                    movieItem.onclick = () => {
                        window.location.href = `movie.html?imdbID=${movie.imdbID}`;
                    };

                    const movieTitle = document.createElement("div");
                    movieTitle.classList.add("movie-title");
                    movieTitle.textContent = movie.Title;

                    movieItemContainer.appendChild(movieItem);
                    movieItemContainer.appendChild(movieTitle);
                    movieGrid.appendChild(movieItemContainer);
                });
            } else {
                noResults.style.display = "block";
            }
        }
    }

    // Запуск функции на странице результатов
    if (window.location.pathname.endsWith("search-results.html")) {
        loadSearchResults();
    }

    // Обработчик для кнопки фильтров
    const filterButton = document.querySelector('.filters-button');
    if (filterButton) {
        filterButton.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('filterModal').style.display = 'block';
        });
    }

    // Обработчик для кнопки закрытия модального окна фильтров
    const closeModalButton = document.getElementById('closeModalButton');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            document.getElementById('filterModal').style.display = 'none';
        });
    }
});


// Получаем `imdbID` из URL
function getImdbIDFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("imdbID");
}

// Загружаем информацию о фильме
async function loadMovieDetails(imdbID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${config.apiKey}&i=${imdbID}`);
        const movie = await response.json();

        // Обновляем элементы на странице с данными из базы данных
        document.querySelector(".poster-section").style.backgroundImage = `url(${movie.Poster !== "N/A" ? movie.Poster : 'images/default-poster.png'})`;
        document.querySelector(".movie-title").textContent = movie.Title || "no title available";
        document.querySelector(".movie-director").textContent = `directed by ${movie.Director}` || "no director info";
        document.querySelector(".movie-release-duration").textContent = `${movie.Year || "-"} • ${movie.Runtime || "- min"}`;
        document.querySelector(".movie-genres").textContent = movie.Genre || "no genres available";
        document.querySelector(".movie-plot").textContent = movie.Plot || "no plot available";
        document.querySelector(".imdb-rating").textContent = "IMDb";
        document.querySelector(".movie-rating").textContent = movie.imdbRating || "N/A";

        // Обновляем секцию Cast & Crew
        document.querySelector(".cast-list").textContent = movie.Actors || "no actors listed";
        // Обновляем информацию по профессиям в секции Crew
        document.getElementById("crew-director").textContent = movie.Director || "unknown";
        document.getElementById("crew-writing").textContent = movie.Writer || "unknown";
    } catch (error) {
        console.error("Error loading movie details:", error);
    }
}

// Запускаем загрузку данных фильма при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const imdbID = getImdbIDFromURL();
    if (imdbID) {
        loadMovieDetails(imdbID);
    }
});

document.querySelectorAll('.search-form').forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = form.querySelector('.search-input').value;
        window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
    });
});