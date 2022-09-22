> 当我不再透过熟悉的class生命周期方法去窥视useEffect 这个Hook的时候，我才得以融会贯通。

> “忘记你已经学到的。” — Yoda

Q: 如何用useEffect模拟componentDidMount生命周期？

A: `useEffect(fn,[])`,但是它并不完全和`componentDidMount`一样。useEffect会捕获props和state，如果要最新值，可以使用ref。
effects的心智模型更接近于实现状态同步，而不是响应生命周期事件。


Q: 如何正确地在useEffect里请求数据？[]是什么？

A: 
```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
/**
 *   effect钩子在组件挂载和更新时运行。因为我们在每次获取数据后设置状态，所以组件更新然后再次运行effect。它一次又一次地获取数据。这是一个需要避免的错误。我们只想在组件挂载时获取数据。
  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  });
*/


/**
 * 依赖数组
 * 第二个参数可用于定义钩子所依赖的所有变量（在此数组中分配）。如果其中一个变量发生变化，钩子会再次运行。如果包含变量的数组为空，则在更新组件时钩子根本不会运行，因为它不必监视任何变量。
  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  },[]);
*/

/**
 * useEffect返回值
 * async函数声明定义了一个异步函数，它返回一个 AsyncFunction 对象。异步函数通过事件循环异步操作，使用隐式promise返回它的结果。但是useEffect应该什么都不返回，或者返回清理函数。所以，不允许在useEffect函数中直接使用async。
*/
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );

      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
```

[]表示effect没有使用任何react数据流里的值，因此该effect只被调用一次是安全的。 []也是一类问题的来源，开发者认为没使用数据流里的值，但实际上使用了。


Q: 我应该把函数当做effect的依赖吗？

A: 一般建议把不依赖props和state的函数提到你的组件外面，并且把那些仅被effect使用的函数放到effect里面。
如果不能把一个函数移动到effect内部：
- 尝试把函数移动到组件外面，这样一来，函数就不会依赖任何props或state，也不用出现在组件列表中；
- 纯计算、可在渲染时调用的函数，可以在effect之外调用它，让effect依赖它的返回值；
- 把函数加入effect的依赖但把它的定义包裹进useCallback里，确保它不随渲染而改变，除非自身依赖发生变化。


Q: 为什么有时候会出现无限重复请求的问题?

A: 
- 通常发生于你在effect里做数据请求并且没有设置effect依赖参数的情况。没有设置依赖，effect会在每次渲染后执行一次，然后在effect中更新了状态引起渲染并再次触发effect。
- 无限循环的发生也可能是因为你设置的依赖总是会改变。你可以通过一个一个移除的方式排查出哪个依赖导致了问题。但是，移除你使用的依赖（或者盲目地使用[]）通常是一种错误的解决方式。举个例子，函数可能会导致这个问题，你可以把它们放到effect里，或者提到组件外面，或者用useCallback包一层。useMemo 可以做类似的事情以避免重复生成对象。常量会在每次渲染时重新创建，所以最好放到函数组件外面。


Q: 为什么有时候在effect里拿到的是旧的state或prop呢？

A: 
- Effect拿到的总是定义它的那次渲染中的props和state。这避免了那些因为假设 props 和 state 没有改变的代码引起问题。如果你刻意地想要从某些异步回调中读取 最新的 state，你可以用 一个 ref 来保存它，修改它，并从中读取。
- 你使用了「依赖数组」优化但没有正确地指定所有的依赖。解决办法是要么移除依赖数组，要么修正它。 
  
# 每一次渲染都有它自己的props和state
```js
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
`<p>You clicked {count} times</p>`没有做任何特殊的数据绑定，它只是在渲染输出中插入了一个由react提供的数字。当setCount的时候，React会带着一个不同的count值再次调用组件。然后，React会更新DOM以保持和渲染输出一致。
**任意一次渲染中的count常量都不会随着时间改变**。渲染输出会变是因为我们的组件在每一次调用引起的渲染中，包含的count状态独立于其他渲染，这个状态值是函数中的一个常量。
# 每一次渲染都有它自己的事件处理函数
在组件内定义的函数每一次渲染都在变。

[示例](https://codesandbox.io/s/w2wxl3yo0l)
步骤：
- 点击增加counter到3
- 点击一下 “Show alert”
- 点击增加 counter到5并且在定时器回调触发前完成

答案是3，alert捕获了点击按钮时候的状态。
> 函数式组件捕获了渲染所用的值。（Function components capture the rendered values.）

这不是react特有的，普通函数也有类似的行为。
```js
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);

someone = {name: 'Dominic'};
sayHi(someone);
```
在sayHi函数中，局部常量name会和某次调用中的person关联。因为这个常量是局部的，所以每一次调用都是相互独立的。结果就是，当定时器回调触发的时候，每一个alert都会弹出它拥有的name。
实际上，每一次渲染都有一个“新版本”的handleAlertClick。每一个版本的handleAlertClick“记住” 了它自己的 count。
在任意一次渲染中，props和state是始终保持不变的。如果props和state在不同的渲染中是相互独立的，那么使用到它们的任何值也是独立的（包括事件处理函数）。它们都“属于”一次特定的渲染。

应该避免直接修改state，通过调用setSomething(newObj)的方式去生成一个新的对象是更好的选择，因为这样能保证之前渲染中的state不会被污染。
# 每次渲染都有它自己的Effects
```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
effect是如何读取到最新的count 状态值的呢？

count是某个特定渲染中的常量。事件处理函数“看到”的是属于它那次特定渲染中的count状态值。
**并不是count的值在“不变”的effect中发生了改变，而是effect 函数本身在每一次渲染中都不相同，effect函数属于某个特定的渲染。**
每一个effect版本“看到”的count值都来自于它属于的那次渲染。

# 每一次渲染都有它自己的…所有
```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
操作：连续点击多次

答案： 顺序的打印输出 — 每一个都属于某次特定的渲染，因此有它该有的count值。

[class实例](https://codesandbox.io/s/kkymzwjqz3?file=/src/index.js)
```js
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
```
类组件总是使用最新的值，而不是属于某次特定渲染的值。React 修改了class中的this.state使其指向最新状态。
可以使用闭包修复class版本
```js
  componentDidUpdate() {
    const count = this.state.count;
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  }
```
逆潮而动：从过去渲染中的函数里读取未来的props和state
使用useRef修复hook版本
```js
+ let ref = useRef(count);
    useEffect(() => {
+   ref.current = count;
    setTimeout(() => {
-      console.log(`You clicked ${count} times`);
+      console.log(`You clicked ${ref.current} times`);
    }, 3000);
  });
```

在组件内什么时候去读取props或者state是无关紧要的。因为它们不会改变。在单次渲染的范围内，props和state始终保持不变。（解构赋值的props使得这一点更明显。）

# effect中的清理
本质上，它的目的是消除副作用（effect)，比如取消订阅。

React只会在**浏览器绘制后运行effects**。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。**上一次的effect会在重新渲染后被清除**。

> 组件内的每一个函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获定义它们的那次渲染中的props和state。
# 同步，而非生命周期
react统一描述了初始渲染和之后的更新。这降低了你程序的熵。

在react世界中，重要的是目的，而不是过程。先渲染属性A，B再渲染C，和立即渲染C并没有什么区别。虽然他们可能短暂地会有点不同（比如请求数据时），但最终的结果是一样的。**“mount”和“update”之于渲染并没有什么区别**，这就是和大家熟知的mount/update/unmount心智模型之间细微的区别。理解和内化这种区别是非常重要的。如果你试图写一个effect会根据是否第一次渲染而表现不一致，你正在逆潮而动。
React会根据我们当前的props和state同步到DOM。useEffect使你能够根据props和state同步React tree之外的东西。

# 告诉react去比对你的effects
Q: 在每一次渲染后都去运行所有的effects可能并不高效。（并且在某些场景下，它可能会导致无限循环。）

React只会更新DOM真正发生改变的部分，而不是每次渲染都大动干戈。

``` js
let oldEffect = () => { document.title = 'Hello, Dan'; };
let newEffect = () => { document.title = 'Hello, Dan'; };
// Can React see these functions do the same thing?
```
如果不调用的话，react并不能猜测函数做了什么。

你如果想要避免effects不必要的重复调用，你可以提供给useEffect一个依赖数组参数(deps)。如果当前渲染中的这些依赖项和上一次运行这个effect的时候值一样，因为没有什么需要同步，React会自动跳过这次effect。
## 关于依赖项不要对React撒谎
> 直觉上，这很好理解，但我曾看到几乎所有依赖class心智模型使用useEffect的人都试图违反这个规则。

**只需记住：如果你设置了依赖项，effect中用到的所有组件内的值都要包含在依赖中。这包括props，state，函数 — 组件内的任何东西。**

但有时候这样做可能会引起问题。比如，你可能会遇到无限请求的问题，或者socket被频繁创建的问题。解决问题的方法不是移除依赖项。
### 如果设置了错误的依赖会怎么样？
如果依赖项包含了所有effect中使用到的值，React就能知道何时需要运行它。
```js
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  state = {
    count: 0,
  };
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick = () => {
    this.setState({
      count: this.state.count + 1
    });
  }
  render() {
    return <h1>{this.state.count}</h1>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
```
```js
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
```
直觉上我们会设置依赖为[]。依赖是我们给React的暗示，告诉它effect所有需要使用的渲染中的值。effect中使用了count但我们撒谎说它没有依赖。 既然我们设置了[]依赖，effect不会再重新运行，它后面每一秒都会调用setCount(0 + 1)
### 两种诚实告知依赖的方法
你应该从第一种开始，然后在需要的时候应用第二种。
- 第一种策略是在依赖中包含所有effect中用到的组件内的值。但是我们的定时器会在每一次count改变后清除和重新设定。
- 第二种策略是修改effect内部的代码以确保它包含的值只会在需要的时候发生变更。我们其实并不需要在effect中使用count,当我们想要根据前一个状态更新状态的时候，我们可以使用setState的函数形式。

可以认为setState的函数形式是在给React“发送指令”告知如何更新状态。只在effects中传递最小的信息会很有帮助。

#### 更强大的姐妹模式-useReducer
可变步长
```js
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}
```
行为：修改step会重启定时器，因为它是依赖之一。

假如我们不想在step改变后重启定时器，我们该如何从effect中移除对step的依赖呢？

解耦来自Actions的更新：当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用useReducer去替换它们。
> 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

```js
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
    </>
  );
}

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);

```
可以从依赖中去除dispatch, setState, 和useRef包裹的值,因为React会确保它们是静态的。

### useReducer是hooks的作弊模式
可以移除effect的依赖，不管状态更新是依赖上一个状态还是依赖另一个状态。依赖props？
```js
import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";

function Counter({ step }) {
  const [count, dispatch] = useReducer(reducer, 0);

  function reducer(state, action) {
    if (action.type === 'tick') {
      return state + step;
    } else {
      throw new Error();
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return <h1>{count}</h1>;
}

function App() {
  const [step, setStep] = useState(1);

  return (
    <>
      <Counter step={step} />
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}
  
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```
如果你需要可以在reducer里访问props，这种模式会使一些优化失效。
**即使是在这个例子中，React也保证dispatch在每次渲染中都是一样的。**

为什么之前渲染里调用的reduce知道新props？
当dispatch的时候，react只是记住了action，它会在下一次渲染中再次调用reducer。

useReducer可以把更新逻辑和描述发生了什么分开，可以移除不必要的依赖，避免不必要的effect调用。
### 不能把函数放到effect里
```js
function SearchResults() {
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }

  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []); // 🔴 Missing dep: getFetchUrl

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []); // 🔴 Missing dep: getFetchUrl

  // ...
}
```
getFetchUrl放到依赖数组里？
- 不放。在组件内定义的函数每一次渲染都在变，所以它应该是依赖。
- 放。函数变得太频繁了。。。

解决方法：
- 函数没有使用组件内的任何值，应该把它提到组件外面去定义。因为它不在渲染范围内，不会被数据流影响，所以不需要设为依赖。
- 包装成useCallback Hook。useCallback本质上添加了一层依赖检查。我们使函数本身只在需要的时候才改变，而不是去掉去函数的依赖。这种方法也适用于通过属性从父组件传入的函数。

```js
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
    // ... Fetch data and return it ...
  }, [query]);  // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```
### 函数是数据流的一部分吗？
这种模式在class组件中行不通。
```js
class Parent extends Component {
  state = {
    query: 'react'
  };
  fetchData = () => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query;
    // ... Fetch data and do something ...
  };
  render() {
    return <Child fetchData={this.fetchData} />;
  }
}

class Child extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    this.props.fetchData();
  }
  /**
   * fetchData是一个class方法！（也可以说是class属性）它不会因为状态的改变而不同，
  */
  componentDidUpdate(prevProps) {
    // 🔴 this.props.fetchData和 prevProps.fetchData始终相等，因此不会重新请求。
    if (this.props.fetchData !== prevProps.fetchData) {
      this.props.fetchData();
    }
  }
  render() {
    // ...
  }
}
```
绑定特定的query？

```js
  render() {
    return <Child fetchData={this.fetchData.bind(this, this.state.query)} />;
  }
```
this.props.fetchData !== prevProps.fetchData 表达式永远是true。这会导致我们总是去请求。

想要解决这个class组件中的难题，唯一现实可行的办法是硬着头皮把query本身传入 Child 组件。 Child 虽然实际并没有直接使用这个query的值，但能在它改变的时候触发一次重新请求。

在class组件中，函数属性本身并不是数据流的一部分。组件的方法中包含了可变的 this 变量导致我们不能无疑地认为它是不变的。即使我们只需要一个函数，我们也必须把一堆数据传递下去做“diff“。不知道父组件传过来的函数是否依赖状态，也不知道它依赖的状态是否改变了。

在hook组件中，使用useCallback让函数完全参与到数据流中。类似的，useMemo可以让我们对复杂对象做类似的事情。
到处使用useCallback是笨拙的，使用场景：
- 需要将函数传递下去并且函数会在子组件的effect中被调用
- 试图减少对子组件的记忆负担。[如何避免向下传递回调？](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)

推荐：放在effect里或者从顶层引入

**useEffect的设计意图就是要强迫你关注数据流的改变，然后决定我们的effects该如何和它同步。**
# 竞态
```js
class Article extends Component {
  state = {
    article: null
  };
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
  async fetchData(id) {
    const article = await API.fetchArticle(id);
    this.setState({ article });
  }
  // ...
}
```
请求结果返回的顺序不能保证一致。比如我先请求 {id: 10}，然后更新到{id: 20}，但{id: 20}的请求更先返回。请求更早但返回更晚的情况会错误地覆盖状态值。

> 网络请求的过程是复杂的，且响应时间是不确定的，访问同一个目的地址，请求经过的网络链路不一定是一样的路径。所以先发出的请求不一定先响应，如果前端以先发请求先响应的规则来开发的话，那么就可能会导致错误的数据使用，这就是竞态条件问题。 ----[解决前端常见问题：竞态条件](https://juejin.cn/post/7098287689618685966)

effect并没有神奇地解决这个问题。
- 如果使用的异步方式支持取消，可以直接在清除函数中取消异步请求。
- 使用一个布尔值来跟踪它。

```js
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {
        setArticle(article);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  // ...
}
```

class组件生命周期的思维模型中，副作用的行为和渲染输出是不同的。UI渲染由props和state驱动，并且能保持步调一致。但副作用不是。
在useEffect的思维模型中，默认都是同步的。副作用变成了react数据流的一部分。
# 参考资料
- [a-complete-guide-to-useeffec](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

