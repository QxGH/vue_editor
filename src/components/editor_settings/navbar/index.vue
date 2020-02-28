<template>
  <div class="navbar-setting">
    <el-collapse v-model="activeName" accordion>
      <template v-for="(item, index) in setting.list">
        <el-collapse-item :title="'navbar-'+(index+1)" :name="index" :key="item.id">
          <el-divider>icon</el-divider>
            <div class="icon-selector" @click="chickIconSelector(item)">
              <i class="iconfont" :class="item.icon"></i>
            </div>
          <el-divider>文本</el-divider>
          <el-input
            placeholder="请输入内容"
            v-model="item.text"
            maxlength="5"
            show-word-limit
            clearable
            @input="textChange"
          >
          </el-input>
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="btn-box">
      <el-button class="add-btn" type="primary" @click="addHandle">新增</el-button>
    </div>
    <IconSelector v-if="showIconSelector" :selector="currentSelector" @submitIcon="submitIconHandle"></IconSelector>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import { mapState, mapMutations } from "vuex";

import IconSelector from '../../../components/common/icon_selector/'

export default {
  name: "navbarSetting",
  data(){
    return {
      activeName: 0,
      currentSelector: '',  // 当前选中的图标
      showIconSelector: false,  // 是否显示图标选择弹窗
    }
  },
  components: {
    IconSelector
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
    ...mapState(['editorNav'])
  },
  methods: {
    ...mapMutations(['CHANGE_NAVBAR_LIST']),
    addHandle(){
      let editorNavList = this.editorNav;
      let list = editorNavList[0].setting.list;
      if(list.length >= 5) {
        this.$message.warning('最大只能添加5个选项');
        return;
      };
      let newObj = {
        id: uuidV4(),
        icon: 'icon-home',
        text: 'home'
      };
      list.push(newObj);
      // editorNavList[editorIndex].setting.list = list;
      this.CHANGE_NAVBAR_LIST(editorNavList)
      this.tellParent();
    },
    textChange(val) {
      let editorNavList = this.editorNav;
      editorNavList[0].setting.list[this.activeName].text = val;
      this.CHANGE_NAVBAR_LIST(editorNavList)
      this.tellParent()
    },
    chickIconSelector(val){
      this.showIconSelector = true;
      this.currentSelector = val.icon;
    },
    submitIconHandle(val){
      let editorNavList = this.editorNav;
      editorNavList[0].setting.list[this.activeName].icon = val;
      this.showIconSelector = false;
      this.CHANGE_NAVBAR_LIST(editorNavList)
      this.tellParent()
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