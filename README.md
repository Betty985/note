# note

## 网站

- [ECMA](https://www.ecma-international.org/)
- [tc39.es](https://tc39.es/)

# Function

## call

```js
Function.prototype.mycall = function (context = window) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(args);
  delete context.fn;
  return result;
};
```

## apply

```js
Function.prototype.myapply = function (context = window) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```

## bind

```js
Function.prototype.mybind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  let that = this;
  let args = [...arguments].slice(1);
  return function f() {
    if (this instanceof f) {
      return new that(...args, ...arguments);
    }
    return that.apply(context, args.concat(...arguments));
  };
};
```

# Object

## new

```js
function mynew() {
  let obj = {};
  let fn = [].shift.call(arguments);
  obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}
```
## Object.create
```js
function create(o){
    function F(){}
    F.prototype=o
    return new F()
}
```
# 数据类型判断

## instanceof

```js
function myinstanceof(left, right) {
  let prototype = right.prototype;
  left = left.__proto__;
  while (1) {
    if (left === null || left === undefined) {
      return false;
    }
    if (left === prototype) return true;
    left = left.__proto__;
  }
}
```

## typeof

```js
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
```

# ajax

```js
function myajax(obj) {
  let { url, method, data, success, error } = obj;
  method = method.toUpperCase();
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (method == "HEAD" || method == "GET") {
    xhr.send(null);
  } else {
    xhr.send(data);
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        success(xhr.responseText);
      } else {
        error(xhr.responseText);
      }
    }
  };
}
```
## promise实现图片的异步加载
```js
const imageAsync=(url)=>{
    return new Promise((resolve,reject)=>{
        let img=new Image()
        img.src=url
        img.onload=()=>{
            resolve(image)
        }
        img.onerro=(err)=>{
            reject(err)
        }
    })
}
```
## promise ajax

```js
function promiseAjax(obj) {
  return new Promise((resolve, reject) => {
    let { url, method, data } = obj;
    method = method.toUpperCase();
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (method == "HEAD" || method == "GET") {
      xhr.send(null);
    } else {
      xhr.send(data);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    };
  });
}
```

# 节流

## 定时器版本

```js
function throttle(fn, delay) {
  let timer;
  return function () {
    let context = this;
    let arguments;
    if (timer) return;
    timer = setTimeout(function () {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}
```

## 时间戳

```js
function throttle(fn, delay) {
  let pre = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let arg = arguments;
    if (now - pre > delay) {
      fn.apply(context, arg);
      pre = now;
    }
  };
}
```

# 防抖

```js
function debounce(fn, delay) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
```
## lastPromise
```js
function lastPromise(fn){
  let timer;
  return async(...args)=>{
    const res=await fn(...args)
    clearTimeout(timer)
    return new Promise(resolve=>{
      timer=setTimeout(()=>{
        resolve(res)
      })
    })
  }
}
```
# 继承

## 原型链继承

- 原型中包含的引用类型属性将被所有实例共享；

- 子类在实例化的时候不能给父类构造函数传参；

  ```js
  function Animal() {
    this.colors = ["blue"];
  }
  Animal.prototype.getColor = function () {
    return this.colors;
  };
  function Cat() {}
  Cat.prototype = new Animal();
  const cat = new Cat();
  cat.colors.push("red");
  const cat2 = new Cat();
  ```

  ## 借用构造函数继承

  解决了原型链继承的引用类型共享问题和传参问题。

  方法必须定义在构造函数中，每次创建子类实例都会创建一遍方法。

  ```js
  function Animal(name) {
    this.name = name;
    this.getName = function () {
      return this.name;
    };
  }
  function Cat(name) {
    Animal.call(this, name);
  }
  Cat.prototype = new Animal();
  const cat = new Cat("mow");
  ```

  ## 组合继承

  使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性。

  可以把方法定义在原型上实现重用，又可以让每个实例都有自己的属性。

  ```js
  function Animal(name) {
    this.name = name;
    this.color = ["blue"];
  }
  Animal.prototype.getName = function () {
    return this.name;
  };
  function Cat(name, age) {
    Animal.call(this, name);
    this.age = age;
  }
  Cat.prototype = new Animal();
  Cat.prototype.constructor = Cat;
  ```

  ## 寄生组合继承

  组合继承调用了 2 次父类构造函数[new Animal(),Animal.call()]

  不直接调用父类构造函数给子类原型赋值，而是创建空函数获取父类原型的副本。

  ```js
  function Animal(name) {
    this.name = name;
    this.color = ["blue"];
  }
  Animal.prototype.getName = function () {
    return this.name;
  };
  function Cat(name, age) {
    Animal.call(this, name);
    this.age = age;
  }
  Cat.prototype = Object.create(Animal.prototype);
  Cat.prototype.constructor = Cat;
  ```

  ## 类继承

  ```js
  class Animal {
    constructor(name) {
      this.name = name;
      this.color = ["blue"];
    }
    getName() {
      return this.name;
    }
  }
  class Cat extends Animal {
    constructor(name, age) {
      super(name);
      this.age = age;
    }
  }
  ```

# Array
## filter
```js
Array.prototype.myFilter=function(fn){
    let res=[]
    for(let i=0,len=this.length;i<len;i++){
        fn(this[i])&&res.push(this[i])
    }
    return res
}
```
## 去重

### ES5：filter+indexOf

```js
function unique(arr) {
  var res = arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}
```

### ES6：扩展运算符+Set (可以用箭头函数)

不会删除 undefined。

```js
let unique = (arr) => [...new Set(arr)];
```

### includes

```js
functon unique(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
      	    res.push(arr[i])
        }
    }
    return res
}

```

### 对象的键不能重复

得到的都是字符串形式。

```js
function unique(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] in obj) {
      obj[arr[i]]++;
    } else {
      obj[arr[i]] = 0;
    }
  }
  return Object.keys(obj); // 以数组的形式返回键
}
```

### reduce

```js
function unique(arr) {
  return arr.reduce((cur, next) => {
    !cur.includes(next) && cur.push(next);
    return cur;
  }, []);
}
```

## 数组扁平化：Array.prototype.flat

### 递归

```js
function flatten(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```

### 生成器函数

```js
function* flatten(arr) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else yield item;
  }
}
let res = [...flatten(arr)];
```

### some 和展开运算符

some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。

它返回的是一个 Boolean 类型的值

```js
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```

# 深浅拷贝

对于原始类型没有深拷贝和浅拷贝的区别
浅拷贝只进行一层复制，深层次的引用类型是共享内存地址。
深拷贝是无限层级拷贝，不会互相影响。

## 浅拷贝

### Object.assign()

对一层的引用类型来说是深拷贝。对多层的引用类型来说是浅拷贝。

### 数组的 slice 和 concat

### 数组静态方法 Array.form()

### 展开运算符

### 遍历实现浅拷贝

```js
function shallowCopy(obj) {
  if (typeof obj !== "object") return obj;
  let newObj = obj instanceof Array ? [] : {};
  //遍历symbol
  let keys = Reflect.ownKeys(obj);
  for (let key of keys) {
    if (obj.hasownProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
```

## 深拷贝

### JSON 的方法

`JSON.parse(JSON.stringify(obj))`

- 会忽略 undefined、symbol 和函数
- NaN Infinity -Infinity 会被序列化为 null
- 不能解决循环引用

### 递归实现深拷贝

```js
function deepClone(target, hash = new WeakMap()) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  if (hash.get(target)) return hash.get(target);
  let cloneTarget = new target.constructor();
  hash.set(target, cloneTarget);
  Reflect.ownKeys(target).forEach((key) => {
    cloneTarget[key] = deepClone(target[key], hash);
  });
  return cloneTarget;
}
```

### [window.structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)

# promise

```js
class MyPromise {
  static PEDNGING = "pending";
  static RESOLVED = "resolved";
  static REJECTED = "rejected";
  constructor(fn) {
    this.state = MyPromise.PENDING;
    this.result = null;
    this.resolvedHandlers = [];
    this.rejectedHandlers = [];
    //在执行函数里抛出错误会触发reject
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
    return this;
  }
  resolve(result) {
    //判断是否为promise类型
    if (result && result instanceof MyPromise) {
      return result.then(resolve, reject);
    }
    setTimeout(() => {
      if (this.state == MyPromise.PENDING) {
        this.state = MyPromise.RESOLVED;
        this.result = result;
        this.resolvedHandlers.map((cb) => cb(this.result));
      }
    }, 0);
    return new MyPromise((resolve) => resolve(value));
  }
  reject(error) {
    setTimeout(() => {
      if (this.state == MyPromise.PENDING) {
        this.state = MyPromise.REJECTED;
        this.result = error;
        this.rejectedHandlers.map((cb) => cb(this.result));
      }
    }, 0);
    return new MyPromise((resolve, reject) => reject(this.result));
  }
  then(onFulfilled, onRejected) {
    //链式调用
    return new MyPromise((resolve, reject) => {
      // 原生promise规定：then里面的两个参数如果不是函数的话就要被忽略
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v = v);
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (r) => {
              throw r;
            };
      if (this.state === MyPromise.PENDING) {
        this.resolvedHandlers.push(onFulfilled);
        this.rejectedHandlers.push(onRejected);
      }
      if (this.state === MyPromise.RESOLVED) {
        setTimeout(() => {
          onFulfilled(this.result);
        });
      }
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          onRejected(this.result);
        });
      }
    });
  }
  catch(...handlers) {
    this.rejectedHandlers = [...this.rejectedHandlers, ...handlers];
    return this;
  }
  all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      for (let i = 0; i < promises.length; i++) {
        const promise = promise(i);
        promise
          .then((res) => {
            results.push(res);
            if (results.length === promises.lengh) resolve(results);
          })
          .catch(reject);
      }
    });
  }
  race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise.then(resolve).catch(reject);
      }
    });
  }
  allSettled(promises) {
    let result = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (val) => {
            result.push({
              status: "fulfilled",
              value: val,
            });
            if (result.length === promises.length) {
              resolve(result);
            }
          },
          (err) => {
            result.push({
              status: "rejected",
              reason: err,
            });
            if (result.length === promises.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }
  any(promises) {
    let index = 0;
    return new MyPromise((resolve, reject) => {
      if (promises.length == 0) return;
      promises.forEach((p, i) => {
        MyPromise(p).then(
          (val) => {
            resolve(val);
          },
          (err) => {
            index++;
            if (index === promises.length) {
              reject(new AggregateError("all promises were rejected"));
            }
          }
        );
      });
    });
  }
}
```
## 并发限制的promise调度器
```js
class Scheduler{
    constructor(){
        this.queue=[];
        this.limit=3;
        this.run=0
        
    }
    add(promise){
        this.queue.push(promise)
    }
    taskStart(){
        for(let i=0;i<this.maxCount;i++){
            this.request()
        }
    }
    request(){
        if(!this.queue.length||this.run>=this.limit){
            return
        }
        this.run++;
        this.queue.shift().then(()=>{
            this.run--;
            this.request()
        })
    }
}
```
# 排序

## 快速排序

```js
var quickSort = function (arr) {
  if (arr.length < 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [],
    right = [];
  for (let i of arr) {
    if (i < pivot) {
      left.push(i);
    } else {
      right.push(i);
    }
  }
  return quickSort(left).concat([pivot].quickSort(right));
};
```

## 冒泡排序

```js
var bubbleSort = (arr) => {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};
```

# 定时器

## 用 setTimeout 实现 setInterval

```js
function mySetInterval(fn, delay) {
  let timer = null;
  const interval = () => {
    fn();
    timer = setTimeout(interval, delay);
  };
  setTimeout(interval, delay);
  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
}
```

## 用 setInterval 实现 setTimeout

```js
function mySetInterval(fn, delay) {
  const timer = setInterval(() => {
    fn();
    clearInterval(timer);
  }, delay);
}
```

# 实现 compose 函数

compose 函数的作用就是组合函数，依次组合传入的函数：

后一个函数作为前一个函数的参数
最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个

```js
function compose(...fns) {
  // 没有传入函数参数，就返回一个默认函数（直接返回函数）
  if (fns.length === 0) {
    return (arg) => arg;
  }
  if (fns.length === 1) {
    // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;
    return fns[0];
  }
  // 依次执行函数
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
```
##  实现简单路由
```js
class Route{
    constructor(){
        this.routes={}
        this.currentHash=''
        this.freshRoute=this.freshRoute.bind(this)
        window.addEventListener('load',this.freshRoute,false)
        window.addEventListener('hashchange',this.freshRoute,false)
    }
    storeRoute(path,cb){
        this.routes[path]=cb||function(){}
    }
    freshRoute(){
        this.currentHash=location.hash.slice(1)||'/'
        this.routes[this.currentHash]()
    }
}
```
# 发布订阅
```js
class EventEmit{
    handlers={}
    add(type,cb){
        if(!this.handlers[type]){
            this.handlers[type]=[]
        }
        this.handlers[type].push(cb)
    }
    emit(type,params){
        if(!this.handlers[type]){
            return new Error('该事件未注册')
        }
        this.handlers[type].forEach(cb=>{
            cb(...params)
        })
    }
    remove(type,cb){
        if(!cb){
            delete this.handlers[type]
        }else{
            const index=this.handlers[type].findIndex(el=>el===cb)
            this.handlers[type].splice(index,1)
            if(!this.handlers[type].length){
                delete this.handlers[type]
            }
        }
    }
}
```
# promisify
```js
const promisify=(fn)=>(...args)=>new Promise((resolve,reject)=>args.push(function (err,data){
  err?reject(err):resolve(data)
})
  fn.apply(null,args)
)
```
# 字符串模版
```js
const render=(template,data)=>{
  const reg=/\{\{(\w+)\}\}/
  if(template.test(reg)){
    const name=template.exec(reg)[1]
    template=template.replace(name,data[name])
    return render(template,data)
  }
  return template
}
```
# 下划线驼峰互转
```js
const underline2Camel=str=>str.replace(/_(\w)/g,(match,p1)=>p1.toUpperCase())
const camel2Underline=str=>str.replace(/[A-Z]/g,p1=>`_${p1.toLowerCase()}`)
```
# 版本号排序
```js
// 比较版本号
const sortVersion=arr=>arr.sort((a,b)=>{
    const a1=a.split('.'),a2=b.split('.')
    let i=0;
    while(true){
         i++
        if(a1[i]===undefined||a2[i]===undefined){
            return a2.length-a1.length
        }else if(a1[i]===a2[i]){
            continue
        }else{
            return a2[i]-a1[i]
        }      
    }
})
```
# 洗牌
```js
const shuffle=arr=>arr.sort((a,b)=>Math.random()-0.5)
```
# 数组分割
```js
const chunk=(arr,size)=>{
    let res=[]
    if(size<1){
        throw new Error('size < 1')
    }
    arr.forEach((item,index)=>{
        if(index%size===0){
            res.push([])
        }
        res[res.length-1].push(item)
    })
    return res
}
```
# reduce实现map
理论基础：reduce是遍历、变形、累积三种运算的合成。
```js
const transduce=(arr,fn)=>arr.reduce((pre,cur,index,arr)=>{
    pre.push(fn(cur,index,arr))
    return pre
  },[])
```
# js重载
```js
function addMethod(obj,name,fn){
  const old=obj[name]
  obj[name]=function(){
    if(arguments.length===fn.length){
      return fn.apply(this,arguments)
    }
    if(typeof old==='function'){
      return old.apply(this,arguments)
    }
  }
}
```
# get
```js
const get=(obj,...selectors)=>[...selectors].map(
  s=>
  s.replace(/\[([^\[\]]*)\]/g,'.$1')
  .split('.')
  .filter(i=>i!=='')
  .reduce((pre,cur)=>pre&&pre[cur]
  ,obj)
)
```
# isPrime
```js
const isPrime=(n)=>{
  let divisor=2
  while(n>divisor){
     if(n%divisor===0) {
      return false
     }
     divisor++
  }
  return true
}
```
# 对象序列化
```js
function stringify(val){
  if(val&&typeof val==='object'){
    // 数组
    if(Array.isArray(val)){
      return `[${val.map(stringify)}]`
    }
    // 日期
    if(val instanceof Date){
      return `new Date(${val})`
    }
    // 正则
    if(val instanceof RegExp){
      return ''+val
    }
    return `{${Object.keys(val).map(key=>JSON.stringify(key)+':'+stringify(val[key]))}}`
    
  }
  if(typeof val==='string'){
    return JSON.stringify(val)
  }
  return ''+val
}
```
# jsonp
```js
function jsonp(url,callback){
  const callbackId=Math.random()
  window[callbackId]=callback
  url='callback'+callbackId
  const script=document.createElement('script')
  script.src=url
  document.head.append(script)
}
```
# set实现并交差集
```js
const union=(a,b)=>new Set([...a],[...b])
const intersect=(a,b)=>new Set([...a].filter(i=>b.has(i)))
const diff=(a,b)=>new Set([...a].filter(i=>!b.has(i)))
```