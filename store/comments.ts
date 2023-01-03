import { defineStore } from "pinia";
import { IComment, ICommentNew, ICommentUpdate } from "~~/types/comments";
import { useAuthStore } from "./auth";

export const useCommetsStore = defineStore("commets", {
  state: () => {
    return {
      comments: [] as IComment[] | [],
      isLoading: false,
    };
  },
  getters: {
    getCommentsByPostId: (state) => (id: string) => {
      return state.comments
        .filter((el) => el.postId === id && el.publish)
    },
  },
  actions: {
    async fetchComments() {
      try {
        this.isLoading = true;
        const res: any = await $fetch(
          "https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json"
        );
        const tmpArr: IComment[] = [];
        if (res) {
          const keys = Object.keys(res);
          keys.forEach((key) => {
            tmpArr.push({ ...res[key], id: key });
          });
        }
        this.comments = tmpArr;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async addComment(comment: ICommentNew) {
      try {
        const res: any = await $fetch(
          "https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json",
          {
            method: "post",
            body: comment,
          }
        );
        // console.log("addComment", res);
        if (res) {
          const data: IComment = { ...comment, id: res.name };
          this.comments = [...this.comments, data];
        }
      } catch (error) {
        console.log(error);
      }
    },
    // TODO: Фикс бага с обновлением комментария
    async updateComment(item: ICommentUpdate) {
      const authStore = useAuthStore();
      const { id, ...data } = item;
      // console.log('id', id)
      // console.log('data', data)
      try {
        await $fetch(
          `https://blog-nuxtjs-c3952-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${id}.json?auth=${authStore.user?.token}`,
          {
            method: "put",
            body: data,
          }
        );
        const comment = this.comments.find((el) => el.id === item.id);
        if (comment) {
          comment.publish = item.publish;
        }
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
});
