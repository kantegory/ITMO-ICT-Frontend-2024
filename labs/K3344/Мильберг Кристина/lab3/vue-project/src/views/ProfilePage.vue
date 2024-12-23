<template>
  <div>
    <h1>Welcome, {{ user?.username }}</h1>

    <div v-if="!isEditing">
      <p><strong>Birthdate:</strong> {{ user?.birthdate || 'Нет данных' }}</p>
      <p><strong>Zodiac:</strong> {{ user?.zodiac || 'Нет данных' }}</p>
      <p><strong>Birthplace:</strong> {{ user?.birthplace || 'Нет данных' }}</p>
      <p><strong>Birthtime:</strong> {{ user?.birthtime || 'Нет данных' }}</p>

      <button @click="enableEditing">Редактировать</button>
    </div>

    <div v-else>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" v-model="editableUser.birthdate" />
        </div>

        <div class="form-group">
          <label for="zodiac">Zodiac:</label>
          <select id="zodiac" v-model="editableUser.zodiac">
            <option value="">Выберите знак зодиака</option>
            <option value="Овен">Овен</option>
            <option value="Телец">Телец</option>
            <option value="Близнецы">Близнецы</option>
            <option value="Рак">Рак</option>
            <option value="Лев">Лев</option>
            <option value="Дева">Дева</option>
            <option value="Весы">Весы</option>
            <option value="Скорпион">Скорпион</option>
            <option value="Стрелец">Стрелец</option>
            <option value="Козерог">Козерог</option>
            <option value="Водолей">Водолей</option>
            <option value="Рыбы">Рыбы</option>
          </select>
          </div>

        <div class="form-group">
          <label for="birthplace">Birthplace:</label>
          <input type="text" id="birthplace" v-model="editableUser.birthplace" />
        </div>

        <div class="form-group">
          <label for="birthplace">Birthtime:</label>
          <input type="text" id="birthplace" v-model="editableUser.birthtime" />
        </div>

        <button type="submit">Сохранить</button>
        <button type="button" @click="cancelEditing">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script>
import useApi from "@/composables/useApi";

export default {
  data() {
    return {
      user: null,
      isEditing: false,
      editableUser: {},
    };
  },
  async mounted() {
    const api = useApi();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Токен отсутствует");
        this.$router.push("/login");
        return;
      }

      // Получаем список пользователей
      const users = (await api.getUsers()).data;

      if (!users || !Array.isArray(users)) {
        console.error("Данные пользователей некорректные");
        return;
      }

      const foundUser = users.find((u) => u.token === token);

      if (foundUser) {
        console.log("Найден пользователь:", foundUser);
        this.user = foundUser;
      } else {
        console.error("Пользователь с токеном не найден");
        this.$router.push("/login");
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
    }
  },
  methods: {
    enableEditing() {
      this.isEditing = true;
      this.editableUser = { ...this.user };
    },
    async saveChanges() {
      const api = useApi();
      try {
        const updatedUser = (
          await api.updateUser(this.user.id, this.editableUser)
        ).data;
        this.user = updatedUser;
        this.isEditing = false;
        console.log("Данные успешно обновлены:", updatedUser);
      } catch (error) {
        console.error("Ошибка при сохранении данных пользователя:", error);
        alert("Не удалось сохранить изменения. Попробуйте позже.");
      }
    },
    cancelEditing() {
      this.isEditing = false;
      this.editableUser = {};
    },
  },
};
</script>


<style scoped>
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  margin-right: 10px;
  padding: 10px;
  background-color: #5c6bc0;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #3949ab;
}
</style>
