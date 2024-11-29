const jsonServer = require('json-server');
const bcrypt = require('bcrypt');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Хеширование паролей
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/users') {
        const { password } = req.body;

        if (password) {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error('Ошибка хеширования пароля:', err);
                }
                req.body.password = hash;
                next();
            });
        } else {
            return res.status(400).json({ message: 'Пароль обязателен' });
        }
    } else {
        next();
    }
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log('Сервер запущен http://localhost:3000');
});
