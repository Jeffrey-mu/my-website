# css 禁止选中文本

## CSS-禁止文本被选中代码：

pc 端：

```css
.not-select {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
```

移动：

```css
.no-touch {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

### user-select 属性说明：

> user-select 属性设置或检索是否允许用户选中文本

语法：

user-select：none |text| all | element

默认值：text

适用于：除替换元素外的所有元素

继承性：无

动画性：否

计算值：指定值

取值：

none：文本不能被选择

text：可以选择文本

all：当所有内容作为一个整体时可以被选择。如果双击或者在上下文上点击子元素，那么被选择的部分将是以该子元素向上回溯的最高祖先元素。

lement：可以选择文本，但选择范围受元素边界的约束
