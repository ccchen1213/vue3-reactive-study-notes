/**
 * @Author: chenxixi
 * @Description: 使用map存储不同的dep
 * @Date: 2023-02-03 11:05:11
 */

const person = { name: '林三心', age: 22 }
let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''

const effectNameStr1 = () => { nameStr1 = `${person.name}是个大菜鸟` }
const effectNameStr2 = () => { nameStr2 = `${person.name}是个小天才` }
const effectAgeStr1 = () => { ageStr1 = `${person.age}岁已经算很老了` }
const effectAgeStr2 = () => { ageStr2 = `${person.age}岁还算很年轻啊` }

// 新建map
const depsMap = new Map()

function track(key) {
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    // 这里先暂且写死
    if (key === 'name') {
        dep.add(effectNameStr1)
        dep.add(effectNameStr2)
    } else {
        dep.add(effectAgeStr1)
        dep.add(effectAgeStr2)
    }
}

function trigger (key) {
    const dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => effect())
    }
}

/**
 * 经过track收集依赖后数据结构大致如下：
 * depsMap = { name: dep1, age: dep2 }
 * dep1 = Set(2) { effectNameStr1, effectNameStr2 }
 * dep2 = Set(2) { effectAgeStr1, effectAgeStr2 }
 */

track('name') // 收集person.name的依赖
track('age') // 收集person.age的依赖



effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

person.name = 'sunshine_lin'
person.age = 18

trigger('name') // 通知person.name的依赖变量更新
trigger('age') // 通知person.age的依赖变量更新

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊
