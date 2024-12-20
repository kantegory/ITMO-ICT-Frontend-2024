<template>
  <div class="numeric-table">
    <h3>Numerical Data</h3>
    <table>
      <thead>
      <tr>
        <th>Measurement</th>
        <th>Value</th>
      </tr>
      </thead>
      <tr v-for="measurement in measurements" :key="measurement.label">
        <td>{{ measurement.label }}</td>
        <td class="measures"
            contenteditable="true"
            @input="onInput(measurement.label, $event.target.textContent)">
          {{ measurement.value }}
        </td>
      </tr>
    </table>
    <div class="button-container">
      <button @click="saveChanges">Save Changes</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      measurements: [],
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const storedUser = localStorage.getItem('user');
      this.user = JSON.parse(storedUser);
      this.measurements = [
        { label: 'Current weight', value: this.user.currentWeight },
        { label: 'Waist circumference', value: this.user.waistCircumference || 0 },
        { label: 'Hip circumference', value: this.user.hipCircumference || 0 },
        { label: 'Chest circumference', value: this.user.chestCircumference || 0 }
      ];
    },
    onInput(label, value) {
      const measurement = this.measurements.find((m) => m.label === label);
      if (measurement) {
        measurement.value = parseFloat(value);
      }
    },
    saveChanges() {
      const updatedMeasurements = this.measurements.map(measurement => ({
        label: measurement.label,
        value: measurement.value,
      }));
      updatedMeasurements.forEach(measurement => {
        if (measurement.label === 'Current weight') {
          this.user.currentWeight = measurement.value;
          this.user.weightProgress.push(measurement.value);
        }
        if (measurement.label === 'Waist circumference') this.user.waistCircumference = measurement.value;
        if (measurement.label === 'Hip circumference') this.user.hipCircumference = measurement.value;
        if (measurement.label === 'Chest circumference') this.user.chestCircumference = measurement.value;
      });
      localStorage.setItem('user', JSON.stringify(this.user));
    },
  },
};
</script>


<style scoped>
.measures {
  background-color: #555555;
}

table th, table td {
  padding: 2%;
  border: 1px solid #333333;
  color: #fff;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #1d7e33;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
}

button:hover {
  background-color: #333333;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.numeric-table {
  flex: 1;
  min-width: 300px;
  padding: 2%;
  border-radius: 10px;
}

h3 {
  text-align: center;
  color: white;
}

table {
  width: 100%;
  margin-top: 2%;
  background-color: #555555;
}

thead {
  background-color: #333333;
}
</style>
