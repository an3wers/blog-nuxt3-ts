<template>
    <div>
      <h3 class="mb-3 mt-5">Comments</h3>
      <!-- list -->
      <div v-for="item in comments" :key="item.id" class="mb-3 card">
        <div class="card-body">
          <h5 class="card-title">{{item.name}}</h5>
          <p class="card-text">
            {{item.text}}
          </p>
          <p class="card-text">
            <small class="text-muted">{{item.createdAt}}</small>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { IComment } from "~~/types/comments";
  
  interface CommentsProps {
    comments: IComment[] | [];
  }
  
  defineProps<CommentsProps>();
  </script>
  