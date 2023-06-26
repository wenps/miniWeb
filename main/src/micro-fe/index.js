import { rewriteRouter } from "./rewrite-router";
import { handleRouter } from "./handle-router";

let _apps = []

export const getApps = () => {
    return _apps
}

export const registerMicroApps = (apps) => {
    _apps = apps
}

export const start = () => {

    // 微前端运行原理：
    // 监听路由
    rewriteRouter()
    // 初始化的时候执行一次初始化路由逻辑
    handleRouter()
}