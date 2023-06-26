import { handleRouter } from './handle-router';

export const rewriteRouter = () => {
    // 1.监视路由变化

    // hash 路由 window.onhashchange

    // history 路由
    // history.go, history.back, history.forward 使用 popstate事件监听， 事件：window.onpopstate
    window.addEventListener('popstate', () => {
        console.log('popstate');
        handleRouter();
    });

    // pushState，replaceState 需要通过函数重写的方式劫持
    const rawPushState = window.history.pushState; // 存储 pushState 原函数
    window.history.pushState = (...args) => {
        rawPushState.apply(window.history, args);
        console.log('监视到 pushState 变化了');
        handleRouter();
    };

    const rawReplaceState = window.history.replaceState; // 存储 pushState 原函数
    window.history.replaceState = (...args) => {
        rawReplaceState.apply(window.history, args);
        console.log('监视到 replaceState 变化了');
        handleRouter();
    };
};
