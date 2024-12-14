// const bcrypt = require('bcryptjs');
//
// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.querySelector("form");
//
//     loginForm.addEventListener("submit", async function (e) {
//         e.preventDefault();
//
//         const email = document.getElementById("email").value.trim();
//         const password = document.getElementById("password").value;
//
//         try {
//             const response = await fetch("http://localhost:3000/users");
//             if (!response.ok) {
//                 throw new Error("Failed to fetch users");
//             }
//
//             const users = await response.json();
//
//             const user = users.find((user) => user.email === email);
//
//             if (!user) {
//                 alert("Неверный email или пароль");
//                 return;
//             }
//
//             const isPasswordCorrect = await verifyPassword(password, user.password);
//
//             if (isPasswordCorrect) {
//                 localStorage.setItem("loggedInUserId", user.id);
//                 window.location.href = "user.html";
//             } else {
//                 alert("Неверный email или пароль");
//             }
//         } catch (error) {
//             console.error("Error during login:", error);
//             alert("Произошла ошибка. Попробуйте еще раз.");
//         }
//     });
// });
//
// /**
//  * Verifies the provided password with the hashed password.
//  * For simplicity, this assumes the backend uses bcrypt for hashing.
//  */
// async function verifyPassword(plainPassword, hashedPassword) {
//     // Use a library like bcryptjs if you're hashing client-side (not recommended)
//     if (typeof bcrypt !== "undefined") {
//         return bcrypt.compare(plainPassword, hashedPassword);
//     } else {
//         console.warn("Password verification skipped. Ensure proper hashing on the server.");
//         return plainPassword === hashedPassword; // Replace with proper hash verification logic
//     }
// }
//
// async function hashPassword(password) {
//     const saltRounds = 10;
//     return await bcrypt.hash(password, saltRounds);
// }
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.error || 'Invalid credentials'); // Show error message
            return;
        }
        const data = await response.json();
        const response_id = await fetch('http://localhost:3000/find_user_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const user_id = await response_id.json();
        localStorage.setItem('token', data.accessToken); // Store token
        localStorage.setItem('loggedInUserId', user_id.id); // Store token
        window.location.href = 'user.html'; // Redirect after login
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    }
});
