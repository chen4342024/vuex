import { forEachValue } from '../util'

// Base data struct for store's module, package with some attribute and method
// 模块
export default class Module {

    // 构造函数
    constructor(rawModule, runtime) {
        this.runtime = runtime
        // Store some children item
        this._children = Object.create(null)
        // Store the origin module object which passed by programmer
        this._rawModule = rawModule
        const rawState = rawModule.state

        // Store the origin module's state
        this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
    }

    // 获取模块的命名空间
    get namespaced() {
        return !!this._rawModule.namespaced
    }

    // 添加子模块
    addChild(key, module) {
        this._children[key] = module
    }

    // 删除子模块
    removeChild(key) {
        delete this._children[key]
    }

    // 获取子模块
    getChild(key) {
        return this._children[key]
    }

    // 更新子模块
    update(rawModule) {
        this._rawModule.namespaced = rawModule.namespaced
        if (rawModule.actions) {
            this._rawModule.actions = rawModule.actions
        }
        if (rawModule.mutations) {
            this._rawModule.mutations = rawModule.mutations
        }
        if (rawModule.getters) {
            this._rawModule.getters = rawModule.getters
        }
    }

    //遍历子模块
    forEachChild(fn) {
        forEachValue(this._children, fn)
    }

    //遍历 getter
    forEachGetter(fn) {
        if (this._rawModule.getters) {
            forEachValue(this._rawModule.getters, fn)
        }
    }

    //遍历 action
    forEachAction(fn) {
        if (this._rawModule.actions) {
            forEachValue(this._rawModule.actions, fn)
        }
    }

    //遍历 mutation
    forEachMutation(fn) {
        if (this._rawModule.mutations) {
            forEachValue(this._rawModule.mutations, fn)
        }
    }
}
