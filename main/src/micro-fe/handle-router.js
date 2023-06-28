import { getApps } from './index';
import { importHTML } from './import-html';
// 处理路由变化
export const handleRouter = () => {
    // 创建一个异步任务将更新逻辑放到最后执行防止拿不到目标节点
    setTimeout(async () => {
        console.log('路由变化');
    
        // 2.匹配子应用
        // 2.1 获取当前路由路由 window.location.pathname
    
        // 2.2 去apps里面查找
        const apps = getApps(); // 获取app列表
        const app = apps.find((item) => window.location.pathname.startsWith(item.activeRule)); // 获取目标app
        if (!app) {
            // 如果没有匹配到app 则直接返回
            return;
        }
    
        // 3.加载子应用
        const container = document.querySelector(app.container); // 获得入口
        const {template, execScripts} = await importHTML(app.entry)
        container.appendChild(template); // 插入目标节点
    
        // 设置全局乾坤变量
        // window.__POWERED_BY_QIANKUN__ = true // 告知子应用在基座下渲染
    
        execScripts()
        
    
        
        
        // 手动加载子应用的script
        // 执行script中的代码
        // eval 或 new Function
    
        // 4.渲染子应用
        
    }, 0);
};
