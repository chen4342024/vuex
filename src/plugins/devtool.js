
// 开发工具钩子
const devtoolHook =
    typeof window !== 'undefined' &&
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__

// 开发工具插件
export default function devtoolPlugin(store) {

    if (!devtoolHook) return

    store._devtoolHook = devtoolHook

    // 触发 vuex init
    devtoolHook.emit('vuex:init', store)

    // 监听 vuex:travel-to-state
    devtoolHook.on('vuex:travel-to-state', targetState => {
        store.replaceState(targetState)
    })

    // 触发 vuex:mutation
    store.subscribe((mutation, state) => {
        devtoolHook.emit('vuex:mutation', mutation, state)
    })
}
