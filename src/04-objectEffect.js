/**
 * @Author: chenxixi
 * @Description: 对象的响应式
 * @Date: 2023-02-03 10:59:50
 */

const person = { name: '林三心', age: 22 }

let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''

/**
 * nameStr1 和 nameStr2 依赖于person.name
 * ageStr1 和 ageStr2 依赖于person.age
 * 所以name和age应该拥有自己的dep，并收集各自依赖变量所对应的effect
 */
const effectNameStr1 = () => { nameStr1 = `${person.name}是个大菜鸟` }
const effectNameStr2 = () => { nameStr2 = `${person.name}是个小天才` }
const effectAgeStr1 = () => { ageStr1 = `${person.age}岁已经算很老了` }
const effectAgeStr2 = () => { ageStr2 = `${person.age}岁还算很年轻啊` }

effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

person.name = 'sunshine_lin'
person.age = 18

effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊