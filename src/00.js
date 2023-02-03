/**
 * @Author: chenxixi
 * @Description: 如何让myself跟money一起变化
 * @Date: 2023-02-03 10:37:58
 */

let name = '林三心', age = 22, money = 20
let myself = `${name}今年${age}岁，存款${money}元`

console.log(myself) // 林三心今年22岁，存款20元

money = 300

// 预期：林三心今年22岁，存款300元
console.log(myself) // 实际：林三心今年22岁，存款20元

/**
 * 让myself的跟着money变化，再执行一次赋值
 */
myself = `${name}今年${age}岁，存款${money}元` // 再执行一次

// 预期：林三心今年22岁，存款300元
console.log(myself) // 实际：林三心今年22岁，存款300元