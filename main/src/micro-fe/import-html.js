// import importHTML from "import-html-entry"; //  这个库也封装了沙箱

import { fetchResource } from "./utils/fetch-resource";
// 解析html
export const importHTML = async (url) => {
    // 请求获取子应用 返回内容
    const html = await fetchResource(url)
    const template = document.createElement('div');
    template.innerHTML = html // 将返回内容挂载在自定义的节点下，方便对齐进行操作

    const scripts = template.querySelectorAll('script')

    // 获取所有script标签代码： [代码， 代码]
    async function getExternalScripts() {
        console.log(scripts);
    }

    // 获取并执行所有的script代码
    function execScripts() {}

    return {
        template,
        getExternalScripts,
        execScripts
    };
};
