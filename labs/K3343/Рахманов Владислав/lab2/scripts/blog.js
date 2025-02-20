// blog.js
document.addEventListener('DOMContentLoaded', function() {
    const addArticleForm = document.getElementById('addArticleForm');
    const articlesContainer = document.getElementById('articlesContainer');

    // Загрузка статей из сервера
    function loadArticles() {
        axios.get('http://localhost:3000/articles')
            .then(response => {
                articlesContainer.innerHTML = '';
                response.data.forEach(article => {
                    const articleCard = `
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.content}</p>
                                <a href="article.html?id=${article.id}" class="btn btn-primary">Читать дальше</a>
                            </div>
                        </div>
                    `;
                    articlesContainer.insertAdjacentHTML('beforeend', articleCard);
                });
            })
            .catch(error => {
                console.error('Произошла ошибка при загрузке статей!', error);
            });
    }

    // Обработчик добавления новой статьи
    addArticleForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const fullContent = document.getElementById('fullContent').value;

        axios.post('http://localhost:3000/articles', {
            title: title,
            content: content,
            fullContent: fullContent
        })
        .then(response => {
            alert('Статья добавлена успешно!');
            loadArticles();
            addArticleForm.reset();
        })
        .catch(error => {
            console.error('Произошла ошибка при добавлении статьи!', error);
        });
    });

    // Загрузка статей при загрузке страницы
    loadArticles();
});
