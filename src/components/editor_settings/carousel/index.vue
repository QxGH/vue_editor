<template>
  <div class="carousel-setting">
    <el-divider>carousel</el-divider>
    <el-collapse v-model="activeName" accordion>
      <template v-for="(item, index) in editorList[editorIndex].setting.list">
        <el-collapse-item :title="'carousel-'+(index+1)" :name="index+1" :key="index">
          <!-- <el-upload
            class="uploader"
            action="https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api/upload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload">
            <img v-if="item.imageUrl" :src="item.imageUrl" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>-->
          <div class="image-selector" @click="selectorImageHandle(item.imageID)">
            <!-- <el-avatar shape="square" :size="100" fit="contain" :src="item.imageUrl"></el-avatar> -->
            <el-image style="width: 100px; height: 100px" :src="item.imageUrl" fit="contain"></el-image>
          </div>
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
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ImageSelector from "../../common/image_selector";

export default {
  name: "carouselSetting",
  data() {
    return {
      activeName: "1",
      showImageSelector: false, // 是否显示图片选择器
      currentImageID: "default" //当前选中图片id
    };
  },
  components: {
    ImageSelector
  },
  computed: {
    ...mapState(["editorList", "editorIndex"])
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST"]),
    addHandle() {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      let list = editorList[editorIndex].setting.list;
      if (list.length >= 5) {
        this.$message.warning("最大只能添加5张卡片");
        return;
      }
      let newObj = {
        imageID: "default",
        imageUrl: "https://qxtodo.com/editor/animation_wallpaper.jpg"
      };
      list.push(newObj);
      editorList[editorIndex].setting.list = list;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    // beforeUpload(file){
    //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //     return
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //     return
    //   };
    // },
    // uploadSuccess(res, file) {
    //   let url = URL.createObjectURL(file.raw);

    //   let editorList = this.editorList;
    //   let editorIndex = this.editorIndex;
    //   let list = editorList[editorIndex].setting.list;
    //   list[this.activeName-1].imageUrl = url;
    //   editorList[editorIndex].setting.list = list;
    //   this.CHANGE_EDITOR_LIST(editorList)
    //   this.tellParent()
    // },
    selectorImageHandle(imageID) {
      this.currentImageID = imageID;
      this.showImageSelector = true; // 显示图片选择器
    },
    submitImageHandle(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      if (val.imageID && val.imageUrl) {
        let list = editorList[editorIndex].setting.list;
        list[this.activeName-1].imageID = val.imageID;
        list[this.activeName-1].imageUrl = val.imageUrl;
        editorList[editorIndex].setting.list = list;
        this.CHANGE_EDITOR_LIST(editorList)
        this.tellParent()
      }
      this.showImageSelector = false; // 显示图片选择器

      // editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting.imageID = val.imageID;
      // editorList[editorIndex].setting.children[this.settingFreeComponentIndex].setting.imageUrl = val.imageUrl;
      // this.CHANGE_EDITOR_LIST(editorList)
      // this.tellParent()
      // this.showImageSelector = false; // 显示图片选择器
    },
    tellParent() {
      this.$emit("refreshState", "");
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>