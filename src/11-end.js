/**
 * @Author: chenxixi
 * @Description: 最终代码
 * @Date: 2023-02-03 11:58:27
 */

const targetMap = new WeakMap()
function track(target, key) {
    // 如果此时activeEffect为null则不执行下面
    // 这里判断是为了避免例如console.log(person.name)而触发track
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    dep.add(activeEffect) // 把此时的activeEffect添加进去
}
function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (depsMap) {
        const dep = depsMap.get(key)
        if (dep) {
            dep.forEach(effect => effect())
        }
    }
}
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            track(receiver, key) // 访问时收集依赖
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            trigger(receiver, key) // 设值时自动通知更新
        }
    }

    return new Proxy(target, handler)
}

let activeEffect = null
function effect(fn) {
    activeEffect = fn
    activeEffect()
    activeEffect = null
}
function ref(initValue) {
    return reactive({
        value: initValue
    })
}
function computed(fn) {
    const result = ref()
    effect(() => result.value = fn())
    return result
}