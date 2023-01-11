import { defineStore } from "pinia";

export const useTestFetch = defineStore("testFetch", {
  state: () => {
    return {
      user: null as any | null,
    };
  },
  getters: {
    getName(state) {
      return state.user?.name;
    },
  },
  actions: {
    async fetchSwapiApi(id: string) {
      try {
        const res = await fetch(`https://swapi.dev/api/people/${id}/`);
        this.user = await res.json();
        return await res.json()
      } catch (error) {
        console.log(error);
      }
    },
  },
});
