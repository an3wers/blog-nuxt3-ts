<template>
  <h1 class="mb-4">Admin page</h1>
  <!-- 
    Переключатель посты/ комментарии
    Контент
  -->
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item">
      <a
        class="nav-link"
        @click.prevent="tabsHandler('posts')"
        :class="adminMode === 'posts' ? 'active' : ''"
        aria-current="page"
        href="#"
        >Posts</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        @click.prevent="tabsHandler('comments')"
        :class="adminMode === 'comments' ? 'active' : ''"
        href="#"
        >Comments</a
      >
    </li>
  </ul>
  <PostsListAdmin v-if="adminMode === 'posts'" />
  <CommentsListAdmin v-if="adminMode === 'comments'" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import PostsListAdmin from "~~/components/Posts/PostsListAdmin.vue";
import CommentsListAdmin from "~~/components/Commets/CommentsListAdmin.vue";
import { usePostsStore } from '~~/store/posts'

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

type Mode = "posts" | "comments"

const { fetchPosts } = usePostsStore()
const adminMode = ref<Mode>("posts"); // posts / comments

function tabsHandler(mode: Mode) {
  adminMode.value = mode;
}

await fetchPosts()
</script>
