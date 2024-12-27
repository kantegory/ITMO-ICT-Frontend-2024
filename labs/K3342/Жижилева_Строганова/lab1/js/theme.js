// Функция для переключения темы
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  }
}

// Проверяем текущую тему и устанавливаем её при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  // Проверяем наличие темы в localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.body.classList.add(currentTheme);
  } else {
    // Устанавливаем светлую тему по умолчанию
    document.body.classList.add("light-theme");
  }

  // Добавляем слушатель событий на кнопку переключения темы
  const themeToggleButton = document.getElementById("theme-toggle");
  themeToggleButton.addEventListener("click", function() {
    toggleTheme();

    // Сохраняем выбранную тему в localStorage
    const currentTheme = document.body.classList.contains("dark-theme") ? "dark-theme" : "light-theme";
    localStorage.setItem('theme', currentTheme);
  });
});
