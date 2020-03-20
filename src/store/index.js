import Vue from 'vue'
import Vuex from 'vuex'
import { diff } from "json-diff";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorList: [],
    editorIndex: '',
    editorNav: []
  },
  mutations: {
    CHANGE_EDITOR_LIST(state, val) {
      // state.editorList = val

      let diffRes = diff(state.editorList, val)
      console.log('CHANGE_EDITOR_LIST')
      console.log(val)
      if(diffRes && val) {
        for(let [index, item] of diffRes.entries()) {
          if(item.length > 1 && val[index]) {
            state.editorList[index] = val[index]
          }
        };
      };
    },
    CHANGE_NAVBAR_LIST(state, val) {
      state.editorNav = val;
    },
    CHANGE_EDITOR_INDEX(state, val) {
      state.editorIndex = val;
    }
  },
  actions: {},
  modules: {}
})
