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
- Vue 管理的函数如 data 函数不能用箭头函数，因为箭头函数没有 this;不被 vue 管理的最好写成箭头函数。目的是让 this 指向 vm 或组件实例对象

# 键盘事件

- 为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：
  .enter
  .tab
  .delete (捕获“删除”和“退格”键)
  .esc
  .space
  .up
  .down
  .left
  .right

- 系统修饰键（ctrl shift meta alt) keyup 时需要同时按下其他键并释放，才会触发。
  keydown 可以正常使用
- 大写按键 CapsLk 需要变成 caps-lk 才能用
- vue 中未提供别名的按键，可以使用按键原始的 key 值去绑定，但需要注意要转为 kebab-case(短横线命名)

# 计算属性

计算属性的 get 在第一次读取和计算依赖的数据变化时调用;

- 优势：与 methods 实现相比，内部有缓存机制（复用），效率更高，调试更方便
- 计算属性会出现在 vm 上，直接读取
- 通过 set 函数修改，并且要让计算依赖的数据变化

# 监视属性

可以监视 data 和 computed 的属性。  
监视属性必须存在才能监视

- 监视的属性变化时调用 handler 函数
- immediate 是一个布尔值，初始化是否执行 handler 函数
- 创建实例时已经明确了要监视的属性，可以直接传参。否则可以用 vm.$watch("属性")
- vue 不会监视对象里的数据,因为深度监视 deep 属性默认为 false

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
