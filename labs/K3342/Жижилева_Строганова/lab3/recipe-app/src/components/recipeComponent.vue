<template>
  <div class="container">
    <header class="text-center my-4">
      <h2>{{ recipe.title || "Recipe Name" }}</h2>
    </header>

    <div class="author-section d-flex align-items-center mb-4">
      <p class="me-3 mb-0">
        <strong>Author:</strong> <span>{{ author }}</span>
      </p>
      <button class="btn btn-primary" @click="subscribeToAuthor">
        Subscribe to Author
      </button>
    </div>

    <article class="recipe-content mt-4">
      <figure>
        <img :src="recipe.image" class="img-fluid mb-3" :alt="recipe.title || 'Recipe Image'" />
        <figcaption>{{ recipe.description || 'Description unavailable' }}</figcaption>
      </figure>

      <section>
        <h3>Ingredients:</h3>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
            {{ ingredient.original }}
          </li>
        </ul>
      </section>

      <section>
        <h3>Steps:</h3>
        <ol>
          <li v-for="(step, index) in recipe.steps" :key="index">
            {{ step }}
          </li>
        </ol>
      </section>

      <section class="mt-4 d-flex align-items-center">
        <button class="btn btn-custom-like d-flex align-items-center" @click="toggleLike">
          <svg class="icon me-2" aria-hidden="true" style="width: 20px; height: 20px; fill: #FF4500;">
            <use xlink:href="img/icons/sprite.svg#icon-like"></use>
          </svg>
          Like <span class="ms-1">{{ likes }}</span>
        </button>
        <button class="btn btn-secondary ms-2" @click="toggleCommentModal">
          Comment
        </button>
      </section>

      <section>
        <h3 class="mt-4">Comments</h3>
        <div class="border p-3">
          <p v-if="comments.length === 0">No comments yet.</p>
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <p><strong>{{ comment.author }}</strong>: {{ comment.text }}</p>
          </div>
        </div>
      </section>
    </article>

    <!-- Comment Modal -->
    <div v-if="isCommentModalOpen" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Comment</h5>
            <button type="button" class="btn-close" @click="toggleCommentModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="commentAuthor" class="form-label">Your Name</label>
                <input v-model="newComment.author" type="text" class="form-control" id="commentAuthor" placeholder="Enter your name" />
              </div>
              <div class="mb-3">
                <label for="commentText" class="form-label">Your Comment</label>
                <textarea v-model="newComment.text" class="form-control" id="commentText" rows="3" placeholder="Enter your comment"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="toggleCommentModal">Close</button>
            <button type="button" class="btn btn-primary" @click="addComment">Submit Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        title: "",
        image: "",
        description: "",
        ingredients: [],
        steps: []
      },
      author: "John Doe",
      likes: 0,
      isLiked: false,
      comments: [],
      isCommentModalOpen: false,
      newComment: {
        author: "",
        text: ""
      }
    };
  },
  async created() {
    const recipeId = new URLSearchParams(window.location.search).get("recipeId");
    if (recipeId) {
      const apiKey = "405a11b0c2f743aca8438fb775f8a5de";
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
        );
        const data = await response.json();

        this.recipe.title = data.title;
        this.recipe.image = data.image;
        this.recipe.description = data.summary.replace(/<[^>]*>/g, "") || "Description unavailable";
        this.recipe.ingredients = data.extendedIngredients;
        this.recipe.steps = data.analyzedInstructions[0].steps.map(step => step.step);
      } catch (error) {
        console.error("Error loading recipe:", error);
      }
    }
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.likes += this.isLiked ? 1 : -1;
    },
    toggleCommentModal() {
      this.isCommentModalOpen = !this.isCommentModalOpen;
    },
    addComment() {
      if (this.newComment.author && this.newComment.text) {
        this.comments.push({ ...this.newComment, id: Date.now() });
        this.newComment.author = "";
        this.newComment.text = "";
        this.toggleCommentModal();
      }
    },
    subscribeToAuthor() {
      alert(`Subscribed to ${this.author}`);
    }
  }
};
</script>

<style scoped>
.comment {
  margin-bottom: 10px;
}
</style>
