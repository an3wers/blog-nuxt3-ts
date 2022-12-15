import { defineStore } from "pinia";
import type { IPost, IPostAdd, IPostUpdate } from "~~/types/posts";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("posts", {
  state: () => {
    return {
      posts: [] as IPost[],
      isSubmitPost: false,
      isSubmitingError: null as string | null,
    };
  },
  getters: {
    getPostById: (state) => (postId: string | string[]) => {
      return state.posts.find((el) => el.id === postId);
    },
  },
  actions: {
    async fetchPosts() {
      const tmpArr = [];
      try {
        const res: any = await $fetch(
          "https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
          {
            method: "get",
          }
        );
        if (res) {
          for (let key in res) {
            tmpArr.push({ ...res[key] });
          }
        }
        this.posts = tmpArr;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async addPost(post: IPostAdd) {
      const authStore = useAuthStore();
      try {
        this.isSubmitPost = true;
        this.isSubmitingError = null;
        const res: any = await $fetch(
          `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?auth=${authStore.user?.token}`,
          {
            method: "post",
            body: post,
          }
        );
        // add post id to firebase
        await this.setId({ ...post, id: res.name });
        
        this.posts.push({ ...post, id: res.name });
      } catch (error: any) {
        console.log(error.message);
        this.isSubmitingError = error.message;
      } finally {
        this.isSubmitPost = false;
      }
    },
    async setId(post: IPost) {
      const authStore = useAuthStore();
      try {
        await $fetch(
          `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${post.id}.json?auth=${authStore.user?.token}`,
          {
            method: "put",
            body: post,
          }
        );
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async editPost(post: IPostUpdate) {
      const authStore = useAuthStore();
      try {
        this.isSubmitPost = true;
        this.isSubmitingError = null;
        const res: any = await $fetch(
          `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${post.id}.json?auth=${authStore.user?.token}`,
          {
            method: "put",
            body: post,
          }
        );
        this.posts = this.posts.map((el) => {
          return el.id === res.id ? { ...res } : el;
        });
      } catch (error: any) {
        console.log(error.message);
        this.isSubmitingError = error.message;
      } finally {
        this.isSubmitPost = false;
      }
    },
    async deletePost(post: IPost) {
      const authStore = useAuthStore();
      try {
        const res: any = await $fetch(
          `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${post.id}.json?auth=${authStore.user?.token}`,
          {
            method: "delete",
          }
        );
        this.posts = this.posts.filter((el) => el.id !== post.id);
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
});
