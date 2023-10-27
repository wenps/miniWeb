<!--
 * @Author: xiaoshanwen
 * @Date: 2023-07-19 22:37:08
 * @LastEditTime: 2023-10-27 13:56:56
 * @FilePath: /miniWeb/vue2/src/views/HomeView.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue2.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
