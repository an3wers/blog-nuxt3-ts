<template>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">Nuxt-blog admin</NuxtLink>
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- active class -->
            <NuxtLink class="nav-link" aria-current="page" to="/">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" href="/about">About</NuxtLink>
          </li>
          
        </ul>
        <div>
          <button class="btn btn-primary" @click="$router.push('/admin/new-post')" type="button">Add post</button>
          <button class="btn btn-light ms-2" @click="logoutHandler" type="button">Log out</button>
        </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store/auth'
const { logout } = useAuthStore()

function logoutHandler() {
  logout()
  navigateTo('/')
}
</script>