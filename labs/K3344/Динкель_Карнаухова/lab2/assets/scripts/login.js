const form = document.querySelector('form');
const emailInput = document.getElementById('exampleInputEmail1');
const passwordInput = document.getElementById('exampleInputPassword1');

// Обработчик события отправки формы
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Получаем всех пользователей
        const response = await axios.get('http://localhost:3000/users');

        const user = response.data.find(user => user.username === email && user.password === password);

        if (user) {
            alert('Успешный вход!');

            // Сохраняем информацию о пользователе в localStorage
            localStorage.setItem('currentUser ', JSON.stringify(user));

            if (user.role === 'employer') {
                window.location.href = 'employeraccount.html'; 
            } else if (user.role === 'candidate') {
                window.location.href = 'useraccount.html'; 
            }
        } else {
            alert('Неверный логин или пароль');
        }
    } catch (error) {
        console.error('Ошибка входа:', error);
        alert('Произошла ошибка. Попробуйте еще раз.');
    }
});