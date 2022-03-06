/* 实现(a == 1 && a == 2 && a == 3)为true
var a={
 i:1,
 toString(){
  return a.i++
 }
}

var a=[1,2,3]
a.join=a.shift
var val=0
Object.defineProperty(window,'a',{
 get(){
  return ++val
 }
})
console.log(a == 1 && a == 2 && a == 3) // true*/
// 实现限制并发的Promise调度器
class Scheduler{
 constructor(limit){
  this.queue=[]
  this.limit=limit
  this.count=0
 }
 add(time,order){  
  const promiseCreator=()=>{
   return new Promise((resolve,reject)=>{
    setTimeout(()=>{
     console.log(order)
     resolve()
    },time)
   })
  }
   this.queue.push(promiseCreator)
  }
  taskStart(){
    for(let i=0;i<this.limit;i++){
     this.request()
    } 
   }
  request(){
   if(!this.queue.length||this.count>=this.limit)
    return 
    this.count++
    this.queue.shift()().then(()=>{
    this.count--
    this.request()
   })
  }
 }
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
// scheduler.taskStart();
// 实现lazyMan函数
class LazyMan{
 constructor(name){
   this.tasks=[]
   const task=()=>{
    console.log(`hi!This is ${name}`)
    this.next()
   }
  this.tasks.push(task)
  setTimeout(()=>{
   this.next()
  },0)
 }
 next(){
  const task=this.tasks.shift()
  task&&task()
 }
 sleep(time){
  this.sleepWrapper(time,false)
  return this
 }
 sleepFirst(time){
  this.sleepWrapper(time,true)
  return this
 }
 sleepWrapper(time,first){
  const task=()=>{
   setTimeout(()=>{
    console.log(`wake up after ${time}`)
    this.next()
   },time*1000)
  }
  if(first){
   this.tasks.unshift(task)
  }else{
   this.tasks.push(task)
  }
 }
 eat(food){
  const task=()=>{
   console.log(`Eat ${food}`)
   this.next()
  }
  this.tasks.push(task)
  return this
 }
}
const lazyMan = (name) => new LazyMan(name)

lazyMan('Hank').sleep(1).eat('dinner')

lazyMan('Hank').eat('dinner').eat('supper')

lazyMan('Hank').eat('supper').sleepFirst(5)

// 实现add函数
function add(...args1){
 let allArgs=[...args1]
 function fn(...args2)
  {
   if(!args2.length ) return fn.toString()
   allArgs=[...allArgs,...args2]
   return fn
  }
 fn.toString=function(){
  return allArgs.reduce((pre,next)=>pre+next)
 }
 return fn
}
// console.log(add(1)(2)(3)())
// console.log(add(1, 2)(3)())
// 深拷贝
// Promise
// async/await
// Array
const players = [
    { name: '科比', num: 24 },
    { name: '詹姆斯', num: 23 },
    { name: '保罗', num: 3 },
    { name: '威少', num: 0 },
    { name: '杜兰特', num: 35 }
]

// forEach
Array.prototype.myForEach=function(callback){
 for(let i=0;i<this.length;i++){
  callback(this[i],i,this)
 }
}
players.myForEach((item,index,Array)=>{
 console.log(item,index)
})
// map
Array.prototype.mymap=function(callback){
 const res=[]
 for(let i=0;i<this.length;i++){
  res.push(callback(this[i],i,this))
 }
 return res
}
console.log(players.mymap((item, index) => `${item.name}--${item.num}--${index}`))
// filter
Array.prototype.myfilter=function(callback){
 const res=[]
 for(let i=0;i<this.length;i++){
  callback(this[i],i,this)&&res.push(this[i])
 }
 return res
}
console.log(players.myfilter(item => item.num >= 23))
// every
// 是否全部通过测试函数
Array.prototype.myevery=function(callback){
 let flag=true
 for(let i=0;i<this.length;i++){
  flag=callback(this[i],i,this)
  if(!flag) break
 }
 return flag
}
console.log(players.myevery(item => item.num >= 23)) // false
console.log(players.myevery(item => item.num >= 0)) // true
// some
// 是否有一个通过测试函数
Array.prototype.mysome=function(callback){
 let flag=false
 for(let i=0;i<this.length;i++){
  flag=callback(this[i],i,this)
  if(flag) break
 }
 return flag
}

console.log(players.mysome(item => item.num >= 23)) // true
console.log(players.mysome(item => item.num >= 50)) // false
// reduce
// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
Array.prototype.myreduce=function(callback,...args){
 let pre =args.length?args[0]:this[0]
 for(let i=0;i<this.length;i++){
  pre=callback(pre,this[i],i,this)
 }
 return pre
}
// 计算所有num相加
const sum = players.myreduce((pre, next) => {
    return pre + next.num
}, 0)
console.log(sum) // 85
// findindex
// findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引
Array.prototype.myfindIndex=function(callback){
 for(let i=0;i<this.length;i++){
  if(callback(this[i],i,this)){
   return i
  }
 }
 return -1
}
console.log(players.myfindIndex(item => item.name === '科比')) // 0
console.log(players.myfindIndex(item => item.name === '安东尼')) // -1
// find
// find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
Array.prototype.myfind=function(callback){
 for (let i=0;i<this.length;i++){
  if(callback(this[i],i,this)) return this[i]
 }
 return undefined
}
console.log(players.myfind(item => item.name === '科比')) // { name: '科比', num: 24 }
console.log(players.myfind(item => item.name === '安东尼')) // undefined
// fill
// fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
Array.prototype.myfill=function(val,start=0,end){
 end=end||this.length
 for(let i=start;i<end;i++){
  this[i]=val
 }
 return this
}
// console.log(players.myfill('林三心', 1, 3))
// includes
// includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
Array.prototype.myincludes=function(value,start=0){
 if(start<0) start=this.length+start
 const isNaN=Number.isNaN(value)
 for(let i=start;i<this.length;i++){
  if(this[i]==value||(isNaN&&Number.isNaN(this[i]))){
   return true
  }
 }
 return false
}
// console.log([1, 2, 3].myincludes(2)) // true
// console.log([1, 2, 3, NaN].myincludes(NaN)) // true
// console.log([1, 2, 3].myincludes(1, 1)) // false
// join
// join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
// 如果数组只有一个项目，那么将返回该项目而不使用分隔符。
Array.prototype.myjoin=function(s=','){
 let str=''
 for(let i=0;i<this.length;i++){
  str=i===0?`${str}${this[i]}`:`${str}${s}${this[i]}`
 }
 return str
}
console.log([1,].myjoin()) // 1,2,3
console.log([1, 2, 3].myjoin('*')) // 1*2*3
// flat
// flat() 方法会按照一个可指定的深度递归遍历数组，
// 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
Array.prototype.myflat=function(num=1){
 let arr=this;
 let i=0
 while(arr.some(item=>Array.isArray(item))){
  arr=[].concat(...arr)
  i++
  if(i>=num) break
 }
 return arr
}
const testArr = [1, [2, 3, [4, 5]], [8, 9]]

console.log(testArr.myflat(1))
// splice
// array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
Array.prototype.mysplice=function(start,deleteCount,...values){
 deleteCount=start+deleteCount>this.length-1?this.length-start:deleteCount
 const res=[]
 let temp=[...this]
 for(let i=start;i<start+values.length;i++){
  this[i]=values[i-start]
 }
 this.length=start+values.length
 let newStart=start+values.length
 if(values.length<deleteCount){
  const insert=deleteCount-values.length
  for(let i=newStart;i<temp.length;i++){
   this[i]=temp[i+insert]
  }
  this.length-=insert
 }
 if(values.length>=deleteCount){
  for(let i=start+deleteCount;i<temp.length;i++){
   this.push(temp[i])
  }
 }
 for(let i=start;i<start+deleteCount;i++){
  res.push(temp[i])
 }
 return res
}
const months = ['Jan', 'March', 'April', 'June'];
months.mysplice(1, 0, 'Feb');
// entries
Object.prototype.myentries=function(obj){
 const res=[]
 for(let key in obj){
  obj.hasOwnProperty(key)&&res.push([key,obj[key]])
 }
 return res
}
const object1 = {
  a: 'somestring',
  b: 42
};
Object.myentries(object1)
// fromEntries
Object.prototype.myfromEntries=function(arr){
 
}
