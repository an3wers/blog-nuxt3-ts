<template>
  <div>
    <div v-if="pending">
        <PageLoader />
    </div>
    <div v-else>
        <h1 class="mb-4">{{post?.title}}</h1>
        <img :src="post?.imgUrl" class="img-fluid" :alt="post?.title">
        <div class="mt-4">
          <div v-html="post?.content"></div>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import PageLoader from "~~/components/UI/Loader/PageLoader.vue";
import { IPost } from "~~/types/posts";
// import type { Ref } from "vue";

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

</script>
