<template>
  <BaseLayout>
    <Navbar />

    <header class="row pt-3 align-items-center justify-content-between">
      <div class="col-3 col-md-2 text-center">
        <img
          src="/icons/message.svg"
          class="search-icon w-50"
          alt="Иконка сообщений"
        />
      </div>
      <div class="col-12 col-md-6 text-center">
        <h1 class="fw-bold fs-4 fs-md-3">
          История сообщений и сделок
        </h1>
      </div>
      <div
        class="col-12 col-md-4 d-flex justify-content-center justify-content-md-end gap-2 mt-2 mt-md-0"
      >
        <router-link
          to="/property-search"
          class="btn btn-outline-primary btn-primary-color custom-primary-btn-text"
          aria-label="Перейти к поиску объектов"
        >
          Поиск
        </router-link>
        <router-link
          to="/account"
          class="btn btn-outline-primary btn-primary-color custom-primary-btn-text"
          aria-label="Перейти к аккаунту"
        >
          Аккаунт
        </router-link>
      </div>
    </header>

    <main>
      <section class="mt-4">
        <h3 class="fs-5">Сообщения</h3>
        <ul class="list-group">
          <li class="list-group-item" tabindex="0">
            Сообщение от арендодателя: ...
          </li>
          <li class="list-group-item" tabindex="0">
            Сообщение от арендатора: ...
          </li>
        </ul>
      </section>

      <section class="mt-4">
        <h3 class="fs-5">Сделки</h3>
        <ul class="list-group">
          <li class="list-group-item" tabindex="0">
            Сделка 1: Аренда квартиры ...
          </li>
          <li class="list-group-item" tabindex="0">
            Сделка 2: Аренда дома ...
          </li>
        </ul>
      </section>
    </main>

    <Footer />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'PropertyArchivePage',
  components: {
    BaseLayout,
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.search-icon {
  width: 50px;
}
</style>
