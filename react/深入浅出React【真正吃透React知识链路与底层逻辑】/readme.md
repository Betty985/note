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