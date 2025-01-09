<template>
  <div class="modal show d-block" tabindex="-1" aria-labelledby="modal-title" style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="modal-title" class="modal-title">{{ training?.title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <iframe
              v-if="training"
              :src="videoUrl"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              class="w-100"
              style="height: 400px;"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    training: {
      type: Object,
      required: true,
    },
  },
  computed: {
    videoUrl() {
      return `https://www.youtube.com/embed/${this.training.videoId}?autoplay=1`;
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: #000;
  color: #fff;
}

.btn-close {
  filter: invert(1);
  color: white;
}
</style>
