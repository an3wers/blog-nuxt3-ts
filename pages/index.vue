<template>
  <div class="home-page">
    <!-- top block -->
    <TopBlock />
    <!-- search -->
    <input
      type="text"
      v-model="inputValue"
      @input="inputHandler"
      class="form-control"
      placeholder="Search post..."
    />
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

const postsStore = usePostsStore();
const { fetchPosts } = usePostsStore();
const { posts } = storeToRefs(postsStore);
const router = useRouter();
const route = useRoute()

await fetchPosts();

const inputValue = ref("");
const serchValue = ref("");

if ('search' in route.query) {
  inputValue.value = String(route.query.search) 
  serchValue.value = String(route.query.search) 
}
const deb = useDebounce(setSearchValue, 1000);

function inputHandler() {
  deb(inputValue.value);
}

function setSearchValue(value: string) {
  serchValue.value = value;
  if (serchValue.value) {
    router.replace(`?search=${serchValue.value}`);
  } else {
    router.replace({ query: undefined });
  }
}

const getFilteredPosts = computed(() => {
  return posts.value.filter((post) =>
    post.title
      .toLocaleLowerCase()
      .includes(serchValue.value.toLocaleLowerCase())
  );
});
</script>
