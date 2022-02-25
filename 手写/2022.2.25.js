// 数据类型判断
function typeOf(a){
    return Object.prototype.toString.call(a).slice(8,-1).toLowerCase();
}
typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'
// 继承
// 原型链继承:原型中包含的引用属性将被所有实例共享；子类在实例化的时候不能给构造函数传参
function Animal(){
    this.colors=['a','b','c']
}
Animal.prototype.getColor=function(){
    return this.color;
}
function Dog(){}
Dog.prototype=new Animal()
let dog1=new Dog()
dog1.colors.push('date');
let dog2=new Dog()
// 借用构造函数实现继承:解决了原型链继承的引用类型共享问题和传参问题，
// 但是由于子方法必须定义在构造函数中，所以导致每次创建子类实例都会创建一遍方法
function Animal(name){
    this.name=name
    this.getName=function(){
return this.name}
}
function Dog(name){
  Animal.call(this,name)
}
Dog.prototype=new Animal()
// 组合继承:结合原型链和盗用构造函数
// 基本思路是使用原型链继承原型上的属性和方法,而通过盗用构造函数继承实例属性
// 可以把方法定义在原型上实现复用，又可以让每个实例都有自己的属性
function Animal(name){
    this.name=name
    this.colors=['a','b','c']
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
// 寄生式组合继承：解决了组合继承调用2次父类构造函数的问题，一次是在new Animal(),一次是在Animal.call()
// 基本思路：不直接调用父类构造函数给子类原型赋值，而是通过创建空函数F获取父类原型的副本
function object(o){
    function F(){}
    F.prototype=o
    return new F()
}
function inheritPrototype(child,parent){
    let prototype=object(parent.prototype)
    prototype.constructor=child
    child.prototype=prototype
}
inheritPrototype(Dog,Animal)
// 简易版寄生式组合继承
function Animal(name){
    this.name=name
}
Animal.prototype.getName=function(){
    return this.name
}
function Dog(name,age){
    Animal.call(this,name)
    this.age=age
}
Dog.prototype=Object.create(Animal.prototype)?????????????????????????????????????
// class实现继承
class Animal{
    constructor(name){
        this.name=name
    }
    getName(){
        return this.name
    }
}
class Dog extends Animal{
    constructor(name,age){
        // super关键字用于访问和调用一个对象的父对象上的函数。
        super(name)
        this.age=age
    }
}
