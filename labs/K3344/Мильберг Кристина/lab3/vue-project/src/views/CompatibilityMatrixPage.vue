<template>
  <div class="compatibility-matrix">
    <h1>Матрица совместимости</h1>
    <p>Узнайте, насколько вы совместимы с другим человеком.</p>
    <form @submit.prevent="checkCompatibility">
      <div class="form-group">
        <label for="yourName">Ваше имя</label>
        <input id="yourName" v-model="yourName" type="text" required />
      </div>
      <div class="form-group">
        <label for="partnerName">Имя партнера</label>
        <input id="partnerName" v-model="partnerName" type="text" required />
      </div>
      <div class="form-group">
        <label for="yourBirthday">Ваша дата рождения</label>
        <input id="yourBirthday" v-model="yourBirthday" type="date" required />
      </div>
      <div class="form-group">
        <label for="partnerBirthday">Дата рождения партнера</label>
        <input id="partnerBirthday" v-model="partnerBirthday" type="date" required />
      </div>
      <button type="submit">Проверить</button>
    </form>

    <!-- Результат -->
    <div v-if="resultMessage" class="result">
      <h2>Результат совместимости</h2>
      <p><strong>{{ compatibility }}%</strong></p>
      <p>{{ resultMessage }}</p>
    </div>
  </div>
</template>

<script>
import useApi from "@/composables/useApi";
import useDateProcessing from "@/composables/useDateProcessing";

export default {
  data() {
    return {
      yourName: "",
      partnerName: "",
      yourBirthday: "",
      partnerBirthday: "",
      compatibility: 0,
      resultMessage: "",
    };
  },
  methods: {
    calculateCompatibility(yourName, partnerName, yourBirthday, partnerBirthday) {
      const { parseDate, calculateDateDifferenceInDays } = useDateProcessing();

      let compatibility = 0;

      // Сравнение длины имен
      if (Math.abs(yourName.length - partnerName.length) < 3) {
        compatibility += 30;
      } else {
        compatibility += 10;
      }

      // Сравнение первых букв имен
      if (yourName[0].toLowerCase() === partnerName[0].toLowerCase()) {
        compatibility += 20;
      }

      // Разница в днях между датами рождения
      const yourDate = parseDate(yourBirthday);
      const partnerDate = parseDate(partnerBirthday);
      const dateDifference = calculateDateDifferenceInDays(yourDate, partnerDate);

      if (dateDifference !== null) {
        compatibility += dateDifference < 1000 ? 30 : 10;
      } else {
        console.warn("Не удалось рассчитать разницу между датами!");
      }

      // Генерация случайного числа для дополнительной случайности
      compatibility += Math.floor(Math.random() * 11);

      // Ограничение значения совместимости между 0 и 100
      return Math.min(100, Math.max(0, compatibility));
    },
    async checkCompatibility() {
      if (!this.yourName || !this.partnerName || !this.yourBirthday || !this.partnerBirthday) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      this.compatibility = this.calculateCompatibility(
        this.yourName,
        this.partnerName,
        this.yourBirthday,
        this.partnerBirthday
      );

      try {
        const api = useApi();
        const response = await api.getCompatibilityMessages();
        const messages = response.data;

        const match = messages.find(
          (item) => this.compatibility >= item.range[0] && this.compatibility <= item.range[1]
        );

        if (match) {
          this.resultMessage = match.message;
        } else {
          this.resultMessage = "Не удалось определить результат. Попробуйте снова.";
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        this.resultMessage = "Произошла ошибка при загрузке данных. Попробуйте позже.";
      }
    },
  },
};
</script>



<style scoped>
.compatibility-matrix {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #3949ab;
}
.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  border-radius: 5px;
}
</style>
