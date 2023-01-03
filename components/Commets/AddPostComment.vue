<template>
  <div>
    <div class="mb-3">
      <label for="postCommentField" class="form-label">Add comment</label>
      <textarea
        class="form-control"
        v-model="commentVal"
        @focus="handleFocusCommentField"
        id="postCommentField"
        rows="3"
      ></textarea>
    </div>
    <div class="row" v-if="isEmailAndNameVisible">
      <div class="col-md-6 mb-3">
        <input
          type="email"
          v-model="emailVal"
          class="form-control"
          id="postCommentUserEmail"
          placeholder="name@example.com"
        />
      </div>
      <div class="col-md-6 mb-3">
        <input
          type="text"
          v-model="nameVal"
          class="form-control"
          id="postCommentUserName"
          placeholder="Your name"
        />
      </div>
    </div>
    <!-- text field for user email -->
    <button
      :disabled="!isBtnActive || isSubmiting"
      @click="addCommentHandler"
      class="btn btn-primary"
    >
      Add comment<span v-if="isSubmiting">...</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCommetsStore } from "~~/store/comments";
import { IComment, ICommentNew } from "~~/types/comments";

const isEmailAndNameVisible = ref(false);
const { addComment } = useCommetsStore();
const props = defineProps<{ postId: string | undefined }>();

const commentVal = ref("");
const emailVal = ref("");
const nameVal = ref("");
const isSubmiting = ref(false);

function handleFocusCommentField(): void {
  // console.log('focus')
  isEmailAndNameVisible.value = true;
}

const isBtnActive = computed(() => {
  return !!commentVal.value && !!emailVal.value && !!nameVal.value; // all to be true
});

async function addCommentHandler() {
  if (props.postId) {
    isSubmiting.value = true;
    const comment: ICommentNew = {
      email: emailVal.value,
      name: nameVal.value,
      postId: props.postId,
      createdAt: new Date(),
      text: commentVal.value,
      publish: false,
    };
    await addComment(comment);
    commentVal.value = "";
    emailVal.value = "";
    nameVal.value = "";
  } else {
    throw new Error("Comment adding failed");
  }
  isSubmiting.value = false;
}
</script>
