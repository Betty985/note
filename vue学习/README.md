# Vue 3 + Vite

# vue 特点

- **组件化模式**，提高代码复用率，让代码能更好地维护 【component 与 module】
- **声明式编码**，无需直接操作 DOM，提高开发效率 【声明式和命令式有啥区别？】
- **虚拟 dom 和 diff 算法**，尽可能复用 dom 【vnode 是个什么？diff 是怎么实现？】

---

# 注意

- vue 实例和容器只能是一对一
- {{js表达式，可以读取vm和vue原型中所有属性}}
- v-bind 把表达式结果绑定给属性，单向绑定：数据从 data 流向页面
- v-model 一般用在表单元素上（输入类元素），默认收集 value 值，双向绑定
- Vue 管理的函数如 data 函数不能用箭头函数，因为箭头函数没有 this

# vue 中的数据代理

- 通过 vue 实例对象来代理 data 对象中属性的操作（读写）
- 好处：更加方便地操作 data 中的数据
- 基本原理：通过 Object.defineProperty()把 data 对象中的所有属性添加到 vue 实例对象上；
- 为每一个添加到 vue 实例对象上的属性都指定一个 getter/setter;  
  在 getter/setter 内部去操作 data 中对应的属性

# 响应式

- vue2.x 通过 Object.defineProperty()实现，vue3.x 通过 proxy 实现

# 模板解析

- 将模板解析为 AST（abstract syntax tree)，遍历 AST 标记静态节点，使用 AST 生成渲染函数
- 三个模块：解析器、优化器、代码生成器

# css

## 垂直居中

### flex

```html

```

### absolute
