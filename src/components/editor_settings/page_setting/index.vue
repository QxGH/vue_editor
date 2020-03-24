<template>
  <div class="page-setting">
    <el-divider>页面名称</el-divider>
    <el-input
      v-model="setting.name"
      placeholder="请输入内容"
      @input="textChange"
      maxlength="5"
      show-word-limit
    ></el-input>
    <el-divider>导航栏背景色</el-divider>
    <el-color-picker v-model="setting.headerBg" @change="colorChange"></el-color-picker>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "PageSetting",
  props: ["setting"],
  computed: {
    ...mapState(["editorCurrentPage"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_CURRENT_PAGE"]),
    colorChange(val) {
      let currentPage = this.editorCurrentPage;
      currentPage.headerBg = val;
      this.CHANGE_EDITOR_CURRENT_PAGE(currentPage);
      // this.tellParent()
    },
    textChange(val) {
      let currentPage = this.editorCurrentPage;
      currentPage.name = val;
      this.CHANGE_EDITOR_CURRENT_PAGE(currentPage);
    }
  }
};
</script>

<style>
</style>