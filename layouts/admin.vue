<template>
  <div class="layout admin-layout">
    <AdminHeader />
    <div class="main">
      <div class="container py-5">
        <ClientOnly>
          <slot />
        </ClientOnly>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from "~~/components/UI/Footer/AppFooter.vue";
import AdminHeader from "~~/components/UI/Header/AdminHeader.vue";
</script>
