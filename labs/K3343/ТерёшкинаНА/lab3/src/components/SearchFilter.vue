<template>
  <div class="row searchFilter">
    <div class="col-sm-12">
      <div class="input-group">
        <input
            id="table_filter"
            type="text"
            class="form-control"
            placeholder="Введите запрос"
            aria-label="Text input with segmented button dropdown"
        />
        <div class="input-group-btn">
          <button
              type="button"
              class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
          >
            <span class="label-icon">Категория</span>
            <span class="caret">&nbsp;</span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <ul class="category_filters">
              <li v-for="category in categories" :key="category.value">
                <input
                    :id="category.value"
                    type="radio"
                    name="filter-categories"
                    :value="category.value"
                    class="cat_type category-input"
                />
                <label :for="category.value">{{ category.label }}</label>
              </li>
            </ul>
          </div>
          <button id="searchBtn" type="button" class="btn btn-secondary btn-search">
            <span class="glyphicon glyphicon-search">&nbsp;</span>
            <span class="label-icon">Искать</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  { value: '', label: 'Все' },
  { value: 'Design', label: 'Дизайн' },
  { value: 'Marketing', label: 'Маркетинг' },
  { value: 'Programming', label: 'Программирование' },
  { value: 'Sales', label: 'Продажи' },
  { value: 'Support', label: 'Поддержка' },
];
</script>

<style scoped>
/* Стили для фильтров */
.searchFilter {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-right: 5px;
}
.searchFilter .btn-secondary {
  color: #373a3c;
  background-color: #fff;
  border: 1px solid #ccc;
  outline: none;
}
.searchFilter .btn-secondary:hover {
  background-color: #e6e6e6;
}
.searchFilter .btn-search {
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
  color: #fff;
}
</style>
