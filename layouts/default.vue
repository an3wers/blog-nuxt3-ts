<template>
  <div class="layout default-layout">
    <AppHeader />
    <div class="main">
      <div class="container py-5">
        <slot />
      </div>
    </div>
    <AppFooter />

  </div>
</template>

<script setup lang="ts">
import AppFooter from "~~/components/UI/Footer/AppFooter.vue";
import AppHeader from "~~/components/UI/Header/AppHeader.vue";


</script>
