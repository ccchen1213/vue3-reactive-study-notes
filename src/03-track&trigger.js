/**
 * @Author: chenxixi
 * @Description: track和trigger方法
 * @Date: 2023-02-03 10:44:20
 */

let name = '林三心', age = 22, money = 20
let myself = '', ohtherMyself = ''
const effect1 = () => myself = `${name}今年${age}岁，存款${money}元`
const effect2 = () => ohtherMyself = `${age}岁的${name}居然有${money}元`

// 使用set结构，能够自动去重
// 将相关的effect方法放入dep中
const dep = new Set()

function track () {
    dep.add(effect1)
    dep.add(effect2)
}

function trigger() {
    dep.forEach(effect => effect())
}

track() //收集依赖
effect1() // 先执行一次
effect2() // 先执行一次
console.log(myself) // 林三心今年22岁，存款20元
console.log(ohtherMyself) // 22岁的林三心居然有20元
money = 300

trigger() // 通知变量myself和otherMyself进行更新

console.log(myself) // 林三心今年22岁，存款300元
console.log(ohtherMyself) // 22岁的林三心居然有300元