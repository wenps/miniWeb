// import importHTML from "import-html-entry"; //  这个库也封装了沙箱

import { fetchResource } from "./utils/fetch-resource";
// 解析html
export const importHTML = async (app) => {
    const url = app.entry

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
        const module = { exports: {} }
        const exports = module.exports
        // 因为umd 格式会判断当前环境有没有 module 和 exports， 所以我们可以直接在当前环境构造出来，这样子就会将工厂函数返回结果赋值给module.exports
        scripts.forEach((code) => {
            // eval 执行的代码可以访问外部作用域
            // eval(code);
            ((window, module, exports) => {
                try {
                    eval(code);
                } catch (error) {
                    console.log(error);
                }
            })(app.sandbox.box, module, exports);
           
        }) // 遍历执行代码
        return module.exports
    }

    return {
        template,
        getExternalScripts,
        execScripts
    };
};
