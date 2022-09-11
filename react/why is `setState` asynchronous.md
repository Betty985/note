
>原文：[RFClarification: why is `setState` asynchronous? · Issue #11527 · facebook/react](https://github.com/facebook/react/issues/11527)

# 正文

首先我认为为了批量更新而延迟协调是有益的。也就是说，我们认为`setState()`同步地重新渲染在许多情况下效率会很低，如果我们知道可能会得到几个更新，那么最好是批量更新。

例如，如果我们在浏览器点击处理程序中，Child 和 Parent 都调用了 setState，我们不想重新渲染 Child 两次，而是更愿意将它们标记为脏，在退出浏览器事件之前一起重新渲染它们。

你在问：为什么我们不能做完全相同的事情（批处理），而是立即将 setState 更新写入 this.state 而不等待协调结束。我认为没有一个显而易见的答案（任何一种解决方案都有权衡），但这里有一些我能想到的原因。

## 保证内部一致性
即使 state 是同步更新的，props 不是。（在重新渲染父组件之前，您无法知道 props，如果您同步执行此操作，批处理就会消失。）

现在 React 提供的对象（`state`, `props`, `refs`）在内部是一致的。这意味着如果您只使用这些对象，则可以保证它们引用完全协调的树（即使它是该树的旧版本）。

当您仅使用状态时，如果它同步刷新（如您所建议的那样），则此模式将起作用：
```js
console.log(this.state.value) // 0
this.setState({ value: this.state.value + 1 });
console.log(this.state.value) // 1
this.setState({ value: this.state.value + 1 });
console.log(this.state.value) // 2
```
但是，假设需要提升此状态以在几个组件之间共享，您将其移动到父级：
```js
-this.setState({ value: this.state.value + 1 });
+this.props.onIncrement(); // Does the same thing in a parent
```
我想强调的是，在依赖 `setState() `的典型 React 应用程序中，这是**你每天都会做的最常见的一种特定于 React 的重构。**

但是，这破坏了我们的代码！
```js
console.log(this.props.value) // 0
this.props.onIncrement();
console.log(this.props.value) // 0
this.props.onIncrement();
console.log(this.props.value) // 0
```
这是因为，在您提出的模型中， this.state 会立即刷新，而 this.props 不会。而且我们无法在不重新渲染父组件的情况下立即刷新 this.props,这意味着我们将不得不放弃批处理（根据具体情况，这会显着降低性能）。

还有更微妙的情况说明这如何破坏代码，例如如果您正在混合来自 props（尚未刷新）和 state（建议立即刷新）的数据以创建新状态：[#122 (comment)](https://github.com/facebook/react/issues/122#issuecomment-81856416)。 Refs 表现出了同样的问题：[#122 (comment)](https://github.com/facebook/react/issues/122#issuecomment-22659651)。

这些例子根本不是理论上的。事实上，React Redux 绑定曾经有过这种问题，因为它们混合了 React props 和非 React 的state，[reduxjs/react-redux#86](https://github.com/reduxjs/react-redux/issues/86), [reduxjs/react-redux#99](https://github.com/reduxjs/react-redux/pull/99), [reduxjs/react-redux#292](https://github.com/reduxjs/react-redux/issues/292), [reduxjs/redux#1415](https://github.com/reduxjs/redux/issues/1415), [reduxjs/react-redux#525](https://github.com/reduxjs/react-redux/issues/525)。

我不知道为什么 MobX 用户没有遇到这种情况，但我的直觉是他们可能会遇到这种情况，但认为他们是自己的错。或者他们没有从 props 中读取太多数据，而是直接从 MobX 可变对象中读取。

那么今天 React 是如何解决这个问题的呢？**在 React 中，this.state 和 this.props 都只在协调和刷新之后更新，所以你会在重构之前和之后看到打印出来 0。** 这使得提升状态是安全的。

是的，在某些情况下这可能会带来不便。尤其是对于更多 OO 背景的人来说，他们只想多次改变状态，而不是考虑如何在一个地方表现出完整的状态更新。我可以理解这一点，尽管我确实认为从调试的角度来看，保持状态更新的集中更清晰：[#122 (comment)](https://github.com/facebook/react/issues/122#issuecomment-19888472)。

尽管如此，您仍然可以选择将要立即读取的状态移动到某个横向可变对象中，特别是如果您不将其用作渲染的真实来源。这几乎就是 MobX 让你做的事情🙂。

如果您知道自己在做什么，您还可以选择刷新整个树。那个API 是 `ReactDOM.flushSync(fn)`。我认为我们还没有记录它，但我们肯定会在 16.x 发布周期的某个时候这样做。请注意，它实际上强制对调用内部发生的更新进行完全重新渲染，因此您应该非常谨慎地使用它。这样就不会破坏 `props`, `state` 和 `refs` 之间的内部一致性的保证。

总而言之，**React 模型并不总能产生最简洁的代码，但它在内部是一致的，并确保提升状态是安全的。**

## 启用并发更新

从概念上讲，React 的表现就好像每个组件都有一个更新队列。这就是讨论非常有意义的原因：我们讨论是否立即对 `this.state `应用更新，因为我们毫不怀疑更新将以确切的进行。但是，情况不一定如此([haha](https://mobile.twitter.com/dan_abramov/status/956180994591285249))。

最近，我们一直在谈论“异步渲染”。我承认我们没有很好地表达表达它是什么，但这就是研发的本质：你探索一个在概念上看起来很有前途的想法，但只有在花了足够的时间之后才能真正理解它的含义。

我们解释“异步渲染”的一种方式是，**React 可以根据 setState() 的调用来源（事件处理程序、网络响应、动画等）分配不同的优先级。**

例如，您正在键入消息，需要立即刷新 TextBox 组件中的 setState() 调用。但是，如果您在输入时收到一条新消息，最好将新 MessageBubble 的渲染延迟到某个阈值（例如一秒），以免因为阻塞线程而让输入卡顿。

如果我们让某些更新具有“较低优先级”，我们可以将它们的渲染分成几毫秒的小块，这样用户就不会注意到它们。

我知道这样的性能优化听起来可能不太令人兴奋或令人信服。你可能说：“MobX 不需要这个，我们的更新跟踪速度足够快，可以避免重新渲染”。我不认为在所有情况下都是如此（例如，无论 MobX 有多快，您都必须创建 DOM 节点并为新挂载的视图进行渲染）。尽管如此，如果这是真的，并且如果您有意识地决定始终将对象包装到跟踪读取和写入的特定 JavaScript 库中是可以的，那么您可能不会从这些优化中获得太多好处。

**但异步渲染不仅仅是性能优化。我们认为这是 React 组件模型可以做什么的根本性转变。**

例如，考虑从一个页面导航到另一个页面的情况。通常，您会在渲染新屏幕时显示一个转轮（spinner）。

但是，如果导航速度足够快（大约在一秒钟内），闪烁并立即隐藏转轮会导致用户体验下降。更糟糕的是，如果您有多个级别的组件具有不同的异步依赖项（数据、代码、图像），您最终会得到一连串短暂闪烁的转轮。由于所有的 DOM 重排，这既在视觉上令人不快，又使您的应用程序在实践中变慢。它也是许多样板代码的来源。

当您执行一个简单的 setState() 来呈现不同的视图时，我们可以“开始”“在后台”呈现更新后的视图，那不是很好吗？想象一下**您不用自己编写任何协调代码就可以选择在更新时间超过某个阈值（例如一秒）时显示转轮，否则当整个新子树的异步依赖关系得到满足时，让 React 执行无缝转换。** 此外，当我们“等待”时，“旧页面”保持交互性（例如，您可以选择要转换到的不同项目），并且 React 强制要求如果等待时间过长，您必须显示一个转轮。

事实证明，通过当前的 React 模型和对生命周期的一些调整，我们实际上可以实现这一点！ @acdlite 过去几周一直在研究这个功能，很快就会发布一个 RFC。

请注意，这只是可能的，因为 this.state 不会立即刷新。如果它被立即刷新，我们将无法开始在后台渲染视图的“新版本”，而“旧版本”仍然可见并且可交互。他们独立的状态更新会发生冲突。

我不想从@acdlite 那里抢风头来宣布这一切，但我希望这听起来至少有点令人兴奋。我知道这听起来仍然像胡说，或者我们真的不知道自己在做什么。我希望我们能在接下来的几个月里说服你，并且你会欣赏 React 模型的灵活性。据我了解，由于不立即刷新状态更新，至少部分实现这种灵活性是可能的。

# 补充
React会为标记为脏组件的组件更新Virtual DOM。
