<template>
  <div class="editor">
    <el-container>
      <el-header class="clearfix">
        <div class="json-btn-box">
          <el-button type="primary" @click="JsonDialog = true">JSON数据</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="350px" class="left-aside">
          <draggable
            element="div"
            class="component-list clearfix"
            :list="componentsList"
            :group="listGroupOption"
            :clone="cloneHandle"
            :sort="false"
            @start="startHandle"
            @end="endHandle"
            @change="log"
            :disabled="dragDisabled"
          >
            <template v-for="item in componentsList" >
              <div class="component-list-box" :key="item.id" :data-type="item.type" :data-label="item.label">
                <div class="component-item">
                  <div class="icon-box">
                    <i class="iconfont" :class="item.icon"></i>
                  </div>
                  <div class="component-name">{{item.name}}</div>
                </div>
              </div>
            </template>
          </draggable>
        </el-aside>
        <el-main>
          <div class="preview">
            <div class="preview-main">
              <draggable
                class="preview-list"
                :list="previewList"
                data-name="previewList"
                group="normal"
                element="div"
                @change="log"
                dragClass="draggable"
                :disabled="dragDisabled"
              >
                <template v-for="(item, index) in previewList">
                  <div
                    class="preview-list-box"
                    :class="{'isSelect': index === editorIndex}"
                    :key="item.id"
                    @click="clickComponent(item, index)"
                  >
                    <component :is="item.previewComponent" :setting="item.setting" :itemIndex="index" @dragDisabledHandle="dragDisabledHandle"></component>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </el-main>
        <el-aside width="350px" class="right-aside">
          <template v-if="settingComponent">
            <component
              :is="settingComponent"
              @refreshState="refreshVuexState"
              :setting="previewList[editorIndex].setting"
            ></component>
          </template>
        </el-aside>
      </el-container>
    </el-container>
    <!-- JSON 弹窗 -->
    <template>
      <el-dialog
        title="提示"
        :visible.sync="JsonDialog"
        width="900px">
        <div style="text-align: left; line-height: 24px;">
          <pre style="white-space: pre-line;"><code>{{JSON.stringify(editorList)}}</code></pre>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="JsonDialog = false">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- JSON 弹窗 -->
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import draggable from "vuedraggable";
import uuidV4 from "uuid/v4";

import Carousel from "../../components/editor_preview/carousel";
import CarouselSetting from "../../components/editor_settings/carousel";
import Divider from "../../components/editor_preview/divider";
import DividerSetting from "../../components/editor_settings/divider";
import FreeContainer from "../../components/editor_preview/free_container";

import componentsListConfig from "./componentsList";
let idGlobal = 8;
export default {
  name: "editor",
  data() {
    return {
      componentsList: [],
      previewList: [],
      settingComponent: "", // 当前应该显示的设置组件
      JsonDialog: false, // JSON 查看弹窗
      listGroupOption: { name: 'normal', pull: 'clone', put: false },
      dragDisabled: false
    };
  },
  computed: {
    ...mapState(["editorList", "editorIndex"]),
    getStoreItem() {
      return this.$store.state.editorList;
    }
  },
  created() {
    this.componentsList = this.deepClone(componentsListConfig);;
  },
  watch: {
    getStoreItem() {
      // console.log(this.$store.state.editorList,'asfas fas fas')
    }
  },
  components: {
    draggable,
    Carousel,
    CarouselSetting,
    Divider,
    DividerSetting,
    FreeContainer
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST", "CHANGE_EDITOR_INDEX"]),
    // changeEditorList(val){
    //   this.CHANGE_EDITOR_LIST(val)
    // },
    refreshVuexState() {
      this.previewList = this.editorList;
      console.log(this.previewList);
    },
    clickComponent(item, index) {
      this.CHANGE_EDITOR_INDEX(index);
      this.settingComponent = item.settingComponent;
    },
    log: function(evt) {
      // console.log(evt);
      // console.log(this.componentsList)
      // console.log(this.previewList)
      this.CHANGE_EDITOR_LIST(this.previewList);
    },
    startHandle(val){
      // console.log('startHandle val')
      // console.log(val.item.dataset.type)
      if(val.item.dataset.type == 'free') {
        this.listGroupOption.name = 'free'
      }
    },
    endHandle(val){
      console.log('endHandle')
      console.log(val)
      console.log(this.editorList)
      if(val.to.dataset.name === 'previewList') {
        this.CHANGE_EDITOR_INDEX(val.newIndex);
      } else if(val.to.dataset.name === 'freePreviewDrag') {
        let editorList = this.editorList;
        let editorIndex = Number(val.to.dataset.index);
        let setting = editorList[editorIndex].setting;
        let label = val.item.dataset.label;
        for(let item of this.componentsList) {
          if(label == item.label) {
            let obj = {
              ...item,
              id: uuidV4()
            };
            setting.children.push(obj);
            this.CHANGE_EDITOR_LIST(editorList)
            break;
          }
        };
      }
      this.listGroupOption.name = 'normal'
    },
    cloneHandle(obj) {
      console.log("clone obj");
      console.log(obj)
      // if(obj.type == 'free') {
      //   return false
      // }
      let setting = {};
      // console.log(componentsListConfig);
      // console.log(this.componentsList)
      for (let item of this.componentsList) {
        if (obj.label === item.label) {
          setting = this.deepClone(item.setting);
          break;
        }
      }
      // console.log(setting);
      let newObj = {
        ...obj,
        setting,
        id: uuidV4()
      };
      // console.log(newObj);
      return newObj;
    },
    dragDisabledHandle(val){
      this.dragDisabled = val
      // console.log(`disabled ${val}`)
    },
    deepClone(target) {
      // 定义一个变量
      let result;
      // 如果当前需要深拷贝的是一个对象的话
      if (typeof target === "object") {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
          result = []; // 将result赋值为一个数组，并且执行遍历
          for (let i in target) {
            // 递归克隆数组中的每一项
            result.push(this.deepClone(target[i]));
          }
          // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
          result = null;
          // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
          result = target;
        } else {
          // 否则是普通对象，直接for in循环，递归赋值对象的所有值
          result = {};
          for (let i in target) {
            result[i] = this.deepClone(target[i]);
          }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
      } else {
        result = target;
      }
      // 返回最终结果
      return result;
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>