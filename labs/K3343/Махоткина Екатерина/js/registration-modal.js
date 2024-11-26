function openRegisterModal() {
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) loginModal.hide();
    registerModal.show();
}

function closeRegisterModal() {
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (registerModal) registerModal.hide();
}

document.getElementById('openRegisterModal').addEventListener('click', openRegisterModal);

document.querySelector('#registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const name = document.getElementById('name').value.trim();
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const startWeight = parseInt(document.getElementById('startWeight').value);
    const goalWeight = parseInt(document.getElementById('goalWeight').value);

    if (!email || !password || !name || !gender || isNaN(age) || isNaN(startWeight) || isNaN(goalWeight)) {
        alert('Fill all required fields');
        return;
    }

    const newUser = {
        email,
        password,
        dateRegistration: new Date(),
        name,
        gender,
        age,
        startWeight,
        currentWeight: startWeight,
        goalWeight,
        completedWorkouts: 0,
        frequentWorkouts: [],
        weightProgress: [startWeight],
        waistCircumference: 0,
        hipCircumference: 0,
        chestCircumference: 0,
    };
    await registerUser(newUser);
});

async function registerUser(user) {
    try {
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
            alert('Registration was successful');
            closeRegisterModal();
            document.getElementById('registerForm').reset();
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error');
    }
}
