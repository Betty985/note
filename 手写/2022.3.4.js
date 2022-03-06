//数组中有多个元素并且要与数字进行相等比较时会自动调用join用分隔符拼成字符串
/**ajax*
实例化xhr
xhr.open(method,url,<true>)
xhr.onreadystatechange=()=>{
    xhr.readyState和xhr.status
   fn(responseText)
}
xhr.send(data)
*/
function ajax(config){
    let {url,data,method,fn}=config;

    let xhr=new XMLHttpRequest()
    // 第三个参数是是否异步
    xhr.open(method,url,true)
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&(xhr.status>=200&&xhr.status<300||xhr.status==304)){
            fn(xhr.responseText)
        }
    }
    xhr.send(data)
}
let config={
    url:"https://juejin.cn/post/7023906112843808804",
    method:'POST',
    data:123,
    fn(a){
        console.log(a)
    }
}
// ajax(config)

/** new*
创建对象
调用构造函数
原型挂载
构造器挂载
返回
*/
function mynew(fn,...args){
    let obj={}
    fn.apply(obj,args)
    obj.prototype=fn.prototype
    obj.prototype.constructor=fn
    return obj
}
/**instanceof*
*/
function instanceOf(l,r){
    let prototype=r.prototype;
    let left=l.__proto__;
    while(l){
        if(l==prototype) return true
        l=l.__proto__
    }
    return false
}
instanceOf([],Array)
instanceOf([],Object)
/**防抖函数
闭包+高阶函数+清空定时器
this,args
*/
function debounce(fn,delay){
    let timer
    return function(){
        if(timer) clearTimeout(timer)
        let arg=arguments
        let that=this
        timer=setTimeout(()=>{
            fn.apply(that,arg)
        },delay)
    }
}
/**节流*/
function throttle(fn,delay){
    let timer
    return function(){
       if(timer)  timer=null
        let that=this
        let arg=arguments
        setTimeout(()=>{
            fn.apply(that,arg)
        },delay)
    }
}
// 数组去重
// filter+indexOf
function unique(arr){
   let newA= arr.filter((item,index)=>{
        return  arr.indexOf(item)==index
    })
    return newA
}
// 扩展运算符+Set
let unique1=(arr)=>{
    return [...new Set(arr)]
}
// 哈希表Map+reduce
function unique2(arr){
    let newA=[]
    let map=new Map()
    arr.reduce((pre,next)=>{
        if(!pre.has(next)){
            pre.set(next,1)
            newA.push(next)
        }
        return pre
    },map)
    return newA
}
let arr=[1,2,3,4,2,1,1]
unique2(arr)
unique1(arr)
unique(arr)
// setTimeout实现setInterval
function mySetTimeout(fn,delay){
    let timer=null
    const interval=()=>{
        fn()
        timer=setTimeout(interval,delay)
    }
    setTimeout(interval,delay)
    return {
        cancel(){
            clearTimeout(timer)
        }
    }
}
const { cancel } = mySetTimeout(() => console.log(888), 1000)
setTimeout(() => {
    cancel()
}, 4000)
// setInterval实现setTimeout
function mySetInterval(fn,delay){
    const timer=setInterval(()=>{
        fn()
        clearInterval(timer)
    },delay)
}
// mySetInterval(() => console.log(888), 1000)
// 实现compose函数
function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+2+3+4=11
function compose(...fn){
    if(fn.length===0) return num=>num
    if(fn.length===1) return num=>fn(0)
    return fn.reduce((pre,next)=>(num)=>next(pre(num))
    )
}
// 柯里化
const add = (a, b, c) => a + b + c;
const a1 = curry(add, 1);
console.log(a1(2,3)) // 1 + 2 + 3=6
function curry(fn,...args1){
    let args=[]
    const res=(...args2)=>{
        args=[...args1,...args2]
        if(fn.length==args.length)
            return fn(...args)
        else{return res } 
    }
    return res
}
//实现一个LRU缓存函数
class LRUCache{
    constructor(size){
        this.size=size
        this.cache=new Map()
    }
    get(key){
        const hasKey=this.cache.has(key)
        if(hasKey){
            const val=this.cache.get(key)
            // 保证有序
            this.cache.delete(key)
            this.cache.set(key,val)
            return val      
        }else{
            return -1
        }
    }
    put(key,val){
        const hasKey=this.cache.has(key)
        if(hasKey){
            this.cache.delete(key)
        }
        this.cache.set(key,val)
        if(this.cache.size>this.size){
            this.cache.delete(this.cache.keys().next().value)
        }
    }
}
let  cache = new LRUCache(2)//缓存容量
// 发布订阅模式
//JSON.parse
function parse(json){
    return eval('('+json+')')
}
let json='{"a":11,"b":{"f":45}}'
 
parse(json)
// 将DOM转化为树结构对象
function dom2tree(dom){
    const obj={}
    obj.tag=dom.tagName
    obj.children=[]
    dom.childNodes.forEach(child=>obj.children.push(dom2tree(child)))
    return obj
}
// rander函数
function mynewrender(vnode){
    if(typeof vnode==='number'){
        vnode=String(vnode)
    }
    if(typeof vnode ==='String'){
        return document.creatTextNode(vnode)
    }
    const dom=document.createElement(vnode.tag)
    // 普通dom
    if(vnode.attrs){
        Object.keys(vnode.attrs).forEach((key)=>{
            const value =vnode.attrs[key]
            dom.setAttribute(key,value)
        })
    }
    vnode.children.forEach(child=>dom.appendChild(mynewrender(child)))
    return dom
}
// 判断对象是否有循环引用
function cycleDetector(obj){
    const arr=[obj]
    let flag=false
    function cycle(o){
        const keys=Object.keys(o)
        for(const key of keys){
            const temp=o[key]
            if(typeof temp==='Object' &&temp!==null){
                if(arr.indexOf(temp)>=0){
                    flag=true
                    return
                }
                arr.push(temp)
                cycle(temp)
            }
        }
    }
    cycle(obj)
    return flag
}
// 计算对象层数
function loopGetLevel(obj){
    var res =1
    function computedLevel(obj,level ){
        var level=level?level:0
        if(typeof obj==='Object'){
            for(var key in obj){
                if(typeof obj[key]==='Object'){
                    computedLevel(obj[key],level++)
                }else{
                    res=level+1>res?level+1:res
                }
            }
        }else {
            res=level>res?level:res
        }
    }
    computedLevel(obj)
    return res
}
// 对象扁平化
let isObj=val=>typeof val=='object'&&val!==null
function flatten(obj){
    if(!isObj(obj)) return
    const res={}
    const dfs=(cur,pre)=>{
        if(isObj(cur)){
            if(Array.isArray(cur)){
                cur.forEach((item,index)=>{
                    dfs(item,`${pre}[${index}]`)
                })
            }else{
                for(let key in cur){
                    dfs(cur[key],`${pre}${pre?'.':''}${key}`)
                }
            }
        }else{
            res[pre]=cur
        }
    }
    dfs(obj,'')
    return res
}
const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }
 
console.log(111,flatten(obj))
