import { defineStore } from "pinia";
import type { IUser, IUserSet } from "~~/types/user";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null as IUser | null,
      authError: false as boolean,
      isAuthModal: false as boolean,
    };
  },
  getters: {
    isAuth(state) {
      return !!state.user?.token;
    },
  },
  actions: {
    async login(authData: IUserSet) {
      // const config = useRuntimeConfig()
      // console.log(process.env.AUTH_KEY)
      // console.log(config.test)
      const key = "AIzaSyCcFderO-gm1_ki1Z1UhzpGfh0AXY9OKkw";
      try {
        // any??
        const res: any = await $fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
          {
            method: "post",
            body: {
              ...authData,
              returnSecureToken: true,
            },
          }
        );
        // console.log(res);
        const token = useCookie("token", { sameSite: "none", secure: true });
        if (res.localId) {
          this.user = { token: res.idToken };
          token.value = res.idToken;
          this.authError = false;
        } else {
          console.log("Error res", res);
        }
      } catch (error) {
        console.log(error);
        this.authError = true;
      }
    },
    logout() {
      this.user = null;
      const token = useCookie("token", { sameSite: "none", secure: true });
      if (token.value) {
        token.value = null;
      }
    },
    checkAuth(payload: string | undefined) {
      if (payload) {
        let token = "";
        const tmpToken = payload.split(";").map((el) => {
          return el.split("=");
        });
        
        tmpToken.forEach((el) => {
          if (el[0].trim() == "token") {
            token = el[1];
          }
        });

        this.user = { token: token };
      } else {
        // console.log(123)
        const token = useCookie("token", { sameSite: "none", secure: true });
        if (token.value) {
          this.user = { token: token.value };
        } else {
          this.user = null;
        }
      }
    },
  },
});
