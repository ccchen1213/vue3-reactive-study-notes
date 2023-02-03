/**
 * @Author: chenxixi
 * @Description: 增加effect函数
 * @Date: 2023-02-03 10:37:17
 */

/**
 * 每次money改变都需要再执行一次myself赋值，非常不优雅，我们可以封装一个effect函数  
 */
let name = '林三心', age = 22, money = 20
let myself = '' 
const effect = () => myself = `${name}今年${age}岁，存款${money}元`

effect() // 先执行一次
console.log(myself) // 林三心今年22岁，存款20元
money = 300

effect() // 再执行一次

console.log(myself) // 林三心今年22岁，存款300元
