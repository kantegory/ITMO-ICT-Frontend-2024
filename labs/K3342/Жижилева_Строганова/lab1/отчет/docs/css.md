Для создания дизайна всего документа мы создали файл styles.css

**Код из файла style.css:**
```css

@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Dancing+Script:wght@400;700&display=swap');

/* Общий стиль документа */
body, html {
  background-color: #fafafa;
  font-family: 'Lora', serif;
  color: #333;
  min-height: 100vh;
  background: url('blur.jpg') no-repeat center center;
  background-size: cover;
  margin: 0;
  position: relative;
  overflow-y: scroll;
}

/* Заголовки */
h2 {
  color: #556B2F; /* Зеленый для заголовков */
  font-family: 'Dancing Script', cursive; /* Рукописный шрифт */
  font-weight: bold;
  font-size: 3em;
}

/* Полупрозрачный белый квадрат для фона */
.container {
  margin-top: 50px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.form-group label {
  color: #6B8E23; /* Зеленый для текста меток */
}

.form-control {
  border: 2px solid #D2B48C; /* Золотистый цвет границ */
  border-radius: 5px;
  padding: 10px;
}

.form-control:focus {
  border-color: #B0C4DE; /* Голубой при фокусе */
  box-shadow: 0 0 10px rgba(107, 142, 35, 0.3);
}

.btn-primary {
  background-color: #D2B48C; /* Приглушенный золотистый */
  border-color: #D2B48C;
  color: #fff;
  transition: background-color 0.3s ease;
  outline: none;
}

.btn-primary:hover {
  background-color: #C0A080; /* Темнее при наведении */
}

.btn-primary:focus {
  outline: none;
  box-shadow: none;
}

a {
  color: #556B2F; /* Зеленый для ссылок */
}

a:hover {
  color: #2F4F4F; /* Темно-серый для ссылок при наведении */
}

/* Анимация для кнопки при наведении */
.btn:hover {
  transform: scale(1.05);
  background-color: #7b9e6e; /* Зеленый цвет */
  transition: all 0.3s ease;
}

/* Золотой для фокуса полей ввода*/
input:focus {
  border-color: #d4af37;
  box-shadow: 0 0 5px rgba(212, 175, 55, 0.8);
  transition: all 0.3s ease;
}

/* Анимация для плавного появления контента */
.fade-in {
  opacity: 0;
  transition: opacity 1s ease-in;
}

body.onload .fade-in {
  opacity: 1;
}

#commentsSection {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

#commentsSection div {
  margin-bottom: 10px;
  border-left: 3px solid #007bff;
  padding-left: 10px;
}

#likeBtn {
  background-color: #28a745;
  color: white;
}

#likeBtn:hover {
  background-color: #218838;
}

#subscribeBtn {
  background-color: #17a2b8;
  color: white;
}

#subscribeBtn:hover {
  background-color: #138496;
}
```
