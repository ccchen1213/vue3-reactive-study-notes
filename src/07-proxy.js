/**
 * @Author: chenxixi
 * @Description: 使用proxy自动收集依赖，自动更新
 * @Date: 2023-02-03 11:31:03
 */

/**
 * 这里的proxy需要搭配Reflect
 * Reflect 是一个内置的对象，所有属性和方法都是静态的
 * Reflect.get(target, propertyKey[, receiver])：获取对象身上某个属性的值，类似于 target[name]
 * Reflect.set(target, propertyKey, value[, receiver])：将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true
 */
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      track(receiver, target)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      trigger(receiver, key)
    }
  }
  return new Proxy(target, handler)
}

// 新建weakmap
const targetMap = new WeakMap()

function track(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    // 这里先暂且写死
    if (target === person) {
        if (key === 'name') {
            dep.add(effectNameStr1)
            dep.add(effectNameStr2)
        } else {
            dep.add(effectAgeStr1)
            dep.add(effectAgeStr2)
        }
    } else if (target === animal) {
        if (key === 'type') {
            dep.add(effectTypeStr1)
            dep.add(effectTypeStr2)
        } else {
            dep.add(effectHeightStr1)
            dep.add(effectHeightStr2)
        }
    }
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

const person = reactive({ name: '林三心', age: 22 }) // 传入reactive
const animal = reactive({ type: 'dog', height: 50 }) // 传入reactive

effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
effectTypeStr1()
effectTypeStr2()
effectHeightStr1()
effectHeightStr2()

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2)
// dog是个大菜鸟 dog是个小天才 50已经算很高了 50还算很矮啊

person.name = 'sunshine_lin'
person.age = 18
animal.type = '猫'
animal.height = 20

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2)
// 猫是个大菜鸟 猫是个小天才 20已经算很高了 20还算很矮啊