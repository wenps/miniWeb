<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-11 17:08:44
 * @LastEditTime: 2023-10-27 17:53:08
 * @FilePath: /miniWeb/vue2/src/App.vue
-->
<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <div class="home">
      <img alt="Vue logo" src="./assets/logo.png">
      <h1>VUE2</h1>
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
      <router-view/> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  created(){
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
