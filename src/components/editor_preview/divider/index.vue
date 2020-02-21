<template>
  <div class="divider-component">
    <i class="divider-line" :style="{background: setting.color, height: setting.size+'px'}"></i>
  </div>
</template>

<script>
export default {
  name: 'dividerComponent',
  props: {
    setting: {
      type: Object,
      default() {
        return {
          color: '#333',
          size: '1'
        };
      }
    }
  }
}
</script>

<style>
@import url('./style/index.min.css');
</style>