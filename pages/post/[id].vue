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
          <AddPostComment />
          <CommentsListClient
            v-if="postComments.length"
            :comments="postComments"
          />
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
import type { IComment } from "~~/types/comments";

const route = useRoute();
const postComments = ref<IComment[] | []>([]);

const id = route.params.id;
const { pending: pPending, data: post } = useLazyAsyncData<IPost>("post", () =>
  $fetch(
    `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`,
    {
      method: "get",
    }
  )
);

async function fetchComments() {
  try {
    const res: any = await $fetch(
      "https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json"
    );

    const data: IComment[] = Object.values(res);
    // console.log("comments", Object.values(res));
    postComments.value = filteredComments(data, id);
  } catch (error) {
    console.log(error);
  }
}

function filteredComments(arr: IComment[], id: string | string[]): IComment[] {
  const result = arr.filter((el) => el.postId === id && el.publish);

  return result;
}

fetchComments();
</script>
