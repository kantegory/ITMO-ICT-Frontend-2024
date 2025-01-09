<template>
  <div class="filter">
    <form class="mb-4">
      <div class="row">
        <div class="col-md-4 mb-3">
          <select class="form-select" aria-label="Фильтр по типу">
            <option value="all" selected>Все типы</option>
            <option value="room">Квартира</option>
            <option value="studio">Cтудия</option>
            <option value="apartment">Апартаменты</option>
          </select>
        </div>
        <div class="col-md-4 mb-3">
          <button class="btn btn-outline-primary" type="submit">Применить фильтр</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.btn-primary{
  display: flow;
}
.filter{
  position: relative;
  left: 12px;
}
.nav-link{
  color: #ffffff;
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
