
/**
 * 基于 Proxy 实现的沙箱
 */
export default class ProxySandbox implements SandBox {
    /** window 值变更记录 */
    private updatedValueSet = new Set<PropertyKey>();
  
    name: string;
  
    type: SandBoxType;
  
    proxy: WindowProxy;
  
    sandboxRunning = true;
  
    latestSetProp: PropertyKey | null = null;
  
    active() {
      if (!this.sandboxRunning) activeSandboxCount++;
      this.sandboxRunning = true;
    }
  
    inactive() {
      if (process.env.NODE_ENV === 'development') {
        console.info(`[qiankun:sandbox] ${this.name} modified global properties restore...`, [
          ...this.updatedValueSet.keys(),
        ]);
      }
  
      if (--activeSandboxCount === 0) {
        variableWhiteList.forEach((p) => {
          if (this.proxy.hasOwnProperty(p)) {
            // @ts-ignore
            delete window[p];
          }
        });
      }
  
      this.sandboxRunning = false;
    }
  
    constructor(name: string) {
      this.name = name;
      this.type = SandBoxType.Proxy;
      const { updatedValueSet } = this;
  
      const rawWindow = window;
      const { fakeWindow, propertiesWithGetter } = createFakeWindow(rawWindow);
  
      const descriptorTargetMap = new Map<PropertyKey, SymbolTarget>();
      const hasOwnProperty = (key: PropertyKey) => fakeWindow.hasOwnProperty(key) || rawWindow.hasOwnProperty(key);
  
      const proxy = new Proxy(fakeWindow, {
        set: (target: FakeWindow, p: PropertyKey, value: any): boolean => {
          if (this.sandboxRunning) {
            // We must kept its description while the property existed in rawWindow before
            if (!target.hasOwnProperty(p) && rawWindow.hasOwnProperty(p)) {
              const descriptor = Object.getOwnPropertyDescriptor(rawWindow, p);
              const { writable, configurable, enumerable } = descriptor!;
              if (writable) {
                Object.defineProperty(target, p, {
                  configurable,
                  enumerable,
                  writable,
                  value,
                });
              }
            } else {
              // @ts-ignore
              target[p] = value;
            }
  
            if (variableWhiteList.indexOf(p) !== -1) {
              // @ts-ignore
              rawWindow[p] = value;
            }
  
            updatedValueSet.add(p);
  
            this.latestSetProp = p;
  
            return true;
          }
  
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[qiankun] Set window.${p.toString()} while sandbox destroyed or inactive in ${name}!`);
          }
  
          // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
          return true;
        },
  
        get(target: FakeWindow, p: PropertyKey): any {
          if (p === Symbol.unscopables) return unscopables;
  
          // avoid who using window.window or window.self to escape the sandbox environment to touch the really window
          // see https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js#L13
          if (p === 'window' || p === 'self') {
            return proxy;
          }
  
          if (
            p === 'top' ||
            p === 'parent' ||
            (process.env.NODE_ENV === 'test' && (p === 'mockTop' || p === 'mockSafariTop'))
          ) {
            // if your master app in an iframe context, allow these props escape the sandbox
            if (rawWindow === rawWindow.parent) {
              return proxy;
            }
            return (rawWindow as any)[p];
          }
  
          // proxy.hasOwnProperty would invoke getter firstly, then its value represented as rawWindow.hasOwnProperty
          if (p === 'hasOwnProperty') {
            return hasOwnProperty;
          }
  
          // mark the symbol to document while accessing as document.createElement could know is invoked by which sandbox for dynamic append patcher
          if (p === 'document' || p === 'eval') {
            setCurrentRunningSandboxProxy(proxy);
            // FIXME if you have any other good ideas
            // remove the mark in next tick, thus we can identify whether it in micro app or not
            // this approach is just a workaround, it could not cover all complex cases, such as the micro app runs in the same task context with master in some case
            nextTick(() => setCurrentRunningSandboxProxy(null));
            switch (p) {
              case 'document':
                return document;
              case 'eval':
                // eslint-disable-next-line no-eval
                return eval;
              // no default
            }
          }
  
          // eslint-disable-next-line no-nested-ternary
          const value = propertiesWithGetter.has(p)
            ? (rawWindow as any)[p]
            : p in target
            ? (target as any)[p]
            : (rawWindow as any)[p];
          return getTargetValue(rawWindow, value);
        }
      });
  
      this.proxy = proxy;
  
      activeSandboxCount++;
    }
  }
  