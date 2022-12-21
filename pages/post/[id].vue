<template>
  <div>
    <div v-if="pPending">
      <PageLoader />
    </div>
    <div v-else>
      <h1 class="mb-4">{{ post?.title }}</h1>
      <img :src="post?.imgUrl" class="img-fluid" :alt="post?.title" />
      <div class="mt-4">
        <div v-html="post?.content"></div>
      </div>
      <!-- comments -->
      <div class="card text-bg-light">
        <div class="card-body">
          <AddPostComment :postId="post?.id" />
          <template v-if="post?.id">
            <CommentsListClient
              v-if="getCommentsByPostId(post.id).length"
              :comments="getCommentsByPostId(post.id)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddPostComment from "~~/components/Commets/AddPostComment.vue";
import PageLoader from "~~/components/UI/Loader/PageLoader.vue";
import type { IPost } from "~~/types/posts";
import CommentsListClient from "~~/components/Commets/CommentsListClient.vue";
// import type { IComment } from "~~/types/comments";
import { useCommetsStroe } from "~~/store/comments";

const route = useRoute();
// const postComments = ref<IComment[] | []>([]);
const { getCommentsByPostId, fetchComments } = useCommetsStroe();

const id = route.params.id;
const { pending: pPending, data: post } = useLazyAsyncData<IPost | null>(
  "post",
  () =>
    $fetch(
      `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`,
      {
        method: "get",
      }
    )
);

await fetchComments();
</script>
