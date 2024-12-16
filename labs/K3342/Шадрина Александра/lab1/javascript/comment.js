function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const commentsList = document.getElementById('commentsList');

    if (commentInput.value.trim() === '') {
        const noCommentModal = new bootstrap.Modal(document.getElementById('noCommentModal'));
        noCommentModal.show();
        return;
    }

    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.textContent = commentInput.value;

    commentsList.appendChild(comment);
    commentInput.value = ''; // Очистить поле ввода
}
