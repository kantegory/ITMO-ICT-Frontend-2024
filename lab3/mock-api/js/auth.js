// document.getElementById("loginForm").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const user = await login(email, password);
    
//     if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//         window.location.href = "account.html";
//     } else {
//         alert("Неверный логин или пароль!");
//     }
// });

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = await login(email, password);
    
    if (user) {
        localStorage.setItem("userId", user.id); // Сохраняем только ID
        window.location.href = "account.html";
    } else {
        alert("Неверный логин или пароль!");
    }
});
