<template>
  <div class="link-selector">
    <el-dialog title="链接选择器" :visible.sync="dialogVisible" width="800px">
      <div class="link-selector-body">
        <el-tabs v-model="tabActiveName" @tab-click="tabhandleClick" stretch>
          <el-tab-pane label="页面" name="page">
            <ul class="list-items">
              <template v-for="item in linkList">
                <li class="link-item" :key="item.id">
                  <el-radio v-model="currentLink" :label="item.id" @change="radioHandleChange(item)">{{item.label}}</el-radio>
                </li>
              </template>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="商品" name="goods">商品</el-tab-pane>
          <el-tab-pane label="系统页面" name="system">系统页面</el-tab-pane>
          <el-tab-pane label="其他" name="other">其他</el-tab-pane>
        </el-tabs>
        <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="close">取 消</el-button>
        <el-button type="primary"  @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";

export default {
  name: "linkSelector",
  props: ["linkID"],
  data() {
    return {
      currentLink: "",
      currentLinkObj: {},
      dialogVisible: true,
      tabActiveName: "page",
      linkList: [
        {
          id: uuidV4(),
          type: "page",
          label: "页面-1",
          url: "pages/logs/index-1"
        },
        {
          id: uuidV4(),
          type: "page",
          label: "页面-2",
          url: "pages/logs/index-2"
        },
        {
          id: uuidV4(),
          type: "page",
          label: "页面-3",
          url: "pages/logs/index-3"
        },
        {
          id: uuidV4(),
          type: "page",
          label: "页面-4",
          url: "pages/logs/index-4"
        }
      ]
    };
  },
  created() {
    this.currentLink = this.linkID;
  },
  methods: {
    tabhandleClick(val) {
      // console.log(val);
    },
    radioHandleChange(val) {
      this.currentLinkObj = val;
    },
    close() {
      this.$emit("submitLink", this.currentLinkObj);
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>