import Vue from 'vue'
import Vuex from 'vuex'
import { diff } from "json-diff";
import uuidV4 from 'uuid/v4'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorList: [],
    editorIndex: '',
    editorNav: [],
    editorPageID: {
      parent: 'index',
      children: ''
    },
    editorPageData: [
      {
        id: 'index',
        name: '首页',
        children: [
          {
            id: uuidV4(),
            name: '关于我们',
            data: [{"id":"bf9812e9-eb66-44ea-849b-f8335ec76a3b","label":"carousel","name":"走马灯","icon":"icon-carousel","type":"normal","previewComponent":"Carousel","settingComponent":"CarouselSetting","version":1,"setting":{"height":"200","list":[{"imageID":"default","imageUrl":"https://qxtodo.com/editor/animation_wallpaper.jpg"}]}}]
          }, {
            id: uuidV4(),
            name: '商品',
            data: [{"id":"d0c2d643-6b73-4fcf-8cc5-7b7e4ce5abdd","label":"goodsList","name":"商品列表","icon":"icon-goods","type":"normal","previewComponent":"GoodsList","settingComponent":"GoodsListSetting","version":1,"setting":{"style":"default","chooseMode":"auto","group":[],"sort":"createTime","numberType":"all","number":1,"autoList":[{"id":"default-c5d64f41-bfe1-47ab-8a1b-94622f4b4c4c","picture":"https://qxtodo.com/editor/animation_wallpaper.jpg","name":"商品名称","price":8.88,"type":"商品类型"}],"handList":[{"id":"default-d8c6514b-b601-43da-ad07-82e065ced4fc","picture":"https://qxtodo.com/editor/animation_wallpaper.jpg","name":"商品名称","price":8.88,"type":"商品类型"}]}}]
          }
        ]
      }, {
        id: uuidV4(),
        name: '简介',
        children: [
          {
            id: uuidV4(),
            name: '新建页面',
            data: [{"id":"06a659d3-537a-48c8-ac3c-bdf7cd314b49","label":"divider","name":"分割线","icon":"icon-divider","type":"normal","previewComponent":"Divider","settingComponent":"DividerSetting","version":1,"setting":{"color":"#333","size":"1"}}]
          }
        ]
      }, {
        id: uuidV4(),
        name: '新建页面',
        children: []
      }
    ]
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
    },
    CHANGE_EDITOR_PAGE_DATA(state, val) {
      let diffRes = diff(state.editorList, val);
      if(diffRes && val) {
        for(let [index, item] of diffRes.entries()) {
          if(item.length > 1 && val[index]) {
            state.editorPageData[index] = val[index]
          }
        };
      };
    },
    CHANGE_EDITOR_PAGE_ID(state, val) {
      state.editorPageID = val;
    },
  },
  actions: {},
  modules: {}
})
