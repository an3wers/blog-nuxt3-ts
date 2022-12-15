<template>
  <div class="my-4">
    <div class="row row-cols-1 row-cols-lg-2 g-4">
      <div v-for="post in posts" :key="post.id" class="col">
        <div class="card h-100">
          <img
            :src="post.imgUrl"
            style="object-fit: cover"
            class="card-img-top post-image"
            :alt="post.title"
          />
          <div class="card-body">
            <NuxtLink class="title-link" :to="`/post/${post.id}`"
              ><h2 class="card-title">{{ post.title }}</h2></NuxtLink
            >
            <p class="card-text">
              {{ post.descr }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPost } from "~~/types/posts";

interface PostsListProps {
  posts: IPost[];
}
defineProps<PostsListProps>();
</script>

<style scoped>
.post-image {
  height: 280px;
}
.title-link {
  text-decoration: none;
  color: black;
}
.title-link:hover {
  color: #0d6efd;
}
</style>
