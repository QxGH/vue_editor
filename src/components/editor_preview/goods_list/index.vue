<template>
  <div class="goods-list">
    <el-row :gutter="15">
      <template v-for="item of goodsList">
        <el-col :span="12" :key="item.id">
          <div class="goods-item">
            <div class="img-box">
              <el-image style="width: 100%; height: 100px" :src="item.picture" fit="cover"></el-image>
            </div>
            <div class="info-box">
              <div class="goods-name">{{item.name}}</div>
              <div class="goods-price">￥{{item.price}}</div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "goodsList",
  props: ["setting"],
  data() {
    return {
      goodsList: []
    }
  },
  watch: {
    setting: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log("watch - goodsList setting");
        console.log(val);
        this.filterList(val);
      }
    }
  },
  mounted() {
    console.log("this.setting");
    console.log(this.setting);
  },
  methods: {
    filterList(val) {
      if(val.numberType == 'custom' && val.chooseMode == 'auto') {
        this.goodsList = val.autoList.slice(0, val.number);;
      } else if (val.chooseMode == 'hand') {
        this.goodsList = val.handList;
      } else {
        this.goodsList = val.autoList;
      }
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>