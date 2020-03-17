<template>
  <div class="free-omnipotent"></div>
</template>

<script>
export default {
  name: "freeBtn",
  props: {
    setting: {
      type: Object,
      default() {
        return {
          width: 100,
          height: 40
        };
      }
    },
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>