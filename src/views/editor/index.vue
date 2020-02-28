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
            @change="componentsLog"
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
          <div class="preview" :style="{height: showNavbarDragBox || navbarList.length>0 ? '667px' : '617px'}">
            <div class="preview-main">
              <div class="components-handle" v-show="componentsHandle.show" :style="{'top': componentsHandle.top+'px'}">
                <span class="hendle-item" @click="componentsDel">
                  <i class="el-icon-close"></i>
                </span>
                <span class="hendle-item" v-show="componentsHandle.upShow" @click="componentsToUp">
                  <i class="el-icon-upload2"></i>
                </span>
                <span class="hendle-item" v-show="componentsHandle.downShow" @click="componentsToDown">
                  <i class="el-icon-download"></i>
                </span>
              </div>
              <vuescroll ref="scroll" :ops="vueScrollOps" @handle-scroll="handleScroll">
                <draggable
                  class="preview-list"
                  :list="previewList"
                  data-name="previewList"
                  group="normal"
                  element="div"
                  @change="previewLog"
                  dragClass="draggable"
                  :disabled="dragDisabled"
                >
                  <template v-for="(item, index) in previewList">
                    <div
                      class="preview-list-box"
                      :id="'previewListBox-'+index"
                      :class="{'isSelect': index === editorIndex}"
                      :key="item.id"
                      @click="clickComponent(item, index)"
                      v-if="item.type != 'free'"
                    >
                      <component :is="item.previewComponent" :setting="item.setting" :freeGroup="freeGroup" :itemIndex="index" @freeComponentClick="freeComponentClick" @dragDisabledHandle="dragDisabledHandle"></component>
                    </div>
                  </template>
                </draggable>
              </vuescroll>
            </div>
            <div class="preview-navbar" v-if="showNavbarDragBox">
              <draggable
                class="preview-navbar-graggable"
                :list="navbarList"
                data-name="navbarList"
                group="navbar"
                element="div"
                @change="navbarLog"
                dragClass="draggable"
                :disabled="dragDisabled"
              >
                <template v-for="(item, index) in navbarList">
                  <div
                    class="navbar-list-box"
                    :id="'navbarListBox-'+index"
                    :class="{'isSelect': selectNavbar}"
                    :key="item.id"
                    @click="clickNavbar(item, index)"
                  >
                    <component :is="item.previewComponent" :setting="item.setting" @dragDisabledHandle="dragDisabledHandle"></component>
                  </div>
                </template>
                <template v-if="navbarList.length <= 0">
                  <div class="navbar-drag-tips" >
                    请将底部导航拖动到此处
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </el-main>
        <el-aside width="350px" class="right-aside">
          <template v-if="settingComponent && previewIndex !== ''">
            <component
              :is="settingComponent"
              @refreshState="refreshVuexState"
              :setting="previewList[previewIndex].label != 'freeContainer' ? previewList[previewIndex].setting : previewList[previewIndex].setting.children[settingFreeComponentIndex].setting"
              :settingFreeComponentIndex="settingFreeComponentIndex"
            ></component>
          </template>
          <template  v-if="settingComponent && selectNavbar">
            <component
              :is="settingComponent"
              @refreshState="refreshVuexState"
              :setting="navbarList[0].setting"
            ></component>
          </template>
        </el-aside>
      </el-container>
    </el-container>
    <!-- JSON 弹窗 -->
    <template>
      <el-dialog
        title="JSON数据"
        :visible.sync="JsonDialog"
        width="900px">
        <div style="text-align: left; line-height: 24px;">
          <el-divider>View Data</el-divider>
          <pre style="white-space: pre-line;"><code>{{JSON.stringify(editorList)}}</code></pre>
          <el-divider>Navbar Data</el-divider>
          <pre style="white-space: pre-line;"><code>{{JSON.stringify(editorNav)}}</code></pre>
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
import vuescroll from 'vuescroll';

import Carousel from "../../components/editor_preview/carousel";
import CarouselSetting from "../../components/editor_settings/carousel";
import Divider from "../../components/editor_preview/divider";
import DividerSetting from "../../components/editor_settings/divider";
import FreeContainer from "../../components/editor_preview/free_container";
import FreeTextSetting from "../../components/editor_settings/free_text";
import Navbar from "../../components/editor_preview/navbar";
import NavbarSetting from "../../components/editor_settings/navbar";




import componentsListConfig from "./componentsList";
let idGlobal = 8;
export default {
  name: "editor",
  data() {
    return {
      componentsList: [],
      previewList: [],
      previewLogData: {}, // preview 拖动log数据
      previewIndex: '',
      navbarList: [],
      selectNavbar: false,  // 是否选中底部导航
      settingComponent: "", // 当前应该显示的设置组件
      settingFreeComponentIndex: "", // 当前应该显示的自由容器设置组件的下标
      JsonDialog: false, // JSON 查看弹窗
      listGroupOption: { name: 'normal', pull: 'clone', put: false },
      dragDisabled: false,
      vueScrollOps: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          background: '#000000',
          opacity: '0.2'
        }
      },
      componentsHandle: {
        top: 0,
        show: false,
        upShow: true,
        downShow: true
      },
      freeGroup: 'free',  // 自由容器 拖动插件组
      showNavbarDragBox: false, // 是否显示底部导航栏区域
    };
  },
  computed: {
    ...mapState(["editorList", "editorIndex", "editorNav"]),
    getStoreItem() {
      return this.$store.state.editorList;
    }
  },
  created() {
    this.componentsList = this.deepClone(componentsListConfig);
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
    FreeContainer,
    FreeTextSetting,
    Navbar,
    NavbarSetting,
    vuescroll
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST", "CHANGE_EDITOR_INDEX", "CHANGE_NAVBAR_LIST"]),
    // changeEditorList(val){
    //   this.CHANGE_EDITOR_LIST(val)
    // },
    componentsDel(){
      // 组件删除
      let editorList = this.deepClone(this.editorList);
      let editorIndex = this.deepClone(this.editorIndex);
      editorList.splice(editorIndex, 1);
      this.previewIndex = '';
      this.CHANGE_EDITOR_INDEX('');
      this.CHANGE_EDITOR_LIST(editorList);
      this.previewList = editorList;
      this.$message.success("删除成功")
    },
    componentsToUp(){
      // 组件排序向上
      let editorList = this.deepClone(this.editorList);
      let editorIndex = this.deepClone(this.editorIndex);
      const temp = editorList[editorIndex];
      editorList[editorIndex] = editorList[editorIndex-1];
      editorList[editorIndex-1] = temp;
      this.previewList = editorList;
      this.CHANGE_EDITOR_LIST(editorList);
    },
    componentsToDown(){
      // 组件排序向下
      let editorList = this.deepClone(this.editorList);
      let editorIndex = this.deepClone(this.editorIndex);
      const temp = editorList[editorIndex];
      editorList[editorIndex] = editorList[editorIndex+1];
      editorList[editorIndex+1] = temp;
      this.previewList = editorList;
      this.CHANGE_EDITOR_LIST(editorList);
    },
    handleScroll(vertical, horizontal, nativeEvent){
      // scroll 滚动事件
      console.log(vertical, horizontal, nativeEvent)
      this.componentsHandle.show = false
    },
    refreshVuexState() {
      this.previewList = this.editorList;
      this.previewIndex = this.editorIndex
      console.log(this.previewList);
    },
    clickComponent(item, index) {
      // 点击组件
      this.selectNavbar = false;  // 点击普通组件 取消navbar选中

      this.CHANGE_EDITOR_INDEX(index);
      this.previewIndex = index;

      if(item.label !== 'freeContainer') {
        this.settingComponent = item.settingComponent;
      };
      // 显示 handle
      let id = `previewListBox-${index}`;
      // console.log(document.getElementById(id).offsetTop)
      // console.log(this.$refs['scroll'].scrollPanelElm.scrollTop)
      let scrollTop =  this.$refs['scroll'].scrollPanelElm ? this.$refs['scroll'].scrollPanelElm.scrollTop : 0;
      let top = document.getElementById(id).offsetTop - scrollTop;

      this.componentsHandle.top = top > 539 ? 539 : top;
      this.componentsHandle.show = true;
      this.componentsHandle.upShow = true;
      this.componentsHandle.downShow = true;
      if(index == 0) {
        this.componentsHandle.upShow = false;
      };
      if(index == this.editorList.length-1) {
        this.componentsHandle.downShow = false;
      };
    },
    clickNavbar(item, index){
      this.settingComponent = item.settingComponent;
      this.CHANGE_EDITOR_INDEX('');
      this.previewIndex = '';
      this.selectNavbar = true;
    },
    componentsLog(evt) {
      // console.log(evt);
      // console.log(this.componentsList)
      // console.log(this.previewList)
    },
    previewLog(evt){
      this.previewLogData = evt.added
      this.CHANGE_EDITOR_LIST(this.previewList);
    },
    navbarLog(evt){
      this.CHANGE_NAVBAR_LIST(this.navbarList)
    },
    startHandle(val){
      // console.log('startHandle val')
      // console.log(val.item.dataset.type)
      if(val.item.dataset.type == 'free') {
        // this.listGroupOption.name = 'free'
        this.freeGroup = 'normal'
        this.fillContainer()
      };
      if(val.item.dataset.type == 'navbar') {
        if(this.navbarList.length > 0 ) {
          this.listGroupOption.name = "other"
        } else {
          this.showNavbarDragBox = true;
          this.listGroupOption.name = 'navbar'
        };
      };
    },
    endHandle(val){
      let editorList = this.deepClone(this.editorList);
      let editorIndex = Number(val.to.dataset.index);
      console.log('endHandle')
      console.log(val)
      // console.log(this.editorList)
      // console.log(this.previewLogData)
      // console.log(this.previewList)

      // 清除填充组件
      if(val.item.dataset.type == 'free') {
        for(let item of editorList) {
          if(item.label == 'freeContainer') {
            item.setting.children.splice(0,1);
          };
        } 
      };

      // 放置容器
      if(val.to.dataset.name === 'previewList') {
        if(this.previewLogData.element.type === 'free') {
          // newIndex
          editorList.splice(editorList.length-1, 1);
          let obj = {
            id: uuidV4(),
            label: 'freeContainer',
            name: '自由容器',
            type: 'freeContainer',
            icon: 'icon-container',
            previewComponent: 'FreeContainer',
            settingComponent: '',
            setting: {
              height: '300',
              children: []
            }
          };
          // let componentsList = this.deepClone(componentsListConfig);
          // for(let item of componentsList) {
          //   if(item.label == this.previewLogData.element.label) {
          //     let children = item;
          //     children.id = uuidV4();
          //     obj.setting.children = children;
          //     break;
          //   }
          // };
          if(this.previewLogData.element.label === 'freeImage') {
            obj.setting.children = [{
              id: uuidV4(),
              label: 'freeImage',
              name: '图片',
              type: 'free',
              icon: 'icon-image',
              previewComponent: 'FreeImage',
              settingComponent: '',
              setting: {
                imageUrl: 'https://qxtodo.com/editor/animation_wallpaper.jpg',
                width: 100,
                height: 100,
                x: 0,
                y: 0,
                z: 1
              }
            }]
          } else if (this.previewLogData.element.label === 'freeText') {
            obj.setting.children = [{
              id: uuidV4(),
              label: 'freeText',
              name: '文本',
              type: 'free',
              icon: 'icon-text',
              previewComponent: 'FreeText',
              settingComponent: 'FreeTextSetting',
              setting: {
                text: '文本内容',
                color: '#333333',
                size: '14',
                width: 100,
                height: 100,
                x: 0,
                y: 0,
                z: 1
              }
            }]
          }
          editorList.push(obj);
          this.previewList = editorList;
          this.$nextTick(function(){
            this.clickComponent(this.editorList[val.newIndex], val.newIndex)
          });
        } else {
          // 默认选中
          this.clickComponent(this.editorList[val.newIndex], val.newIndex)
        }
      } else if(val.to.dataset.name === 'freePreviewDrag') {
        let setting = editorList[editorIndex].setting;
        let label = val.item.dataset.label;
        for(let item of this.componentsList) {
          if(label == item.label) {
            let obj = {
              ...item,
              id: uuidV4()
            };
            obj.setting.z = setting.children.length+1;
            setting.children.push(obj);
            break;
          }
        };
      }
      // this.listGroupOption.name = 'normal'
      this.freeGroup = 'free'
      this.listGroupOption.name = 'normal'
      if(this.navbarList.length <= 0) {
        this.showNavbarDragBox = false
      };
      this.previewList = editorList;
      this.CHANGE_EDITOR_LIST(editorList)

    },
    cloneHandle(obj) {
      console.log("clone obj");
      console.log(obj)

      // 如果已经有了 navbar 则return
      if(obj.type == 'navbar' && this.navbarList.length > 0 ) {
        return;
      };

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
      // 自由组件拖动时  禁止其他拖动操作
      this.dragDisabled = val
      // console.log(`disabled ${val}`)
    },
    freeComponentClick(val){
      // 自由组件被点击时
      let editorList = this.deepClone(this.editorList);
      let editorIndex = this.editorIndex;
      this.settingFreeComponentIndex = val;
      this.settingComponent = editorList[editorIndex].setting.children[val].settingComponent;
    },
    fillContainer(){
      // 优化自由组件放置
      let freeFill = {
        id: uuidV4(),
        label: 'freeFill',
        name: '填充',
        type: 'free',
        icon: '',
        previewComponent: 'FreeFill',
        settingComponent: '',
        setting: {
          width: 375,
          height: 300,
          x: 0,
          y: 0,
          z: 0
        }
      };
      let editorList = this.deepClone(this.editorList);
      if(editorList.length > 0) {
        editorList.map((item, index) => {
          if(item.type == 'freeContainer') {
            console.log(item, index)
            freeFill.setting.height = Number(item.setting.height)
            item.setting.children.unshift(freeFill);
          };
        })
        this.CHANGE_EDITOR_LIST(editorList);
        this.previewList = editorList;
      };
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