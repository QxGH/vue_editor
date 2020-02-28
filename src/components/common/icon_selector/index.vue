<template>
  <div class="icon-selector-dialog">
    <el-dialog title="提示" width="700px" :visible.sync="dialogVisible">
      <div class="icon-dialog-body">
        <el-row :gutter="10">
          <template v-for="item in iconList">
            <el-col :span="3" :key="item.id">
              <div class="icon-wrap" :class="{isSelect: item.isSelect}" @click="selectIcon(item.class)">
                <span class="icon-box">
                  <i class="iconfont" :class="item.class"></i>
                </span>
                <div class="icon-name">{{item.name}}</div>
              </div>
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
import iconConfig from "./iconConfig";
export default {
  name: "iconSelector",
  data() {
    return {
      dialogVisible: true,
      iconList: iconConfig.list,
      currentSelect: ""
    };
  },
  props: ["selector"],
  watch: {
    selector: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log("watch - icon selector");
        console.log(val);
        this.selectIcon(val);
      }
    }
  },
  methods: {
    selectIcon(val) {
      let iconList = this.iconList;
      for (let item of iconList) {
        if (item.class == val) {
          item.isSelect = true;
          this.currentSelect = val;
        } else {
          item.isSelect = false;
        }
      }
      this.iconList = iconList;
    },
    close() {
      this.$emit('submitIcon', this.currentSelect);
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>