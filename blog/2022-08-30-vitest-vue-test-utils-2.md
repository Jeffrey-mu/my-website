---
slug: vue/test-utils 事件处理
title: 事件处理
authors: Jeffrey
tags: [Vitest, vue/test-utils, vue测试工具]
---

- [源码地址](https://github.com/Jeffrey-mu/vitest_demo/tree/master/src/components/Counter/index.md)

## 事件处理

- Vue 组件通过 `props` 和通过调用`emit`. 在本指南中，我们将了解如何使用该`emitted()`函数验证事件是否正确发出。

## 计数器组件

这是一个简单的`<Counter>`组件。它具有一个按钮，当单击该按钮时，会增加一个内部计数变量并发出其值：

```vue
<template>
  <button @click="handleClick">Increment</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['increment'])
const count = ref(0)
function handleClick() {
  count.value += 1
  emit('increment', count)
}
</script>
```

为了全面测试这个组件，我们应该验证是否发出了`increment`具有最新`count`值的事件。

## 断言发出的事件

为此，我们将依赖该`emitted()`方法。它返回一个对象，其中包含组件已发出的所有事件，以及它们在数组中的参数。让我们看看它是如何工作的：

```ts
it('emits an event when clicked', () => {
  const wrapper = mount(Counter)

  wrapper.find('button').trigger('click')
  wrapper.find('button').trigger('click')

  expect(wrapper.emitted()).toHaveProperty('increment')
})
```

首先要注意的是`emitted()`返回一个对象，其中每个键都匹配一个发出的事件。在这种情况下，`increment`。

这个测试应该通过。我们确保我们发出了一个具有适当名称的事件。

## 断言事件的论点

这很好——但我们可以做得更好！我们需要检查我们在`emit('increment', count)`被调用时是否发出了正确的参数。

我们的下一步是断言事件包含该`count`值。我们通过将参数传递给`emitted()`.

```ts
it('emits an event with count when clicked', () => {
  const wrapper = mount(Counter)

  wrapper.find('button').trigger('click')
  wrapper.find('button').trigger('click')

  // `emitted()` accepts an argument. It returns an array with all the
  // occurrences of `this.$emit('increment')`.
  const incrementEvent = wrapper.emitted('increment')

  // We have "clicked" twice, so the array of `increment` should
  // have two values.
  expect(incrementEvent).toHaveLength(2)

  // Assert the result of the first click.
  // Notice that the value is an array.
  expect(incrementEvent[0]).toEqual([1])

  // Then, the result of the second one.
  expect(incrementEvent[1]).toEqual([2])
})
```

让我们回顾一下并分解`emitted()`. 这些键中的每一个都包含测试期间发出的不同值：

```js
// console.log(wrapper.emitted('increment'))
;[
  [1], // first time it is called, `count` is 1
  [2], // second time it is called, `count` is 2
]
```

## 断言复杂事件

想象一下，现在我们的`<Counter>`组件需要发出一个带有附加信息的对象。例如，我们需要告诉任何监听@`increment`事件的父组件`count`是偶数还是奇数：

修改一下我们的点击事件

```ts
function handleClick() {
  count.value += 1
  emit('increment', {
    count: count.value,
    isEven: count.value % 2 === 0,
  })
}
```

正如我们之前所做的，我们需要在元素上触发`click`事件。`<button>`然后，我们`emitted('increment')`用来确保发出正确的值。

```ts
it('emits an event with count when clicked', () => {
  const wrapper = mount(Counter)

  wrapper.find('button').trigger('click')
  wrapper.find('button').trigger('click')

  // We have "clicked" twice, so the array of `increment` should
  // have two values.
  expect(wrapper.emitted('increment')).toHaveLength(2)

  // Then, we can make sure each element of `wrapper.emitted('increment')`
  // contains an array with the expected object.
  expect(wrapper.emitted('increment')[0]).toEqual([
    {
      count: 1,
      isEven: false,
    },
  ])

  expect(wrapper.emitted('increment')[1]).toEqual([
    {
      count: 2,
      isEven: true,
    },
  ])
})
```

测试诸如对象之类的复杂事件负载与测试诸如数字或字符串之类的简单值没有什么不同。

## 结论

用于`emitted()`访问从 `Vue` 组件发出的事件。
`emitted(eventName)`返回一个数组，其中每个元素代表一个发出的事件。
参数`emitted(eventName)[index]`以它们发出的相同顺序存储在数组中
