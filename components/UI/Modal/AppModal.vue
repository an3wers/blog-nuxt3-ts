<template>
  <div class="app-modal">
    <div class="app-modal__dialog">
      <div class="app-modal__container modal-container modal-container_md">
        <div class="modal-container__header">
          <h4>{{title}}</h4>
          <button
            class="btn-close"
            @click="closeHandler"
            type="button"
            aria-label="close"
          ></button>
        </div>
        <div class="modal-container__body">
          <slot />
        </div>
      </div>
    </div>
    <div class="app-modal__overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

defineProps({
  title: { type: String, default: 'Modal title'},
});

const emits = defineEmits(["onClose"]);

function escHandler(e: KeyboardEvent) {
  if (e.code === "Escape") {
    emits("onClose");
  }
  window.removeEventListener("keydown", escHandler);
}

onMounted(() => {
  window.addEventListener("keydown", escHandler);
  document.body.classList.add("overlay");
});

onUnmounted(() => {
  document.body.classList.remove("overlay");
});

function closeHandler(){
  emits("onClose");
}

</script>
