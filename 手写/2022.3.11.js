// 实现原生的AJAX请求
const ajax={
    get(url,fn){
        const xhr=new XMLHttpRequest()
        xhr.open('get',url,true)
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                fn(xhr.responseText)
            }
        }  
        xhr.send()
    },
    post(url,data,fn){
        const xhr=new XMLHttpRequest()
        xhr.open('post',url,true)
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                fn(xhr.responseText)
            }
        }
        xhr.send(data)
    }
}
let fa=(v)=>{console.log(v)}
ajax.get("https://juejin.cn/post/7023906112843808804",fa)
ajax.post("https://juejin.cn/post/7023906112843808804",111,fa)
// new
function mynew(fn,...args){
    let obj={}
    obj.__proto__=fn.prototype
    fn.apply(obj,args)
    obj.__proto__.constructor=fn
    return obj
}
function father(v){
    this.color='white'
   this.skill=[1,2,3,4]
   this.name=v
}
mynew(father,'coco')
// instanceof
function myinstanceof(child,father){
    let prototype=father.prototype
    let l=child.__proto__
    while(l){
        if(l===prototype) return true
        l=l.__proto__
    }
    return false
}
 myinstanceof([],Array)
 myinstanceof([],Object)
// 防抖函数
function debounce(fn,delay=500){
    let timer
    return function(){
        if(timer) clearTimeout(timer)
        let that=this
        let arg=arguments
        timer=setTimeout(()=>{fn.apply(that,arg)},delay)
    }
}
// 节流函数
function throttle(fn,delay=500){
    let timer
    return function(){
        if(timer) timer=null
        let that=this
        let arg=arguments
        timer=setTimeout(()=>{
            fn.apply(that,arg)
        },delay)
    }
}
function throttle(fn,delay=500){
    let flag=true
    return function(){
        if(!flag) return
        flag=false
        let args=arguments
        setTimeout(()=>{
            fn.apply(this,args)
            flag=true
        },delay)
    }
}
// 数组去重
// Map
function unique(arr){
    const newArr=[]
    arr.reduce((pre,cur)=>{
        if(!pre.has(cur)){
            pre.set(cur,1)
            newArr.push(cur)
        }
        return pre
    },new Map())
    return newArr
}
// set
function unique(arr){
    return [...new Set(arr)]
}
// filter+indexof
function unique(arr){
   return arr.filter((item,i)=>arr.indexOf(item)==i)
}
let chong=[1,2,31,1,3,3,21,2,2,,5,3]
unique(chong)
// 用setTimeout实现setInterval
function mysetInterval(fn,delay){
    let timer
    const interval=()=>{
        fn()
        timer=setTimeout(interval,delay)
    }
    setTimeout(interval,delay)
    return{
        cancel(){
            clearTimeout(timer)
        }
    }
}
const { cancel } = mysetInterval(() => console.log(888), 1000)
setTimeout(() => {
    cancel()
}, 4000)
// 用setInterval实现setTimeout
function mysetTimeout(fn,delay){
    let timer
    timer=setInterval(()=>{
          fn()
        clearInterval(timer)
    },delay)
}
mysetTimeout(() => console.log(888), 1000)
// 实现一个compose函数
let fn1=x=>x+1
let fn2=x=>x+2
let fn3=x=>x+3
let fn4=x=>x+4
const a=compose(fn1,fn2,fn3,fn4)
function compose(...fn){
    if(fn.length===0) return num=>num
    if(fn.length===1) return fn[0]
    return fn.reduce((pre,cur)=>{
        return num=>cur(pre(num))
    })
}
console.log(a(1)); // 1+2+3+4=11
//柯里化函数
const add = (a, b, c) => a + b + c;
const b = currying(add, 1);
function currying(fn,...args1){
    // fn.length:形参数量
    // 形参的数量不包括剩余参数个数以及含第一个具有默认值之后的参数个数
    const length=fn.length
    let allArgs=[...args1]
    const res=(...args2)=>{
        allArgs=[...allArgs,...args2]
        if(allArgs.length==length)return fn(...allArgs)
        else{
            // console.log(allArgs.length,length)
            return res}
    }
    return res
}
console.log(b(2,3)) // 1 + 2 + 3=6
// 实现一个LRU缓存函数
class LRUCache{
    constructor(size){
        this.size=size
        this.cache=new Map()
    }
    get(key){
        let hasKey=this.cache.has(key)
        if(hasKey){
            const val = this.cache.get(key)
            // 保证顺序
            this.cache.delete(key)
            this.cache.set(key,val)
            return val
        }else return -1
    }
    put(key,value){
        let hasKey=this.cache.has(key)
        if(hasKey){
            this.cache.delete(key)
        }
        this.cache.set(key,value)
        if(this.cache.size>this.size){
            this.cache.delete(this.cache.keys().next().value)
        }
    }
}
let lru=new LRUCache(3)
lru.put(1,'this')
lru.put(2,'that')
lru.put(3,'they')
lru.get(2)
lru.put(4,'he')
// 订阅发布
class EventEmitter{
    constructor(){
        this.cache={}
    }
    on(name,fn){
        const tasks=this.cache[name]
        if(tasks){
            this.cache[name].push(fn)
        }else{
            this.cache[name]=[fn]
        }
    }
    off(name,fn){
        const tasks=this.cache(name)
        if(tasks){
            const index=tasks.findIndex(item=>item===fn)
            if(index>=0){
                this.cache[name].splice(index,1)
            }
        }
    }
    emit(name,...args){
        // 复制一份
        const tasks=this.cache[name].slice()
        if(tasks){
            for(let fn of tasks){
                fn(...args)
            }
        }
    }
    once(name,cb){
        function fn(...args){
            cb(args)
            this.off(name,fn)
        }
        this.on(name,fn)
    }
}
// Json.parse
function parse(json){
    return eval('('+json+')')
}
// dom=>tree
function dom2tree(dom){
    const obj={}
    obj.tag=dom.tagname
    obj.chidren=[]
    dom.childNodes.forEach(child=>obj.children.push(dom2tree(child)))
    return obj
}
// tree=>dom
function render(vnode){
    if(typeof vnode==='number'){
        vnode=String(vnode)
    }
    if(typeof vonde ==='String'){
        return document.createTextNode(vode)
    }
    let  dom =document.createElement(vnode.tag)
    if(vnode.attrs){
        Object.keys(vnode.attrs).forEach((key)=>{
            let value=vnode.attrs[key]
            dom.setAttribute(key,value)
        })
    }
    vnode.children.forEach((child)=>dom.appendChild(render(child)))
    return dom
}
