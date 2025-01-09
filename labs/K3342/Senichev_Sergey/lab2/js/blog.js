document.addEventListener('DOMContentLoaded', function() {
    const postsList = document.getElementById('postsList');
    const searchInput = document.querySelector('.blog-search');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let currentPage = 1;
    const perPage = 6;

    let activeFilters = {
        dateFilter: 'all',
        search: ''
    };

    // Получение диапазона дат для фильтра
    function getDateRange(filter) {
        const now = new Date();
        let startDate = null;

        switch (filter) {
            case 'week':
                startDate = new Date(now);
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate = new Date(now);
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            default:
                return null;
        }

        // Форматирование даты в формат YYYY-MM-DD
        return startDate ? startDate.toISOString().split('T')[0] : null;
    }

    async function fetchPosts() {
        try {
            // Базовые параметры
            let queryParams = new URLSearchParams({
                _page: currentPage.toString(),
                _limit: perPage.toString(),
                _sort: 'date',
                _order: 'desc'
            });

            // Добавление поискового запроса
            if (activeFilters.search) {
                queryParams.append('q', activeFilters.search);
            }

            // Получаем все посты для фильтрации на стороне клиента
            const response = await fetch(`http://localhost:3000/posts?${queryParams}`);
            let posts = await response.json();
            const total = response.headers.get('X-Total-Count');

            // Фильтрация по дате на стороне клиента
            if (activeFilters.dateFilter !== 'all') {
                const dateFrom = getDateRange(activeFilters.dateFilter);
                if (dateFrom) {
                    posts = posts.filter(post => {
                        const postDate = new Date(post.date);
                        const filterDate = new Date(dateFrom);
                        return postDate >= filterDate;
                    });
                }
            }

            renderPosts(posts);
            updateLoadMoreButton(posts.length);

        } catch (error) {
            console.error('Ошибка при загрузке постов:', error);
            postsList.innerHTML = '<div class="col-12"><div class="alert alert-danger">Ошибка при загрузке постов</div></div>';
        }
    }

    function renderPosts(posts) {
        if (currentPage === 1) {
            postsList.innerHTML = '';
        }

        if (posts.length === 0) {
            postsList.innerHTML = '<div class="col-12"><div class="alert alert-info">Нет постов, соответствующих выбранным критериям</div></div>';
            return;
        }

        posts.forEach(post => {
            const date = new Date(post.date).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const postCard = `
                <div class="col-md-4 mb-4">
                    <div class="card blog-card">
                        <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}" 
                             onerror="this.src='/api/placeholder/400/225'">
                        <div class="card-body">
                            <h4 class="card-title">${post.title}</h4>
                            <div class="blog-meta">
                                <span class="badge bg-primary me-2">${date}</span>
                                <span class="badge bg-info">${post.category}</span>
                            </div>
                            <p class="card-text">${post.content}</p>
                            <a href="post-details.html?id=${post.id}" class="btn btn-primary mt-2">Читать далее</a>
                        </div>
                    </div>
                </div>
            `;
            postsList.insertAdjacentHTML('beforeend', postCard);
        });
    }

    function updateLoadMoreButton(totalPosts) {
        const totalPages = Math.ceil(totalPosts / perPage);
        loadMoreBtn.style.display = currentPage >= totalPages ? 'none' : 'block';
    }

    // Обработчики событий
    document.querySelectorAll('input[name="dateFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            currentPage = 1;
            activeFilters.dateFilter = this.value;
            fetchPosts();
        });
    });

    if (searchInput) {
        let debounceTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                currentPage = 1;
                activeFilters.search = this.value;
                fetchPosts();
            }, 300);
        });
    }

    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        fetchPosts();
    });

    // Начальная загрузка постов
    fetchPosts();
});