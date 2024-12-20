<template>
  <div id="authModal" class="modal fade" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="isLogin">
          <LoginModal />
          <button class="btn button-grey w-50" @click.prevent="chooseForm"> Registration </button>
        </div>
        <div v-else>
          <RegistrationModal />
          <button class="btn button-grey w-50" @click.prevent="chooseForm"> Login </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginModal from './LoginModal.vue';
import RegistrationModal from './RegistrationModal.vue';

const isLogin = ref(true);

const chooseForm = () => {
  isLogin.value = !isLogin.value;
};

const closeModal = () => {
  const authModal = document.getElementById('authModal');
  authModal.hide();
};
</script>

<style scoped>

.modal-header {
  justify-content: center;
}

.modal-dialog {
  background-color: #333333;
  color: #fff;
  text-align: center;
  border-radius: 10px;
}

.modal-content {
  background-color: #333333;
}

.button-grey {
  background-color: black;
  border-radius: 10px;
  color: white;
  margin-top: 10%;
  margin-bottom: 3%;
}

.button-grey:hover {
  background-color: #555555;
}
</style>
