<template>
  <div class="navbar">
    <template v-for="item of setting.list">
      <div class="nav-item" :key="item.id">
        <span class="icon-box">
          <i class="iconfont" :class="item.icon"></i>
        </span>
        <div class="text">{{item.text}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "navbar",
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