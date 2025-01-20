


function mockLogin(email, password) {
    const mockUsers = [
        { id: 1, email: 'test@example.com', password: '123456', role: 'user', name: 'Test User' },
        { id: 1, email: 'test1@example.com', password: '123456', role: 'employer', name: 'Test User' },
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find(
                (u) => u.email === email && u.password === password
            );
            if (user) {
                console.log('if user')
                resolve({ status: 200, data: { user, token: 'mockToken123' } });
            } else {
                reject({ status: 401, message: 'Invalid email or password' });
            }
        }, 500);
    });
}


export async function apiLogin(email, password) {
    if (process.env.NODE_ENV === 'development') {
        return mockLogin(email, password);
    } else {

        const response = await axios.post('/api/login', { email, password });
        return response;
    }
}
