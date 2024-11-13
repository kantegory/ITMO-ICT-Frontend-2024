let likeCount = 0;

document.getElementById('likeBtn').addEventListener('click', function() {
    likeCount += 1;
    document.getElementById('likeCount').textContent = likeCount;
});

document.getElementById('subscribeBtn').addEventListener('click', function() {
    const subscriptionModalHtml = `
        <div class="modal fade" id="subscribeModal" tabindex="-1" aria-labelledby="subscribeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="subscribeModalLabel">Subscribe to Author</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>You have successfully subscribed to <strong>John Doe</strong>.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', subscriptionModalHtml);

    const subscribeModal = new bootstrap.Modal(document.getElementById('subscribeModal'));
    subscribeModal.show();

    document.getElementById('subscribeModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById('subscribeModal').remove(); // Удаляем модальное окно из DOM после закрытия
    });
});

document.getElementById('submitCommentBtn').addEventListener('click', function() {
    const commentText = document.getElementById('commentText').value;
    if (commentText) {
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);

        document.getElementById('commentText').value = '';

        const commentModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
        commentModal.hide();
    } else {
        alert('Please enter a comment before submitting.');
    }
});