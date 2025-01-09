<template>
  <header>
    <nav class="navbar-dark bg-dark">
      <div class="container bg-dark">
        <header class="d-flex justify-content-center py-3">
          <ul class="nav nav-pills nav-dark bg-dark">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" aria-current="page">
                Предложения
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account" class="nav-link" active-class="active">
                Личный кабинет
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/chats" class="nav-link" active-class="active">
                Сообщения
              </router-link>
            </li>
          </ul>
          <form class="d-flex search-container ms-2">
            <input
                class="form-control search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
          </form>
        </header>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  color: #ffffff;
  text-decoration: none;
}

.nav-link.active {
  font-weight: bold;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
  max-width: 100%;
}

</style>
