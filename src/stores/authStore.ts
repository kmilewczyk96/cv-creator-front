import { defineStore } from 'pinia';
import type IAuthStoreState from "@/interfaces/authStoreState.ts";

export const useAuthStore = defineStore('authStore', {
  state: (): IAuthStoreState => ({
    token: null,
  }),
  actions: {
    logout(): void {
      this.token = null;
    },
    setToken(newToken: string): void {
      this.token = newToken;
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token;
    }
  },
  persist: {
    storage: localStorage, // Yes, I know it is the default value.
  },
});
