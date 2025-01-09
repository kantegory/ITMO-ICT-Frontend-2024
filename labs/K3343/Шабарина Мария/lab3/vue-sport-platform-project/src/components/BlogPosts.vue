<template>
  <section class="posts">
    <div class="container-fluid">
      <h1 class="mt-4">Posts:</h1>
      <div id="posts-container" class="posts-grid">
        <div v-for="post in filteredPosts" :key="post.id" class="post-card col-12 col-sm-6 col-md-4" style="padding: 0.5%; box-sizing: border-box;">
          <div class="card" :data-date="post.date">
            <h3>{{ post.title }}</h3>
            <p>Author: {{ userNames[post.authorId] || 'Unknown Author' }}</p>
            <p>Date: {{ new Date(post.date).toLocaleDateString() }}</p>
            <button class="btn open-modal" @click="openModal(post)">Show post</button>
          </div>
        </div>
      </div>
    </div>
    <PostModal
        v-if="showModal"
        :post="selectedPost"
        @close="closeModal"
    />
  </section>
</template>

<script>
import axios from 'axios';
import PostModal from "../scripts/PostModal.vue";

export default {
  components: { PostModal },
  props: ['selectedFilter'],
  data() {
    return {
      selectedPost: null,
      showModal: false,
      posts: [],
      userNames: {},
    };
  },
  async mounted() {
    await this.fetchPosts();
  },
  computed: {
    filteredPosts() {
      const { startDate, endDate, sports } = this.selectedFilter;
      return this.posts.filter(post => {
        const postDate = new Date(post.date);
        const isDateInRange = (!startDate || postDate >= new Date(startDate)) && (!endDate || postDate <= new Date(endDate));
        const isSportSelected = !sports.length || sports.includes(post.sport);
        return isDateInRange && isSportSelected;
      });
    }
  },
  methods: {
    async fetchPosts() {
      const response = await axios.get('http://localhost:3000/posts');
      this.posts = response.data;
      for (const post of this.posts) {
        this.userNames[post.authorId] = await this.fetchUserData(post.authorId);
      }
    },
    async fetchUserData(authorId) {
      const response = await axios.get(`http://localhost:3000/users/`);
      const user = response.data.find(user => user.id === authorId);
      return user ? user.name.toString() : 'Unknown Author';
    },
    openModal(post) {
      if (!post) return;
      this.selectedPost = post;
      this.showModal = true;
    },
    closeModal() {
      this.selectedPost = null;
      this.showModal = false;
    },
  },
};
</script>


<style scoped>
.posts-grid {
  display: flex;
  flex-wrap: wrap;
}

.card {
  background-color: #333333;
  color: white;
  border: none;
  padding: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card h3, p {
  text-align: center;
}

.posts {
  margin: 2%;
}

.post-card button {
  padding: 10px 20px;
  margin: 1%;
  background-color: #1d7e33;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.post-card button:hover {
  background-color: #555;
}
</style>
