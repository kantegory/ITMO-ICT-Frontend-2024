document.addEventListener('DOMContentLoaded', function () {
    const districtFilter = document.getElementById('districtFilter');
    const clinicCards = document.querySelectorAll('.clinic-card');

    districtFilter.addEventListener('change', function () {
        const selectedDistrict = districtFilter.value;

        clinicCards.forEach(card => {
            const cardDistrict = card.getAttribute('data-district');

            if (selectedDistrict === 'all' || cardDistrict === selectedDistrict) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
