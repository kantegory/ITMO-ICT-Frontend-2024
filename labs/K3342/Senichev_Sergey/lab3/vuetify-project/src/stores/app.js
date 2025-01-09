// stores/appStore.js
import { defineStore } from 'pinia';
import { th, tr } from 'vuetify/locale';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
    errorMessage: null,
    workouts: [],
    trainers: [],
    userWorkouts: []
  }),

  actions: {
    async register(email, username, password, re_password, imageUrl, level) {

      if (password !== re_password) {
        this.errorMessage = 'Пароли не совпадают. Попробуйте снова.';
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/auth/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, imageUrl, password, re_password, level }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ошибка регистрации');
        }

        const data = await response.json();
        this.user = JSON.stringify(data);
        // this.user = data;
        this.errorMessage = null;

        localStorage.setItem('user', this.user);

        await this.login(username, password);

        if (!this.errorMessage) {
          await this.updateUserInfo({
            imageUrl: imageUrl,
            level: level
          });
        }

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    async updateUserInfo(params) {
      try {
        console.log(params);
        const response = await fetch('http://127.0.0.1:8000/api/v1/account/update/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${this.token}`,
          },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Ошибка обновления данных пользователя';
          return;
        }

        const data = await response.json();
        this.user = JSON.stringify(data);
        // this.user = data;
        this.errorMessage = null;
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
    }
  },

    async login(username, password) {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ошибка авторизации');
        }

        const data = await response.json();
        this.token = data.auth_token;
        this.errorMessage = null;

        localStorage.setItem('token', this.token);

        this.fetchUserDetails();

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.errorMessage = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    async fetchUserDetails() {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/users/me/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${this.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Ошибка получения данных пользователя';
          return;
        }

        const data = await response.json();
        this.user = JSON.stringify(data);
        this.errorMessage = null;

        localStorage.setItem('user', this.user);

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    async fetchWorkouts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/workouts/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${this.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Ошибка получения данных тренировок';
          return;
        }

        const data = await response.json();
        this.workouts = data;
        this.errorMessage = null;

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    async fetchTrainers() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/trainers/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${this.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Ошибка получения данных тренеров';
          return;
        }

        const data = await response.json();
        this.trainers = data;
        this.errorMessage = null;

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    async fetchTrainerDetails(id) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/trainers/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${this.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Ошибка получения данных тренера';
          return;
        }

        const data = await response.json();
        this.errorMessage = null;

        return data;

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    async fetchWorkoutData(id) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/workouts/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${this.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Ошибка получения данных тренировки';
          return;
        }

        const data = await response.json();
        this.errorMessage = null;

        return data;

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    async fetchUserWorkouts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/account/workouts/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${this.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Ошибка получения данных тренировок';
          return;
        }

        const data = await response.json();
        this.userWorkouts = data;
        this.errorMessage = null;

      } catch (error) {
        console.error(error);
        this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
      }
    },

    async createUserWorkout(user, workout, started_at, completed_at, favourite) {
      try {
        if (this.userWorkouts.find(userWorkout => userWorkout.workout.id === workout)) {
          this.errorMessage = 'Такая тренировка уже добавлена';
          return;
        }

        else {
          const response = await fetch('http://127.0.0.1:8000/api/v1/workouts/submit/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${this.token}`,
            },
            body: JSON.stringify( ),
          });

          if (!response.ok) {
            const errorData = await response.json();
            this.errorMessage = errorData.message || 'Ошибка создания тренировки';
            return;
          }

          const data = await response.json();
          this.errorMessage = null;
          return data;
        }
    }
    catch (error) {
      console.error(error);
      this.errorMessage = 'Сетевая ошибка. Попробуйте снова.';
    }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});

