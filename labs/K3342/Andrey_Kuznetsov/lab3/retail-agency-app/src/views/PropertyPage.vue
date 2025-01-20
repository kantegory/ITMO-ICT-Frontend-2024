<template>
  <div>
    <HeaderLoader :currentPath="currentPath" />

    <main role="main" class="container">
      <section class="property-description">
        <h2>Description</h2>
        <p v-if="property.description">{{ property.description }}</p>
      </section>

      <section class="photo-slider" aria-labelledby="photoGalleryTitle">
        <h2 id="photoGalleryTitle">Photo Gallery</h2>
        <div class="p-slider" aria-live="polite" role="region">
          <div v-for="(photo, index) in property.photos" :key="index" class="slide" v-show="currentSlide === index">
            <img :src="photo" alt="Property Photo">
          </div>
        </div>
        <div class="button-container">
          <button @click="prevPhoto" aria-label="View the previous photo">Previous</button>
          <button @click="nextPhoto" aria-label="View the next photo">Next</button>
        </div>
      </section>

      <section class="property-features" aria-labelledby="featuresTitle">
        <h2 id="featuresTitle">Features</h2>
        <ul role="list">
          <li v-for="(feature, index) in features" :key="index" aria-live="polite">
            <span v-html="feature"></span>
          </li>
        </ul>
      </section>

      <button @click="contactOwner" class="contact-button" aria-label="Contact the property owner">
        Contact Owner
      </button>
    </main>
  </div>
</template>

<script>
import HeaderLoader from "@/components/HeaderLoader.vue";
import { API_BASE_URL } from "@/config/config.js";

export default {
  name: "PropertyPage",
  components: {
    HeaderLoader,
  },
  data() {
    return {
      currentPath: "",
      property: {
        description: '',
        photos: [],
        propertyType: '',
        transactionType: '',
        location: '',
        rooms: 0,
        area: 0,
        floor: 0,
        amenities: [],
        price: 0
      },
      features: [],
      currentSlide: 0
    };
  },
    async created() {
    const propertyId = this.$route.params.id; 
    if (propertyId) {
        try {
        const property = await this.fetchPropertyDetails(propertyId);
        if (property) {
            this.appendPropertyDetails(property);
        } else {
            console.error('Property not found.');
        }
        } catch (error) {
        console.error('Error fetching property details:', error);
        }
    } else {
        console.error('Property ID not found in the URL.');
    }
    },
  methods: {
    async fetchPropertyDetails(propertyId) {
      try {
        const response = await fetch(`${API_BASE_URL}/properties?id=${propertyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property details');
        }
        const data = await response.json();
        return data.length > 0 ? data[0] : null; 
      } catch (error) {
        console.error('Error fetching property data:', error);
        throw error; 
      }
    },
    appendPropertyDetails(property) {
      this.property = {
        description: property.description,
        photos: property.photos,
        propertyType: property.propertyType,
        transactionType: property.transactionType,
        location: property.location,
        rooms: property.rooms,
        area: property.area,
        floor: property.floor,
        amenities: property.amenities,
        price: property.price
      };

      this.features = [
        `<i class="fas fa-home"></i> <strong>Property Type:</strong> ${property.propertyType}`,
        `<i class="fas fa-handshake"></i> <strong>Transaction Type:</strong> ${property.transactionType}`,
        `<i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${property.location}`,
        `<i class="fas fa-bed"></i> <strong>Number of Rooms:</strong> ${property.rooms}`,
        `<i class="fas fa-ruler-combined"></i> <strong>Area:</strong> ${property.area} m²`,
        `<i class="fas fa-layer-group"></i> <strong>Floor:</strong> ${property.floor}`,
        `<i class="fas fa-cogs"></i> <strong>Amenities:</strong> ${property.amenities.join(', ')}`,
        `<i class="fas fa-dollar-sign"></i> <strong>Price:</strong> <span style="color: green;">$${property.price.toLocaleString()}</span>`
      ];
    },
    prevPhoto() {
      this.currentSlide = (this.currentSlide - 1 + this.property.photos.length) % this.property.photos.length;
    },
    nextPhoto() {
      this.currentSlide = (this.currentSlide + 1) % this.property.photos.length;
    },
    contactOwner() {
        this.$router.push({ name: 'Messages'});
    }
  }
};
</script>

<style scoped>
@import url('../assets/css/styles.css');
@import url('../assets/css/property.css');
</style>
