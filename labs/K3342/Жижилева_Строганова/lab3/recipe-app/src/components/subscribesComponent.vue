<template>
  <div class="container my-4">
    <header class="text-center mb-4">
      <h2 id="pageTitle">Subscribed Authors</h2>
    </header>

    <section aria-labelledby="subscriptionsSection">
      <h2 id="subscriptionsSection" class="visually-hidden">List of Subscribed Authors</h2>

      <div class="row" aria-live="polite">
        <div
          v-for="(author, index) in authors"
          :key="author.id"
          class="col-md-4 mb-4"
          role="listitem"
        >
          <div class="card" :aria-labelledby="'author' + index + 'Title'">
            <div class="row g-0">
              <div class="col-4">
                <img
                  :src="author.image"
                  class="img-fluid rounded-circle"
                  :alt="'Portrait of ' + author.name"
                  width="100"
                  :aria-describedby="'author' + index + 'Desc'"
                />
              </div>
              <div class="col-8">
                <div class="card-body">
                  <h3 class="card-title" :id="'author' + index + 'Title'">{{ author.name }}</h3>
                  <p class="card-text" :id="'author' + index + 'Desc'">{{ author.bio }}</p>
                  <button
                    class="btn btn-danger"
                    @click="unsubscribe(author.id)"
                    :aria-label="'Unsubscribe from ' + author.name + '\'s recipes'"
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Sample data for subscribed authors
      authors: [
        {
          id: 1,
          name: 'John Doe',
          bio: 'A passionate food lover who shares delicious recipes with the world.',
          image: 'img/cute-leaf-cartoon-illustration.jpg',
        },
        {
          id: 2,
          name: 'Jane Smith',
          bio: 'A chef with a love for international cuisine and simple, healthy meals.',
          image: 'img/author2.jpeg',
        },
        {
          id: 3,
          name: 'Alice Johnson',
          bio: 'Specializes in quick and easy recipes for busy families.',
          image: 'img/author3.jpg',
        },
      ],
    };
  },
  methods: {
    unsubscribe(authorId) {
      // Here you can implement the logic for unsubscribing an author
      // For example, remove the author from the list (just a simulation here)
      this.authors = this.authors.filter((author) => author.id !== authorId);
      // Optionally, make an API call to update the subscription status on the server
      console.log(`Unsubscribed from author with ID: ${authorId}`);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
}

.card-img-top {
  border-radius: 8px 8px 0 0;
}
</style>
