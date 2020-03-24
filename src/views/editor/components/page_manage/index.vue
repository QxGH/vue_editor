<template>
  <div class="page-manage">
    <template v-for="(item, index) in editorPageData">
      <div class="group-item" :key="item.id">
        <div class="handle-box clearfix" @click="changePageHandel(item, {}, 'parent')">
          <div
            class="handle-icon"
            v-show="item.children.length > 0"
            @click.stop="changeDropdownActive(item.id)"
          >
            <template v-if="item.id == dropDownActive">
              <i class="el-icon-arrow-up icon"></i>
            </template>
            <template v-else>
              <i class="el-icon-arrow-down icon"></i>
            </template>
          </div>
          <div class="handle-name">{{item.setting.name}}</div>
          <div class="handle-opt" @click.stop>
            <i class="el-icon-plus icon" @click.stop="addPage(item.id)"></i>
            <i class="el-icon-document-copy icon" @click.stop="copyParent(item.id)"></i>
            <el-dropdown
              @command="((command) => { parentOptCommand(command, index, item) })"
              trigger="click"
            >
              <i class="el-icon-more-outline icon"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="item.children.length == 0" command="move">移动</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-collapse-transition>
          <ul class="group-children" v-show="item.id == dropDownActive">
            <template v-for="(childrenItem, childrenIndex) in item.children">
              <li
                class="handle-box clearfix"
                @click="changePageHandel(item, childrenItem, 'children')"
                :key="childrenItem.id"
              >
                <div class="handle-name">{{childrenItem.setting.name}}</div>
                <div class="handle-opt" @click.stop>
                  <i
                    class="el-icon-document-copy icon"
                    @click.stop="copyChildren(item, childrenItem)"
                  ></i>
                  <el-dropdown
                    @click.stop
                    @command="((command) => { childrenOptCommand(command, childrenIndex, item, childrenItem) })"
                    trigger="click"
                  >
                    <i class="el-icon-more-outline icon"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="move">移动</el-dropdown-item>
                      <el-dropdown-item command="del">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </li>
            </template>
          </ul>
        </el-collapse-transition>
      </div>
    </template>
    <div class="add-btn-box">
      <el-button type="primary" @click="addPage('')">新建页面</el-button>
    </div>
    <Move v-if="showMoveDialog" :moveParams="moveParams" @moveClose="moveSubmit"></Move>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import { mapState, mapMutations } from "vuex";
import deepClone from "@/tools/deepClone";
import Move from "./components/move";

export default {
  name: "PageManage",
  computed: {
    ...mapState(["editorPageData", "editorCurrentPage"])
  },
  components: {
    Move
  },
  data() {
    return {
      dropDownActive: "index",
      moveParams: {}, // 当前移动页面的参数
      showMoveDialog: false // 是否显示'移动'弹窗
    };
  },
  methods: {
    ...mapMutations([
      "CHANGE_EDITOR_LIST",
      "CHANGE_EDITOR_CURRENT_PAGE",
      "CHANGE_EDITOR_PAGE_DATA",
      "CHANGE_NAVBAR_LIST"
    ]),
    changeDropdownActive(id) {
      if (this.dropDownActive == id) {
        this.dropDownActive = "";
      } else {
        this.dropDownActive = id;
      }
    },
    changePageHandel(item, childrenItem, type) {
      let isCurrentPage = false;

      let editorPageData = deepClone(this.editorPageData);
      let editorCurrentPage = deepClone(this.editorCurrentPage);

      if (type == "parent") {
        if (item.id == editorCurrentPage.parent) {
          isCurrentPage = true;
        }
      } else if (type == "children") {
        if (childrenItem.id == editorCurrentPage.children) {
          isCurrentPage = true;
        }
      }

      if (
        this.editorCurrentPage.type &&
        this.editorCurrentPage.parent &&
        !isCurrentPage
      ) {
        this.$confirm("请确认已保存当前页面, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changePage(item, childrenItem, type);
          })
          .catch(() => {
            this.$message.info("已取消！");
          });
      } else {
        this.changePage(item, childrenItem, type);
      }
    },
    changePage(item, childrenItem, type) {
      let pageSetting = {};
      let editorList = [];
      let editorNav = [];
      if (type == "parent") {
        editorList = item.data;
        editorNav = item.nav;
        pageSetting = item.setting;
      } else if (type == "children") {
        editorList = childrenItem.data;
        editorNav = childrenItem.nav;
        pageSetting = childrenItem.setting;
      }
      let editorCurrentPage = {
        type,
        parent: item.id,
        children: childrenItem.id ? childrenItem.id : "",
        setting: pageSetting
      };
      this.CHANGE_EDITOR_CURRENT_PAGE(editorCurrentPage);
      this.CHANGE_NAVBAR_LIST(editorNav);
      this.CHANGE_EDITOR_LIST(editorList);
      this.$emit("changePage", editorList);

      this.$message.success("切换成功！");
    },
    addPage(id) {
      // 新建页面
      let obj = {
        id: uuidV4(),
        setting: {
          name: "新建页面",
          headerBg: ""
        },
        data: [],
        nav: [],
        children: []
      };
      let editorPageData = this.editorPageData;
      if (id) {
        for (let item of editorPageData) {
          if (item.id == id) {
            item.children.push(obj);
            break;
          }
        }
      } else {
        editorPageData.push(obj);
      }

      this.CHANGE_EDITOR_PAGE_DATA(editorPageData);
    },
    copyParent(id) {
      // 赋值父级页面
      let editorPageData = this.editorPageData;
      let obj = {};
      for (let item of editorPageData) {
        if (item.id == id) {
          obj = deepClone(item);
          obj.id = uuidV4();
          break;
        }
      }
      // 替换id
      if (obj.children.length > 0) {
        for (let i of obj.children) {
          i.id = uuidV4();
        }
      }

      editorPageData.push(obj);
      this.CHANGE_EDITOR_PAGE_DATA(editorPageData);
    },
    copyChildren(item, childrenItem) {
      // 复制子级页面
      let editorPageData = this.editorPageData;
      let obj = {};
      for (let i of editorPageData) {
        if (i.id == item.id) {
          for (let j of item.children) {
            if (j.id == childrenItem.id) {
              obj = deepClone(j);
              obj.id = uuidV4();
              break;
            }
          }
          i.children.push(obj);
          break;
        }
      }
      this.CHANGE_EDITOR_PAGE_DATA(editorPageData);
    },
    parentOptCommand(command, index, item) {
      let editorPageData = this.editorPageData;
      if (command == "del") {
        editorPageData.splice(index, 1);
        if (item.id == this.editorCurrentPage.parent) {
          // 如果删掉的是当前编辑页面的父级 重置当前页数据
          let editorCurrentPage = {
            type: "parent",
            parent: "",
            children: "",
            setting: {}
          };
          this.CHANGE_EDITOR_CURRENT_PAGE(editorCurrentPage);
          this.CHANGE_EDITOR_LIST([]);
        }
        this.CHANGE_EDITOR_PAGE_DATA(editorPageData);
        this.$emit("refreshState", "");
      } else if (command == "move") {
        this.moveParams = {
          type: "parent",
          parentID: item.id,
          childrenID: ""
        };
        this.showMoveDialog = true;
      }
    },
    childrenOptCommand(command, index, item, childrenItem) {
      let editorPageData = this.editorPageData;
      if (command == "del") {
        for (let i of editorPageData) {
          if (i.id == item.id) {
            let spliceID = deepClone(i.children[index].id);
            i.children.splice(index, 1);
            if (spliceID == this.editorCurrentPage.children) {
              // 如果删掉的是当前编辑页面
              let editorCurrentPage = {
                type: "children",
                parent: "",
                children: "",
                setting: {}
              };
              this.CHANGE_EDITOR_CURRENT_PAGE(editorCurrentPage);
              this.CHANGE_EDITOR_LIST([]);
            }
            break;
          }
        }
        this.CHANGE_EDITOR_PAGE_DATA(editorPageData);
        this.$emit("refreshState", "");
      } else if (command == "move") {
        this.moveParams = {
          type: "children",
          parentID: item.id,
          childrenID: childrenItem.id
        };
        this.showMoveDialog = true;
      }
    },
    moveSubmit(val) {
      let { newID, oldParams } = val;
      // id 没变  return;
      if (oldParams.type == "parent") {
        if (newID == oldParams.parentID) {
          return;
        }
      } else if (oldParams.type == "children") {
        if (newID == oldParams.childrenID) {
          return;
        }
      }

      let obj = {};
      let editorPageData = deepClone(this.editorPageData);
      // 取出 要移动的 页面数据 后 再删掉
      for (let [index, item] of editorPageData.entries()) {
        // 遍历 父级
        if (item.id == oldParams.parentID) {
          if (oldParams.type == "parent") {
            // id 相同 移动的是 父级空页面
            obj = deepClone(item);
            editorPageData.splice(index, 1);
          } else if (oldParams.type == "children") {
            // 移动的子级 再遍历 children
            for (let [childIndex, childrenItem] of item.children.entries()) {
              if (childrenItem.id == oldParams.childrenID) {
                obj = deepClone(childrenItem);
                editorPageData[index].children.splice(childIndex, 1);
                break;
              }
            }
          }
          break;
        }
      }

      // 再遍历 把移动的页面放进去
      for (let [index, item] of editorPageData.entries()) {
        // 遍历 父级
        if (item.id == newID) {
          item.children.push(obj);
          break;
        }
      }

      this.CHANGE_EDITOR_PAGE_DATA(editorPageData);

      this.showMoveDialog = false;
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>