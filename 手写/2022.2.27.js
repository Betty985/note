// 数据类型判断
function typeOf(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}
typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'
// 继承
// 原型链继承:原型中包含的引用类型属性将被所有实例共享；
//           子类在实例化的时候不能给父类构造函数传参
function Animal(){
    this.colors=['black']
}
Animal.prototype.getColor=function(){
return this.colors}
function Dog(){}
Dog.prototype=new Animal()
let dog1=new Dog()
dog1.colors.push('pink')
let dog2=new Dog()
// 借用构造函数实现继承:解决了原型链继承的引用类型共享问题和传参问题
//         方法必须定义在构造函数中，每次创建子类实例都会创建一遍方法
function Animal(name){
    this.name=name;
    this.getName=function(){
        return this.name
    }
}
function Dog(name){
    Animal.call(this,name)
}
Dog.prototype=new Animal()
let dog3=new Dog("ll")
// 组合继承：使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性。可以把方法定义在原型上实现重用，又可以让每个实例都有自己的属性
function Animal(name){
    this.name=name
    this.colors=['black']
}
Animal.prototype.getName=function(){
    return this.name
}
function Dog(name,age){
    Animal.call(this,name)
    this.age=age
}
Dog.prototype=new Animal()
Dog.prototype.constructor=Dog
let dog5=new Dog("kk",1)
dog5.colors.push('pink')
let dog6=new Dog("nini",4)
// 寄生式组合继承：组合继承调用了2次父类构造函数[new Animal(),Animal.call()]
//    不直接调用父类构造函数给子类原型赋值，而是创建空函数获取父类原型的副本
function Animal(name){
   this.name=name;
   this.colors=['black']
}
Animal.prototype.getName=function (){
    return this.name
}
function Dog(name,age){
    Animal.call(this,name)
    this.age=age
}
Dog.prototype=Object.create(Animal.prototype)
Dog.prototype.constructor=Dog
let dog7 = new Dog('奶昔', 2)
dog1.colors.push('brown')
let dog8 = new Dog('哈赤', 1)
// 数组去重
let arr=[1,1,2,4,5,6,,7]
// ES5：filter+indexOf
function unique(arr){
    var res=arr.filter(function (item,index,array){
        return array.indexOf(item)==index
    })
    return res
}
// ES6：扩展运算符+Set (可以用箭头函数)   不会删除undefined
let unique1 = arr => [...new Set(arr)]
// 数组扁平化：Array.prototype.flat    
flatten([1, [2, [3]]])
// ES5 递归
function flatten(arr){
    var result =[]
    for(var i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
             // concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
            result=result.concat(flatten(arr[i]))
        }
        else{result.push(arr[i])}
    }
    return result
}
// 生成器函数
function* flatten(arr){
    for (let item of arr){
        if(Array.isArray(item)){
            yield* flatten(item)
        }
        else yield item
    }
}
let res=[...flatten(arr)]
// ES6 some
// some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值
function flatten(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr)
    }
    return arr
}
// 深浅拷贝 
var sym = Symbol.for("comet");
var sym2 = Symbol.for("meteor");
var obj = {[sym]: 0, "str": 0, "773": 0, "0": 0,
           [sym2]: 0, "-1": 0, "8": 0, "second str": 0};
// 浅拷贝：只考虑对象类型
function shallowCopy(obj){
   if(typeof obj !=="object") return obj
   let newObj=obj instanceof Array?[]:{}
   // 可以遍历到symbol键名
   let keys= Reflect.ownKeys(obj)
   for(let key of keys){
      if(obj.hasOwnProperty(key)){
         newObj[key]=obj[key]
      }
   }
   return newObj
}
