/**
 * @Author: chenxixi
 * @Description: effect函数的缺陷
 * @Date: 2023-02-03 10:40:43
 */

let name = '林三心', age = 22, money = 20
let myself = '', ohtherMyself = ''
const effect1 = () => myself = `${name}今年${age}岁，存款${money}元`
const effect2 = () => ohtherMyself = `${age}岁的${name}居然有${money}元`

effect1() // 先执行一次
effect2() // 先执行一次
console.log(myself) // 林三心今年22岁，存款20元
console.log(ohtherMyself) // 22岁的林三心居然有20元
money = 300

/**
 * 增加了一个ohtherMyself，就得再写一个effect，然后每次更新都执行一次 
 */
effect1() // 再执行一次
effect2() // 再执行一次

console.log(myself) // 林三心今年22岁，存款300元
console.log(ohtherMyself) // 22岁的林三心居然有300元
