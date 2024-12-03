const videoTitles = document.querySelectorAll('.video-title');
const modal = document.getElementById('video-modal');
const frame = document.getElementById('youtube-video');
const closeButton = document.getElementById('closeVideo');

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


function openVideoModal(videoId) {
    const videoModal = document.getElementById('video-modal');
    const youtubeVideo = document.getElementById('youtube-video');

    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}`;
    videoModal.style.display = 'block';
    document.addEventListener('keydown', closeModalOnEscape);
}

function closeVideoModal() {
    const videoModal = document.getElementById('video-modal');
    const youtubeVideo = document.getElementById('youtube-video');

    youtubeVideo.src = '';
    videoModal.style.display = 'none';

    document.removeEventListener('keydown', closeModalOnEscape);
}


function closeModalOnEscape(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
}
document.querySelectorAll('.exercise-button').forEach(button => {
    button.addEventListener('click', function() {
        const videoId = button.getAttribute('data-video-id');
        openVideoModal(videoId);
    });
});


document.getElementById('closeVideo').addEventListener('click', closeVideoModal);

