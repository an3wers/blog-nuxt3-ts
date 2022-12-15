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
    <h1 class="mb-4">Edit post</h1>
    <div class="card">
      <div class="card-body">
        <div v-if="pending">
          <PageLoader />
        </div>
        <PostForm v-if="(post && !pending)" :edit-post="post" @form-submin="submitHandler" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPost, IPostUpdate } from "~~/types/posts";
import PostForm from "~~/components/Admin/PostForm.vue";
import { usePostsStore } from "~~/store/posts";
import { storeToRefs } from "pinia";
import PageLoader from "~~/components/UI/Loader/PageLoader.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { getPostById, editPost } = usePostsStore();
const postsStore = usePostsStore();
const { isSubmitingError } = storeToRefs(postsStore);

const route = useRoute();

const id = route.params.id;
const { pending, data: post } = useLazyAsyncData<IPost>("post", () =>
  $fetch(
    `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`,
    {
      method: "get",
    }
  )
);

async function submitHandler(post: IPostUpdate) {
  await editPost(post);
  if (!isSubmitingError.value) {
    navigateTo("/admin");
  }
}
</script>
