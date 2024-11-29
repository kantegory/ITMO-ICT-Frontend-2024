document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = slides[0].clientWidth; // Получаем ширину одного слайда
        const offset = -currentIndex * slideWidth; // Вычисляем смещение
        document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1; // Переключаемся на предыдущий слайд
        updateSlider();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0; // Переключаемся на следующий слайд
        updateSlider();
    });
});
