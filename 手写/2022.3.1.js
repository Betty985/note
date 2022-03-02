function $(el){
   return document.querySelector(el)
}
// 防抖函数
// 闭包加高阶函数   清空定时器
function debounce(func,wait){
    var timer;
    return function (){
        var context=this;
        var args=arguments;
        clearTimeout(timer)
        timer=setTimeout(function(){
            func.apply(context,args)
        },wait)
    }
}
function func(){
    console.log(12223)
}
$('html').onmousemove=debounce(func,10000000)
// 防抖函数高级
// 支持立即执行；函数可以有返回值；支持取消功能
function debounce(func,wait,immediate){
    var timer,result;
    var debounced=function(){
        var context=this;
        var args=arguments;
        if(timer) clearTimeout(timer);
        if(immediate){
            var callNow=!timer;
            timer=setTimeout(function(){
              timer=null
            },wait)
            if(callNow) result=func.apply(context,args)
        }else{
            timer=setTimeout(function(){
                func.apply(context,args)
            },wait)
        }
        return result
    }
    debounce.cancel=function(){
        clearTimeout(timer);
        timer=null
    }
    return debounced
}
// 函数柯里化
function curry(fn){
    let judge=(...args)=>{
        // fn.length是函数参数的个数
        if(args.length==fn.length) return fn(...args)
        return (...arg)=>judge(...args,...arg)
    }
    return judge
}
// 偏函数
function partial(fn,...args){
    return(...arg)=>{
        return fn(...args,...arg)
    }
}
// JSONP
/**核心原理与优缺点
核心原理：script标签不受同源策略约束，可以用来进行跨域请求
优点：兼容性好
缺点：只能用于get请求
*/
const jsonp=({url,params,callbackName})=>{
    const generateUrl=()=>{
        let dataSrc='';
        for(let key in params){
            if(params.hasOwnProperty(key)){
                dataSrc+=`${key}=${params[key]}&`
            }
        }
        dataSrc+=`callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return  new Promise((resolve,reject)=>{
        const scriptEle=document.createElement('script')
        scriptEle.src=generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName]=data=>{
            resolve(data)
            document.removeChild(scriptEle)
        }
    })
}
function hello(){
    alert('hello')
    
}
let objJsonp={
    url:"https://www.baidu.com",
    params:{
        ie:'UTF-8',
        wd:'jsonp'
    },
    callbackName: hello
}
jsonp(objJsonp)
//new 
function neww(){
    // 生成一个对象
    // var obj=new Object()//new
    // var obj={}//对象字面量
    var obj=Object.Create()//Create
    // 构造函数
    Constructor=[].shift.call(arguments)
    obj.__proto__=Constructor.prototype
    var res=Constructor.apply(obj,arguments)
    return typeof res==='Object'?res||obj:obj 
}
// promise.all
// 传入的所有Promise都是fulfilled,则返回由他们的值组成的，状态为fulfilled的新的
// promise；只要有一个promise是rejected，则返回rejected状态的新的promise，且它的值是
// 第一个reject的promise的值
// 只要有一个promise是pending，则返回pending状态的新的promise
Promise.all=function(promiseArr){
    let index=0,result=[]
    return new Promise((resolve,reject)=>{
        promiseArr.forEach((p,i)=>{
            Promise.resolve(p).then(val=>{
                index++
                result[i]=val
                if(index===promiseArr.length){
                    resolve(result)
                }
            },err=>{reject(err)})
        })
    })
}
// promise.race
/**
promise.race会返回一个由
所有可迭代实例中第一个fulfilled或rejected的实例包装后的新实例
*/
Promise.race=function(promiseArr){
    return new Promise((resolve,reject)=>{
        promiseArr.forEach(p=>{
            Promise.resolve(p).then
                (val=>{resolve(val)},err=>{ reject(err)}
            )
        })
    })
}
// promise.allSettled
/*规则
所有promise的状态都变化了，那么新返回一个状态是fulfilled的promise，且它的值是
一个数组，数组的每项都由所有promise的值和状态组成的对象
如果有一个pending的promise，返回一个状态是pending的新实例
*/
