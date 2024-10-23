const trainingTitles = document.querySelectorAll('.training-title');
const modal = document.getElementById('training-modal');
const frame = document.getElementById('youtube-video');
const closeButton = document.querySelector('.training-modal-close-button');

trainingTitles.forEach(title => {
    title.addEventListener('click', () => {
        const trainingId = title.getAttribute('training-id');
        frame.src = `https://www.youtube.com/embed/${trainingId}?autoplay=1`;
        modal.style.display = 'flex';
    });
});

closeButton.addEventListener('click', () => {
    frame.src = '';
    modal.style.display = 'none';
});
