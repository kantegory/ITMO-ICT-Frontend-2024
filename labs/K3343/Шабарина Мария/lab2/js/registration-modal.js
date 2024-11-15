function openRegisterModal() {
    closeLoginModal();
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}

document.getElementById('openRegisterModal').addEventListener('click', openRegisterModal);
document.getElementById('closeRegister').addEventListener('click', closeRegisterModal);
document.querySelector('#registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const newUser = {
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        dateRegistration: new Date(),
        name: document.getElementById('name').value,
        gender: document.getElementById('gender').value,
        age: parseInt(document.getElementById('age').value),
        startWeight: parseInt(document.getElementById('startWeight').value),
        currentWeight: parseInt(document.getElementById('startWeight').value),
        goalWeight: parseInt(document.getElementById('goalWeight').value),
        completedWorkouts: 0,
        frequentWorkouts: [],
        weightProgress: [parseInt(document.getElementById('startWeight').value)],
        waistCircumference: 0,
        hipCircumference: 0,
        chestCircumference: 0,
    };
    await registerUser(newUser);
});

async function registerUser(user) {
    try {
        console.log("Попытка регистрации пользователя:", user);
        const response = await fetch(`http://localhost:3000/users?email=${user.email}`);
        const existingUser = await response.json();
        if (existingUser.length > 0) {
            alert('User already exists');
            return;
        }
        const registerResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (registerResponse.ok) {
            alert('Registration successful');
            closeRegisterModal();
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
