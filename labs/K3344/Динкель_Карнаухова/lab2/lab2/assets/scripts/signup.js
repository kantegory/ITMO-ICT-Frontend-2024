const form = document.querySelector('form');
const emailInput = document.getElementById('exampleInputEmail1');
const passwordInput = document.getElementById('exampleInputPassword1');
const passwordConfirmInput = document.getElementById('exampleInputPassword2');
const roleSelect = document.getElementById('roleSelect');

// Обработчик события отправки формы
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    const role = roleSelect.value;

    // Проверка на совпадение паролей
    if (password !== passwordConfirm) {
        alert('Пароли не совпадают');
        return;
    }

    try {
        // Проверка на существование пользователя
        const response = await axios.get('http://localhost:3000/users');
        const existingUser = response.data.find(user => user.username === email);

        if (existingUser) {
            alert('Пользователь с таким e-mail уже существует');
            return;
        }

        // Создание нового пользователя
        const newUser = {
            username: email,
            password: password,
            role: role,
        };

        // Отправка нового пользователя на сервер
        await axios.post('http://localhost:3000/users', newUser);
        alert('Регистрация прошла успешно!');

        window.location.href = 'main-search.html';
    } catch (error) {
        console.error('Ошибка регистрации:', error.response ? error.response.data : error.message);
        alert('Произошла ошибка. Попробуйте еще раз.');
    }
});