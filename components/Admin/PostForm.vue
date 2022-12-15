<template>
  <div>
    <div class="mb-3">
      <label for="postTitle" class="form-label">Title</label>
      <input
        type="text"
        v-model="post.title"
        class="form-control"
        id="postTitle"
        placeholder="Post title"
      />
    </div>
    <div class="mb-3">
      <label for="postImg" class="form-label">Image url</label>
      <input
        type="text"
        v-model="post.imgUrl"
        class="form-control"
        id="postImg"
        placeholder="url..."
      />
    </div>
    <div class="mb-3">
      <label for="postDescr" class="form-label">Description</label>
      <textarea
        class="form-control"
        v-model="post.descr"
        id="postDescr"
        rows="2"
      ></textarea>
    </div>
    <!-- editor -->
      <AppEditor v-model="post.content" />
    <!-- # editor -->
    <button
      :disabled="isSubmitPost"
      type="button"
      @click="formHandler"
      class="btn btn-primary btn-lg mt-3"
    >
      {{ editPost ? "Update post" : "Create post"
      }}<span v-if="isSubmitPost">…</span>
    </button>
    <button
      type="button"
      @click="$router.push('/admin')"
      class="ms-2 btn btn-light btn-lg mt-3"
    >
      Cancel
    </button>
  </div>
</template>

<script setup lang="ts">
import { IPost, IPostAdd, IPostUpdate } from "~~/types/posts";
import { reactive, ref } from "vue";
import { usePostsStore } from "~~/store/posts";
import { storeToRefs } from "pinia";
import AppEditor from '~~/components/Editor/AppEditor.vue'

interface PostFormProps {
  editPost?: IPost;
}

interface PostFormEmit {
  (e: "formSubmin", post: IPostAdd | IPostUpdate): void;
}

const postsStore = usePostsStore();
const { isSubmitPost } = storeToRefs(postsStore);

const props = defineProps<PostFormProps>();
const emit = defineEmits<PostFormEmit>();

const post: IPostAdd | IPostUpdate = reactive(
  props.editPost
    ? { ...props.editPost }
    : { title: "", content: "", imgUrl: "", descr: "" }
);

function formHandler() {
  emit("formSubmin", post);
}
</script>
