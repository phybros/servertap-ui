import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoading: false,
    pageTitle: "",
  },
  mutations: {
    appLoading(state, loading) {
      state.appLoading = loading;
    },
    pageTitle(state, title) {
      state.pageTitle = title;
    },
  },
  actions: {},
  modules: {},
});
