# note
## 网站
- [ECMA](https://www.ecma-international.org/)
- [tc39.es](https://tc39.es/)


# Function

## call
```js
Function.prototype.mycall=function(context=window){
    if(typeof this !=='function'){
        throw new TypeError('error')
    }
    context.fn=this
    let args=[...arguments].slice(1)
    let result=context.fn(args)
    delete context.fn
    return result
}


```

## apply
```js
Function.prototype.myapply=function(context=window){
      if(typeof this !=='function'){
        throw new TypeError('error')
    }
    context.fn=this
    let result
    if(arguments[1]){
        result=context.fn(...arguments[1])
    }else{
        result=context.fn()
    }
    delete context.fn
    return result
}
```
## bind
```js
Function.prototype.mybind=function(context){
     if(typeof this !=='function'){
        throw new TypeError('error')
    }
    let that=this
    let args=[...arguments].slice(1)
    return function f(){
        if(this instanceof f){
            return new that(...args,...arguments)
        }
        return that.apply(context,args.concat(...arguments))
    }
}
```
# Object

## new
```js
function mynew(){
    let obj={}
    let fn=[].shift.call(arguments)
    obj.__proto__=fn.prototype
    let result=fn.apply(obj,arguments)
    return result instanceof Object ?result:obj
}
```

# 数据类型判断

## instanceof
```js
function myinstanceof(left,right){
    let prototype=right.prototype
    left=left.__proto__
    while(1){
        if(left===null||left===undefined){
            return false
        }
        if(left===prototype) return true
        left=left.__proto__
    }
}
```
## typeof
```js
function type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}
```
# ajax
```js
function myajax(obj){
    let {url,method,data,success,error}=obj
    method=method.toUpperCase()
    let xhr=new XMLHttpRequest()
    xhr.open(method,url,true)
    if(method=='HEAD'||method=='GET'){
        xhr.send(null)
    }
    else{
        xhr.send(data)
    }
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4){
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                success(xhr.responseText)
            }
            else{
                error(xhr.responseText)
            }
        }
    }
}
```
## promise ajax
```js
function promiseAjax(obj){
    return new Promise((resolve,reject)=>{
        let {url,method,data}=obj
        method=method.toUpperCase()
        let xhr=new XMLHttpRequest()
        xhr.open(method,url,true)
        if(method=='HEAD'||method=='GET'){
        xhr.send(null)
        }
       else{
          xhr.send(data)
       }
       xhr.onreadystatechange=function(){
       if(xhr.readyState==4){
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                resolve(xhr.responseText)
            }
            else{
                reject(xhr.responseText)
            }
        }
       }        
    })
}
```
# 节流
## 定时器版本
```js
function throttle(fn,delay){
    let timer
    return function(){
        let context=this
        let arguments
        if(timer) return
        timer=setTimeout(function(){
            fn.apply(context,args)
            timer=null
        },delay)
    }
} 
```
##  时间戳
```js
function throttle(fn,delay){
    let pre=0
    return function(){
        let now=Date.now()
        let context=this
        let arg=arguments
        if(now-pre>delay){
            fn.apply(context,arg)
            pre=now
        }
    }
}
```
# 防抖
```js
function debounce(fn,delay){
    let timer
    return function(){
        let context=this
        let args=arguments
        clearTimeout(timer)
        timer=setTimeout(()=>{
            fn.apply(context,args)
        },delay)
    }
}
```

# 继承

## 原型链继承

- 原型中包含的引用类型属性将被所有实例共享；

- 子类在实例化的时候不能给父类构造函数传参；

  ```js
  function Animal() {
    this.colors = ['blue']
  }
  Animal.prototype.getColor = function () {
    return this.colors
  }
  function Cat() {}
  Cat.prototype = new Animal()
  const cat = new Cat()
  cat.colors.push('red')
  const cat2 = new Cat()
  ```

  ## 借用构造函数继承

  解决了原型链继承的引用类型共享问题和传参问题。

  方法必须定义在构造函数中，每次创建子类实例都会创建一遍方法。

  ```js
  function Animal(name) {
    this.name = name
    this.getName = function () {
      return this.name
    }
  }
  function Cat(name) {
    Animal.call(this, name)
  }
  Cat.prototype = new Animal()
  const cat = new Cat('mow')
  ```

  ## 组合继承

  使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性。

  可以把方法定义在原型上实现重用，又可以让每个实例都有自己的属性。

  ```js
  function Animal(name) {
    this.name = name
    this.color = ['blue']
  }
  Animal.prototype.getName = function () {
    return this.name
  }
  function Cat(name, age) {
    Animal.call(this, name)
    this.age = age
  }
  Cat.prototype = new Animal()
  Cat.prototype.constructor = Cat
  ```

  ## 寄生组合继承

  组合继承调用了2次父类构造函数[new Animal(),Animal.call()]

  不直接调用父类构造函数给子类原型赋值，而是创建空函数获取父类原型的副本。

  ```js
  function Animal(name) {
    this.name = name
    this.color = ['blue']
  }
  Animal.prototype.getName = function () {
    return this.name
  }
  function Cat(name, age) {
    Animal.call(this, name)
    this.age = age
  }
  Cat.prototype = Object.create(Animal.prototype)
  Cat.prototype.constructor = Cat
  
  ```

  ## 类继承

  ```js
  class Animal {
    constructor(name) {
      this.name = name
      this.color = ['blue']
    }
    getName() {
      return this.name
    }
  }
  class Cat extends Animal {
    constructor(name, age) {
      super(name)
      this.age = age
    }
  }
  ```

  

# Array

## 去重

### ES5：filter+indexOf

```js
function unique(arr){
  var res=arr.filter(function(item,index,array){
    return array.indexOf(item)===index;
  });
  return res; 
}

```

### ES6：扩展运算符+Set (可以用箭头函数)   

不会删除undefined。

```js
let unique = (arr) => [...new Set(arr)]
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
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] in obj) {
      obj[arr[i]] ++
    } else {
      obj[arr[i]] = 0
    }
  }
  return Object.keys(obj) // 以数组的形式返回键
}
```

### reduce

```js
function unique(arr){
    return arr.reduce((cur,next)=>{
        !cur.includes(next)&&cur.push(next)
        return cur
    },[])
}
```

## 数组扁平化：Array.prototype.flat

### 递归

```js
function flatten(arr){
    var result =[]
    for(var i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            result=result.concat(flatten(arr[i]))
        }
        else{result.push(arr[i])}
    }
    return result
}
```

### 生成器函数

```js
function* flatten(arr){
    for (let item of arr){
        if(Array.isArray(item)){
            yield* flatten(item)
        }
        else yield item
    }
}
let res=[...flatten(arr)]
```

### some和展开运算符

some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。

它返回的是一个Boolean类型的值

```js
function flatten(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr)
    }
    return arr
}
```

# 深浅拷贝
对于原始类型没有深拷贝和浅拷贝的区别
浅拷贝只进行一层复制，深层次的引用类型是共享内存地址。
深拷贝是无限层级拷贝，不会互相影响。
## 浅拷贝
### Object.assign()
对一层的引用类型来说是深拷贝。对多层的引用类型来说是浅拷贝。
### 数组的slice和concat  
### 数组静态方法Array.form()
### 展开运算符
### 遍历实现浅拷贝
```js
function shallowCopy(obj){
    if(typeof obj!=='object') return obj
    let newObj=obj instanceof Array ? []:{}
    //遍历symbol
     let keys=Reflect.ownKeys(obj)
     for(let key of keys){
         if(obj.hasownProperty(key)){
             newObj[key]=obj[key]
         }
     }
     return newObj
}
```
## 深拷贝
### JSON的方法
`JSON.parse(JSON.stringify(obj))`
- 会忽略undefined、symbol和函数
- NaN Infinity -Infinity会被序列化为null
- 不能解决循环引用
### 递归实现深拷贝
```js
function deepClone(target,hash=new WeakMap()){
    if(typeof target !=='object'||target===null){
        return target
    }
    if (target instanceof Date) return new Date(target)
    if (target instanceof RegExp) return new RegExp(target)
    if(hash.get(target)) return hash.get(target)
    let cloneTarget=new target.constructor()
    hash.set(target,cloneTarget)
    Reflect.ownKeys(target).forEach(key=>{
        cloneTarget[key]=deepClone(target[key],hash)
    })
    return cloneTarget
}
```
### [window.structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
# promise
```js
class MyPromise{
    static PEDNGING='pending'
    static RESOLVED='resolved'
    static REJECTED='rejected'
    constructor(fn){
        this.state=MyPromise.PENDING
        this.result=null
        this.resolvedHandlers=[]
        this.rejectedHandlers=[]
        //在执行函数里抛出错误会触发reject
        try{
            fn(this.resolve.bind(this),this.reject.bind(this))
        }catch(error){
            this.reject(error)
        }      
        return this
    }
    resolve(result){
        //判断是否为promise类型
        if(result&&result instanceof MyPromise){
              return result.then(resolve,reject)
        }
        setTimeout(()=>{
            if(this.state==MyPromise.PENDING){
            this.state=MyPromise.RESOLVED;
            this.result=result
            this.resolvedHandlers.map(cb=>cb(this.result))
        }
        },0)
        return new MyPromise(resolve=>resolve(value))
    }
    reject(error){
        setTimeout(()=>{
          if(this.state==MyPromise.PENDING){
            this.state=MyPromise.REJECTED
            this.result=error
            this.rejectedHandlers.map(cb=>cb(this.result))
            }
        },0)
        return new MyPromise((resolve,reject)=>reject(this.result))
    }
    then(onFulfilled,onRejected){
        //链式调用
        return new MyPromise((resolve, reject) => {
          // 原生promise规定：then里面的两个参数如果不是函数的话就要被忽略
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:v=v
        onRejected=typeof onRejected==='function'?onRejected:r=>{throw r}
    if(this.state===MyPromise.PENDING){
        this.resolvedHandlers.push(onFulfilled)
        this.rejectedHandlers.push(onRejected)
    }
    if(this.state===MyPromise.RESOLVED){
        setTimeout(()=>{
            onFulfilled(this.result)
        })
    }
    if(this.state===MyPromise.REJECTED){
       setTimeout(()=>{
            onRejected(this.result)
       })
    }
        })
    }
    catch(...handlers){
        this.rejectedHandlers=[...this.rejectedHandlers,...handlers]
       return this
    }
    all(promises){
        return new MyPromise((resolve,reject)=>{
            const results=[]
            for(let i=0;i<promises.length;i++){
                const promise=promise(i)
                promise.then(res=>{
                    results.push(res)
                    if(results.length===promises.lengh) resolve(results)
                }).catch(reject)
            }
        })
    }
    race(promises){
        return new MyPromise((resolve,reject)=>{
            for(let i=0;i<promises.length;i++){
                const promise=promises[i]
                promise.then(resolve).catch(reject)
            }
        })
    }
    allSettled(promises){
        let result=[]
        return new MyPromise((resolve,reject)=>{
            promises.forEach((p,i)=>{
                MyPromise.resolve(p).then(val=>{
                    result.push({
                        status:'fulfilled',
                        value:val
                    })
                    if(result.length===promises.length){
                        resolve(result)
                    }
                },err=>{
                    result.push({
                        status:'rejected',
                        reason:err
                    })
                    if(result.length===promises.length){
                        resolve(result)
                    }
                })
            })
        })
    }
    any(promises){
        let index=0
        return new MyPromise((resolve,reject)=>{
            if(promises.length==0) return
            promises.forEach((p,i)=>{
                MyPromise(p).then(val=>{
                    resolve(val)
                },err=>{
                    index++
                    if(index===promises.length){
                        reject(new AggregateError('all promises were rejected'))
                    }
                })
            })
        })
    }
}
```
