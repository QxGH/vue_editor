<template>
  <div class="free-text-setting">
    <el-divider>颜色</el-divider>
    <el-color-picker v-model="setting.color" @change="colorChange"></el-color-picker>
    <el-divider>大小</el-divider>
    <el-select v-model="setting.size" placeholder="请选择" @change="sizeChange">
      <el-option label="14px" value="14"></el-option>
      <el-option label="16px" value="16"></el-option>
      <el-option label="18px" value="18"></el-option>
      <el-option label="20px" value="20"></el-option>
      <el-option label="26px" value="26"></el-option>
      <el-option label="32px" value="32"></el-option>
    </el-select>
    <el-divider>文本</el-divider>
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
    >
    </el-input>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: 'freeTextSetting',
  data(){
    return {}
  },
  computed: {
    ...mapState(['editorList', 'editorIndex'])
  },
  props: {
    setting: {
      type: Object,
      default() {
        return {
          color: "#333",
          size: '14',
          text: "文本内容"
        }
      }
    },
    settingFreeComponentIndex:{
      type: Number,
      default(){
        return 0
      }
    }
  },
  methods: {
    ...mapMutations(['CHANGE_EDITOR_LIST']),
    colorChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // console.log(this.settingFreeComponentIndex)
      // let setting = editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting;
      // setting.color = val;
      editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting.color = val;
      // editorList[editorIndex].setting = setting;
      this.CHANGE_EDITOR_LIST(editorList)
      this.tellParent()
    },
    sizeChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // let setting = editorList[editorIndex].setting;
      // setting.size = val;
      // editorList[editorIndex].setting = setting;
      editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting.size = val;
      this.CHANGE_EDITOR_LIST(editorList)
      this.tellParent()
    },
    textChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // let setting = editorList[editorIndex].setting;
      // setting.size = val;
      // editorList[editorIndex].setting = setting;
      editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting.text = val;
      this.CHANGE_EDITOR_LIST(editorList)
      this.tellParent()
    },
    tellParent(){
      this.$emit('refreshState', '')
    }
  }
}
</script>

<style>

</style>