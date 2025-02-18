<template>
  <HeaderLoader :currentPath="currentPath" />
  
  <div class="container">
    <main role="main">
      <section class="profile" aria-labelledby="profileSection">
        <div class="profile-header">
          <div class="profile-header-cover" aria-hidden="true"></div>
          <div class="profile-header-content">
            <div class="profile-header-img">
              <img :src="profileImage || require('@/assets/images/profile/anon.jpg')" alt="Profile picture of the user" />
            </div>

            <div class="profile-header-info">
              <h4 id="profileSection" class="sr-only">{{ profileName || 'User Profile' }}</h4>
              <p>{{ profileStatus || 'None' }}</p>
              <button @click="editProfile" class="edit-profile" aria-label="Edit your profile information">Edit Profile</button>
              <button @click="logout" class="logout" aria-label="Log out of your account">Log out</button>
            </div>
          </div>
        </div>
      </section>

      <section class="profile-content" aria-labelledby="rentalHistorySection">
        <div class="tab-content page-0">
          <div class="tab-pane fade active show" id="profile-post">
            <ul class="timeline" aria-live="polite" role="list">
              <li v-for="(historyItem, index) in rentalHistory" :key="index">
                <div class="timeline-time">
                  <span class="start-time">From: {{ historyItem.startDate }}</span>
                  <span class="end-time">To: {{ historyItem.endDate }}</span>
                </div>
                <div class="timeline-body">
                  <div class="timeline-header">
                    <span class="userimage">
                      <img :src="historyItem.profilePicture" alt="Profile picture" />
                    </span>
                    <span class="username">{{ historyItem.userName }}</span>
                    <span class="text-muted pull-right">{{ historyItem.livingDuration }}</span>
                  </div>
                  <div class="timeline-content">
                    <p>{{ historyItem.shortDescription }}</p>
                    <p style="font-style: italic; margin-top: 10px;">
                      <a :href="historyItem.propertyLink" style="color: inherit;">see advertisement...</a>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="rentalHistory.length === 0" class="no-data-message">
              <p>No rental history found.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderLoader from "@/components/HeaderLoader.vue";
import { API_BASE_URL } from "@/config/config.js"; // Путь к конфигу

export default {
  name: "ProfilePage",
  components: {
    HeaderLoader,
  },
  data() {
    return {
      currentPath: "/profile",
      profileName: '',
      profileImage: '', 
      profileStatus: '',
      rentalHistory: [], 
    };
  },
  methods: {
    editProfile() {
      alert("Edit Profile logic here.");
    },

    logout() {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("jwt");

        this.$router.push({ name: 'Auth' }); 
    },

    getCurrentUser() {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    },

    displayUserProfile(user) {
      this.profileName = user.name || "None";
      this.profileImage = user.profilePicture || '';
      this.profileStatus = user.status || "None";
    },

    async fetchRentalHistory(userId) {
      try {
        const response = await fetch(`${API_BASE_URL}/rentalHistory?userId=${userId}`);
        const data = await response.json();
        const currentUser = this.getCurrentUser();

        const dataWithUser = data.map(item => ({
          ...item,
          userName: currentUser.name,
          livingDuration: this.calculateLivingDuration(item.startDate, item.endDate),
        }));

        this.rentalHistory = dataWithUser;
      } catch (error) {
        console.error('Error fetching rental history:', error);
      }
    },

    calculateLivingDuration(startDate, endDate) {
      const start = new Date(startDate);
      const end = endDate === 'current' ? new Date() : new Date(endDate);

      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (months < 0) {
        years--;
        months += 12;
      }

      if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0); 
        days += prevMonth.getDate();
      }

      let result = "";
      if (years > 0) result += `${years} year${years > 1 ? 's' : ''} `;
      if (months > 0) result += `${months} month${months > 1 ? 's' : ''} `;
      if (days > 0) result += `${days} day${days > 1 ? 's' : ''}`;

      return result.trim() || "0 days"; 
    }
  },

  created() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      this.$router.push({ name: 'Auth' }); 
      return;
    }

    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.displayUserProfile(currentUser);
      this.fetchRentalHistory(currentUser.id);
    }
  }
};
</script>

<style scoped>
@import url('../assets/css/styles.css'); 
@import url('../assets/css/profile.css'); 
</style>
