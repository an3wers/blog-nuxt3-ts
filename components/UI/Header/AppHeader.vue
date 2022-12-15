<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">Nuxt-blog with TS</NuxtLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <!-- active class -->
          <NuxtLink class="nav-link" aria-current="page" to="/">Home</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/about">About</NuxtLink>
        </li>
        <li v-if="authStore.isAuth" class="nav-item">
          <NuxtLink class="nav-link" to="/admin">Admin</NuxtLink>
        </li>
      </ul>
      <button v-if="!authStore.isAuth" class="btn btn-primary" @click="handleSignIn" type="button">
        Sign in
      </button>
      <button v-if="authStore.isAuth" class="btn btn-light" @click="handleLogout" type="button">
        Log out
      </button>
    </div>
    <Teleport to="body">
      <AppModal
        v-if="isAuthModal"
        title="Sign in"
        @on-close="closeSignInModal"
      >
        <FormAuth />
      </AppModal>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import AppModal from "~~/components/UI/Modal/AppModal.vue";
// import { ref } from "vue";
import FormAuth from "~~/components/Auth/FormAuth.vue";
import { useAuthStore } from '~~/store/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { logout } = useAuthStore()
const { isAuthModal } = storeToRefs(authStore)

function handleSignIn() {
  // isModalSignIn.value = true;
  isAuthModal.value = true
}

function closeSignInModal() {
  // isModalSignIn.value = false;
  isAuthModal.value = false
}

function handleLogout() {
  logout()
}

</script>
