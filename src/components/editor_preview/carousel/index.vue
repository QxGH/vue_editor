<template>
  <div class="carousel-component">
    <el-carousel trigger="click" :height="setting.height+'px'" arrow="always">
      <el-carousel-item class="carousel-item" v-for="(item, index) in setting.list" :key="index">
        <img :src="item.imageUrl" class="carousel-img" alt="carousel img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'carouselComponent',
  props: {
    setting: {
      type: Object,
      default() {
        let obj = {
          height: '200',
          list: [
            {
              imageUrl: 'https://qxtodo.com/editor/animation_wallpaper.jpg'
            }
          ]
        };
        return obj;
      }
    }
  },
  mounted(){
    console.log('this.setting')
    console.log(this.setting)
  }
}
</script>

<style>
@import url('./style/index.min.css');
</style>