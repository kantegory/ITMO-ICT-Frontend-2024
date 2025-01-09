<template>
  <div ref="mapContainer" style="height: 300px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapContainer = ref(null);
const map = ref(null);

const initMap = (lat, lon) => {
  map.value = L.map(mapContainer.value).setView([lat, lon], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map.value);
  L.popup()
      .setLatLng([lat, lon])
      .setContent('ЖК Премьер Палас')
      .openOn(map.value);
};

const fetchCoordinates = async (locationName) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json`);
    const data = await response.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      initMap(lat, lon);
    } else {
      console.error('Координаты не найдены для указанного местоположения.');
    }
  } catch (error) {
    console.error('Ошибка при получении координат:', error);
  }
};

onMounted(() => {
  fetchCoordinates('ЖК Премьер Палас');
});
</script>
