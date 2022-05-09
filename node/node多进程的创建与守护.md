

Node是基于V8引擎之上构建的，决定了它与浏览器的机制很类似。

一个node进程只能利用一个核，而且node只能运行在单线程中，严格意义上，node并非真正的单线程架构，即一个进程内可以有多个线程，因为node自己还有一定的I/O线程存在，这些I/O线程由底层的libuv处理，但这些线程对node开发者而言是完全透明的，只有在C++扩展时才会用到。

![node的架构层级](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0f096641e874bf4adf2331b032a44e0~tplv-k3u1fbpfcp-zoom-1.image)

## 多进程的创建

node中有提供`child_process`模块，这个模块中，提供了多个方法来创建子进程。多进程解决了多核CPU利用率的问题。

```
const { spawn, exec, execFile, fork } = require('child_process');
```

## 多进程之间的通信

node中进程的通信主要在主从（子）进程之间进行通信，子进程之间无法直接通信，若要相互通信，则要通过主进程进行信息的转发。

主进程和子进程之间是通过IPC（Inter Process Communication，进程间通信）进行通信的，IPC也是由底层的libuv根据不同的操作系统来实现的。

以计算斐波那契数列数列为例，用cpu个数减1个的进程来进行计算，剩余的那一个用来输出结果。这就需要负责计算的子进程，要把结果传给主进程，再让主进程传给输出进行，来进行输出。

-   master.js：用来创建子进程和子进程间的通信；
-   fib.js：计算斐波那契数列；
-   log.js：输出斐波那契数列计算的结果；

```
// master.js
​
const { fork } = require('child_process');
const cpus = require('os').cpus();
​
const logWorker = fork('./log.js');
​
for(let i=0, len=cpus.length-1; i<len; i++) {
    const worker = fork('./fib.js');
    worker.send(Math.floor(Math.random()*10 + 4)); // 要计算的num
    worker.on('message', (data) => { // 计算后返回的结果
        logWorker.send(data); // 将结果发送给输出进程
    })
}
```

```
// fib.js
const fib = (num) => {
    if (num===1 || num===2) {
        return num;
    }
    let a=1, b=2, sum=0;
    for(let i=3; i<num; i++) {
        sum = a + b;
        a = b;
        b = sum;
    }
    return sum;
}
process.on('message', num => {
    const result = fib(num);
​
    process.send(JSON.stringify({
        num,
        result,
        pid: process.pid
    }))
})
```

```
process.on('message', data => {
    console.log(process.pid, data);
})
```

![进程通信.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea926fd143124c98afe215107cbfec2e~tplv-k3u1fbpfcp-watermark.image?)
结果的第1个数字表示当前输出子进程的编号，后面表示在各个子进程计算的数据。

## 多进程的守护

每个子进程退出时，都会触发`exit事件`，因此我们通过监听exit事件来获知有进程退出了，这时就可以创建一个新的进程来替代。

**cluster 集群**。Node.js 进程集群可用于运行多个 Node.js 实例，这些实例可以在其应用程序线程之间分配工作负载。 当不需要进程隔离时，请改用 worker_threads 模块，它允许在单个 Node.js 实例中运行多个应用程序线程。集群模块可以轻松创建共享服务器端口的子进程。

**http 超文本传输协议**。要使用 HTTP 服务器和客户端，则必须 `require('node:http')`。Node.js 中的 HTTP 接口旨在支持该协议的许多传统上难以使用的功能。 特别是大的，可能是块编码的消息。 接口从不缓冲整个请求或响应，因此用户能够流式传输数据。

**os 操作系统**。`node:os` 模块提供了与操作系统相关的实用方法和属性。

`os.cpus()`返回包含有关每个逻辑 CPU 内核的信息的对象数组。

每个对象上包含的属性包括：

model <string>

speed <number> （以兆赫为单位）

times <Object>

user <number> CPU 在用户模式下花费的毫秒数。

nice <number> CPU 在良好模式下花费的毫秒数。

sys <number> CPU 在系统模式下花费的毫秒数。

idle <number> CPU 在空闲模式下花费的毫秒数。

irq <number> CPU 在中断请求模式下花费的毫秒数。

### 退出进程

当 Node.js 进程由于以下任一原因即将退出时，则会触发 `'exit'` 事件：

-   `process.exit()` 方法被显式调用；
-   Node.js 事件循环不再需要执行任何额外的工作。

`process.exit()` 方法指示 Node.js 以 `code` 的退出状态同步终止进程。 如果省略 `code`，则退出将使用“成功”代码 `0` 或 `process.exitCode` 的值（如果已设置）。 直到所有 [`'exit'`](http://nodejs.cn/api/process.html#event-exit) 事件监听器都被调用，Node.js 才会终止。

```
const cluster = require("cluster");
const http = require("http");
const cpus = require("os").cpus();
/*cluster.isMaster  如果进程是主进程，则为真。 这是由 process.env.NODE_UNIQUE_ID 决定的。
 如果 process.env.NODE_UNIQUE_ID 未定义，则 isPrimary 为 true。*/
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
​
  for (let i = 0, len = cpus.length; i < len; i++) {
    // // 衍生新的工作进程。这只能从主进程调用。
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(Math.random() + ", at pid: " + process.pid);
    })
    .listen(8080);
  // process.exit();
  console.log(`工作进程 ${process.pid} 已启动`);
}
​
```

![进程守护.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e388611ed2f448869114c556b9009489~tplv-k3u1fbpfcp-watermark.image?)
# 参考资料
- [node多进程的创建与守护 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/100550801)
- [API 文档 | Node.js 中文网 (nodejs.cn)](http://nodejs.cn/api/)
