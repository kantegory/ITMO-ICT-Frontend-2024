document.addEventListener("DOMContentLoaded", function() {
    const sportFilter = document.getElementById('sport-filter');
    const trainingCards = document.querySelectorAll('.training-card');

    sportFilter.addEventListener('change', function() {
        const selectedSport = sportFilter.value;
        trainingCards.forEach(card => {
            const cardSport = card.getAttribute('data-sport');

            if (selectedSport === "" || cardSport === selectedSport) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});