<template>
  <form @submit.prevent="authHandler">
    <div v-if="authError" class="alert alert-danger mb-3" role="alert">
      Auth error!
    </div>

    <div class="mb-3">
      <label for="emailFormControlInput" class="form-label"
        >Email address</label
      >
      <input
        type="email"
        v-model="email"
        class="form-control"
        id="emailFormControlInput"
        placeholder="name@example.com"
      />
    </div>
    <div class="mb-3">
      <label for="passwordFormControlInput" class="form-label">Password</label>
      <input
        type="password"
        v-model="pass"
        class="form-control"
        id="passwordFormControlInput"
      />
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/store/auth";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { authError, isAuthModal } = storeToRefs(authStore);

const email = ref("");
const pass = ref("");
const { login } = useAuthStore();

async function authHandler() {
  await login({ email: email.value, password: pass.value });
  if (!authError.value) {
    isAuthModal.value = false;
  }
}
</script>
