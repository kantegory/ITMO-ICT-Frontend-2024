<template>
  <div class="destiny-matrix">
    <h1>Матрица судьбы</h1>
    <p>Раскройте свои жизненные цели и предназначение.</p>

    <!-- Форма ввода -->
    <form @submit.prevent="calculate">
      <div>
        <label for="gender">Пол:</label>
        <select v-model="form.gender" id="gender" required>
          <option value="" disabled>Выберите...</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>
      <div>
        <label for="name">Имя:</label>
        <input
          type="text"
          v-model="form.name"
          id="name"
          placeholder="Введите имя"
          required
        />
      </div>
      <div>
        <label for="birthday">Дата рождения:</label>
        <input
          type="date"
          v-model="form.birthday"
          id="birthday"
          required
        />
      </div>
      <button type="submit">Рассчитать</button>
    </form>

    <!-- Результат -->
    <div v-if="result" id="matrixResult">
      <h2>Результат расчета:</h2>
      <p id="matrixOutput">
        Имя: {{ form.name }}<br />
        Дата рождения: {{ form.birthday }}<br />
        Сообщение: {{ result }}
      </p>
    </div>
  </div>
</template>


<script>
import useApi from "@/composables/useApi.js";
import useDateProcessing from "@/composables/useDateProcessing.js";

export default {
  data() {
    return {
      form: {
        gender: "",
        name: "",
        birthday: "",
      },
      result: null,
    };
  },
  methods: {
    async calculate() {
      const { gender, name, birthday } = this.form;

      if (!gender || !name || !birthday) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      const { parseDate } = useDateProcessing();
      const parsedBirthday = parseDate(birthday);

      if (!parsedBirthday) {
        alert("Введите корректную дату рождения!");
        return;
      }

      try {
        const { getResults } = useApi();
        const response = await getResults();
        const data = response.data;

        const matchedResult = data.find((item) => item.gender === gender);
        this.result = matchedResult
          ? matchedResult.message
          : "Нет данных для вашего запроса.";
      } catch (error) {
        console.error("Ошибка загрузки данных из JSON-сервера:", error);
        alert("Произошла ошибка при расчёте. Попробуйте позже.");
      }
    },
  },
};
</script>


<style scoped>
.destiny-matrix {
  text-align: center;
  margin: 2rem;
}
form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1rem auto;
  max-width: 400px;
}
label {
  font-weight: bold;
}
input,
select,
button {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #357ab7;
}
#matrixResult {
  margin-top: 2rem;
  padding: 1rem;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}
</style>
