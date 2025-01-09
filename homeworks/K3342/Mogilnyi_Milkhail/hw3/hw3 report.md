# Отчет по домашнему заданию #3. CSS-переменные. Темизация сайта средствами CSS
## Суть работы
Выполнить темизацию ранее реализованного сайта. Добавить к текущему варианту сайта дополнительную тему, в итоге должно получиться либо: светлая и тёмная с ориентиром на пользовательские настройки. Либо две кастомные темы с переключателем через JS.
## Ход работы
Было решено для каждой ранее созданной страницы сделать кнопку для переключения светлой и темной тем. Мы будем запоминать выбранную пользователем тему и сохранять ее в `localStorage`, чтобы при перезагрзке страницы тема оставалась прежней. Скрипт будет храниться в файле theme.js, и мы будем подключать этот файл к каждой странице в конце `body`
### Код theme.js
```css
const themeToggler = document.getElementById('theme-toggler');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggler.textContent = savedTheme === 'dark-theme' ? 'Светлая тема' : 'Темная тема';
}

themeToggler.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', '');  
        themeToggler.textContent = 'Темная тема';
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');  
        themeToggler.textContent = 'Светлая тема';
    }
});
```
### Подключение скрипта в файлах веб-страниц
```html
<script src="theme.js"></script>
```

### Кнопка
```html
<div class="theme-toggle">
    <button id="theme-toggler" class="btn btn-outline-secondary">Темная тема</button>
</div>
```

### Параметры светлой и темной тем веб-сайта
```css
/* Светлая тема */
:root {
    --bg-color: #ffffff;        
    --text-color: #35342f;        
    --link-color: #35342f;        
    --hero-text-color: #35342f;   
    --button-hover-bg: #f8f9fa;   
    --property-price-color: #37bbe4; 
}

/* Тёмная тема */
.dark-theme {
    --bg-color: #121212;    
    --bs-body-bg: var(--bg-color);
    --bs-body-color: var(--bg-color);
    --text-color: #e1e0dd;        
    --link-color: #e1e0dd;        
    --hero-text-color: #e1e0dd;   
    --button-hover-bg: #1f1f1f;   
    --property-price-color: #5cc5ff; 
}
```

## Вывод
В ходе работы я научился работать с переменными css и на их основе разработал темизацию сайта (светлую и темную тему), которая запоминает предпочтительное оформление пользователя