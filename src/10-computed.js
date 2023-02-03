/**
 * @Author: chenxixi
 * @Description: computed的实现
 * @Date: 2023-02-03 11:57:39
 */

function computed(fn) {
  const result = ref()
  effect(() => result.value = fn()) // 执行computed传入函数
  return result
}

let num1 = ref(5)
let num2 = ref(8)
let sum1 = computed(() => num1.value * num2.value)
let sum2 = computed(() => sum1.value * 10)

console.log(sum1.value) // 40
console.log(sum2.value) // 400

num1.value = 10

console.log(sum1.value) // 80
console.log(sum2.value) // 800

num2.value = 16

console.log(sum1.value) // 160
console.log(sum2.value) // 1600