import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorList: [],
    editorIndex: ''
  },
  mutations: {
    CHANGE_EDITOR_LIST(state, val) {
      state.editorList = val;
    },
    CHANGE_EDITOR_INDEX(state, val) {
      state.editorIndex = val;
    }
  },
  actions: {},
  modules: {}
})
