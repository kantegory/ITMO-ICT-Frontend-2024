<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ post.title }}</h3>
        <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="post-info mb-3">
          <p>Author: {{ userName }}</p>
          <p>Date: {{ new Date(post.date).toLocaleDateString() }}</p>
        </div>
        <hr>
        <p>{{ post.content }}</p>
      </div>
      <hr>
      <PostComments :post-id="post.id" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PostComments from "@/scripts/PostComments.vue";
export default {
  components: {PostComments},
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      apiUrl: 'http://localhost:3000/users',
      userName: '',
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const response = await axios.get(this.apiUrl);
      const user = response.data.find(user => user.id === this.post.authorId);
      this.userName = user ? user.name.toString() : 'Unknown Author';
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  text-align: center;
}

.modal-content {
  background-color: #333333;
  padding: 1%;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
}

.post-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn-close {
  filter: invert(1);
  color: white;
}
</style>
