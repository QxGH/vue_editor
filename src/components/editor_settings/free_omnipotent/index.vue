<template>
  <div class="free-omnipotent-setting">
    <el-divider>点击事件</el-divider>
    <el-button type="primary" >选择链接</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: 'freeOmnipotentSetting',
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
          text: '文本内容',
          color: '#333333',
          size: '14',
          width: 100,
          height: 100,
          x: 0,
          y: 0,
          z: 1
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