<template>
  <div class="free-omnipotent-setting">
    <el-divider>点击事件</el-divider>
    <el-button type="primary" plain @click="selectorLinkHandle">选择链接</el-button>
    <span class="link-tips" v-if="currentLinkObj.label">已设置：{{currentLinkObj.label}}</span>

    <LinkSelector
      v-if="showLinkSelector"
      :linkID="currentLinkID"
      @submitLink="submitLinkHandle"
    ></LinkSelector>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LinkSelector from "../../common/link_selector"


export default {
  name: "freeOmnipotentSetting",
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
          link: {
            id: uuidV4(),
            type: "",
            label: "",
            url: ""
          }
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
  data(){
    return {
      currentLinkObj: {},
      showLinkSelector: false,  // 是否显示链接选择器
      currentLinkID: "", // 当前选中链接id
    }
  },
  components: {
    LinkSelector
  },
  created(){
    this.currentLinkObj = this.setting.link;
    this.currentLinkID = this.setting.link.id;
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST"]),
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
    selectorLinkHandle() {
      // this.currentLinkID = id;
      this.showLinkSelector = true;
    },
    submitLinkHandle(val) {
      if (val.id && val.type && val.label && val.url) {
        let editorList = this.editorList;
        let editorIndex = this.editorIndex;
        editorList[editorIndex].setting.children[
          this.settingFreeComponentIndex
        ].setting.link = val;
        this.currentLinkObj = val;
        this.CHANGE_EDITOR_LIST(editorList);
        this.tellParent();
      }
      this.showLinkSelector = false; // 显示图片选择器
    },
    tellParent() {
      this.$emit("refreshState", "");
    }
  }
};
</script>

<style>
@import url('./style/index.min.css');
</style>