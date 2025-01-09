<template>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card">
      <img :src="image" class="card-img-top" alt="Card image" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <h5 class="price">{{ price }}₽/мес.</h5>
        <p class="card-text">{{ description }}</p>
        <a href="#" class="btn btn-primary">Посмотреть</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCard',
  props: {
    image: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
  },
};
</script>

<style scoped>
.card-img-top {
  height: auto;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.card {
  height: 460px;
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
