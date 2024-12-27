# Курс по фронтенду в Университете ИТМО

В рамках данной дисциплины Вам предстоит изучить основы клиентской веб-разработки, познакмиться с языками CSS, HTML и JS. Научиться реализовывать одностраничное приложение средствами фреймворка Vue.JS.

Общие требования ко всем работам:

- Pull Request должен иметь в названии Фамилию, Имя, Номер группы и наименование работы, которую вы хотите сдать (Пример: Иванов Иван, K33401, ПР1)
- На каждую из работ, где Вам предстоит писать код должно быть **несколько осмысленных** коммитов (учитесь коммитить правильно, подробнее об этом рассказываю здесь: https://www.youtube.com/watch?v=oXqrmsFlmiQ&list=PLAhg4XYCffElG7FpHsUtuguIwnkuvS0R9)
- За каждый день после дедлайна Вы будете терять 0.1 балла по домашней работе и 0.2 балла по лабораторной работе (датой загрузки вашей работы считается дата последнего коммита по работе)

## Памятка по загрузке работ

В зависимости от того, какую работу вы загружаете: лабораторную или домашнюю нужно выбрать директорию `homeworks` или `labs`. Далее надо выбрать директорию, соответствующую номеру своей группы. В ней создать директорию в формате `Фамилия Имя`, куда уже загружать свои работы, каждую из работ стоит также загружать в отдельную директорию внутри вашей собственной, например: `hw1/Отчёт.pdf`. Полный путь для студента Иванова Ивана из группы K33392, желающего загрузить домашнюю работу номер 1, должен выглядеть следующим образом: `homeworks/K33392/Иванов Иван/hw1/Отчёт.pdf`.

## Полезные ссылки

1. Современный учебник JavaScript: https://learn.javascript.ru/
2. Дока: https://doka.guide/
3. MDN: https://developer.mozilla.org/ru/
4. Мой YouTube: https://youtube.com/@dobryakov
5. Мой телеграм-канал: https://t.me/davidobryakov
6. Яндекс.Диск со всеми презентациями курса: https://disk.yandex.ru/i/4ZF_XDu25jmMUg

## Разделы

Всего в курсе 3 раздела:

1. Введение в проблематику клиентской веб-разработки
2. Взаимодействие с внешним API. HTML-доступность. Углубленное изучение CSS
3. Разработка одностраничного веб-приложения (SPA) с использованием фреймворка Vue.JS

## Раздел “Введение в проблематику клиентской веб-разработки”

Введение: https://youtu.be/_hzVKyRHKN8

### Язык разметки HTML: основы

Презентация: https://disk.yandex.ru/i/ilCu5uV4ReO-YA
Текстовая лекция: https://blog.kantegory.me/frontend-html-basics  
Видео-лекция: https://youtu.be/XOdffiTNHW8

### Язык разметки HTML: семантическая вёрстка

Презентация: https://disk.yandex.ru/i/ZNS7Fm-Prj5-yw
Текстовая лекция: https://blog.kantegory.me/frontend-html-semantics  
Видео-лекция: https://youtu.be/3Ea8OkMunyU

### Язык CSS: основы

Презентация: https://disk.yandex.ru/i/r30dub3G_hvjtQ
Текстовая лекция: https://blog.kantegory.me/frontend-css-basics  
Видео-лекция: https://youtu.be/EZhU1VidGVY  
Видео по селекторам с примерами: https://www.youtube.com/watch?v=onoRgoj0Xus

### Язык CSS: расположение элементов (с применением CSS Grid и CSS Flexbox)

Презентация: https://disk.yandex.ru/i/9rXhDS7ZUnJsLw

### Домашняя работа 1: CSS Flexbox, CSS Grid

Пройти три игры:

- https://flexboxfroggy.com/#ru  
- https://cssgridgarden.com/#ru
- https://learngitbranching.js.org/?locale=ru_RU (основы работы с git, достаточно выполнить первые 4 урока + все уроки по удалённым репозиториям)

Собрать отчёт по шаблону (https://docs.google.com/document/d/1zgXRYAh9iO21NDcp5Cua3mOiNRWbAVZJBfgGiqGsMsU/edit?usp=sharing). Экспортировать в pdf и открыть Pull Request в этот репозиторий.

Дедлайн: 27.09.2024

### Язык CSS: изоляция стилей

Видео-лекция: https://www.youtube.com/watch?v=xtC6l5-q4yU  
Презентация: https://disk.yandex.ru/i/gui-dByJGaPubA

### Язык CSS: адаптивность под разные виды устройств

Пример: https://github.com/kantegory/mentoring/tree/master/17_adaptive_example

### Работа с UI-фреймворком Bootstrap + адаптивность

Видео-лекция: https://www.youtube.com/watch?v=J1bMExplCAw&t=757s  
Статья про длинный и короткий контент: https://ishadeed.com/article/css-short-long-content/. 

### Язык программирования JS: основы языка, основы работы с DOM, обработка пользовательских событий, DOM-хранилища

Видео-лекция: https://www.youtube.com/watch?v=qo8RUL1_pF8

### Лабораторная работа 1: вёрстка сайта средствами HTML, CSS и Bootstrap

Дедлайн: 25.10.24

В рамках данной лабораторной работы Вам предложено выбрать один из нескольких вариантов. Выбранный вариант останется единым на весь курс и будет использоваться в последующих лабораторных работах.

По выбранному варианту необходимо будет выполнить вёрстку сайта средствами HTML, CSS и Bootstrap. Продумать и реализовать моменты, в которых необходим JS (например, открытие модальных окон).

Доступные варианты:

1. Приложение для бронирования столиков в ресторанах
    - Вход
    - Регистрация
    - Личный кабинет пользователя
    - Поиск ресторанов с фильтрацией по кухне, расположению и цене
    - Страница с информацией о ресторане (меню, фото, отзывы)
    - История бронирований пользователя

2. Сайт для поиска работы
    - Вход
    - Регистрация
    - Личный кабинет пользователя (с резюме)
    - Поиск вакансий с фильтрацией по отрасли, зарплате, опыту
    - Страница с деталями вакансии (описание, требования, компания)
    - Личный кабинет работодателя (управление вакансиями)

3. Платформа для фитнес-тренировок и здоровья
    - Вход
    - Регистрация
    - Личный кабинет пользователя (трекинг прогресса, планы тренировок)
    - Поиск тренировок с фильтрацией по уровню, типу (кардио, силовые) и продолжительности
    - Страница тренировки с видео, описанием и инструкциями
    - Блог о здоровье и питании

4. Сервис для аренды недвижимости
    - Вход
    - Регистрация
    - Личный кабинет пользователя (список арендованных и арендующихся объектов)
    - Поиск недвижимости с фильтрацией по типу, цене, расположению
    - Страница объекта недвижимости с фото, описанием и условиями аренды
    - История сообщений и сделок пользователя

5. Сервис для обмена рецептами и кулинарных блогов
    - Вход
    - Регистрация
    - Личный кабинет пользователя (сохраненные рецепты, публикации)
    - Поиск рецептов с фильтрацией по типу блюда, сложности, ингредиентам
    - Страница рецепта с фото, пошаговыми инструкциями и видео
    - Социальные функции (комментарии, лайки, подписки на кулинаров)

6. Свой вариант (необходимо отдельно согласовать)

Каждый из сайтов **обязательно** должен включать в себя следующие страницы:

- Вход

- Регистрация

- Личный кабинет пользователя

- Страница для поиска с возможностью фильтрации

## Раздел “Взаимодействие с внешним API. HTML-доступность. Углубленное изучение CSS”

### Формат данных JSON

Видео-лекция: https://www.youtube.com/watch?v=sxdPf3z6Uw8

### Язык программирования JS: Взаимодействие с внешним API

Видео-лекция: https://www.youtube.com/watch?v=G6C6xMWrjS4

### Язык программирования JS: Иммитация работы с API

Видео-лекция: https://www.youtube.com/watch?v=_3YLqewhII0

### Язык программирования JS: Иммитация работы с закрытым API (авторизация)

Видео-лекция: https://www.youtube.com/watch?v=_yvw_tAUGZw

### Лабораторная работа 2: взаимодействие с внешним API

Варианты остаются прежними. Теперь Вам нужно привязать то, что Вы делали в ЛР1 к внешнему API средствами fetch/axios/xhr.
Реализуйте моковое API средствами JSON-сервера и подключите к нему авторизацию, как в примерах, которые мы рассматривали в рамках тем "Иммитация работы с API".

Например, для приложения для просмотра прогнозов погоды задание выглядит следующим образом:

Реализовать получение погоды (прогноз на ближайшие 7 дней) из открытого API OpenWeatherMap, взависимости от геолокации пользователя. Реализовать вывод полученного прогноза в виде 7 карточек в три ряда (первый ряд - крупная карточка, второй ряд - три карточки в меньшем размере, третий ряд - четыре карточки в маленьком размере).

Дедлайн: 22.11.2024

### Язык разметки HTML: доступность

Видео-лекция: https://www.youtube.com/watch?v=HYc0xGTDFzI

Ссылки:

Статья на developers.google: https://developers.google.com/web/fundamentals/accessibility?hl=ru 
Большой раздел на MDN: https://developer.mozilla.org/ru/docs/Learn/Accessibility/HTML 
Примеры того, как делать не надо: https://www.htmhell.dev/

### Домашняя работа 2: доступность в HTML

Задание: улучшить доступность ранее реализованного сайта. Добавить необходимые HTML-атрибуты ко всему контенту на странице и проверить это с помощью инструментов из Dev Tools браузера Firefox и сервиса Google Lighthouse.

Дедлайн: 15.11.2024

### Язык CSS: работа с CSS-переменными
### Язык CSS: темизация сайта через CSS-переменные

Отличные ролики от Вадима Макеева по этой теме:

https://www.youtube.com/watch?v=Qwuyeo7iuNY  
https://www.youtube.com/watch?v=8LFbS78a4Rw

Видео-лекция: https://www.youtube.com/watch?v=aKeJuUKTWPI  
Пример из видео-лекции: https://github.com/kantegory/mentoring/tree/master/08_themization_example/

### Домашняя работа 3: CSS-переменные, темизация сайта средствами CSS

Задание: выполнить темизацию ранее реализованного сайта. Добавить к текущему варианту сайта дополнительную тему, в итоге должно получиться либо: светлая и тёмная с ориентиром на пользовательские настройки. Либо две кастомные темы с переключателем через JS.

Видео-лекция: https://www.youtube.com/watch?v=aKeJuUKTWPI  
Пример, который разбирали на лекции: https://github.com/kantegory/mentoring/tree/master/08_themization_example

Дедлайн: 29.11.24

### Для чего нужен SVG-спрайт? Создание собственного SVG-спрайта

Видео о том, как создать SVG-спрайт: https://www.youtube.com/watch?v=dPoRsolsCjA

Видео-лекция: https://www.youtube.com/watch?v=2cNj9kcbIC8  
Пример, который разбирали на лекции: https://github.com/kantegory/mentoring/tree/master/09_svg_sprite_example

### Домашняя работа 4: SVG-спрайт

Задание: вынести все используемые ранее SVG-иконки в общий SVG-спрайт. Если иконок не было, добавьте 3-5 иконок и поместите их в SVG-спрайт.

Дедлайн: 29.11.24

### Кроссбраузерные картинки (тег picture)

Видео-лекция: https://www.youtube.com/watch?v=2cNj9kcbIC8  
Пример, который разбирали на лекции: https://github.com/kantegory/mentoring/tree/master/10_tag_picture_example

### Контрольная работа 1

Дата проведения: -

## Раздел “Разработка одностраничного веб-приложения (SPA) с использованием фреймворка Vue.JS”

Общий мануал по работе с Vue.JS на базовом уровне: https://docs.google.com/document/d/187UkgGNrcWqkb2aCGpkHTLgeozoElMqdVgVGMBOC9gk/edit?usp=sharing

### Фреймворк Vue.JS: основы, работа с менеджером зависимостей npm

### Домашняя работа 5: изучение основ работы с менеджером зависимостей npm

Дедлайн: 27.12.2024  

В рамках данной работы Вам предстоит изучить основные команды пакетного менеджера NPM и научиться стартовать проект на Vue.

### Фреймворк Vue.JS: компонентный подход

Презентация: https://disk.yandex.ru/i/4ZF_XDu25jmMUg  
Презентация основы Vue: https://disk.yandex.ru/i/EJa8QTvZfz8TGw  
Видео-лекция: https://youtu.be/0jPwrj5f8no  
Примеры:
- простая реализация роутера для понимания основных концепций - https://github.com/kantegory/mentoring/tree/master/19_frontend_router
- простая реализация SPA для понимания основных концепций - https://github.com/kantegory/mentoring/tree/master/27_simple_spa_example

### Фреймворк Vue.JS: маршрутизация на клиентской части

Видео-лекция: https://www.youtube.com/watch?v=0jPwrj5f8no (то же самое видео, что и по компонентому подходу, всё верно)

### Фреймворк Vue.JS: миксины, composable, маршрутизация (navigation guards, meta)

Презентация: https://disk.yandex.ru/i/tt0P5-p1LXJGFQ

### Фреймворк Vue.JS: управление состоянием

Замечательный плейлист о том, что такое управление состоянием и для чего это нужно: https://www.youtube.com/watch?v=lwec8maPrrI&list=PLvTBThJr861wYlwBaaMy3tZUWpUvtJ9xE

### Фреймворк Vue.JS: работа с внешним API средствами библиотеки axios

### Лабораторная работа 3: Разработка одностраничного веб-приложения (SPA) с использованием фреймворка Vue.JS

Дедлайн: 09.01.2025  

Крайний срок проверки работ: 20.01.2025  

Мигрировать ранее написанный сайт на фреймворк Vue.JS.

Минимальные требования:

- Должен быть подключён роутер
- Должна быть реализована работа с внешним API
- Разумное деление на компоненты
- Использование composable

### Контрольная работа 2

Дата проведения: 27.12.2024
