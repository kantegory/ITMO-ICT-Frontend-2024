<template>
  <div class="container">
    <h2 class="text-center my-4" id="profileTitle">My Profile</h2>

    <!-- Profile Info -->
    <section class="profile-info text-center">
      <img
        :src="profileImage"
        class="rounded-circle"
        :alt="`Profile Picture of ${profile.name}`"
        width="150"
      />
      <h4>{{ profile.name }}</h4>
      <p>
        Followers: {{ profile.followers }} |
        <router-link to="/subscribes" class="text-decoration-none">
          Following: {{ profile.following }}
        </router-link>
      </p>
      <button
        class="btn btn-outline-primary"
        @click="toggleEditModal"
        aria-label="Edit Profile"
      >
        Edit Profile
      </button>
    </section>

    <hr />

    <!-- Profile Tabs -->
    <section aria-labelledby="profileTabsTitle">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'saved-recipes' }"
            @click.prevent="activeTab = 'saved-recipes'"
          >
            Saved Recipes
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'my-posts' }"
            @click.prevent="activeTab = 'my-posts'"
          >
            My Posts
          </a>
        </li>
      </ul>

      <div class="tab-content">
        <!-- Saved Recipes -->
        <div
          v-if="activeTab === 'saved-recipes'"
          id="saved-recipes"
          class="tab-pane fade show active"
        >
          <div class="row">
            <article
              class="col-md-4"
              v-for="recipe in savedRecipes"
              :key="recipe.id"
            >
              <div class="card">
                <router-link :to="recipe.link">
                  <img
                    :src="recipe.image"
                    class="card-img-top"
                    :alt="recipe.title"
                  />
                </router-link>
                <div class="card-body">
                  <router-link :to="recipe.link">
                    <h5 class="card-title">{{ recipe.title }}</h5>
                  </router-link>
                  <p class="card-text">{{ recipe.description }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- My Posts -->
        <div
          v-if="activeTab === 'my-posts'"
          id="my-posts"
          class="tab-pane fade"
        >
          <div class="row">
            <article
              class="col-md-4"
              v-for="post in userPosts"
              :key="post.id"
            >
              <div class="card">
                <router-link :to="post.link">
                  <img
                    :src="post.image"
                    class="card-img-top"
                    :alt="post.title"
                  />
                </router-link>
                <div class="card-body">
                  <router-link :to="post.link">
                    <h5 class="card-title">{{ post.title }}</h5>
                  </router-link>
                  <p class="card-text">{{ post.description }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Edit Profile Modal -->
    <b-modal v-model="showEditModal" title="Edit Profile">
      <b-form @submit.prevent="saveProfileChanges">
        <b-form-group label="Name" label-for="editName">
          <b-form-input id="editName" v-model="profile.name" />
        </b-form-group>
        <b-form-group label="Email" label-for="editEmail">
          <b-form-input id="editEmail" v-model="profile.email" />
        </b-form-group>
        <b-form-group label="New Password" label-for="editPassword">
          <b-form-input
            id="editPassword"
            type="password"
            v-model="profile.password"
          />
        </b-form-group>
        <b-button variant="primary" type="submit">Save changes</b-button>
      </b-form>
    </b-modal>

    <!-- Button for showing other recipes -->
    <div class="text-center my-4">
      <router-link to="/search" class="btn btn-primary" aria-label="Search for more recipes">
        Show other recipes
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "",
        followers: 120,
        following: 80,
      },
      profileImage: "img/cute-leaf-cartoon-illustration.jpg",
      activeTab: "saved-recipes",
      showEditModal: false,
      savedRecipes: [
        {
          id: 1,
          link: "/recipes/recipe_apple_pie",
          title: "Autumn Apple Pie",
          description: "Autumn recipe for atmosphere.",
          image: "img/top-view-pie-coffee.jpg",
        },
        {
          id: 2,
          link: "/recipes/recipe_full_breakfast",
          title: "Full English Breakfast",
          description: "A hearty British meal.",
          image:
            "img/traditional-full-english-breakfast-with-fried-eggs-sausage-tomato-beans-toast-bacon-plate.jpg",
        },
      ],
      userPosts: [
        {
          id: 1,
          link: "/recipes/recipe_lasagna",
          title: "Lasagna",
          description: "I'm in LOVE with this.",
          image:
            "img/high-angle-view-tablecloth-fresh-ingredient-delicious-lasagna.jpg",
        },
      ],
    };
  },
  methods: {
    toggleEditModal() {
      this.showEditModal = !this.showEditModal;
    },
    saveProfileChanges() {
      console.log("Profile updated:", this.profile);
      this.showEditModal = false;
    },
  },
};
</script>

<style scoped>
.profile-info img {
  margin-bottom: 1rem;
}
</style>
