// import importHTML from "import-html-entry"; //  这个库也封装了沙箱

import { fetchResource } from "./utils/fetch-resource";
// 解析html
export const importHTML = async (url) => {
    // 请求获取子应用 返回内容
    const html = await fetchResource(url)
    const template = document.createElement('div');
    template.innerHTML = html // 将返回内容挂载在自定义的节点下，方便对齐进行操作

    const scripts = [...template.querySelectorAll('script')]

    // 获取所有script标签代码： [代码， 代码]
    function getExternalScripts() {
        // 1.客户端渲染需要通过执行js生成内容
        // 2.innerhtml 中的script 不会加载执行
        return Promise.all(scripts.map(script => {
            const src = script.getAttribute('src')
            if(!src) {
                // 没有src外链，说明是content型 脚本 ，获取脚本下内容
                return Promise.resolve(script.innerHTML)
            }
            // 如果有src外链，则请求然后获取脚本下内容

            return fetchResource(src.startsWith('http')?src:`${url}${src}`)
        }))
    }

    // 获取并执行所有的script代码
    async function execScripts() {
        const scripts = await getExternalScripts()
        console.log(scripts);
        scripts.forEach((code) => {
            eval(code)
        }) // 遍历执行代码
    }

    return {
        template,
        getExternalScripts,
        execScripts
    };
};
