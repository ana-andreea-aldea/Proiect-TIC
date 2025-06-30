import { createStore } from "vuex";

export default createStore({
  state: {
    email: null,
    password: null,
    token: null,
  },
  getters: {
    email(state) {
      return state.email;
    },
    password(state) {
      return state.password;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return (
        state.token !== null || localStorage.getItem("token") !== null
      );
    },
  },
  mutations: {
    setUser(state, payload) {
      state.email = payload.email;
      state.password = payload.password;
      state.token = payload.token;
    },
  },
  actions: {
    login({ commit }, responseData) {
      localStorage.setItem("email", responseData.email);
      localStorage.setItem("password", responseData.password);
      localStorage.setItem("token", responseData.token);

      commit("setUser", {
        email: responseData.email,
        password: responseData.password,
        token: responseData.token
      });
    },
    logout({ commit }) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("token");

      commit("setUser", {
        email: null,
        password: null,
        token: null
      });
    },
  },
  modules: {},
});
