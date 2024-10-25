// Инициализация переменной для хранения количества лайков
let likeCount = 0;

// Функция для обработки нажатия на кнопку "Лайк"
document.getElementById('likeBtn').addEventListener('click', function() {
    likeCount += 1; // Увеличиваем количество лайков на 1
    document.getElementById('likeCount').textContent = likeCount; // Обновляем текст счетчика
});

// Функция для обработки нажатия на кнопку "Подписаться"
document.getElementById('subscribeBtn').addEventListener('click', function() {
    // Выводим модальное окно подписки
    const subscriptionModalHtml = `
        <div class="modal fade" id="subscribeModal" tabindex="-1" aria-labelledby="subscribeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="subscribeModalLabel">Subscribe to Author</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>You have successfully subscribed to <strong>John Doe</strong>.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Вставляем модальное окно в DOM
    document.body.insertAdjacentHTML('beforeend', subscriptionModalHtml);

    // Открываем модальное окно
    $('#subscribeModal').modal('show');

    // Удаляем модальное окно после закрытия
    $('#subscribeModal').on('hidden.bs.modal', function () {
        $(this).remove(); // Удаляем модальное окно из DOM после закрытия
    });
});

// Функция для обработки нажатия на кнопку "Отправить комментарий"
document.getElementById('submitCommentBtn').addEventListener('click', function() {
    const commentText = document.getElementById('commentText').value; // Получаем текст комментария
    if (commentText) {
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('div'); // Создаем новый div для комментария
        newComment.classList.add('comment'); // Класс для стилей
        newComment.textContent = commentText; // Устанавливаем текст комментария
        commentsList.appendChild(newComment); // Добавляем новый комментарий в список

        // Очищаем поле ввода комментария
        document.getElementById('commentText').value = '';

        // Закрываем модальное окно после добавления комментария
        $('#commentModal').modal('hide');
    } else {
        alert('Please enter a comment before submitting.'); // Предупреждение, если комментарий пустой
    }
});
