<template>
  <div id="app">
    <div class="table">
      <router-view />
    </div>
    <van-tabbar v-show="$route.meta.show" v-model="active" @change="">
      <van-tabbar-item icon="home-o" to="/Home">个人中心</van-tabbar-item>
      <van-tabbar-item icon="search" to="addEvent">事件上报</van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0
      }
    },
  }
</script>
<style>
  .table {
    padding-bottom: 50px;
  }
</style>