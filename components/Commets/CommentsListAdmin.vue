<template>
  <div>
    <div v-if="isLoading">
      <PageLoader />
    </div>
    <ul v-else class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
        v-for="item in comments"
        key="item.id"
      >
        <div>
          <div class="small text-secondary" v-if="item.createdAt">
            {{ useDateToLocalString(item.createdAt) }}
          </div>
          <div class="small">{{ item.name }}, {{ item.email }}</div>
          <div class="mt-1">
            {{ item.text }}
          </div>
        </div>
        <div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :id="`switchComment-${item.id}`"
              :checked="item.publish"
              @change="publishHandler($event, item)"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCommetsStore } from "~~/store/comments";
import { storeToRefs } from "pinia";
import { IComment } from "~~/types/comments";
import PageLoader from "~~/components/UI/Loader/PageLoader.vue";

const commentsStore = useCommetsStore();
const { comments, isLoading } = storeToRefs(commentsStore);
const { fetchComments, updateComment } = useCommetsStore();

fetchComments();

async function publishHandler(event: Event, item: IComment) {
  const switchValue = (event.target as HTMLInputElement).checked;
  // console.log((event.target as HTMLInputElement).checked)
  item = { ...item, publish: switchValue };
  await updateComment(item);
}
</script>
