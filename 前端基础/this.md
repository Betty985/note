this是js关键字，是**当前执行上下文（global、function 或 eval）的一个属性**，在非严格模式下，总是指向一个对象，在严格模式下可以是任意值。
## 获取全局对象
- web:window,self,frames,this
```js
window.self===window
true
window.frames===window
true
```
- node:global
- worker:self
- 通用:globalThis
## 全局上下文
无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象。
var声明的全局变量会挂在window下。
## 函数上下文
在函数内部，this的值取决于函数被调用的方式。
在严格模式下，如果进入执行环境时没有设置 this 的值，this 会保持为 undefined。
## 类上下文
this 在 类 中的表现与在函数中类似，因为类本质上也是函数，但也有一些区别和注意事项。
类的非静态方法在new的过程中添加到this上去，类原型上的静态属性（类的静态方法）
# 相关网站
- [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)