> - [深入浅出React【真正吃透React知识链路与底层逻辑】](https://www.bilibili.com/video/BV1zB4y1773E/?spm_id_from=333.337.search-card.all.click)

vue、react、angular在齐刷刷朝着WebComponents标准前进。
# JSX代码是如何“摇身一变”成为DOM的？
jsx作为react框架的一大特色，与react本身的运作机制之间存在千丝万缕的联系。

jsx的本质：jsx是javascript的一种语法扩展，它和模版语法很接近，但它充分具备javascript的能力。JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。

createElement功能：
- 二次处理key，ref ，self， source四个属性值
- 遍历config，筛选出可以提进props里的属性
- 提取子元素，放进childArray(也就是props.children)数组
- 格式化defaultProps
- 把type,key,ref,self,source,ReactCurrentOwner.current,props传入ReactElement函数

createElement接收开发者提供的 type、config、children参数，返回ReactElement函数提供的ReactElement对象。
```js
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 * @param {*} type 用于表示节点类型
 * @param {*} config 以键值对形式存储组件的所有属性
 * @param {*} children 组件标签之间嵌套的内容
 */
export function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;

      if (__DEV__) {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }
    if (hasValidKey(config)) {
      if (__DEV__) {
        checkKeyStringCoercion(config.key);
      }
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (__DEV__) {
    if (key || ref) {
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
```
# 为什么React16要更改组件的生命周期？
组件初始化：render方法->生成虚拟DOM->ReactDOM.render->真实DOM

组件更新：render方法->生成新的虚拟DOM->diff算法->定位出两个虚拟DOM的差异

组件化是react团队在研发效能方面所做的一个重要的努力。

可重用和可维护性：
- 组件的封闭是针对渲染工作流来说的，在组件自身的渲染工作流中，每个组件都只处理它内部的逻辑。
- 组件的开放是针对组件间通信来说的，react允许开发者基于单向数据流完成组件间的通信，而组件之间的通信将改变组件内部的数据，进而对渲染结果造成影响。
## 生命周期变化
>componentWillReceiveProps是由父组件的更新触发的。
getDerivedStateFromProps不是ComponentWillMount的替代。ComponentWillMount的存在不仅鸡肋而且危险，应该被废弃。getDerivedStateFromProps是componentWillReceiveProps的替代，做了减法，唯一的用途是使用props派生/更新state。意在确定生命周期行为更可控、可预测。也是在为fiber架构铺路。
>- getDerivedStateFromProps是一个静态方法，不能访问this。
>- 接收父组件传递的props和自身的state。
>- 需要对象格式的返回值来更新state。是针对某个属性的定向更新。

>+getSnapshotBeforeUpdate  -componentWillUpdate
> - 执行时机是render方法之后，真实DOM更新之前。getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为第三个参数传递给 componentDidUpdate()。同时获取更新前的真实DOM和更新前后的state&props。
## react16为什么两次求变？
Fiber是react对核心算法的一次重写。 Fiber会使原本同步的渲染过程变成异步的。 
同步渲染的调用栈很深， 不可打断的过程会占用浏览器主线程，使页面可顿。
Fiber将一个大的更新任务拆解为许多个小任务。 Fiber架构的重要特征是能被打断的异步模式。根据能否被打断，react的生命周期被划分为render和commit阶段（pre-commit和commit）。render阶段可以被打断，允许暂停、终止和重启，因为对用户不可知。  commit阶段总是同步执行的。 
**render阶段的生命周期都是有可能被重复执行的。**
被废弃的API：
- ComponentWillMount
- ComponentWillUpdate
- ComponentWillReceiveProps 

背后的原因：
- 完全可以转移到其他生命周期（尤其是ComponentDidXXX里)。react15下同步的生命周期比异步请求快，首次渲染依然会在数据返回前执行。废弃API可能导致服务端冗余请求。
- 在Fiber的异步渲染机制下可能出现非常严重的bug。ComponentWillXXX被打断重启多次后，可能发出多个付款请求。 
- 即使没有开启异步，react15下ComponentWillUpdate和ComponentWillReceiveProps里滥用setState导致重复渲染死循环。

react改造生命周期的动机是为了配合fiber架构的异步渲染机制。 确保了fiber机制下数据和视图的安全性，也确保了生命周期方法的行为更纯粹、可控、可预测。
