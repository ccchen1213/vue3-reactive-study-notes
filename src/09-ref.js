/**
 * @Author: chenxixi
 * @Description: ref的实现
 * @Date: 2023-02-03 11:56:47
 */

function ref (initValue) {
  return reactive({
      value: initValue
  })
}

let num = ref(5)

effect(() => sum = num.value * 100)

console.log(sum) // 500

num.value = 10

console.log(sum) // 1000