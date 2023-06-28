import { MINI_WEB_MAP, VUE3, VUE2, REACT, ACTIVE_RULE } from '../constant/miniWeb';
export const miniWebList = [
    {
        name: REACT,
        entry: '//localhost:3000', // html应用入口
        container: ACTIVE_RULE, // 渲染位置
        activeRule: MINI_WEB_MAP[REACT]
    },
    {
        name: VUE2,
        entry: '//localhost:9002', // html应用入口
        container: ACTIVE_RULE, // 渲染位置
        activeRule: MINI_WEB_MAP[VUE2]
    },
    {
        name: VUE3,
        entry: '//localhost:9003', // html应用入口
        container: ACTIVE_RULE, // 渲染位置
        activeRule: MINI_WEB_MAP[VUE3]
    }
];
