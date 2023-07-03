import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let instance = null

function render(props) {
  const {container} = props
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app') // 看是否微前端的场景，如果是则挂载到指定的根节点下
}

if(!window.__POWERED_BY_QIANKUN__) {
  // 如果乾坤不存在，走默认挂载，独立运行
  mount({})
}

export async function bootstrap() {
  window.xxx = 2131
  console.log(window.xxx, 12);
}

// 挂载逻辑
export async function mount(props) {
  render(props)
}

// 组件实例卸载流程
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
// window.unmount = unmount
