// 数据类型判断
function typeOf(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}
// typeOf([])        // 'array'
// typeOf({})        // 'object'
// typeOf(new Date)  // 'date'
// 继承
/**原型继承*
缺点：原型中包含的引用类型属性将被所有实例共享；子类在实例化的时候不能给父类传参
*/
function Animal(){
    this.colors=['pink']
}
Animal.prototype.getColor=()=>{
    return this.colors
}
function Dog(){}
Dog.prototype=new Animal()
// let dog1 = new Dog()
// dog1.colors.push('brown')
// let dog2 = new Dog()
// console.log(dog2.colors)  // ['black', 'white', 'brown']
/**借用构造函数继承*
解决了原型继承引用类型共享问题和传参问题
缺点：方法必须定义在构造函数中，每次创建子类实例都会创建一遍方法
*/
function Animal(name){
    this.name=name
    this.colors=['pink']
    this.getColor=()=>{
        return this.colors
    }
}
function Dog(name){
    Animal.call(this,name)
}
Dog.prototype=new Animal()
// let dog1 = new Dog()
// dog1.colors.push('brown')
// let dog2 = new Dog()
// console.log(dog2.colors)  
/** 组合继承*
组合继承结合了原型链和盗用构造函数，使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性
既可以把方法定义在原型上实现重用，又可以让每个实例都有自己的属性
*/
function Animal(name){
    this.name=name;
    this.colors=['pink']
}
Animal.prototype.getColor=()=>{
    return this.colors
}
function Dog(name,age){
    this.age=age
    Animal.call(this,name)
}
Dog.prototype=new Animal()
Dog.prototype.constructor=Dog
// let dog1 = new Dog('奶昔', 2)
// dog1.colors.push('brown')
// let dog2 = new Dog('哈赤', 1)
// console.log(dog2) 
/***寄生式组合继承*
组合继承的缺点是调用了2次父类构造函数
解决方案：不直接调用父类构造函数给子类赋值
*/
function Animal(name){
    this.name=name
    this.colors=['pink']
}
Animal.prototype.getColor=()=>{
    return this.colors
}
function Dog(name,age){
    this.age=age
    Animal.call(this,name)
}
Dog.prototype=Object.create(Animal.prototype)
Dog.prototype.constructor=Dog

/**class实现继承**/
class Animal1{
    constructor(name){
        this.name=name
        this.colors=['pink']
    }
    getName(){
        return this.name
    }
}
class Dog1 extends Animal1{
    constructor(name,age){
        super(name)
        this.age=age
    }
}
let dog1 = new Dog1('奶昔', 2)
dog1.colors.push('brown')
let dog2 = new Dog1('哈赤', 1)
console.log(dog2) 
/**数组去重**/
//filter+indexOf
function unique(arr){
   var res= arr.filter((item,index,array)=>
       array.indexOf(item)==index //如果在这里加上花括号箭头函数的返回值就是undefined
    )
    return res
}
// 剩余运算符+Set   
// 这种方法会把undefined算进去
let unique1=(arr)=>[...new Set(arr)]
let arr=[1,2,3,5,3,2,,21]
unique1(arr)
// 数组扁平化：flat
// 递归
function flatten(arr){
    let res=[]
    for (item of arr){
        if(Array.isArray(item))
            res=res.concat(flatten(item))
        else res.push(item)
    }
    return res
    
}
// 剩余运算符+some
// some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。
function flatten(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr)
    }
    return arr
}
let fla=[1, [2, [3]]]
flatten(fla)
/**深浅拷贝**/
// 浅拷贝
function shallowCopy(obj){
    if(typeof obj!='object') return obj
    // let newObj=Array.isArray(obj)?[]:{}
    let newObj=obj instanceof Array ?[]:{}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key]=obj[key]
        }
    }
    return newObj
}
let obj={
    a:1,
    b:3
}
shallowCopy(obj)
