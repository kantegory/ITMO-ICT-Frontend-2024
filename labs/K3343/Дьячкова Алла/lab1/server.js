const express = require('express');
const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.db = router.db;
app.use(middlewares);

const JWT_SECRET_KEY = 'your_secret_key_here';

app.post('/find_user_id_', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const email = decoded.email;

        console.log('Extracted email from token:', email);

        const user = app.db.get('users').find({ email }).value();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ id: user.id });
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
});

function generateAccessToken(user) {
    const payload = { email: user.email };
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
}

app.post('/enter', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = app.db.get('users').find({ email }).value();

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            const accessToken = generateAccessToken(user);
            return res.json({
                accessToken,
                userId: user.id
            });
        } else {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

app.post('/find_user_id', async (req, res) => {
    const { email } = req.body;
    console.log('Получен email:', email);

    const user = app.db.get('users').find({ email }).value();

    if (!user) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    const id = user.id;
    console.log('Найден пользователь с ID:', user.id);

    return res.status(200).json({ id });
});

app.put('/users/:id/password', async (req, res) => {
    const userId = req.params.id;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: 'Пароль должен быть не менее 8 символов' });
    }

    const user = app.db.get('users').find({ id: userId }).value();

    if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    app.db.get('users')
        .find({ id: userId })
        .assign({ password: hashedPassword })
        .write();
    res.status(200).json({ message: 'Пароль успешно обновлен' });
});
app.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body);

    const { email, password, firstName, lastName, phone, dob } = req.body;

    try {
        if (!email || !password || !firstName || !lastName || !phone || !dob) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        const existingUser = app.db.get('users').find({ email }).value();
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            phone,
            dob,
            password: hashedPassword,
        };

        app.db.get('users').push(newUser).write();

        const accessToken = generateAccessToken(newUser);

        console.log('User registered successfully:', newUser.id); // Debug log

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            id: newUser.id,
            accessToken
        });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
});
app.post('/search', (req, res) => {
    try {
        const { minPrice, maxPrice, type, location, rooms, category, sortBy, title } = req.body;
        console.log('Received search params:', req.body);

        let properties = app.db.get('properties').value();

        if (title) {
            properties = properties.filter(prop =>
                prop.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            properties = properties.filter(prop =>
                prop.price >= minPrice && prop.price <= maxPrice
            );
        }

        if (type) {
            properties = properties.filter(prop =>
                prop.type.toLowerCase() === type.toLowerCase()
            );
        }

        if (location) {
            properties = properties.filter(prop =>
                prop.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (rooms) {
            const roomArray = rooms.split(',').map(Number);
            properties = properties.filter(prop =>
                roomArray.includes(prop.rooms)
            );
        }

        if (category) {
            properties = properties.filter(prop =>
                prop.category === category
            );
        }

        if (sortBy) {
            switch(sortBy) {
                case 'priceAsc':
                    properties.sort((a, b) => a.price - b.price);
                    break;
                case 'priceDesc':
                    properties.sort((a, b) => b.price - a.price);
                    break;
                case 'roomsAsc':
                    properties.sort((a, b) => a.rooms - b.rooms);
                    break;
                case 'roomsDesc':
                    properties.sort((a, b) => b.rooms - a.rooms);
                    break;
            }
        }

        console.log('Sending response with properties:', properties.length); // Debug log
        res.json(properties);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.get('/property/:id', (req, res) => {
    try {
        const propertyId = parseInt(req.params.id);
        const property = app.db
            .get('properties')
            .find({ id: propertyId })
            .value();

        if (!property) {
            return res.status(404).json({
                error: 'Property not found'
            });
        }

        res.json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});
app.get('/properties', (req, res) => {
    try {
        const properties = app.db.get('properties').value();
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.get('/messages', async (req, res) => {
    const { userId, propertyId } = req.query;

    if (!userId || !propertyId) {
        return res.status(400).json({ error: 'User ID and Property ID are required' });
    }

    const messages = app.db.get('messages')
        .filter(message => message.userId === userId && message.propertyId === parseInt(propertyId)) // Ensuring propertyId is compared as a number
        .value();

    if (!messages.length) {
        return res.status(404).json({ error: 'No messages found' });
    }

    return res.status(200).json({ messages });
});
app.get('/all_messages', async (req, res) => {
    try {
        const messages = app.db.get('messages').value();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});
app.post('/send_message', (req, res) => {
    try{
            const { userId, propertyId, content, timestamp } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ error: 'userId and content are required.' });
        }
        const property = app.db
            .get('properties')
            .find({ id: propertyId })
            .value();

        const newMessage = {
            id: require('uuid').v4(), // Generate unique ID
            userId,
            propertyId: propertyId || null,
            content,
            propertyTitle: property.title,
            timestamp,
        };

        app.db.get('messages').push(newMessage).write();
        res.status(200).json(newMessage);
    }
    catch (err) {
        console.error('Error registering msg:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
}});

app.post('/book', (req, res) => {
    try{
        const { userId, propertyId, start_date, end_date, timestamp } = req.body;

        if (!userId || !propertyId || !start_date || !end_date || !timestamp) {
            return res.status(400).json({ error: 'all params required' });
        }

        const newRent = {
            id: require('uuid').v4(),
            userId,
            propertyId: propertyId || null,
            isApproved: false,
            creationDate: timestamp,
            startOfRent: start_date,
            endOfRent: end_date
        };

        app.db.get('rentalHistory').push(newRent).write();
        res.status(200).json(newRent);
    }
    catch (err) {
        console.error('Error : booking', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error during booking'
        });
}});

app.get('/rental_history', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const rentalHistories = app.db
            .get('rentalHistory')
            .filter(rental => rental.userId === userId)
            .value();

    if (!rentalHistories.length) {
        return res.status(404).json({ error: 'No rental history found' });
    }

    return res.status(200).json({ rentalHistories });
});

app.delete('/rental_history/:id', (req, res) => {
    const rentalId = req.params.id;
    const rent = app.db
            .get('rentalHistory')
            .find({ id: rentalId })
            .value();

    if (!rent) {
        return res.status(404).json({
            error: 'Booking not found'
        });
    }
    app.db
        .get('rentalHistory')
        .remove({ id: rentalId })
        .write();

    return res.status(200).json({
        message: 'Booking deleted successfully'
    });
});

app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});