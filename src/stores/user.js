import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null
  },

  actions: {
    setUser (user) {
      this.user=user;
    },
  }
})
