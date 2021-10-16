//1. 创建 obj 2.吧构造函数的原型挂载到obj的__proto__上面3.执行构造函数并将构造函数this指向obj 4.如果obj是对象则返回obj不是则返回fn
function myNew(fn){
    let obj = {}
    obj.__proto__ = fn.prototype
    fn.apple(fn) //call apple bind
    return typeof obj==='objct'?obj:fn
}

