<template>
  <div>
    <div class="mb-3">
      <button @click="$router.push('/admin')" class="btn btn-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor" 
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        Back
      </button>
    </div>
    <h1 class="mb-4">Add new post</h1>
    <div class="card">
      <div class="card-body">
        <PostForm @form-submin="submitHandler" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostForm from "~~/components/Admin/PostForm.vue";
import { IPostAdd } from "~~/types/posts";
import { usePostsStore } from "~~/store/posts";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const postsStore = usePostsStore();
const { isSubmitingError } = storeToRefs(postsStore);
const { addPost } = usePostsStore();

async function submitHandler(post: IPostAdd) {
  // console.log('New post', post)
  await addPost(post);
  if (!isSubmitingError.value) {
    navigateTo("/admin");
  }
}
</script>
