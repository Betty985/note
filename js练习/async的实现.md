# async 函数
async 函数就是 Generator 函数的语法糖。`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`。
`async`函数对 Generator 函数的改进，体现在以下四点。

- 内置执行器。

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。
调用了函数，它就会自动执行，输出最后结果。完全不像 Generator 函数，需要调用`next`方法，或者用`co`模块，才能真正执行，得到最后结果。
> Thunk 函数是自动执行 Generator 函数的一种方法。编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
> `co`模块是一个用于 Generator 函数的自动执行小工具。co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的`yield`命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co。

- 更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。

- 更广的适用性。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

（4）返回值是 Promise。

`async`函数的返回值是 Promise 对象，比 Generator 函数的返回值是 Iterator 对象方便多了。可以用`then`方法指定下一步的操作。`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。
# 实现原理
async 函数的实现原理，就是将 Generator 函数和自动执行器（基于Promise对象的自动执行，将异步操作包装成 Promise 对象，用`then`方法交回执行权。），包装在一个函数里。

```js
function asyncToGenerator(generatorFn){
    // 返回一个新的函数
    return function(){
        // 先调用generator函数，生成迭代器
        const gen=generatorFn.apply(this,arguments)
        // 返回一个promise
        return new Promise((resolve,reject)=>{
            // 跨过yield的阻碍
            // key有next和throw两种取值，分别对应了gen的next和throw方法
            // arg参数用来把promise resolve出来的值交给下一个yield
            function step(key,arg){
                let generatorResult
                try{
                    generatorResult=gen[key](arg)
                }catch(err){
                    return reject(error)
                }
                const {value,done}=generatorResult
                if(done){
                    // 已经完成就直接resolve这个promise
                    return resolve(value)
                }else{
                    return Promise.resolve(value).then(function onFullfilled(value){
                        step('next',value)
                    }),function onRejected(err){
                        step('throw',err)
                    }
                }
            }
            step('next')
        })
    }
}
```
# 参考资料
- [async 函数 - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/async)
- [手写async await的最简实现（20行） - 掘金 (juejin.cn)](https://juejin.cn/post/6844904102053281806#heading-4)
