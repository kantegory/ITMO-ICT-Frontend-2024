document.addEventListener('DOMContentLoaded', () => {
    const modal = new bootstrap.Modal(document.getElementById('video-modal'));
    const frame = document.getElementById('youtube-video');

    document.querySelectorAll('.video-title').forEach(title => {
        title.addEventListener('click', () => {
            const videoId = title.getAttribute('video-id');
            const videoTitle = document.getElementById('videoModalLabel');
            videoTitle.textContent = title.textContent;
            frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.show();
        });
    });

    document.getElementById('closeVideo').addEventListener('click', () => {
        frame.src = '';
        modal.hide();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            frame.src = '';
            modal.hide();
        }
    });
});
