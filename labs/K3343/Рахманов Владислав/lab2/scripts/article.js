// article.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        axios.get(`http://localhost:3000/articles/${articleId}`)
            .then(response => {
                const article = response.data;
                document.getElementById('articleTitle').textContent = article.title;
                document.getElementById('articleContent').textContent = article.fullContent;
            })
            .catch(error => {
                console.error('Произошла ошибка при загрузке статьи!', error);
            });
    } else {
        alert('Статья не найдена!');
    }
});
