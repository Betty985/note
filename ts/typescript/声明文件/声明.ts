/// <reference path="声明.d.ts"/>
// 具有属性的对象
let res=myLib.makeGreeting("hello,world")
console.log('the computed greeting is :'+res)
let count=myLib.numberOfGreetings

interface Widget{
}
// 重载函数
let x1:Widget=getWidget(43)
let arr: Widget[] = getWidget("all of them");
// 可重用类型（接口）
greet({
    greeting:"hello world",
    duration:4000
})
// 可重用类型（类型别名）
function getGreeting(){
    return "howdy"
}
class MyGreeter extends Greeter{}
greet1('hello')
greet1(getGreeting)
greet1(new MyGreeter())
// 组织类型
const g=new Greeter1('hello')
g.log({verbose:true})
g.alert({modal:false,title:"Current Greeting"})
// 类
const myGreeter = new Greeter1("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();
class SpecialGreeter extends Greeter1 {
  constructor() {
    super("Very special greetings");
  }
}
// 全局变量
console.log("Half the number of widgets is " + foo / 2);
// 全局函数
greet("hello, world");