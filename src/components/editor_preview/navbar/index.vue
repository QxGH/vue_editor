<template>
  <div class="navbar">
    <div class="nav-item">
      nav-1
    </div>
    <div class="nav-item">
      nav-2
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>
  .navbar {
    width: 100%;
    height: 100%;
    text-align: center;
    border-top: 1px solid #ddd;
    display:flex;
  }
  .nav-item {
    flex:1;
  }
</style>