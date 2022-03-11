const players = [
    { name: '科比', num: 24 },
    { name: '詹姆斯', num: 23 },
    { name: '保罗', num: 3 },
    { name: '威少', num: 0 },
    { name: '杜兰特', num: 35 }
]

// reduce
Array.prototype.myreduce=function (cb,...args){
    let start=0
    let pre
    if(args.length){
        pre=args[0]
    }else{
        pre=this[0]
        start=1
    }
    for(let i=start;i<this.length;i++){
        pre=cb(pre,this[i],i,this)
    }
    return pre
}
const sum=players.myreduce((pre,next)=>{
    return pre+next.num
},0)
console.log(sum)
// findIndex
Array.prototype.myfindIndex=function(cb){
    for(let i=0;i<this.length;i++){
        if(cb(this[i],i,this)){
            return i
        }
    }
    return -1
}
console.log(players.myfindIndex(item => item.name === '科比')) // 0
console.log(players.myfindIndex(item => item.name === '安东尼')) // -1
// Object
const obj = {
    name: '林三心',
    age: 22,
    gender: '男'
}
// entries
Object.prototype.myentries=function(obj){
    const res=[]
    for(let key in obj){
        obj.hasOwnProperty(key)&&res.push([key,obj[key]])
    }
    return res
}
console.log(Object.myentries(obj))
// fromEntries
Object.prototype.myfromEntries=function(arr){
    const obj={}
    for(let i=0;i<arr.length;i++){
        const[key,value]=arr[i]
        obj[key]=value
    }
    return obj
}
console.log(Object.myfromEntries([['name', '林三心'], ['age', 22], ['gender', '男']]))
// keys
Object.prototype.mykeys=function(obj){
    const keys=[]
    for(let key in obj){
        obj.hasOwnProperty(key)&&keys.push(key)
    }
    return keys
}
console.log(Object.mykeys(obj))
// values
Object.prototype.myvalues=function(obj){
    const values=[]
    for(let key in obj){
        obj.hasOwnProperty(key)&&values.push(obj[key])
    }
    return values
}
console.log(Object.myvalues(obj))
// instanceof
function instanceOf(child,father){
    let prototype=father.prototype
    let l=child.__proto__
    while(l){
        if(l==prototype){
            return true
        }
        l=l.__proto__
    }
    return false
}
// is
Object.prototype.myis=function(x,y){
    if(x===y){
        return x!==0||1/x===1/y
    }
    return x!==x&&y!==y
}
Object.myis(-0,+0)
Object.myis(NaN,NaN)
Object.myis(1,1)
// assign
// assign接收多个对象，并将多个对象合成一个对象
// 这些对象如果有重名属性，以后来的对象属性值为准
// assign返回一个对象，这个对象 === 第一个对象
Object.prototype.myassign=function(target,...args){
    if(target===null||target===undefined){
        throw new TypeError('Cannot convert undefined or null to object')
    }
    target=Object(target)
    for(let next of args){
        for(let key in next){
            next.hasOwnProperty(key)&&(target[key]=next[key])
        }
    }
    return target
}
const testa = { name: '林三心' }
const testb = { name: 'sunshine_lin', age: 22 }
const testc = { age: 18, gender: '男' }

const testd = Object.myassign(testa, testb, testc)
console.log(testd) // { name: 'sunshine_lin', age: 18, gender: '男' }
console.log(testa === testd) // true
// function 
// call
Function.prototype.mycall=function(context){
     if(typeof this!=='function'){
        throw new TypeError('error')
    }
    context=context||window
    // 防止重名
    const fn=Symbol()
    context[fn]=this
    let args=[...arguments].slice[1]
    let res=context.fn(...args)
    delete context.fn
    return res
}
// apply
Function.prototype.myapply=function(context){
    if(typeof this!=='function'){
        throw new TypeError('error')
    }
    context=context||window
    context.fn=this
    let res
    if(arguments[1]){
        result=context.fn(...arguments[1])
    }else{
        result=context.fn()
    }
    delete context.fn
    return res
}
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.myapply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
// bind
Funtion.prototype.mybind=function(context){
    if(typeof this!=='function'){
        throw new TypeError("error")
    }
    const _this=this
    const args=[...arguments].slice(1)
    return function F(){
        if(this instanceof F){
            return new _this(...args,...arguments)
        }
        return _this.apply(context,args.concat(...arguments))
    }
}
// string
// slice
String.prototype.myslice=function(start=0,end){
    start=start<0?this.length+start:start
    end=!end&&end!==0?this.length:end
    if(start>=end) return ''
    let str=''
    for(let i=start;i<end;i++){
        str+=this[i]
    }
    return str
}
// substr
String.prototype.mysubtr=function(start=0,length){
    if(length<0) return ''
    start=start<0?this.length+start:start
    length=(!length&&length!==0)||length>this.length-start?this.length:start+length
    let str=''
    for(let i=start;i<length;i++){
        str+=this[i]
    }
     return str   
}
