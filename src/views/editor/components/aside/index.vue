<template>
  <el-aside width="350px" class="left-aside">
    <draggable
      element="div"
      class="component-list clearfix"
      :list="componentsList"
      :group="listGroupOption"
      :sort="false"
      :clone="cloneHandle"
      @start="startHandle"
      @end="endHandle"
      :disabled="dragDisabled_"
    >
      <template v-for="item in componentsList">
        <div
          class="component-list-box"
          :key="item.id"
          :data-type="item.type"
          :data-label="item.label"
        >
          <div class="component-item">
            <div class="icon-box">
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <div class="component-name">{{item.name}}</div>
          </div>
          <div class="drop-tips">
            <span class="tips-text">将组件放置到此处</span>
          </div>
        </div>
      </template>
    </draggable>
  </el-aside>
</template>

<script>
import uuidV4 from "uuid/v4";
import draggable from "vuedraggable";
import componentsListConfig from '../../componentsList'
import deepClone from '@/tools/deepClone'

export default {
  name: "Aside",
  data() {
    return {
      componentsList: [],
      dragDisabled_: false,
      listGroupOption: { name: "normal", pull: "clone", put: false },
    }
  },
  props: {
    dragDisabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dragDisabled: {
      immediate: true,
      deep: true,
      handler(val) {
        this.dragDisabled_ = val
      }
    }
  },
  components: {
    draggable
  },
  created() {
    this.componentsList = componentsListConfig;
  },
  methods: {
    cloneHandle(obj) {
      console.log("clone obj");
      console.log(obj);

      // 如果已经有了 navbar 则return
      if (obj.type == "navbar" && this.navbarList.length > 0) {
        return;
      }

      // if(obj.type == 'free') {
      //   return false
      // }
      let setting = {};
      // console.log(componentsListConfig);
      // console.log(this.componentsList)
      for (let item of this.componentsList) {
        if (obj.label === item.label) {
          setting = deepClone(item.setting);
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
    startHandle(val) {
      console.log("startHandle val");
      console.log(val);
      this.dragOffsetData = {
        x: val.originalEvent.offsetX,
        y: val.originalEvent.offsetY
      };
      // console.log(val.item.dataset.type)
      if (val.item.dataset.type == "free") {
        // this.listGroupOption.name = 'free'
        this.freeGroup = "normal";
        this.fillContainer();
      }
      if (val.item.dataset.type == "navbar") {
        if (this.navbarList.length > 0) {
          this.listGroupOption.name = "other";
        } else {
          this.showNavbarDragBox = true;
          this.listGroupOption.name = "navbar";
        }
      }
    },
    endHandle(val) {
      debugger
      let editorList = deepClone(this.editorList);
      let editorIndex = Number(val.to.dataset.index);
      console.log("endHandle");
      console.log(val);

      // console.log(this.editorList)
      console.log(this.previewLogData_)
      debugger
      // console.log(this.previewList)

      // 清除填充组件
      if (val.item.dataset.type == "free") {
        for (let item of editorList) {
          if (item.label == "freeContainer") {
            item.setting.children.splice(0, 1);
          }
        }
      }
      // 放置容器
      if (val.to.dataset.name === "previewList") {
        // 组件拖动到普通容器
        if (val.item.dataset.type === "free") {
          // 自由组件拖动到普通容器
          // newIndex
          editorList.splice(val.newIndex, 1);
          let obj = {
            id: uuidV4(),
            label: "freeContainer",
            name: "自由容器",
            type: "freeContainer",
            icon: "icon-container",
            previewComponent: "FreeContainer",
            settingComponent: "",
            setting: {
              height: "300",
              children: []
            }
          };


          let componentsList = deepClone(componentsListConfig);
          for(let item of componentsList) {
            if(item.label == val.item.dataset.label) {
              obj.setting.children = [{
                ...item,
                id: uuidV4()
              }];
              break;
            }
          };

          editorList.splice(val.newIndex, 0, obj);
          this.previewList = editorList;
          this.settingFreeComponentIndex = 0; // 默认选中第一个自由组件
          this.$nextTick(() => {
            this.clickComponent(
              this.editorList[val.newIndex],
              val.newIndex,
              ""
            );
          });
        } else {
          // 普通组件拖动到普通容器
          // 默认选中
          this.clickComponent(this.editorList[val.newIndex], val.newIndex, "");
        }
      } else if (val.to.dataset.name === "freePreviewDrag") {
        // 自由组件拖动到自由容器
        let scrollTop = this.$refs["scroll"].scrollPanelElm
          ? this.$refs["scroll"].scrollPanelElm.scrollTop
          : 0;
        let offsetX = 0,
          offsetY = 0;

        offsetX =
          val.originalEvent.pageX -
          this.$refs.previewMain.offsetLeft +
          1 -
          this.dragOffsetData.x;

        let dropBox = document.getElementById(val.to.id);
        let dropBoxTop = dropBox.getBoundingClientRect().top;

        offsetY = val.originalEvent.y - dropBoxTop + scrollTop - this.dragOffsetData.y + 1;

        // offsetY = val.originalEvent.pageY -
        //   previewListBoxoffsetTop +
        //   1 -
        //   this.dragOffsetData.y +
        //   scrollTop;



        // 组件拖入超出区域 显示到区域内
        if (offsetX < 0) {
          offsetX = 0;
        } else if (offsetX > val.to.offsetWidth - 100) {
          offsetX = val.to.offsetWidth - 100;
        }
        if (offsetY < 0) {
          offsetY = 0;
        } else if (offsetY > val.to.offsetHeight - 100) {
          offsetY = val.to.offsetHeight - 100;
        }

        let setting = editorList[editorIndex].setting;
        let label = val.item.dataset.label;
        for (let item of this.componentsList) {
          if (label === item.label) {
            let obj = {
              ...item,
              id: uuidV4()
            };
            obj.setting.x = offsetX;
            obj.setting.y = offsetY;
            console.log(val);
            console.log('offsetX, offsetY');
            console.log(offsetX);
            console.log(offsetY);
            obj.setting.z = setting.children.length + 1;
            setting.children.push(obj);
            break;
          }
        }
      }
      // this.listGroupOption.name = 'normal'
      this.freeGroup = "free";
      this.listGroupOption.name = "normal";
      if (this.navbarList.length <= 0) {
        this.showNavbarDragBox = false;
      }
      this.previewList = editorList;
      this.CHANGE_EDITOR_LIST(editorList);
    },
  }
};
</script>

<style>
</style>