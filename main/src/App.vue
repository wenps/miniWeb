<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="VUE2" :name="VUE2"></el-tab-pane>
      <el-tab-pane :label="VUE3" :name="VUE3"></el-tab-pane>
      <el-tab-pane :label="REACT" :name="REACT"></el-tab-pane>
    </el-tabs>
    <div id="subapp-container"></div>
  </div>
</template>
<script>
  import { MINI_WEB_MAP, VUE2, VUE3, REACT } from "./constant/miniWeb";
  export default {
    data() {
      return {
        activeName: VUE2,
        miniWebMap: MINI_WEB_MAP,
        VUE2,
        VUE3,
        REACT
      };
    },
    methods: {
      handleClick() {
        window.history.pushState({}, '', this.miniWebMap[this.activeName])
      }
    }
  };
</script>