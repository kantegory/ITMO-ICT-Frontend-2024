import { ref } from 'vue';
import api from '@/services/api';

export function useAuth() {
  const user = ref(null);
  const error = ref(null);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      user.value = response.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { user, error, login };
}