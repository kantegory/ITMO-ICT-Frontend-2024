const express = require('express');
const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();  // Changed from jsonServer.create() to express()
const router = jsonServer.router('db.json'); // Connect to db.json
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

app.db = router.db;

app.use(cors());
app.use(middlewares);

const JWT_SECRET_KEY = 'your_secret_key_here'; // You can replace this with a real secret

/**
 * Function to generate an access token (JWT)
 * @param {Object} user - User object (can include the user's ID or other information)
 * @returns {string} - JWT token
 */
function generateAccessToken(user) {
    const payload = { email: user.email }; // In this case, using email, but feel free to add user ID or roles
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
}

app.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, phone, dob } = req.body;

    try {
        // Check if the user already exists
        const existingUser = app.db.get('users').find({ email }).value();
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            email,
            phone,
            dob,
            password: hashedPassword, // Store hashed password
            id: uuidv4(),
        };

        app.db.get('users').push(newUser).write();

        res.status(201).json({ id: newUser.id, message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = app.db.get('users').find({ email }).value();

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    try {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            const accessToken = generateAccessToken(user);
            return res.json({ accessToken });
        } else {
            return res.status(400).json({ error: password});
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

app.post('/find_user_id', async (req, res) => {
    const { email } = req.body;

    const user = app.db.get('users').find({ email }).value();

    if (!user) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    const id = user.id;

    return res.status(200).json({ id });
});

app.use(router);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
