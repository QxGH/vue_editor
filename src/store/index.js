import Vue from 'vue'
import Vuex from 'vuex'
import { diff } from "json-diff";
import uuidV4 from 'uuid/v4'
import deepClone from '@/tools/deepClone'
import { isUndefined, isNull } from '@/tools/typeof'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorList: [],
    editorIndex: '',
    editorNav: [],
    editorCurrentPage: {
      type: '',
      parent: '',
      children: '',
      setting: {
        name: '',
        headerBg: ''
      }
    },
    editorPageData: []
  },
  mutations: {
    CHANGE_EDITOR_LIST(state, newVal) {
      state.editorList = newVal
      // let val = deepClone(newVal);
      // // 判断是否有值
      // if(!isUndefined(val) && !isNull(val)) {
      //   // 判断是否是空数组
      //   if(Array.isArray(val) && val.length == 0) {
      //     state.editorList = val
      //   } else {
      //     // 不是空数组 对比数据
      //     let diffRes = diff(state.editorList, val)
      //     console.log('CHANGE_EDITOR_LIST')
      //     // console.log(diffRes)
      //     // console.log(state.editorList)
      //     // console.log(val)
      //     // console.log('CHANGE_EDITOR_LIST /')
      //     if(diffRes) {
      //       // 赋值改变了的数据
      //       for(let [index, item] of diffRes.entries()) {
      //         if(item.length > 1 && val[index]) {
      //           state.editorList[index] = val[index]
      //         }
      //       };
      //     };
      //   }
      // }
    },
    CHANGE_NAVBAR_LIST(state, val) {
      state.editorNav = val;
    },
    CHANGE_EDITOR_INDEX(state, val) {
      state.editorIndex = val;
    },
    CHANGE_EDITOR_PAGE_DATA(state, val) {
      state.editorPageData = val
      // let diffRes = diff(state.editorPageData, val);
      // if (diffRes && val) {
      //   for (let [index, item] of diffRes.entries()) {
      //     if (item.length > 1 && val[index]) {
      //       state.editorPageData[index] = val[index]
      //     }
      //   };
      // };
    },
    CHANGE_EDITOR_CURRENT_PAGE(state, val) {
      state.editorCurrentPage = val;
    },
  },
  actions: {},
  modules: {}
})
