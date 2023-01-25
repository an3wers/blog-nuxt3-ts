<template>
  <div class="home-page">
    <!-- top block -->
    <TopBlock />
    <!-- search -->
    <SearchHome />
    <!-- post list -->
    <PostsListClient v-if="getFilteredPosts.length" :posts="getFilteredPosts" />
    <p v-else class="py-5 text-center">Posts not found</p>
    <!-- empty state -->
  </div>
</template>

<script setup lang="ts">
import TopBlock from "~~/components/HomePage/TopBlock.vue";
import PostsListClient from "~~/components/Posts/PostsListClient.vue";
import { usePostsStore } from "~~/store/posts";
import { storeToRefs } from "pinia";
import SearchHome from "~~/components/Search/SearchHome.vue";
import { useFiltersStore } from "~~/store/filters";

const filterStore = useFiltersStore();
const { searchValue } = storeToRefs(filterStore);
const postsStore = usePostsStore();
const { fetchPosts } = usePostsStore();
const { posts } = storeToRefs(postsStore);
const route = useRoute();

if (Object.hasOwn(route.query, "search")) {
  searchValue.value = String(route.query.search);
}

await fetchPosts();

const getFilteredPosts = computed(() => {
  return posts.value.filter((post) =>
    post.title
      .toLocaleLowerCase()
      .includes(searchValue.value.toLocaleLowerCase())
  );
});

onUnmounted(() => {
  searchValue.value = ''
})

</script>
