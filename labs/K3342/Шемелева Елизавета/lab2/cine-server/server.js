const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Указываем папку CineLink как корневую для всех статических файлов
app.use(express.static(path.join(__dirname, '../')));

// Подключаем body-parser для обработки JSON-запросов
app.use(bodyParser.json());

// Пути к JSON-файлам
const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Эндпоинт для проверки работы сервера
app.get('/ping', (req, res) => {
    res.send('Server is alive!');
});

// Middleware для добавления timestamp к записям рейтинга
app.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/ratings') {
        req.body.timestamp = new Date().toISOString(); // Добавляем текущий timestamp
    }
    next();
});

// Эндпоинт для получения списка фильмов
const moviesFilePath = path.join(__dirname, 'data', 'movies.json');
app.get('/movies', (req, res) => {
    const movies = readData(moviesFilePath);
    res.json(movies);
});

// Эндпоинт для добавления нового пользователя
const listsFilePath = path.join(__dirname, 'data', 'lists.json');
app.post('/users', (req, res) => {
    try {
        const users = readData(usersFilePath);
        const newUser = req.body;

        // Генерация уникального ID
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        newUser.id = newId;

        // Убедимся, что массив friends существует
        newUser.friends = Array.isArray(newUser.friends) ? newUser.friends : [];

        // Добавляем нового пользователя и сохраняем файл
        users.push(newUser);
        writeData(usersFilePath, users);

        // Создаем списки по умолчанию
        const lists = readData(listsFilePath);
        const defaultLists = [
            {
                id: Math.random().toString(16).slice(2),
                userId: newId,
                name: "favourites",
                movies: []
            },
            {
                id: Math.random().toString(16).slice(2),
                userId: newId,
                name: "watch later",
                movies: []
            }
        ];
        lists.push(...defaultLists);
        writeData(listsFilePath, lists);

        res.status(201).json(newUser); // Возвращаем созданного пользователя
    } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Функции для работы с файлами JSON
const readData = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Эндпоинт для авторизации пользователя
app.get('/users', (req, res) => {
    try {
        const { email, password } = req.query;
        const users = readData(usersFilePath);

        // Фильтрация пользователей по email и password
        const matchedUsers = users.filter(user => user.email === email && user.password === password);

        if (matchedUsers.length > 0) {
            res.json(matchedUsers); // Возвращаем подходящих пользователей
        } else {
            res.status(404).json({ error: 'User not found or invalid credentials' });
        }
    } catch (error) {
        console.error('Ошибка при обработке авторизации:', error);
        res.status(500).json({ error: 'Server error during authorization' });
    }
});

app.get('/lists/:id', (req, res) => {
    const lists = readData(listsFilePath);
    const list = lists.find(l => l.id === req.params.id);

    if (!list) {
        res.status(404).json({ error: 'List not found' });
        return;
    }

    res.json(list);
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
