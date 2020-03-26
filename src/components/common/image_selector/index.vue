<template>
  <div class="image-selector-dialog">
    <el-dialog title="图片选择器" width="800px" :visible.sync="dialogVisible">
      <div class="image-dialog-body">
        <el-row :gutter="10">
          <template v-for="item in imageList">
            <el-col :span="4" :key="item.id">
              <div
                class="image-box"
                :class="{isSelect: item.isSelect}"
                @click="selectImageHandle(item.id)"
              >
                <!-- <el-avatar shape="square" :size="110" fit="contain" :src="item.imageUrl"></el-avatar> -->
                <el-image style="width: 110px; height: 110px" :src="item.imageUrl" fit="contain"></el-image>
              </div>
            </el-col>
          </template>
          <template>
            <el-col :span="4">
              <el-upload
                v-loading="loading"
                class="image-box"
                action="/api/upload"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload"
              >
                <img v-if="uploadImageUrl" :src="uploadImageUrl" class="uploader-img" />
                <i v-else class="el-icon-plus uploader-icon"></i>
              </el-upload>
            </el-col>
          </template>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import axios from "axios";
import baseUrl from '@/api/base'

import compressImg from "../../../tools/compressImg";

export default {
  name: "iconSelector",
  data() {
    return {
      dialogVisible: true,
      imageList: [],
      currentSelectID: "",
      currentSelectImage: "",
      imageUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      uploadImageUrl: "", // 上传后用于显示的图片地址
      loading: false
    };
  },
  props: ["imageID"],
  watch: {
    imageID: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log("watch - imageID");
        console.log(val);
        // this.selectIcon(val);
      }
    }
  },
  created() {
    let imageListStorage = localStorage.getItem("imageList");
    let imageList = [];
    if (imageListStorage) {
      imageList = JSON.parse(imageListStorage);
    } else {
      imageList = [];
      localStorage.setItem("imageList", JSON.stringify([]));
    }
    console.log(this.imageID);
    // if (this.imageID != "default") {
    for (let item of imageList) {
      if (this.imageID == item.id) {
        item.isSelect = true;
        this.currentSelectID = item.id;
        this.currentSelectImage = item.imageUrl;
      } else {
        item.isSelect = false;
      }
    }
    // }
    this.imageList = imageList;
  },
  methods: {
    selectImageHandle(val) {
      let imageList = this.imageList;
      for (let item of imageList) {
        if (item.id == val) {
          item.isSelect = true;
          this.currentSelectID = val;
          this.currentSelectImage = item.imageUrl;
        } else {
          item.isSelect = false;
        }
      }
      this.imageList = imageList;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
        return false;
      }
      let token = localStorage.getItem("iimgToken");
      this.uploading(file);

      return false;
    },
    uploadSuccess(res, file) {
      let url = baseUrl.qiniuStatic + '/' + res.data.key;
      let obj = {
        id: uuidV4(),
        isSelect: false,
        imageUrl: url
      };
      let imageList = this.imageList;
      imageList.push(obj);
      this.imageList = imageList;
      localStorage.setItem("imageList", JSON.stringify(imageList));
    },
    uploadError(err, file) {
      this.$message.error("上传失败!");
    },
    uploading(file) {
      this.loading = true;

      this.$api.qiniu
        .getTempToken()
        .then(res => {
          if (res.data.code === 0) {
            this.uploadImageHandle(res.data.data, file);
          } else {
            this.message.error("获取七牛云 Token 失败！");
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    uploadImageHandle(token, file) {
      // const fileType = file.type.split("/")[1];
      const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
      let timestamp = Date.parse(new Date());
      let randomNum = Math.floor(Math.random() * 1000);
      // 文件名
      const keyname = `temp/${Math.round(new Date() / 1000)}/${uuidV4()}.${fileType}`;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token", token);
      formData.append("key", keyname);
      this.$api.qiniu.uploadFile(formData)
        .then(res => {
          if(res.data.key) {
            this.uploadSuccess(res, file);
          } else {
            this.uploadError(res, file);
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err);
          this.uploadError(err, file);
          this.loading = false
        });
    },
    close() {
      let obj = {
        imageID: this.currentSelectID,
        imageUrl: this.currentSelectImage
      };
      this.$emit("submitImage", obj);
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>