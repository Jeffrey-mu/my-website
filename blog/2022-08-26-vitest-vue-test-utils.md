---
slug: vue/test-utils Vitest
title: 入门使用
authors: Jeffrey
tags: [Vitest, vue/test-utils, vue测试工具]
---

## 入门

- 本教程源码已上传[github](https://github.com/Jeffrey-mu/vitest_demo)

### 什么是 Vue 测试工具？

- Vue Test Utils (VTU) 是一组实用功能，旨在简化 Vue.js 组件的测试。它提供了一些方法来以隔离的方式挂载和与 Vue 组件交互。
  让我们看一个例子：

### 什么是 Vitest

- Vitest 是一个由 Vite 提供支持的极速单元测试框架。
- 你可以在 为什么是 [为什么是 Vitest](https://cn.vitest.dev/guide/why.html) 中了解有关该项目背后的基本原理的更多信息。

## vitest 优点

- 重复使用 Vite 的配置、转换器、解析器和插件 - 在您的应用程序和测试中保持一致。
- 拥有预期、快照、覆盖等 - 从 Jest 迁移很简单。
- 智能文件监听模式，就像是测试的 HMR！
- 由 esbuild 提供的开箱即用 ESM、TypeScript 和 JSX 支持。

```ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
// 这是测试组件
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg'],
}
// 创建测试用例
describe('displays message', () => {
  it('displays message', () => {
    // 使用 mount函数 挂载组件
    const wrapper = mount(MessageComponent, {
      props: {
        msg: 'Hello world',
      },
    })
    // 断言组件的呈现文本
    expect(wrapper.text()).toContain('Hello world') //可通过
    expect(wrapper.text()).toContain('Hello') //不可通过
  })
})
```

## 测试一个 TodoApp

- 安装组件
- 查找元素
- 填写表格
- 触发事件

### 入门

TodoApp 我们的一个简单的组件开始： todo 的简单组件

```html
<template>
  <div></div>
</template>

<script setup lang="ts" name="TodoApp">
  import { ref } from 'vue'
  const todos = ref([
    {
      id: 1,
      text: 'Learn Vue.js 3',
      completed: false,
    },
  ])
</script>
```

### 第一个测试 - 渲染一个 todo

我们将写出验证来做部分的第一个测试。让我们先看看测试然后讨论：

```ts
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp/index.vue'
import { describe, it, expect } from 'vitest'
describe('renders a todo', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoApp)
    const todo = wrapper.get('[data-test="todo"]')
    expect(todo.text()).toBe('Learn Vue.js 3')
  })
})
```

- 我们从导入 mountVTU 中渲染组件的主要组件。
- 运行测试会失败，我们通过属性选择器获取元素 `[data-test="todo"]`。

### 使测试通过

```html
<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>
  </div>
</template>
```

这个改变，测试就通过了。恭喜！您编写了第一个组件测试。

### 添加新的待办事项

我们将能够让用户的下一个功能是让用户创建一个新的待办事项。我们需要输入一个输入的表格，供用户输入一些文本。当用户提交表单时，我们新的任务被渲染。我们来看看测试：

```ts
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp/index.vue'
import { describe, it, expect } from 'vitest'
describe('renders a todo', () => {
  it('creates a todo', () => {
    const wrapper = mount(TodoApp)
    // 通过属性选择器获取全部元素 长度为1
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)
    // 设置input元素value = New todo
    wrapper.get('[data-test="new-todo"]').setValue('New todo')
    // 触发提交事件
    wrapper.get('[data-test="form"]').trigger('submit')
    // 再次回去长度应为2
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
  })
})
```

运行这个程序显然会失败。让我们更新 TodoApp.vue 以拥有`<form>`并测试我们`<input>`测试，通过：

```html
<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>
    <form data-test="form" @submit.prevent="createTodo">
      <input data-test="new-todo" v-model="newTodo" />
      <button type="submit"></button>
    </form>
  </div>
</template>

<script setup lang="ts" name="TodoApp">
  import { ref } from 'vue'
  const todos = ref([
    {
      id: 1,
      text: 'Learn Vue.js 3',
      completed: false,
    },
  ])
  const newTodo = ref('')
  function createTodo() {
    todos.value.push({
      id: 2,
      text: newTodo.value,
      completed: false,
    })
  }
</script>
```

我们使用绑定 v-model 到`<input>`并@submit 监听提交。createTodotodos

这看起来不错，但运行测试显示错误：

待办事项的数量没有。问题是 vitest 以同步方式执行测试，
并可能增加调用最终函数就结束测试。然而，Vue 会异步更新 DOM。我们需要标记测试 async，调用 await 任何导致 DOM 更改的方法。trigger 是这样的方法，所以是 setValue-我们可以按地预先设置并且设置 await 测试应该是一种简单的工作方式：

```ts
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp/index.vue'
import { describe, it, expect } from 'vitest'
describe('renders a todo', () => {
  // 修改测试用例 添加async await
  it('creates a todo', async () => {
    const wrapper = mount(TodoApp)
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)

    await wrapper.get('[data-test="new-todo"]').setValue('New todo')
    await wrapper.get('[data-test="form"]').trigger('submit')

    // 异步获取长度
    await expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
  })
})
```

### 完成待办事项

现在可以创建待办事项，让我们可以让用户使用如已完成的待办事项为我们/未完成的项目标记。

```ts
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp/index.vue'
import { describe, it, expect } from 'vitest'
describe('renders a todo', () => {
  // 修改测试用例 添加async await
  it('completes a todo', async () => {
    const wrapper = mount(TodoApp)

    await wrapper.get('[data-test="todo-checkbox"]').setValue(true)

    expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
  })
})
```

本次测试与前两次类似；我们找到一个元素并以相同的方式与之交互（我们 setValue 再次使用，因为我们正在与 a 交互`<input>`）。

最后，我们做一个断言。我们将为 completed 完成的 todo 应用一个类——然后我们可以使用它来添加一些样式以直观地指示一个 todo 的状态。

我们可以通过更新 todo 元素`<template>`以包含`<input type="checkbox">`和类绑定来通过此测试：

```html
<div
  v-for="todo in todos"
  :key="todo.id"
  data-test="todo"
  :class="[todo.completed ? 'completed' : '']"
>
  {{ todo.text }}
  <input type="checkbox" v-model="todo.completed" data-test="todo-checkbox" />
</div>
```

恭喜！您编写了第一个组件测试。
