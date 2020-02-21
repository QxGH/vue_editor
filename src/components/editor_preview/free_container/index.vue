<template>
  <vdr class="free-container" :w="parentWidth" :h="parentHeight" :draggable="false" :handles="['bm']" @resizing="parentResize">
    <div style="width: 100%;height: 100%;">
      <draggable
        class="free-preview-list"
        :list="containerListClone"
        data-name="freePreviewDrag"
        :data-index="itemIndex"
        group="free"
        element="div"
        @change="log"
        :disabled="dragDisabled"
      >
        <template v-for="(item, index) in containerList">
          <vdr
            :is-conflict-check="true"
            :w="item.setting.width"
            :h="item.setting.height"
            :x="item.setting.x"
            :y="item.setting.y"
            :z="item.setting.z"
            :key="index"
            @dragging="onDrag(index, arguments)"
            @resizing="onResize(index, arguments)"
            @activated="onActivated"
            @deactivated="onDeactivated"
            :parent="true"
            :snap="true"
            :snapTolerance="10"
            @refLineParams="getRefLineParams"
            :isConflictCheck="false"
          >
            <div class="component-wrap" @mouseover="mouseOverHandle" @mouseout="mouseOutHandle">
              <component :is="item.previewComponent" :setting="item.setting"></component>
            </div>
          </vdr>
        </template>
        <!-- 辅助线 start -->
        <template>
          <span
            class="ref-line v-line"
            v-for="(item, index) in vLine"
            v-show="item.display"
            :style="{ left: item.position, top: item.origin, height: item.lineLength}"
            :key="'v-line'+index"
          ></span>
          <span
            class="ref-line h-line"
            v-for="(item, index) in hLine"
            v-show="item.display"
            :style="{ top: item.position, left: item.origin, width: item.lineLength}"
            :key="'h-line'+index"
          ></span>
          <!-- 辅助线 end -->
        </template>
      </draggable>
    </div>

    <!-- 
    <vdr @activated="onActivated" :parent="true" @deactivated="onDeactivated">
      <div style="width: 100%; height: 100%"  @mouseover="mouseOverHandle" @mouseout="mouseOutHandle">
        <p>你可以拖着我，按照自己的意愿调整大小。</p>
      </div>
    </vdr>-->
  </vdr>
</template>

<script>
import draggable from "vuedraggable";
import vdr from "vue-draggable-resizable-gorkys";

import { mapState, mapMutations } from "vuex";

import FreeImage from "../../../components/editor_preview/free_image";

export default {
  name: "freeContainer",
  components: {
    draggable,
    vdr,
    FreeImage
  },
  computed: {
    ...mapState(["editorList", "editorIndex"])
  },
  props: ["itemIndex",'setting'],
  watch: {
    'setting.children': {
      immediate: true,    // 这句重要
      handler (val) {
        this.containerList = this.deepClone(val);
      }
    }
  },
  data() {
    return {
      parentWidth: 375,
      parentHeight: 300,
      windowResizeLater: null,  // 自由容器大小变化定时器
      containerList: [],
      containerListClone: [],
      submitLater: null,
      dragDisabled: false,
      vLine: [],
      hLine: []
    };
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST"]),
    log(evt) {
      console.log("free-container change log");
      // console.log(this.editorList[this.itemIndex].setting.children);
      console.log(evt)
      // console.log(this.editorList)
      // console.log(this.editorList[this.itemIndex].setting.children)
      // console.log(this.containerList)
      // let children = this.editorList
      // console.log(children)
      // debugger
      // let obj = evt.added.element;
      // this.containerList.push(obj)
      // console.log(this.setting)
      // debugger
      // this.containerList = this.deepClone(this.editorList[this.itemIndex].setting.children);

      // console.log(this.containerList)
      // console.log(this.editorList[this.itemIndex].setting.children)
      // debugger
    },
    parentResize(x, y, w, h) {
      if(this.windowResizeLater) {
        clearTimeout(this.windowResizeLater);
        this.windowResizeLater = null;
      };
      this.parentHeight = h;
      this.windowResizeLater = setTimeout(() => {
        let resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);
        console.log(h)
        console.log(this.parentHeight);
        clearTimeout(this.windowResizeLater);
        this.windowResizeLater = null;
      }, 300);
    },
    onResize(index, [x, y, width, height]) {
      console.log("onResize");
      this.containerList[index].setting.x = x;
      this.containerList[index].setting.y = y;
      this.containerList[index].setting.width = width;
      this.containerList[index].setting.height = height;
      // this.submit()
    },
    onDrag(index, [x, y]) {
      this.containerList[index].setting.x = x;
      this.containerList[index].setting.y = y;
      console.log("onDrag");
      console.log(this.containerList)
      console.log(this.editorList[this.itemIndex].setting.children);
      this.submit()
    },
    submit() {
      if (this.submitLater) {
        clearTimeout(this.submitLater);
        this.submitLater = null;
      };
      this.submitLater = setTimeout(() => {
        let editorList = this.editorList;
        console.log(editorList[this.itemIndex].setting.children)
        console.log(this.containerList)
        editorList[this.itemIndex].setting.children = this.containerList;
        this.CHANGE_EDITOR_LIST(editorList);
        this.$emit("refreshState", "");
        clearTimeout(this.submitLater);
        this.submitLater = null;
      }, 300);
    },
    onActivated() {
      // this.active = true
      this.$emit("dragDisabledHandle", true);
      this.dragDisabled = true;
    },
    onDeactivated() {
      // this.active = false
      this.$emit("dragDisabledHandle", false);
      this.dragDisabled = false;
    },
    mouseOverHandle() {
      this.$emit("dragDisabledHandle", true);
      this.dragDisabled = true;
    },
    mouseOutHandle() {
      this.$emit("dragDisabledHandle", false);
      this.dragDisabled = false;
    },
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      // console.log(params);
      this.vLine = vLine;
      this.hLine = hLine;
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
  },
  beforeDestroy() {
    if (this.submitLater) {
      clearTimeout(this.submitLater);
      this.submitLater = null;
    };
    if(this.windowResizeLater) {
      clearTimeout(this.windowResizeLater);
      this.windowResizeLater = null;
    };
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>