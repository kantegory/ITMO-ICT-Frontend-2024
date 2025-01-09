<template>
  <main class="container">
    <h2 class="text-center my-4" id="profileTitle">My Profile</h2>

    <!-- Profile Info Section -->
    <section class="profile-info text-center">
      <img
        src="img/cute-leaf-cartoon-illustration.jpg"
        class="rounded-circle"
        alt="Profile Picture of John Doe"
        width="150"
      />
      <h4>John Doe</h4>
      <p>
        Followers: 120 | <router-link to="/subscribes" class="text-decoration-none">Following: 80</router-link>
      </p>
      <button
        class="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#editProfileModal"
        aria-label="Edit Profile"
      >
        Edit Profile
      </button>
    </section>

    <hr />

    <!-- Profile Tabs -->
    <section aria-labelledby="profileTabsTitle">
      <ul class="nav nav-tabs" id="profileTabs">
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="tab" href="#saved-recipes" id="savedRecipesTab" aria-controls="saved-recipes" aria-selected="true">Saved Recipes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#my-posts" id="myPostsTab" aria-controls="my-posts" aria-selected="false">My Posts</a>
        </li>
      </ul>

      <div class="tab-content">
        <div id="saved-recipes" class="tab-pane fade show active" aria-labelledby="savedRecipesTab">
          <div class="row">
            <!-- Card example -->
            <div class="col-md-4" v-for="recipe in savedRecipes" :key="recipe.title">
              <div class="card">
                <router-link :to="'/recipes/' + recipe.id">
                  <img :src="recipe.image" class="card-img-top" :alt="recipe.title">
                </router-link>
                <div class="card-body">
                  <router-link :to="'/recipes/' + recipe.id">
                    <h5 class="card-title">{{ recipe.title }}</h5>
                  </router-link>
                  <p class="card-text">{{ recipe.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Similar structure for 'My Posts' can be added here -->
      </div>
    </section>

    <!-- Modal for editing profile -->
    <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="editName" class="form-label">Name</label>
                <input type="text" class="form-control" id="editName" aria-labelledby="editName">
              </div>
              <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="editEmail" aria-labelledby="editEmail">
              </div>
              <div class="mb-3">
                <label for="editPassword" class="form-label">New Password</label>
                <input type="password" class="form-control" id="editPassword" aria-labelledby="editPassword">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      savedRecipes: [
        {
          id: 'recipe_apple_pie',
          title: 'Autumn Apple Pie',
          image: 'img/top-view-pie-coffee.jpg',
          description: 'Autumn recipe for atmosphere.'
        },
        // Add more recipes as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Add custom styling here */
</style>
