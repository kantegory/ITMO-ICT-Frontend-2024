export default function(instance) {
    return {
        register(payload) {
            return instance.post('auth/register', payload);
        },
        login(payload) {
            return instance.post('auth/login', payload);
        },
        user() {
            return instance.delete('auth/user');
        }
    };
}
