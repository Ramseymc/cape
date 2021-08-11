import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    development: {
      id: 1,
      developmentName: "Endulini",
    },
    url: "http://localhost:3000",
  },

  mutations: {},
  actions: {},
  modules: {},
});
