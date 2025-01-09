<template>
  <BaseLayout>
    <Navbar />

    <!-- Hero Section -->
    <section class="mt-5 p-4 rounded shadow">
      <div class="row align-items-center">
        <div class="col-md-5 text-center">
          <img
            src="/icons/hero-house-logo.svg"
            class="img-fluid"
            alt="Hero Image"
            style="max-width: 150px; height: auto;"
          />
        </div>
        <div class="col-md-7 text-center text-md-start">
          <h2 class="fw-bold mb-4">
            Начните снимать или сдавать жилье прямо сейчас!
          </h2>
          <div>
            <!-- Кнопка входа (открывает модальное окно) -->
            <button
              type="button"
              class="btn btn-primary btn-lg me-3"
              data-bs-toggle="modal"
              data-bs-target="#log-in-modal"
            >
              Войти
            </button>
            <!-- Ссылка на регистрацию -->
            <router-link
              to="/register"
              class="btn btn-outline-primary btn-lg"
            >
              Зарегистрироваться
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Login Modal -->
    <div class="modal fade" tabindex="-1" id="log-in-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Вход в аккаунт</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Ваш e-mail</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="loginForm.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Ваш пароль</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="loginForm.password"
                  required
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="remember-me"
                  v-model="loginForm.rememberMe"
                />
                <label class="form-check-label" for="remember-me"
                  >Запомнить меня</label
                >
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Закрыть
                </button>
                <button type="submit" class="btn btn-primary">
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'IndexPage',
  components: {
    BaseLayout,
    Navbar,
    Footer
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          body: JSON.stringify(this.loginForm),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          alert('Ошибка входа. Проверьте данные и попробуйте снова.')
          return
        }
        const { accessToken, user } = await response.json()
        localStorage.accessToken = accessToken
        localStorage.user = JSON.stringify(user)

        this.$router.push('/account')
      } catch (error) {
        console.error(error)
        alert('Ошибка входа.')
      }
    }
  }
}
</script>
