<template>
  <div class="divider-setting">
    <el-divider>颜色</el-divider>
    <el-color-picker v-model="setting.color" @change="colorChange"></el-color-picker>
    <el-divider>大小</el-divider>
    <el-select v-model="setting.size" placeholder="请选择" @change="sizeChange">
      <el-option label="1px" value="1"></el-option>
      <el-option label="2px" value="2"></el-option>
      <el-option label="4px" value="4"></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: 'dividerSetting',
  data(){
    return {
      val: '',
      value: '1'
    }
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
          size: "1"
        }
      }
    }
  },
  methods: {
    ...mapMutations(['CHANGE_EDITOR_LIST']),
    colorChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // let setting = editorList[editorIndex].setting;
      // setting.color = val;
      editorList[editorIndex].setting.color = val;
      this.CHANGE_EDITOR_LIST(editorList)
      this.tellParent()
    },
    sizeChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // let setting = editorList[editorIndex].setting;
      // setting.size = val;
      editorList[editorIndex].setting.size = val;
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