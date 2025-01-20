<template>
  <div>
    <header class="hero-section">
      <div class="container text-center">
        <h1 class="hero-title">Найдите работу своей мечты</h1>
        <p class="hero-subtitle">Только лучшие вакансии от проверенных компаний.</p>
        <router-link to="/register" class="btn btn-primary btn-lg mt-4">Начать поиск</router-link>
      </div>
    </header>

    <section class="features-section py-5">
      <div class="container text-center">
        <h2 class="section-title">Почему мы?</h2>
        <p class="section-subtitle">Мы предлагаем лучшие условия для поиска работы и сотрудников.</p>
        <div class="row mt-5">
          <div class="col-md-4">
            <i class="fas fa-briefcase fa-3x text-primary"></i>
            <h3 class="mt-3">Только лучшие вакансии</h3>
            <p>Мы отбираем только надежные компании и интересные вакансии.</p>
          </div>
          <div class="col-md-4">
            <i class="fas fa-search fa-3x text-primary"></i>
            <h3 class="mt-3">Удобный поиск</h3>
            <p>Найдите работу по зарплате, опыту, отрасли и другим параметрам.</p>
          </div>
          <div class="col-md-4">
            <i class="fas fa-user-check fa-3x text-primary"></i>
            <h3 class="mt-3">Надежность</h3>
            <p>С нами сотрудничают только проверенные работодатели.</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer bg-dark text-white py-4">
      <div class="container text-center">
        <p>© 2025 Job Portal. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  color: #333;
}

.hero-section {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: white;
  padding: 100px 0;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 300;
  margin-top: 15px;
}

.features-section {
  background: #f9f9f9;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
}

.section-subtitle {
  font-size: 1.2rem;
  font-weight: 300;
  color: #777;
  margin-bottom: 30px;
}

.footer {
  background-color: #222;
  color: #fff;
  text-align: center;
}
</style>