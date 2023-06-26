import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { miniWebList } from "./miniRouter";
import store from './store'
import { Tabs, TabPane } from "element-ui";
// import { registerMicroApps, start } from 'qiankun'
import { registerMicroApps, start } from "./micro-fe/index";


Vue.use(Tabs)
Vue.use(TabPane)

const apps = miniWebList

registerMicroApps(apps)

start({
  sandbox: {
    experimentalStyleIsolation: true
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
