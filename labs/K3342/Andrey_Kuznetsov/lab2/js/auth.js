import { JWT_BASE_URL } from './config.js';

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".button.login");  
    const signupButton = document.querySelector(".button.signup"); 

    const switchToSignup = document.querySelector("#signup");
    const switchToLogin = document.querySelector("#login");

    switchToSignup.addEventListener('click', () => {
        document.querySelector(".login-form").style.display = "none";
        document.querySelector(".signup-form").style.display = "block";
    });

    switchToLogin.addEventListener('click', () => {
        document.querySelector(".signup-form").style.display = "none";
        document.querySelector(".login-form").style.display = "block";
    });

    signupButton.addEventListener('click', async function (e) {
        const regEmailInput = document.querySelector("input[name='reg-email']");
        const regPasswordInput = document.querySelector("input[name='reg-password']");
        const regPasswordConfirmInput = document.querySelector("input[name='reg-confirm-password']");
        const regNameInput = document.querySelector("input[name='reg-name']");
        const regStatusInput = document.querySelector("input[name='reg-status']");

        e.preventDefault();

        const regEmail = regEmailInput.value;
        const regPassword = regPasswordInput.value;
        const regConfirmPassword = regPasswordConfirmInput.value;
        const regName = regNameInput.value;
        const regStatus = regStatusInput.value;

        if (regPassword !== regConfirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!regEmail || !regPassword || !regConfirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(`${JWT_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: regEmail, password: regPassword, name: regName, status: regStatus })
            });

            const data = await response.json();  
            console.log(data)

            if (response.ok) { 
                alert("Registration successful. Please log in.");
                switchToLogin.click();
            } else {
                alert(`Registration failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error during registration. Please try again later.');
        }
    });

    loginButton.addEventListener('click', async function (e) {
        e.preventDefault(); 
        const emailInput = document.querySelector("input[name='email']");
        const passwordInput = document.querySelector("input[name='password']");

        const email = emailInput.value;
        const password = passwordInput.value;


        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch(`${JWT_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            });

            const data = await response.json();
            alert(data.message); 

            if (data.token) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("currentUser", JSON.stringify(data.user));
                localStorage.setItem("jwt", data.token);

                window.location.href = '../html/profile.html';
                alert("Login successful.");
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error during authentication. Please try again later.');
        }
    });
});
