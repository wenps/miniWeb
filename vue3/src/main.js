import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'




let instance = null

function render(props) {
  const {container} = props
  instance = createApp(App)
  instance.use(store).mount(container ? container.querySelector('#app') : '#app') // 看是否微前端的场景，如果是则挂载到指定的根节点下
}

if(!window.__POWERED_BY_QIANKUN__) {
  // 如果乾坤不存在，走默认挂载，独立运行
  mount({})
}

export async function bootstrap() {
  console.log('bootstrap');
}

// 挂载逻辑
export async function mount(props) {
  render(props)
}

// 组件实例卸载流程
export async function unmount() {
  instance.unmount()
  instance = null
}