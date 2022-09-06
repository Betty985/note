# 笔记

## 组件基础

### 对react的理解

破题：**概念、用途、核心思路或运行流程、优缺点**

#### 概念

react诞生于jq、angular、backbone相继流行的时代。jq诞生于2005年，为了解决**浏览器兼容性**这个当时最大的问题，jq封装dom 操作，提供样式选择器，封装了ajax、链式操作等大量基础函数。但是jq**不能解决代码如何组织**的问题，甚至不能称之为框架，本质上只是一个工具函数集合。

随着PC性能越来越好，页面越来越复杂，**如何组织代码结构，有效提升复用率**成为了亟待解决的问题。2009年，angular带着java开发的先进经验来到前端世界，像spring boot一样提供了一揽子解决方案。angular的分层设计齐全而优秀，覆盖了web开发的方方面面，如MVC、数据绑定、前端路由、表单校验、设计模式等。jq时代和angular时代的一个明显区别是jq时代的难点在于浏览器，而angular时代的难点在它本身。虽然代码组织清晰，双向绑定极大提升了中后台网站的开发效率，但angular**无穷无尽的概念**让它看起来更像一个java框架。

2010年，backbone成为了一个很好的选择。

- 它的学习和改造成本低，大量的jq存量项目都可以尝试迁移，具有与前代的亲和性。

- 它考虑到了代码的组织性，引入了基础的MVC概念，提供集合与前端路由的封装，补齐了jq无序的短板。

前端项目在不断向工程化发展，但是仍有两个问题难以解决：

- 前端主要以UI组件为基础，需要一个可以使组件复用的开发方案，过去常见的复用方案是拼装模板。
- 组件作为基本单位应该是可以通过编写单元测试来维持稳定性的。过去通常从页面的维度思考，装上各种jq小插件。

在react中只要关心两件事：数据和组件。react给定相同的输入状态会生成一致的组件。只有输入和输出是恒定的，它才是可测的。“组合优于继承”，在构建UI视图时，组合组件始终是最优的解决方案。react通过组件化的方式解决视图层开发复用的问题。

#### 用途

react的用途是**构建视图**。因为react采用了虚拟dom，在适用场景上远比传统框架更为广泛。

- 支持PC和移动端网页；
- 可以用react native开发iOS和Android应用；
- react360可以开发VR应用
- 可以开发命令行应用

**react生态极大丰富了其使用场景**。

#### 核心思路

react的核心思路是声明式、组件化与通用性（一次学习，随处编写）

##### 声明式

声明式编程的优点是直观，一目了然，也便于组合。

##### 组件化

组件化的优势在于视图的拆分与模块复用，更容易使系统的功能低耦合高内聚。react组件化没有使用模板进行编写而是采用了声明式的jsx。

##### 通用性

只要可以兼容虚拟dom就能直接运行react。

#### 优缺点

优点：声明式、组件化和通用性

缺点：react只是js库，路由和状态管理等功能，react团队更希望交给社区解决。所以在技术选型和学习选择使用上有较高成本。

#### 总结

react是用于构建用户界面的 JavaScript 库，通过组件化方式解决视图层开发复用的问题。核心设计思路有声明式、组件化和通用性。这也是react的优点，缺点是它需要向社区寻找并整合解决方案。

### 为什么react要使用jsx？

破题：一句话解释、核心概念、方案对比

#### 解释

jsx是一个JavaScript的语法扩展，类似于XMl。

#### 核心概念

每个 JSX 元素只是调用 `React.createElement(component, props, ...children)` 的语法糖。在运行时会使用babel插件将jsx语法的代码还原为`React.createElement`的代码。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成。但是使用jsx可以使代码变得更为简洁，层次更清晰，可读性强。

#### 方案对比

react的设计初衷是关注点分离，希望通过合理的关注点保持组件开发的纯粹性。在react中关注点的基本单位是组件，单个组件是高内聚的，组件之间耦合度很低。

> 关注点分离在计算机科学中，是将代码分割为不同部分的设计原则，是面向对象的程序设计的核心概念。其中每一部分会有各自的关注焦点。
>
> 关注点分离的价值在于简化程序的开发和维护。当关注点分开时，各部分可以重复使用，以及独立开发和更新。具有特殊价值的是能够稍后改进或修改一段代码，而无须知道其他部分的细节必须对这些部分进行相应的更改。

其他技术方案分别是模板、模板字符串和JXON。

##### 模板

**弱关注分离、引入概念多。**

react认为引入模板是一种不佳的实现，因为非关注点的模板引入了更多了概念。

##### 模板字符串

**结构描述复杂，语法提示差。**

多次内部嵌套使代码结构复杂，开发工具的代码提示困难。

##### JXON

**语法提示差。**

大括号不能为元素在树中开始和结束，提供很好的代码提示。

#### babel如何实现JSX到JS的编译？
实现原理：babel读取代码并解析，生成AST,把AST传入插件层进行转换。
babel 怎么实现从jsx到js的编译。
### 如何避免生命周期中的坑？
破题：梳理生命周期，明确周期函数指责。
#### 概念
周期：挂载阶段、更新阶段、卸载阶段

职责：状态变更、错误处理

> 挂载阶段：组件从初始化到完成加载的过程。

constructor

作用：

constructor是类通用的构造函数，常用于初始化。过去constructor常用于初始化state和绑定函数。当类属性开始流行之后，react社区的写法中去除了 constructor。

原因：

- constructor中不推荐处理初始化以外的逻辑；
- constructor本身只是class的初始化函数，不属于react的生命周期。
- 移除constructor，代码会更简洁。

getDerivedStateFromProps

作用：getDerivedStateFromProps 的存在的唯一目的是让组件在 props 变化时返回一个对象来更新 state。

触发时机：
- props被传入时；
- state发生变化时；
- forceUpdate被调用时；

只要父级组件重新渲染时，getDerivedStateFromProps就会被调用。

反面模式：
- 直接复制props到state，会导致 state 后没有正确渲染。
- props变更后修改state，父组件传来的 prop 值没有变化，不会重置。

UNSAFE_componentwillmount

作用：在组件加载之前做某些操作。但是在react的异步渲染机制下，该方法可能会被多次调用，目前已被标记为弃用。一个良好的设计应该是不让用户有较高的理解成本。

render

作用：render返回的jsx结构用于描述具体的渲染内容。渲染时依靠react操作jsx描述结构来完成的。render应该是一个纯函数，不应该产生副作用。

反面模式：
- 调用setState：render在渲染时调用，setState会触发渲染，会造成死循环。
- 绑定事件：容易被频繁注册调用。

componentDidMount

作用：组件加载完成时做某些操作，如发起网络请求或绑定事件。在浏览器端可以认为componentDidMount在真实Dom绘制之后调用，在其他场景下，由于机器性能限制，视图可能还在绘制中。

> 更新阶段：外部props传入或者state发生变化的阶段

UNSAFE_componentWillReceiveProps

作用：功能可以被getDerivedStateFromProps替代，所以标记为弃用。getDerivedStateFromProps存在时，UNSAFE_componentWillReceiveProps不会被调用。

getDerivedStateFromProps

作用：getDerivedStateFromProps 的存在的唯一目的是让组件在 props 变化时返回一个对象来更新 state。

触发时机：
- props被传入时；
- state发生变化时；
- forceUpdate被调用时；

只要父级组件重新渲染时，getDerivedStateFromProps就会被调用。

反面模式：
- 直接复制props到state，会导致 state 后没有正确渲染。
- props变更后修改state，父组件传来的 prop 值没有变化，不会重置。

shouldComponentUpdate

作用：通过返回true或false确定是否需要触发新的渲染。添加判断条件来阻止不必要的渲染。PureComponent是更通用的优化方案，默认实现了shouldComponentUpdate函数，在函数中对props和state进行浅比较，判断是否触发更新。

UNSAFE_componentWillUpdate

在后续react的异步渲染设计中可能出现组件暂停渲染的情况，所以已废弃。

render

同挂载阶段一致。

getSnapshotBeforeUpdate

作用：配合react新的异步渲染机制，在DOM更新发生前被调用，返回值作为componentDidUpdate的第三个参数。

反面模式：不能使用setState()

componentDidUpdate

作用：在更新后会被立即调用。首次渲染不会执行此方法。可以在这里对DOM进行操作或者发送网络请求。

反面模式：在 componentDidUpdate() 中直接调用 setState()，没有包裹在一个条件语句里，会导致死循环和额外的重新渲染。

> 卸载阶段：组件从 DOM 中移除

componentWillUnmount

作用：主要用于执行清理工作。

反面模式：没有接触事件绑定，取消定时器。
<hr/>

职责：
- 什么情况下触发重新渲染？
- 错误处理？

重新渲染：
- 函数组件：在任何情况下都会重新渲染，可以通过React.memo优化。React.memo将跳过渲染组件的操作并直接复用最近一次渲染的结果。
- React.Component:如果不实现shouldComponentUpdate，有两种情况触发重新渲染。state发生变化；父组件的props传入；
- React.PureComponent:PureComponent默认实现了shouldComponentUpdate函数，在props与state进行浅比较，确认有变更时才会触发重新渲染。

错误边界：

错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树。错误边界可以捕获发生在整个子组件树的渲染期间、生命周期方法以及构造函数中的错误。

渲染时的报错，只能通过 componentDidCatch 捕获。

### react的请求应该放在哪里？
异步请求应该放在componentDidMount中。从时间顺序看：
- constructor：可以放，但是constructor不承载业务逻辑，而且随着类属性的流行，constructor已经很少使用了。
- componentWillMount:在新的异步渲染架构下会触发多次渲染，已标记为废弃。
- componentDidUpdate：如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。

### 类组件与函数组件有什么区别？
破题：共性与个性。

#### 相同点
组件是react最小代码片段，函数组件和类组件在使用方式和呈现效果上是完全一致的。
### 不同点
- 基础认知：类组件和函数组件代表了两种不同的设计思想和心智模式。类组件的根基是面向对象编程，有继承、属性和内部状态的管理；函数组件的根基是函数式编程，属于结构化编程的一种，假定输入和输出存在某种特定的映射关系。**函数组件更纯粹、简单、易于测试。这是他们最大的不同。**
- 独有能力：函数组件具有值捕获特性。函数组件里是快照值，而类组件里是最新值。类组件独有的是生命周期，可以通过生命周期包装业务逻辑。
- 使用场景：如果不使用Recompose或者hooks，使用生命周期用类组件；在Recompose和hooks的加持下，类组件和函数组件的能力边界是完全相同的。
- 设计模式：类组件可以实现继承，而函数组件不行。但是react不推荐继承，组合优于继承。因为继承的灵活性差，屏蔽的细节太多。
- 性能优化：类组件的优化主要靠shouldComponentUpdate阻断渲染，函数组件的优化主要靠React.memo跳过渲染组件的操作并直接复用最近一次渲染的结果。
- 未来趋势：react推荐使用函数组件，因为类组件存在三个问题：this的模糊性（class难以理解）、业务逻辑散落在生命周期中（复杂组件难以理解）、组件代码缺乏标准的拆分模式（状态复用难）
### 如何设计 React 组件？
破题：react组件的设计模式。