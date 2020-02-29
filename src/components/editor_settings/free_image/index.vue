<template>
  <div class="free-image-setting">
    <el-divider>图片</el-divider>
    <div class="image-selector" @click="selectorImageHandle">
      <el-avatar shape="square" :size="100" fit="contain" :src="setting.imageUrl"></el-avatar>
    </div>
    <ImageSelector v-if="showImageSelector" :imageID="currentImageID" @submitImage="submitImageHandle"></ImageSelector>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ImageSelector from '../../../components/common/image_selector'

export default {
  name: 'freeTextSetting',
  data(){
    return {
      showImageSelector: false, // 是否显示图片选择器
      currentImageID: 'default'  //当前选中图片id
    }
  },
  computed: {
    ...mapState(['editorList', 'editorIndex'])
  },
  components: {
    ImageSelector
  },
  props: {
    setting: {
      type: Object,
      default() {
        return {
          imageID: 'default',
          imageUrl: "https://qxtodo.com/editor/animation_wallpaper.jpg"
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
    selectorImageHandle(){
      this.currentImageID = this.setting.imageID;
      this.showImageSelector = true; // 显示图片选择器
    },
    submitImageHandle(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // console.log(this.settingFreeComponentIndex)
      // let setting = editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting;
      // setting.color = val;
      if(val.imageID && val.imageUrl) {
        editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting.imageID = val.imageID;
        editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting.imageUrl = val.imageUrl;
        // editorList[editorIndex].setting = setting;
        this.CHANGE_EDITOR_LIST(editorList)
        this.tellParent()
      };
      
      this.showImageSelector = false; // 显示图片选择器
    },
    tellParent(){
      this.$emit('refreshState', '')
    }
  }
}
</script>

<style>
@import url('./style/index.min.css');
</style>