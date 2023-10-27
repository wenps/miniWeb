/*
 * @Author: xiaoshanwen
 * @Date: 2023-07-19 22:37:08
 * @LastEditTime: 2023-10-27 14:21:09
 * @FilePath: /miniWeb/main/src/micro-fe/handle-router.js
 */
import { getApps } from './index';
import { importHTML } from './import-html';
import { errorCatch } from "./utils/error-catch";
import { sandbox } from "./utils/sandbox";


let lifeCycle = null
let container = null
let app = null // 存储一个全局的 子应用实例
// 处理路由变化
export const handleRouter = () => {

    // 如果子应用实例存在，则卸载
    if(app) {
        app.sandbox.inactive() // 关闭沙箱
        unmount()
    }

    // 创建一个异步任务将更新逻辑放到最后执行防止拿不到目标节点
    setTimeout(async () => {
        console.log('路由变化');
    
        // 2.匹配子应用
        // 2.1 获取当前路由路由 window.location.pathname
    
        // 2.2 去apps里面查找
        const apps = getApps(); // 获取app列表
        app = apps.find((item) => window.location.pathname.startsWith(item.activeRule)); // 获取目标app
        if (!app) {
            // 如果没有匹配到app 则直接返回
            return;
        }

        // 创建沙箱实例
        if (!app.sandbox) {
            app.sandbox = new sandbox()
        }
    
        // 3.加载子应用
        container = document.querySelector(app.container); // 获得入口
        container.innerHTML = ''
        const {template, execScripts} = await importHTML(app)
        container.appendChild(template); // 插入目标节点
    
        // 设置全局乾坤变量
        window.__POWERED_BY_QIANKUN__ = true // 告知子应用在基座下渲染
    
        lifeCycle = await execScripts()

        // 将 生命周期 挂载到 子应用列表中
        app.mount = lifeCycle.mount
        app.unmount = lifeCycle.unmount
        app.bootstrap = lifeCycle.bootstrap

        app.sandbox.active() // 启动沙箱
        // 执行生命周期函数
        bootstrap()
        mount()
    }, 0);
};

// 封装生命周期函数执行函数

const mount = errorCatch(async () => {
    console.log('mount');
    app.mount && await app.mount({
        container
    })
})

const unmount = errorCatch(async () => {
    console.log('unmount');
    app.unmount && await app.unmount()
})

const bootstrap = errorCatch(async () => {
    console.log('bootstrap');
    app.bootstrap && await app.bootstrap()
})
