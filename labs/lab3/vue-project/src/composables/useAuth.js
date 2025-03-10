// src/composables/useAuth.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export function useAuth() {
  const name = ref('');
  const email = ref('');
  const telephone = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();

  // Функция для входа
  const login = async () => {
    try {
      const user = await api.login(email.value, password.value);

      if (!user) {
        errorMessage.value = 'Неверный email или пароль!';
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      router.push('/account');
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Ошибка авторизации!';
    }
  };

  // Функция для регистрации
  const signup = async () => {
    if (password.value.length < 6) {
      errorMessage.value = 'Пароль должен быть не менее 6 символов!';
      return;
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(telephone.value)) {
      errorMessage.value = 'Введите корректный номер телефона!';
      return;
    }

    const newUser = {
      name: name.value,
      email: email.value,
      telephone: telephone.value,
      password: password.value,
    };

    try {
      await api.register(newUser);
      alert('Регистрация успешна!');
      router.push('/login');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      errorMessage.value = 'Ошибка при регистрации. Попробуйте еще раз.';
    }
  };

  return {
    name,
    email,
    telephone,
    password,
    errorMessage,
    login,
    signup,
  };
}
