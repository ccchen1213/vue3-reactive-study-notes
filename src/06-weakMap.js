/**
 * @Author: chenxixi
 * @Description: 含多个对象时，使用weakMap存储对象的map
 * @Date: 2023-02-03 11:12:29
 */

const person = { name: '林三心', age: 22 }
const animal = { type: 'dog', height: 50 }

let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''
let typeStr1 = ''
let typeStr2 = ''
let heightStr1 = ''
let heightStr2 = ''

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

const effectNameStr1 = () => { nameStr1 = `${person.name}是个大菜鸟` }
const effectNameStr2 = () => { nameStr2 = `${person.name}是个小天才` }
const effectAgeStr1 = () => { ageStr1 = `${person.age}岁已经算很老了` }
const effectAgeStr2 = () => { ageStr2 = `${person.age}岁还算很年轻啊` }
const effectTypeStr1 = () => { typeStr1 = `${animal.type}是个大菜鸟` }
const effectTypeStr2 = () => { typeStr2 = `${animal.type}是个小天才` }
const effectHeightStr1 = () => { heightStr1 = `${animal.height}已经算很高了` }
const effectHeightStr2 = () => { heightStr2 = `${animal.height}还算很矮啊` }

track(person, 'name') // 收集person.name的依赖
track(person, 'age') // 收集person.age的依赖
track(animal, 'type') // animal.type的依赖
track(animal, 'height') // 收集animal.height的依赖

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

trigger(person, 'name')
trigger(person, 'age')
trigger(animal, 'type')
trigger(animal, 'height')

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2)
// 猫是个大菜鸟 猫是个小天才 20已经算很高了 20还算很矮啊