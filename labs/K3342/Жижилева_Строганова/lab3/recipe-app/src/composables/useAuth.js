import CryptoJS from 'crypto-js';

export function useAuth() {
  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
  };

  const login = async (email, password) => {
    try {
      const hashedPassword = hashPassword(password);
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      const user = users.find(user => user.email === email && user.password === hashedPassword);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: 'An error occurred while logging in' };
    }
  };

  return { hashPassword, login };
}
