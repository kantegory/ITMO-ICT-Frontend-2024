document.addEventListener('DOMContentLoaded', async () => {
    const trainingContainer = document.querySelector('.column');
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const youtubeVideo = document.getElementById('youtube-video');
    const modalTitle = document.getElementById('videoModalLabel');

    async function loadTrainings() {
        try {
            const response = await fetch('db.json');
            const data = await response.json();
            data.trainings.forEach(training => {
                const card = document.createElement('div');
                card.classList.add('row-md-2');
                card.innerHTML = `
                    <div class="training-card" data-sport="${training.sport}">
                        <img src="${training.image}" alt="${training.title}">
                        <div class="training-content">
                            <h2 class="video-title" video-id="${training.videoId}" data-sport="${training.sport}">${training.title}</h2>
                            <hr>
                            <p>${training.description}</p>
                        </div>
                    </div>
                `;
                trainingContainer.appendChild(card);
            });

            document.querySelectorAll('.video-title').forEach(title => {
                title.addEventListener('click', () => {
                    const videoId = title.getAttribute('video-id');
                    const sport = title.getAttribute('data-sport');
                    modalTitle.textContent = sport;
                    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                    videoModal.show();
                });
            });

        } catch (error) {
            console.error('Error loading trainings:', error);
            trainingContainer.innerHTML = '<p>Error loading posts.</p>';
        }
    }

    document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
        youtubeVideo.src = '';
    });

    document.getElementById('sport-filter').addEventListener('change', (event) => {
            const filterValue = event.target.value;
            const trainingCards = document.querySelectorAll('.training-card');
            trainingCards.forEach(card => {
                const sport = card.dataset.sport;
                if (filterValue === '' || sport === filterValue) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

    loadTrainings();
});
