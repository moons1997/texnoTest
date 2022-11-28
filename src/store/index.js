import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      user: !!localStorage.getItem("user")
        ? localStorage.getItem("user")
        : null,
      error: false,
    };
  },
  getters: {},
  mutations: {
    login(state, object) {
      if (object.password == "123456" && object.login == "test") {
        localStorage.setItem("user", JSON.stringify(object));
        state.user = object;
      } else {
        state.error = true;
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  actions: {},
  modules: {},
});
