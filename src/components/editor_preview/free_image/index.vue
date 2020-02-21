<template>
  <div class="free-image">
    <img class="img" :src="setting.imageUrl" alt="free image">
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