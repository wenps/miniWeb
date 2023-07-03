export class sandbox { // 沙箱完整版
    running = false // 是否启动沙箱

    fakeWindow = {}
    realWindow = window

    box = null // 沙箱proxy实例

    constructor() {
        this.box = new Proxy(this.fakeWindow, {
            get: (target, key) => {
                if (Reflect.has(target, key))  return Reflect.get(target, key) // 优先代理对象

                // 否则从window上找
                const result = Reflect.get(this.realWindow, key)
                if (typeof result == 'function') {
                    // 如果当前项在window中为函数则返回待执行函数
                    return result.bind(this.realWindow)
                }
                return result
            },
            set: (target, key, value) => {
                // 沙箱启动的前提下
                if (this.running) {
                    Reflect.set(target, key, value)
                }
                return true
            }
        })
    }
    active() {
        this.running = true
    }
    inactive() {
        this.running = false
        this.fakeWindow = {}
    }
}


