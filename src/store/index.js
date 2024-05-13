import Vue from 'vue'
import Vuex from 'vuex'
import Users from "@/store/modules/users";
import Errors from "@/store/modules/errors";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users: Users,
    errors: Errors
  }
})
