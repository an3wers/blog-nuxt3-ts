<template>
  <div class="home-page">
    <!-- top block -->
    <TopBlock />
    <!-- post list -->
    <PostsListClient :posts="posts" />
  </div>
</template>

<script setup lang="ts">
import TopBlock from '~~/components/HomePage/TopBlock.vue';
import PostsListClient from '~~/components/Posts/PostsListClient.vue'
import { usePostsStore } from '~~/store/posts'
import { storeToRefs } from 'pinia'

const postsStore = usePostsStore()
const { fetchPosts } = usePostsStore()
const { posts } = storeToRefs(postsStore)

await fetchPosts()

</script>
