<template>
  <div class="graphic-nav">
    <template v-for="item of setting.list">
      <div class="nav-item" :key="item.id">
        <span class="icon-box">
          <el-image style="width: 45px; height: 45px" :src="item.imageUrl" fit="contain"></el-image>
        </span>
        <div class="title">{{item.title}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "graphicNav",
  props: ["setting"],
  mounted() {
    console.log("this.setting");
    console.log(this.setting);
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>