# 笔记

## 组件基础

### 对 react 的理解

破题：**概念、用途、核心思路或运行流程、优缺点**

#### 概念

react 诞生于 jq、angular、backbone 相继流行的时代。jq 诞生于 2005 年，为了解决**浏览器兼容性**这个当时最大的问题，jq 封装 dom 操作，提供样式选择器，封装了 ajax、链式操作等大量基础函数。但是 jq**不能解决代码如何组织**的问题，甚至不能称之为框架，本质上只是一个工具函数集合。

随着 PC 性能越来越好，页面越来越复杂，**如何组织代码结构，有效提升复用率**成为了亟待解决的问题。2009 年，angular 带着 java 开发的先进经验来到前端世界，像 spring boot 一样提供了一揽子解决方案。angular 的分层设计齐全而优秀，覆盖了 web 开发的方方面面，如 MVC、数据绑定、前端路由、表单校验、设计模式等。jq 时代和 angular 时代的一个明显区别是 jq 时代的难点在于浏览器，而 angular 时代的难点在它本身。虽然代码组织清晰，双向绑定极大提升了中后台网站的开发效率，但 angular**无穷无尽的概念**让它看起来更像一个 java 框架。

2010 年，backbone 成为了一个很好的选择。

- 它的学习和改造成本低，大量的 jq 存量项目都可以尝试迁移，具有与前代的亲和性。

- 它考虑到了代码的组织性，引入了基础的 MVC 概念，提供集合与前端路由的封装，补齐了 jq 无序的短板。

前端项目在不断向工程化发展，但是仍有两个问题难以解决：

- 前端主要以 UI 组件为基础，需要一个可以使组件复用的开发方案，过去常见的复用方案是拼装模板。
- 组件作为基本单位应该是可以通过编写单元测试来维持稳定性的。过去通常从页面的维度思考，装上各种 jq 小插件。

在 react 中只要关心两件事：数据和组件。react 给定相同的输入状态会生成一致的组件。只有输入和输出是恒定的，它才是可测的。“组合优于继承”，在构建 UI 视图时，组合组件始终是最优的解决方案。react 通过组件化的方式解决视图层开发复用的问题。

#### 用途

react 的用途是**构建视图**。因为 react 采用了虚拟 dom，在适用场景上远比传统框架更为广泛。

- 支持 PC 和移动端网页；
- 可以用 react native 开发 iOS 和 Android 应用；
- react360 可以开发 VR 应用
- 可以开发命令行应用

**react 生态极大丰富了其使用场景**。

#### 核心思路

react 的核心思路是声明式、组件化与通用性（一次学习，随处编写）

##### 声明式

声明式编程的优点是直观，一目了然，也便于组合。

##### 组件化

组件化的优势在于视图的拆分与模块复用，更容易使系统的功能低耦合高内聚。react 组件化没有使用模板进行编写而是采用了声明式的 jsx。

##### 通用性

只要可以兼容虚拟 dom 就能直接运行 react。

#### 优缺点

优点：声明式、组件化和通用性

缺点：react 只是 js 库，路由和状态管理等功能，react 团队更希望交给社区解决。所以在技术选型和学习选择使用上有较高成本。

#### 总结

react 是用于构建用户界面的 JavaScript 库，通过组件化方式解决视图层开发复用的问题。核心设计思路有声明式、组件化和通用性。这也是 react 的优点，缺点是它需要向社区寻找并整合解决方案。

### 为什么 react 要使用 jsx？

破题：一句话解释、核心概念、方案对比

#### 解释

jsx 是一个 JavaScript 的语法扩展，类似于 XMl。

#### 核心概念

每个 JSX 元素只是调用 `React.createElement(component, props, ...children)` 的语法糖。在运行时会使用 babel 插件将 jsx 语法的代码还原为`React.createElement`的代码。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成。但是使用 jsx 可以使代码变得更为简洁，层次更清晰，可读性强。

#### 方案对比

react 的设计初衷是关注点分离，希望通过合理的关注点保持组件开发的纯粹性。在 react 中关注点的基本单位是组件，单个组件是高内聚的，组件之间耦合度很低。

> 关注点分离在计算机科学中，是将代码分割为不同部分的设计原则，是面向对象的程序设计的核心概念。其中每一部分会有各自的关注焦点。
>
> 关注点分离的价值在于简化程序的开发和维护。当关注点分开时，各部分可以重复使用，以及独立开发和更新。具有特殊价值的是能够稍后改进或修改一段代码，而无须知道其他部分的细节必须对这些部分进行相应的更改。

其他技术方案分别是模板、模板字符串和 JXON。

##### 模板

**弱关注分离、引入概念多。**

react 认为引入模板是一种不佳的实现，因为非关注点的模板引入了更多了概念。

##### 模板字符串

**结构描述复杂，语法提示差。**

多次内部嵌套使代码结构复杂，开发工具的代码提示困难。

##### JXON

**语法提示差。**

大括号不能为元素在树中开始和结束，提供很好的代码提示。

#### babel 如何实现 JSX 到 JS 的编译？

实现原理：babel 读取代码并解析，生成 AST,把 AST 传入插件层进行转换。
babel 怎么实现从 jsx 到 js 的编译。

### 如何避免生命周期中的坑？

破题：梳理生命周期，明确周期函数指责。

#### 概念

周期：挂载阶段、更新阶段、卸载阶段

职责：状态变更、错误处理

> 挂载阶段：组件从初始化到完成加载的过程。

constructor

作用：

constructor 是类通用的构造函数，常用于初始化。过去 constructor 常用于初始化 state 和绑定函数。当类属性开始流行之后，react 社区的写法中去除了 constructor。

原因：

- constructor 中不推荐处理初始化以外的逻辑；
- constructor 本身只是 class 的初始化函数，不属于 react 的生命周期。
- 移除 constructor，代码会更简洁。

getDerivedStateFromProps

作用：getDerivedStateFromProps 的存在的唯一目的是让组件在 props 变化时返回一个对象来更新 state。

触发时机：

- props 被传入时；
- state 发生变化时；
- forceUpdate 被调用时；

只要父级组件重新渲染时，getDerivedStateFromProps 就会被调用。

反面模式：

- 直接复制 props 到 state，会导致 state 后没有正确渲染。
- props 变更后修改 state，父组件传来的 prop 值没有变化，不会重置。

UNSAFE_componentwillmount

作用：在组件加载之前做某些操作。但是在 react 的异步渲染机制下，该方法可能会被多次调用，目前已被标记为弃用。一个良好的设计应该是不让用户有较高的理解成本。

render

作用：render 返回的 jsx 结构用于描述具体的渲染内容。渲染时依靠 react 操作 jsx 描述结构来完成的。render 应该是一个纯函数，不应该产生副作用。

反面模式：

- 调用 setState：render 在渲染时调用，setState 会触发渲染，会造成死循环。
- 绑定事件：容易被频繁注册调用。

componentDidMount

作用：组件加载完成时做某些操作，如发起网络请求或绑定事件。在浏览器端可以认为 componentDidMount 在真实 Dom 绘制之后调用，在其他场景下，由于机器性能限制，视图可能还在绘制中。

> 更新阶段：外部 props 传入或者 state 发生变化的阶段

UNSAFE_componentWillReceiveProps

作用：功能可以被 getDerivedStateFromProps 替代，所以标记为弃用。getDerivedStateFromProps 存在时，UNSAFE_componentWillReceiveProps 不会被调用。

getDerivedStateFromProps

作用：getDerivedStateFromProps 的存在的唯一目的是让组件在 props 变化时返回一个对象来更新 state。

触发时机：

- props 被传入时；
- state 发生变化时；
- forceUpdate 被调用时；

只要父级组件重新渲染时，getDerivedStateFromProps 就会被调用。

反面模式：

- 直接复制 props 到 state，会导致 state 后没有正确渲染。
- props 变更后修改 state，父组件传来的 prop 值没有变化，不会重置。

shouldComponentUpdate

作用：通过返回 true 或 false 确定是否需要触发新的渲染。添加判断条件来阻止不必要的渲染。PureComponent 是更通用的优化方案，默认实现了 shouldComponentUpdate 函数，在函数中对 props 和 state 进行浅比较，判断是否触发更新。

UNSAFE_componentWillUpdate

在后续 react 的异步渲染设计中可能出现组件暂停渲染的情况，所以已废弃。

render

同挂载阶段一致。

getSnapshotBeforeUpdate

作用：配合 react 新的异步渲染机制，在 DOM 更新发生前被调用，返回值作为 componentDidUpdate 的第三个参数。

反面模式：不能使用 setState()

componentDidUpdate

作用：在更新后会被立即调用。首次渲染不会执行此方法。可以在这里对 DOM 进行操作或者发送网络请求。

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

- 函数组件：在任何情况下都会重新渲染，可以通过 React.memo 优化。React.memo 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
- React.Component:如果不实现 shouldComponentUpdate，有两种情况触发重新渲染。state 发生变化；父组件的 props 传入；
- React.PureComponent:PureComponent 默认实现了 shouldComponentUpdate 函数，在 props 与 state 进行浅比较，确认有变更时才会触发重新渲染。

错误边界：

错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树。错误边界可以捕获发生在整个子组件树的渲染期间、生命周期方法以及构造函数中的错误。

渲染时的报错，只能通过 componentDidCatch 捕获。

### react 的请求应该放在哪里？

异步请求应该放在 componentDidMount 中。从时间顺序看：

- constructor：可以放，但是 constructor 不承载业务逻辑，而且随着类属性的流行，constructor 已经很少使用了。
- componentWillMount:在新的异步渲染架构下会触发多次渲染，已标记为废弃。
- componentDidUpdate：如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。

### 类组件与函数组件有什么区别？

破题：共性与个性。

#### 相同点

组件是 react 最小代码片段，函数组件和类组件在使用方式和呈现效果上是完全一致的。

### 不同点

- 基础认知：类组件和函数组件代表了两种不同的设计思想和心智模式。类组件的根基是面向对象编程，有继承、属性和内部状态的管理；函数组件的根基是函数式编程，属于结构化编程的一种，假定输入和输出存在某种特定的映射关系。**函数组件更纯粹、简单、易于测试。这是他们最大的不同。**
- 独有能力：函数组件具有值捕获特性。函数组件里是快照值，而类组件里是最新值。类组件独有的是生命周期，可以通过生命周期包装业务逻辑。
- 使用场景：如果不使用 Recompose 或者 hooks，使用生命周期用类组件；在 Recompose 和 hooks 的加持下，类组件和函数组件的能力边界是完全相同的。
- 设计模式：类组件可以实现继承，而函数组件不行。但是 react 不推荐继承，组合优于继承。因为继承的灵活性差，屏蔽的细节太多。
- 性能优化：类组件的优化主要靠 shouldComponentUpdate 阻断渲染，函数组件的优化主要靠 React.memo 跳过渲染组件的操作并直接复用最近一次渲染的结果。
- 未来趋势：react 推荐使用函数组件，因为类组件存在三个问题：this 的模糊性（class 难以理解）、业务逻辑散落在生命周期中（复杂组件难以理解）、组件代码缺乏标准的拆分模式（状态复用难）

### 如何设计 React 组件？

破题：react 组件的设计模式。

#### 设计分类

react 社区通常将组件分为无状态组件或者有状态组件。
无状态组件（受控组件）可复用性、通用性更强，有状态组件（非受控组件）更关注业务。

> 在大多数情况下，你应该使用受控组件。
> 无状态组件的应用场景：

- 样式组件：样式判断逻辑分离到自身上，容易维护；
- 代理组件:封装属性，减少重复代码；切断外部组件库的强依赖性；可以批量修改基础组件的字段。
- 布局组件：是确定性，可以减少渲染。
  有状态组件的应用场景：
- 容器组件：拉取数据和组合组件
- 高阶组件：复用组件逻辑的高级技术。代码变得优雅，但是静态函数无法拿到(hoist-non-react-statics 可以自动复制所有静态函数)而且 ref 不能透传（可以用 forwardRef)
  - 逻辑复用：抽取公共逻辑，减少重复代码量
  - 链式调用
  - 渲染劫持：控制 render 函数修改输出内容，如加载效果

#### 工程实践

```js
src
├── components
│   ├── basic //最基本的展示组件
│   ├── container  //容器组件
│   └── hoc //高阶组件
└── pages //页面组件
```

### 如何在渲染劫持中为原本的渲染结果添加新的样式？

```js
function HOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      const elementsTree = super.render();
      let newProps = {};
      if (elementsTree?.type === "input") {
        newProps = { value: "may the force be with you" };
      }
      const props = Object.assign({}, elementsTree.props, newProps);
      const newElementsTree = React.cloneElement(
        elementsTree,
        props,
        elementsTree.props.children
      );
      return newElementsTree;
    }
  };
}
```

render()返回的结构如下

```js
{
  type: "div";
  key: null;
  ref: null;
  props: Object;
  _owner: null;
  _store: Object;
}
```
## 状态管理
### setState 是同步更新还是异步更新？
破题：可能是 A；也可能是 B；甚至 A 和 B 同时存在的可能性也是有的。它的用途？
#### 作用
>setState() 会对一个组件的 state 对象安排一次更新。当 state 改变了，该组件就会重新渲染。
#### 同步和异步
> 目前，在事件处理函数内部的 setState 是异步的。例如，如果 Parent 和 Child 在同一个 click 事件中都调用了 setState ，这样就可以确保 Child 不会被重新渲染两次。取而代之的是，React 会将该 state “冲洗” 到浏览器事件结束的时候，再统一地进行更新。这种机制可以在大型应用中得到很好的性能提升。在以后的版本当中，React 会在更多的情况下静默地使用 state 的批更新机制。
#### 为什么异步更新？
> - 保持内部一致性：state,props,refs是一致的，state可以立即刷新，但是props不会；react模型在内部是一致的，并且确保提升状态是安全的；
> - 启用并发更新：react可以根据setState的调用来源分配不同优先级，进行异步渲染。
>   - 性能优化：减少重新渲染
>   - 用户体验优化：避免页面闪烁
### 如何面向组件跨层级通信？
破题：一个基本，多个场景。确定主题，再根据场景列举。

react是一个组件化框架，基于组件树的位置分布，组件与组件之间的关系，大致可分为四种：
- 父子：props，比较常见，通常用于容器组件和展示组件
- 子父：子组件向父组件传递数据
  - 回调函数，通过回调函数的参数向父组件传递数据，如输入框组件
  - 实例函数，父组件通过ref API获取子组件的实例，然后调用子组件的实例函数，过去常见于modal框的显示与隐藏。
- 兄弟：依赖共同的父组件进行中转，主要负责在容器组件中协调各组件。
- 爷孙：
  - 将孙子组件的 props 封装在一个固定字段中。固定组件与跨组件有互相依赖的场景。
  - 通过 children 透传。嵌套不深的场景。
  - 通过 context API 传递。复杂嵌套透传场景。
- 无直接关系：没有直接的关联关系，但是需要共享、传递数据
  - react的context API，可以做语言包国际化。
  - 状态管理框架，如mobx,redux,flux。引入状态管理使项目的开发模式与代码结构得以约束，但是学习成本相对较高。
  - 使用全局变量和事件，全局变量是通过在Windows上挂载新对象的方式实现，这种方式一般用于临时存储值，渲染显示时容易引发错误。全局事件就是使用document的自定义事件，如果存在时序依赖的两个事件加载时机存在差异，可能导致两者都没对应响应事件。

### react状态管理框架
横跨多个层级之间的组件仍然需要**共享状态，响应变化**。context存储的变量难以追溯数据源以及确认变动点。当组件依赖Context时，会提升组件耦合度，不利于组件的复用和测试。
流行的状态管理框架有Flux、Redux、Mobx。
#### Flux
MVC更适用于小型应用，但是在面向大型前端项目时，MVC会使项目足够复杂，即每当添加新的功能，系统的复杂度就会疯狂增长。model与view存在双向数据流动，很难理解和调试。所以Facebook抛弃了MVC，提出了基于单向数据流的架构。store存储了视图层的所有数据，当store变化后会引起view层更新。在视图层触发action，action会被dispatcher进行统一的收发处理，传递给store层。store层已经注册过相关action的处理逻辑，处理内部状态变化后，会触发view层的更新。但因为它的概念和样板代码相对比较多，所以只在facebook内部大规模应用。
#### Redux
三大原则：单一数据源、纯函数reducer、state是只读的。

互动方式：actions->reducers->store->view

副作用：对主调用函数产生附加影响。redux深受函数式编程的影响，所有的事件都由action触发，所有的状态都交给store去管理，业务逻辑交给reducer去处理。action,reducer都是纯函数，store只是一个state状态树，都不能处理副作用。

解决方案：
- 在dispatch的时候用中间件层拦截分发的action并添加额外的复杂行为。
- 允许reducer直接处理副作用。
#### Mobx
通过监听数据的属性变化，直接在数据上更改来触发UI的渲染。在mobx 5之前实现监听的方式是采用Object.defineProperty,mobx 5以后是proxy。