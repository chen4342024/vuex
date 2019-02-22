// 混入一些内容
export default function(Vue) {
    const version = Number(Vue.version.split('.')[0])

    if (version >= 2) {
        Vue.mixin({ beforeCreate: vuexInit })
    } else {
        // override init and inject vuex init procedure
        // for 1.x backwards compatibility.
        const _init = Vue.prototype._init
        Vue.prototype._init = function(options = {}) {
            options.init = options.init ? [vuexInit].concat(options.init) :
                vuexInit
            _init.call(this, options)
        }
    }

    /**
     * Vuex init hook, injected into each instances init hooks list.
     */

    function vuexInit() {
        const options = this.$options
        // store injection
        // 初始化的时候 ， 传入 new Vue({ store: store });
        if (options.store) {
            this.$store = typeof options.store === 'function' ?
                options.store() :
                options.store
        } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store
        }
    }
}
