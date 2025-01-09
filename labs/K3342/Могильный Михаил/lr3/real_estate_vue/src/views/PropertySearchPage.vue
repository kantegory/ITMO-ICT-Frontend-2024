<template>
  <BaseLayout>
    <Navbar />

    <section class="mt-5">
      <form @submit.prevent="filterProperties" id="filter-form">
        <div class="row justify-content-between text-center">
          <!-- Real Estate Type -->
          <div class="col-sm-4 col-md-3">
            <label for="type" class="form-label">Тип недвижимости</label>
            <select
              id="type"
              v-model="filters.type"
              class="form-select"
            >
              <option value="">Выберите тип...</option>
              <option value="apartment">Квартира</option>
              <option value="house">Дом</option>
              <option value="office">Офис</option>
              <option value="warehouse">Склад</option>
            </select>
          </div>

          <!-- Price Range -->
          <div class="col-sm-4 col-md-3">
            <label for="price-range" class="form-label"
              >Цена (руб/мес.)</label
            >
            <input
              type="range"
              class="form-range"
              min="10000"
              max="200000"
              step="5000"
              id="price-range"
              v-model="filters.price_gte"
              @input="updatePriceDisplay"
            />
            <div class="d-flex justify-content-between">
              <span>{{ filters.price_gte }} руб</span>
            </div>
          </div>

          <!-- Location -->
          <div class="col-sm-4 col-md-3">
            <label for="location" class="form-label">Расположение</label>
            <select
              id="location"
              v-model="filters.location"
              class="form-select"
            >
              <option value="">Выберите местоположение...</option>
              <option value="moscow">Москва</option>
              <option value="spb">Санкт-Петербург</option>
              <option value="ekb">Екатеринбург</option>
              <option value="kazan">Казань</option>
            </select>
          </div>
        </div>
        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary">Найти</button>
        </div>
      </form>
    </section>

    <section class="mt-5">
      <h2 class="text-center fw-light">Результаты поиска</h2>
      <div
        id="loading-spinner"
        class="text-center"
        v-if="loading"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
      </div>
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"
        id="searched"
      >
        <p
          v-if="!loading && properties.length === 0"
          class="text-center text-muted"
        >
          Нет подходящих результатов
        </p>
        <div
          class="col"
          v-for="property in properties"
          :key="property.id"
        >
          <PropertyCard
            :name="property.name"
            :desc="property.desc"
            :price="property.price"
            img-src="imgs/flat-image.webp"
          />
        </div>
      </div>
    </section>

    <Footer />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PropertyCard from '@/components/PropertyCard.vue'
import { propertyApi } from '@/api'

export default {
  name: 'PropertySearchPage',
  components: {
    BaseLayout,
    Navbar,
    Footer,
    PropertyCard
  },
  data() {
    return {
      loading: false,
      properties: [],
      filters: {
        type: '',
        location: '',
        price_gte: 10000
      }
    }
  },
  mounted() {
    this.loadAllProperties()
  },
  methods: {
    updatePriceDisplay() {
    },
    async filterProperties() {
      this.loading = true
      this.properties = []

      const params = {}
      if (this.filters.type) params.type = this.filters.type
      if (this.filters.location) params.location = this.filters.location
      params.price_gte = this.filters.price_gte

      try {
        const response = await propertyApi.getFilteredProperties(params)
        this.properties = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async loadAllProperties() {
      this.loading = true
      try {
        const response = await propertyApi.getAllProperties()
        this.properties = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
