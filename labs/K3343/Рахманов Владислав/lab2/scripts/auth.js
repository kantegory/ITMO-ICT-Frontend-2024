document.getElementById('loginButton').addEventListener('click', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    axios.get(`http://localhost:3000/users?email=${email}&password=${password}`)
      .then(response => {
        if (response.data.length > 0) {
          alert('Вход выполнен успешно!');
        } else {
          alert('Неправильный email или пароль');
        }
      })
      .catch(error => {
        console.error('Произошла ошибка при проверке данных!', error);
      });
  });
  