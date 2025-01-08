const videoTitles = document.querySelectorAll('.video-title');
const modal = document.getElementById('video-modal');
const frame = document.getElementById('youtube-video');
const closeButton = document.querySelector('.video-modal-close-button');

videoTitles.forEach(title => {
    title.addEventListener('click', () => {
        const videoId = title.getAttribute('video-id');
        frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.style.display = 'flex';
    });
});

closeButton.addEventListener('click', () => {
    frame.src = '';
    modal.style.display = 'none';
});
