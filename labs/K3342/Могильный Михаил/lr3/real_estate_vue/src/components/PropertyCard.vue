<template>
  <div class="card">
    <img
      :src="imgSrc"
      class="card-img-top"
      alt="Изображение недвижимости"
    />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ desc }}</p>
      <p class="card-text text-primary">{{ price }} руб./мес.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false
    },
    price: {
      type: [Number, String],
      required: false
    },
    imgSrc: {
      type: String,
      default: '/imgs/flat-image.webp'
    }
  }
}
</script>
