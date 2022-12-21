import { defineStore } from "pinia";
import { IComment } from "~~/types/comments";

export const useCommetsStroe = defineStore("commets", {
  state: () => {
    return {
      comments: [] as IComment[] | [],
    };
  },
  getters: {
    getCommentsByPostId: (state) => (id: string | null) => {
      if (id) {
        return state.comments.filter((el) => el.postId === id && el.publish);
      }
      return [];
    },
  },
  actions: {
    async fetchComments() {
      try {
        const res: any = await $fetch(
          "https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json"
        );
        this.comments = Object.values(res) || [];
      } catch (error) {
        console.log(error);
      }
    },
    async addComment(comment: IComment) {
      try {
        const res: any = await $fetch(
          "https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json",
          {
            method: "post",
            body: comment,
          }
        );
        console.log("addComment", res);
        if (res) {
          const data: IComment = { ...comment, id: res.name };
          this.comments = [...this.comments, data];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
