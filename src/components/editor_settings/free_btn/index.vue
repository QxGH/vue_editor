<template>
  <div class="free-btn-setting">
    <el-divider>按钮样式</el-divider>
    <template>
      <el-radio-group v-model="setting.style"  @change="styleChange">
        <el-radio label="primary">
          <el-button type="primary">按钮</el-button>
        </el-radio>
        <el-radio label="plain">
          <el-button plain>按钮</el-button>
        </el-radio>
        <el-radio label="primaryRound">
          <el-button type="primary" round>按钮</el-button>
        </el-radio>
        <el-radio label="plainRound">
          <el-button round>按钮</el-button>
        </el-radio>
      </el-radio-group>
    </template>
    <el-divider>文字颜色</el-divider>
    <el-color-picker v-model="setting.color" @change="colorChange"></el-color-picker>
    <el-divider>文字大小</el-divider>
    <el-select v-model="setting.size" placeholder="请选择" @change="sizeChange">
      <el-option label="14px" value="14"></el-option>
      <el-option label="16px" value="16"></el-option>
      <el-option label="18px" value="18"></el-option>
      <el-option label="20px" value="20"></el-option>
      <el-option label="26px" value="26"></el-option>
      <el-option label="32px" value="32"></el-option>
    </el-select>
    <el-divider>按钮颜色</el-divider>
    <el-color-picker v-model="setting.bg" @change="bgChange"></el-color-picker>
    <el-divider>按钮文本</el-divider>
    <el-input
      type="textarea"
      :rows="5"
      placeholder="请输入内容"
      v-model="setting.text"
      maxlength="50"
      show-word-limit
      clearable
      :autosize="{minRows: 5, maxRows: 8}"
      @input="textChange"
    ></el-input>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "freeBtnSetting",
  data() {
    return {};
  },
  computed: {
    ...mapState(["editorList", "editorIndex"])
  },
  props: {
    setting: {
      type: Object,
      default() {
        return {
          text: '按钮',
          color: '#ffffff',
          bg: '#409eff',
          size: '14',
          width: 100,
          height: 40,
          style: 'primary',
          x: 0,
          y: 0,
          z: 1
        };
      }
    },
    settingFreeComponentIndex: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST"]),
    styleChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      editorList[editorIndex].setting.children[
        this.settingFreeComponentIndex
      ].setting.style = val;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    bgChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      editorList[editorIndex].setting.children[
        this.settingFreeComponentIndex
      ].setting.bg = val;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    colorChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // console.log(this.settingFreeComponentIndex)
      // let setting = editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting;
      // setting.color = val;
      editorList[editorIndex].setting.children[
        this.settingFreeComponentIndex
      ].setting.color = val;
      // editorList[editorIndex].setting = setting;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    sizeChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // let setting = editorList[editorIndex].setting;
      // setting.size = val;
      // editorList[editorIndex].setting = setting;
      editorList[editorIndex].setting.children[
        this.settingFreeComponentIndex
      ].setting.size = val;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    textChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // let setting = editorList[editorIndex].setting;
      // setting.size = val;
      // editorList[editorIndex].setting = setting;
      editorList[editorIndex].setting.children[
        this.settingFreeComponentIndex
      ].setting.text = val;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    tellParent() {
      this.$emit("refreshState", "");
    }
  }
};
</script>

<style>
</style>