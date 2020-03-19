<template>
  <div class="graphic-nav-setting">
    <el-collapse v-model="activeName" accordion>
      <template v-for="(item, index) in setting.list">
        <el-collapse-item :title="'graphic-nav-'+(index+1)" :name="index+1" :key="item.id">
          <el-divider>icon</el-divider>
            <div class="image-selector" @click="selectorImageHandle(item.imageID)">
              <el-image style="width: 100px; height: 100px" :src="item.imageUrl" fit="contain"></el-image>
            </div>
          <el-divider>文本</el-divider>
          <el-input
            placeholder="请输入内容"
            v-model="item.title"
            maxlength="5"
            show-word-limit
            clearable
            @input="titleChange"
          >
          </el-input>
          <el-divider>点击事件</el-divider>
          <el-button type="primary" plain @click="selectorLinkHandle(item.link.id)">选择链接</el-button>
          <span class="link-tips" v-if="item.link.label">已设置：{{item.link.label}}</span>
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="btn-box">
      <el-button class="add-btn" type="primary" @click="addHandle">新增</el-button>
    </div>
    <ImageSelector
      v-if="showImageSelector"
      :imageID="currentImageID"
      @submitImage="submitImageHandle"
    ></ImageSelector>
    <LinkSelector
      v-if="showLinkSelector"
      :linkID="currentLinkID"
      @submitLink="submitLinkHandle"
    ></LinkSelector>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import { mapState, mapMutations } from "vuex";

import ImageSelector from "../../common/image_selector";
import LinkSelector from "../../common/link_selector"


export default {
  name: "graphicNavSetting",
  data(){
    return {
      activeName: 1,
      showImageSelector: false, // 是否显示图片选择器
      currentImageID: "default", //当前选中图片id
      showLinkSelector: false,  // 是否显示链接选择器
      currentLinkID: "", // 当前选中链接id
    }
  },
  components: {
    ImageSelector,
    LinkSelector
  },
  props: {
    setting: {
      type: Object,
      default() {
        return {
          list: [
            {
              id: '1',
              icon: "icon-home",
              text: "home"
            }
          ]
        };
      }
    }
  },
  computed: {
    ...mapState(["editorList", "editorIndex"])
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST"]),
    addHandle(){
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      let list = editorList[editorIndex].setting.list;
      if (list.length >= 5) {
        this.$message.warning("最大只能添加5张卡片");
        return;
      }
      let newObj = {
        id: uuidV4(),
        imageID: "default",
        imageUrl: 'https://cdn.qinxus.com/animation_gril_banner_2.jpg',
        title: '标题',
        link: {
          id: uuidV4(),
          type: '',
          label: '',
          url: ''
        }
      };
      list.push(newObj);
      editorList[editorIndex].setting.list = list;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    titleChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;

      let list = editorList[editorIndex].setting.list;
      list[this.activeName-1].title = val;

      this.CHANGE_EDITOR_LIST(editorList)
      this.tellParent()
    },
    selectorImageHandle(imageID) {
      this.currentImageID = imageID;
      this.showImageSelector = true; // 显示图片选择器
    },
    submitImageHandle(val) {
      if (val.imageID && val.imageUrl) {
        let editorList = this.editorList;
        let editorIndex = this.editorIndex;

        let list = editorList[editorIndex].setting.list;
        list[this.activeName-1].imageID = val.imageID;

        list[this.activeName-1].imageUrl = val.imageUrl;
        editorList[editorIndex].setting.list = list;
        this.CHANGE_EDITOR_LIST(editorList)
        this.tellParent()
      }
      this.showImageSelector = false; // 显示图片选择器
    },
    selectorLinkHandle(id) {
      console.log(id)
      this.currentLinkID = id;
      this.showLinkSelector = true;
    },
    submitLinkHandle(val) {
      if (val.id && val.type && val.label && val.url) {
        let editorList = this.editorList;
        let editorIndex = this.editorIndex;

        let list = editorList[editorIndex].setting.list;
        list[this.activeName-1].link = val;

        editorList[editorIndex].setting.list = list;
        this.CHANGE_EDITOR_LIST(editorList)
        this.tellParent()
      }
      this.showLinkSelector = false; // 显示图片选择器
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