import {defineStore} from 'pinia';

export const userStore = defineStore('user', {
  state: () => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
  },

  actions: {
    login(user, token) {
      this.user = user;
      this.user.token = token;
      localStorage.setItem("user",JSON.stringify(this.user));
    },
    logout(){
      this.user= null;
      localStorage.removeItem("user");
      this.router.go();
    }
  }
})
