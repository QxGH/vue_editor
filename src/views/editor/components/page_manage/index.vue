<template>
  <div class="page-manage">
    <template v-for="(item, index) in editorPageData">
      <div class="group-item" :key="item.id">
        <div class="handle-box clearfix" @click="changeDropdownActive(item.id)">
          <div class="handle-icon" v-show="item.children.length > 0">
            <template v-if="item.id == dropDownActive">
              <i class="el-icon-arrow-up icon"></i>
            </template>
            <template v-else>
              <i class="el-icon-arrow-down icon"></i>
            </template>
          </div>
          <div class="handle-name">{{item.name}}</div>
          <div class="handle-opt">
            <i class="el-icon-plus icon" @click.stop="addPage(item.id)"></i>
            <i class="el-icon-document-copy icon" @click.stop="copyParent(item.id)"></i>
            <el-dropdown
              @click.stop
              @command="((command) => { parentOptCommand(command, index, item) })"
            >
              <i class="el-icon-more-outline icon"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="item.children.length > 0">移动</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-collapse-transition>
          <ul class="group-children" v-show="item.id == dropDownActive">
            <template v-for="childrenItem in item.children">
              <li
                class="handle-box clearfix"
                @click="changePage(item, childrenItem)"
                :key="childrenItem.id"
              >
                <div class="handle-name">{{childrenItem.name}}</div>
                <div class="handle-opt">
                  <i
                    class="el-icon-document-copy icon"
                    @click.stop="copyChildren(item, childrenItem)"
                  ></i>
                  <el-dropdown
                    @click.stop
                    @command="((command) => { childrenOptCommand(command, index, childrenItem) })"
                  >
                    <i class="el-icon-more-outline icon"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>移动</el-dropdown-item>
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
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import { mapState, mapMutations } from "vuex";
import deepClone from "@/tools/deepClone";

export default {
  name: "PageManage",
  computed: {
    ...mapState(["editorPageData", "editorPageID"])
  },
  data() {
    return {
      dropDownActive: "index"
    };
  },
  methods: {
    ...mapMutations([
      "CHANGE_EDITOR_LIST",
      "CHANGE_EDITOR_PAGE_ID",
      "CHANGE_EDITOR_PAGE_DATA"
    ]),
    changeDropdownActive(id) {
      if (this.dropDownActive == id) {
        this.dropDownActive = "";
      } else {
        this.dropDownActive = id;
      }
    },
    changePage(item, childrenItem) {
      let editorPageID = {
        parent: item.id,
        children: childrenItem.id
      };
      this.CHANGE_EDITOR_PAGE_ID(editorPageID);
      this.CHANGE_EDITOR_LIST(childrenItem.data);
      this.$emit("refreshState", "");
    },
    addPage(id) {
      // 新建页面
      let obj = {
        id: uuidV4(),
        name: "新建页面",
        data: []
      };
      let editorPageData = this.editorPageData;
      for (let item of editorPageData) {
        if (item.id == id) {
          item.children.push(obj);
          break;
        }
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
      };
      if (item.id == this.editorPageID.parent) {
        // 如果删掉的是当前编辑页面的父级
        let editorPageID = {
          parent: '',
          children: ''
        };
        this.CHANGE_EDITOR_PAGE_ID(editorPageID);
        this.CHANGE_EDITOR_LIST([]);
      };
      this.CHANGE_EDITOR_PAGE_DATA(editorPageData);
      this.$emit("refreshState", "");
    },
    childrenOptCommand(command, index, item) {
      let editorPageData = this.editorPageData;
      if (command == "del") {
        for (let i of editorPageData) {
          if (i.id == item.id) {
            i.children.splice(index, 1);
            if(item.id == this.editorPageID.children) {
              // 如果删掉的是当前编辑页面
              let editorPageID = {
                parent: '',
                children: ''
              };
              this.CHANGE_EDITOR_PAGE_ID(editorPageID);
              this.CHANGE_EDITOR_LIST([]);
            }
            break;
          }
        }
      };
      this.CHANGE_EDITOR_PAGE_DATA(editorPageData);
      this.$emit("refreshState", "");
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>