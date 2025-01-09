<template>
  <BaseLayout>
    <Navbar />

    <div class="row header pt-3 align-items-center">
      <div class="col header-user-profile">
        <img
          src="/icons/user-profile.svg"
          class="user-profile-icon w-50"
          alt="Greeting Icon"
        />
      </div>
      <div class="col-6 header-greeting-text">
        <h1 class="text-center fw-bold">
          Здравствуйте, {{ userName }}!
        </h1>
      </div>
      <div class="col header-buttons justify-content-end">
        <router-link
          to="/property-search"
          class="btn btn-outline-primary"
        >
          Поиск недвижимости
        </router-link>
        <router-link
          to="/archive"
          class="btn btn-outline-primary"
        >
          История
        </router-link>
      </div>
    </div>
    <div class="row text-center">
      <button
        type="button"
        class="btn btn-primary mt-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Новое объявление
      </button>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Новое объявление
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="publishProperty">
              <div class="mb-3">
                <label for="name" class="form-label"
                  >Недвижимость</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="newProperty.name"
                />
              </div>
              <div class="mb-3">
                <label for="desc" class="form-label">Описание</label>
                <textarea
                  id="desc"
                  class="form-control"
                  rows="5"
                  v-model="newProperty.desc"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Стоимость</label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  v-model="newProperty.price"
                />
              </div>
              <div>
                <h2>Ваш тип недвижимости</h2>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="newProperty.type"
                >
                  <option selected value="">Тип недвижимости</option>
                  <option value="apartment">Квартира</option>
                  <option value="house">Дом</option>
                  <option value="warehouse">Склад</option>
                  <option value="office">Офис</option>
                </select>
              </div>

              <div class="modal-footer mb-0">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Закрыть
                </button>
                <button type="submit" class="btn btn-primary">
                  Опубликовать
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-center fw-light mt-5">
      Объекты, которые вы сдаете
    </h2>
    <div class="card-group" id="owned">
      <p class="text-center mt-3" v-if="ownedProperties.length === 0">
        У вас пока нет объектов недвижимости.
      </p>
      <div
        class="card"
        v-for="property in ownedProperties"
        :key="property.id"
      >
        <img
          src="/imgs/flat-image.webp"
          class="card-img-top"
          alt="Офисное помещение м.Центр"
        />
        <div class="card-body">
          <h5 class="card-title">{{ property.name }}</h5>
          <p class="price">
            <small class="property-price">{{ property.price }} руб./мес.</small>
          </p>
        </div>
      </div>
    </div>

    <h2 class="text-center fw-light mt-5">
      Объекты, которые вы арендуете
    </h2>
    <div class="card-group mb-5">
      <div class="card">
        <img
          src="/imgs/flat-image.webp"
          class="card-img-top"
          alt="3-комн. квартира м.Спортивная"
        />
        <div class="card-body">
          <h5 class="card-title">
            3-комн. квартира м.Спортивная
          </h5>
          <p class="card-text">
            <small class="property-price">75 000 руб/мес.</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img
          src="/imgs/flat-image.webp"
          class="card-img-top"
          alt="Коттедж м.Рублевка"
        />
        <div class="card-body">
          <h5 class="card-title">Коттедж на Рублевке</h5>
          <p class="card-text">
            <small class="property-price">150 000 руб/мес.</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img
          src="/imgs/flat-image.webp"
          class="card-img-top"
          alt="Офисное помещение м.Центр"
        />
        <div class="card-body">
          <h5 class="card-title">
            Офисное помещение м.Московская
          </h5>
          <p class="card-text">
            <small class="property-price">100 000 руб/мес.</small>
          </p>
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
import { propertyApi } from '@/api'

export default {
  name: 'AccountPage',
  components: {
    BaseLayout,
    Navbar,
    Footer
  },
  data() {
    return {
      userName: '',
      ownedProperties: [],
      newProperty: {
        name: '',
        desc: '',
        price: '',
        type: ''
      }
    }
  },
  mounted() {
    this.loadOwnedProperties()
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      this.userName = user.firstName || 'пользователь'
    }
  },
  methods: {
    getAuthToken() {
      return localStorage.accessToken
    },
    async loadOwnedProperties() {
      try {
        // guarded endpoint (json-server-auth) -> /600/owned_properties
        // если не используете json-server-auth, можете заменить на просто /owned_properties
        const response = await fetch('http://localhost:3000/600/owned_properties', {
          headers: {
            Authorization: `Bearer ${this.getAuthToken()}`
          }
        })
        if (!response.ok) {
          console.error('Ошибка загрузки:', await response.text())
          return
        }
        const data = await response.json()
        this.ownedProperties = data
      } catch (error) {
        console.error(error)
      }
    },
    async publishProperty() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))
        const payload = {
          ...this.newProperty,
          userId: userData?.id || 1
        }

        const response = await fetch('http://localhost:3000/600/owned_properties', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.getAuthToken()}`
          }
        })
        if (!response.ok) {
          console.error('Ошибка публикации:', await response.text())
          return
        }
        this.newProperty = { name: '', desc: '', price: '', type: '' }
        this.loadOwnedProperties()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
