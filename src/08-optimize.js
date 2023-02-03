/**
 * @Author: chenxixi
 * @Description: 前面我们实现track函数时，target和key是写死的判断，实际开发中肯定是不能这样写的。
 * 我们可以使用一个全局变量activeEffect来解决这个问题，每一个effect函数一执行，就把自身放到对应的dep里
 * @Date: 2023-02-03 11:47:05
 */

// 改装effect函数
let activeEffect = null
function effect(fn) {
  activeEffect = fn
  activeEffect()
  activeEffect = null
}

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

// 每个effect函数改成这么执行
effect(effectNameStr1)
effect(effectNameStr2)
effect(effectAgeStr1)
effect(effectAgeStr2)
effect(effectTypeStr1)
effect(effectTypeStr2)
effect(effectHeightStr1)
effect(effectHeightStr2)