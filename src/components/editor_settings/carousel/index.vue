<template>
  <div class="carousel-setting">
    <el-collapse v-model="activeName" accordion>
      <template v-for="(item, index) in editorList[editorIndex].setting.list">
        <el-collapse-item :title="'carousel-'+(index+1)" :name="index+1" :key="index">
          <el-upload
            v-loading="loading"
            class="uploader"
            action="https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api/upload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload">
            <img v-if="item.imageUrl" :src="item.imageUrl" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="btn-box">
      <el-button class="add-btn" type="primary" @click="addHandle">新增</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "carouselSetting",
  data(){
    return {
      activeName: '1',
      loading: false
    }
  },
  computed: {
    ...mapState(['editorList', 'editorIndex'])
  },
  methods: {
    ...mapMutations(['CHANGE_EDITOR_LIST']),
    addHandle(){
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      let list = editorList[editorIndex].setting.list;
      if(list.length >= 5) {
        this.$message.warning('最大只能添加5张卡片');
        return;
      };
      let newObj = {
        imageUrl: 'https://qxtodo.com/editor/animation_wallpaper.jpg'
      };
      list.push(newObj);
      editorList[editorIndex].setting.list = list;
      this.CHANGE_EDITOR_LIST(editorList)
      this.tellParent()
    },
    beforeUpload(file){
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return
      };
      this.loading = true
    },
    uploadSuccess(res, file) {
      let url = URL.createObjectURL(file.raw);

      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      let list = editorList[editorIndex].setting.list;
      list[this.activeName-1].imageUrl = url;
      editorList[editorIndex].setting.list = list;
      this.CHANGE_EDITOR_LIST(editorList)
      this.tellParent()
      this.loading = false
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