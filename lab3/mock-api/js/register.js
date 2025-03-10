document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = { name, email, telephone, password, id: Date.now() };

    // Сохраняем данные пользователя в localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user.id); // Сохраняем userId
    alert("Регистрация успешна! 🎉");


    // Очистка формы
    document.getElementById("signupForm").reset();
});