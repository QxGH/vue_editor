<template>
  <div class="free-text">
    <div class="text" v-html="setting.text" :style="{color: setting.color ? setting.color : '#333', fontSize: setting.size+'px' ? setting.size+'px' : '14px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'freeImage',
  props: ['setting']
}
</script>

<style>
@import url('./style/index.min.css');
</style>