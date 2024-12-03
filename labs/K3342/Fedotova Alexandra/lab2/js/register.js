document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Останавливаем стандартную отправку формы

        // Сбор данных из формы
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Проверка данных
        if (!fullName || !email || !password || !confirmPassword) {
            showMessage("All fields are required!", "danger");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Passwords do not match!", "danger");
            return;
        }

        // Формирование данных
        const now = new Date().toISOString();
        const userData = {
            user_id: Date.now(), // Примерный уникальный идентификатор
            email: email,
            password: password,
            name: fullName,
            role: "client",
            created_at: now,
            updated_at: now,
        };

        try {
            // Отправка данных на сервер
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData), // Отправляем данные пользователя
            });

            if (response.ok) {
                const result = await response.json();
                showMessage("Registration successful! Redirecting...", "success");
                setTimeout(() => {
                    window.location.href = "entrance.html"; // Перенаправление на страницу входа
                }, 2000);
            } else {
                const error = await response.json();
                showMessage(error.message || "Registration failed!", "danger");
            }
        } catch (err) {
            console.error(err);
            showMessage("An error occurred. Please try again later.", "danger");
        }
    });

    function showMessage(message, type) {
        messageDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
});
