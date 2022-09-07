---
slug: textarea的placeholder不起作用
title: textarea的placeholder不起作用
authors: Jeffrey
tags: [textarea, placeholder, bug]
---

## textarea 的 placeholder 不起作用

代码展示

```html
<textarea name="textarea" placeholder="placeholder"></textarea>
```

## 解决

- 去掉闭合标签前面的换行符号

```html
<textarea name="textarea" placeholder="placeholder"></textarea>
```
