const jsonServer = require('json-server');
const bcrypt = require('bcrypt');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const cors = require('cors');

// Разрешение CORS-запросов
server.use(cors());

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
    }  if (req.method === 'POST' && req.path === '/login') {
        const { email, password } = req.body;

        const user = router.db.get('users').find({ email }).value();

        if (!user) {
            return res.status(401).json({ success: false, message: 'Неправильный email или пароль' });
        }

        // Сравнение пароля с хэшом
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(401).json({ success: false, message: 'Неправильный email или пароль' });
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
