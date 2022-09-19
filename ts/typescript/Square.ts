interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
  return { color: "red", area: 100 };
}
// let c={ colour: "red", width: 100 }
let mySquare = createSquare({ colour: "red", width: 100 });
console.log(mySquare);
/* 跳过对象字面量赋值给变量或作为参数传递时，ts进行额外属性检查的方法
 * 1.使用类型断言
 * 2.字符串索引签名
 * 3.将这个对象赋值给一个另一个变量
 */

//   函数类型。函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
console.log(mySearch);

interface StringArray {
  [index: number]: string
}
let myArray: StringArray
myArray = ['Bob', 'Fred'];
let myStr: string = myArray[0]
console.log(myStr)
interface NumberDictionary {
  [index: string]: number;
  length: number;
  // name:string  与索引返回值的类型不匹配
}


// 类接口。明确地强制一个类去符合某种契约,描述了类的公共部分。类实现接口时只对类的实例部分进行检查。
interface ClockInterface {
  curTime: Date;
  setTime(d: Date): Date;
  // new (hour:number,minute:number)
}
class Clock implements ClockInterface {
  // constructor(h:number,m:number){
  // }
  // 类“Clock”错误实现接口“ClockInterface”。
  // 类型“Clock”提供的内容与签名“new (hour: number, minute: number): any”不匹配。ts(2420)
  curTime: Date;
  setTime(d: Date) {
    let day:Date=new Date()
    return day
  }
}

interface ClockConstructor{
  new (hour:number,minute:number):IClockInterface
}
interface IClockInterface{
  tick()
}
function createClock(ctor:ClockConstructor,hour:number,minute:number){
  return new ctor(hour,minute)
}
class DigitalClock implements IClockInterface{
  constructor(h:number,m:number){}
  tick() {
    console.log('beep beep')
  }
}
class AnalogClock implements IClockInterface{
  constructor(h:number,m:number){}
  tick(){
    console.log('tick tock')
  }
}
let digital=createClock(DigitalClock,12,17)
let analog=createClock(AnalogClock,7,32)

// 继承接口
interface Shape{
  color:string;
}
interface PenStroke{
  penWidth:number
}
interface Square extends Shape,PenStroke{
  sideLength:number
}

// 混合类型
interface Counter{
  (start:number):string;
  interval:number;
  reset():void
}
function getCounter():Counter{
  let counter=<Counter>function (start:number){};
  counter.interval=123
  counter.reset=function (){}
  return counter
}

// 接口继承类。继承类的成员但不包括其实现。继承一个拥有私有或受保护成员的类的接口类型只能被这个类或其子类实现。
class Control{
  private state:any
}
interface SelectableControl extends Control{
  select():void
}
class Button extends Control implements SelectableControl{
  select(){}
}

// class Image implements SelectableControl{
//   private state:any  
//   select() {  }
// }
// 报错信息：类“Image”错误实现接口“SelectableControl”。类型具有私有属性“state”的单独声明。
// ts使用的是结构性类型系统。比较两种不同的类型时，如果所有成员的类型都是兼容的，那么它们的类型就是兼容的。当比较private或protected成员时，如果一个类型包含private或者protected成员，只有另外一个类型中也存在这样一个成员，并且它们来自同一处声明时，才认为这两个类型时兼容的。

// private成员不能在声明它的类的外部访问。protected成员在派生类中仍然可以访问。

// readonly 关键字将属性设置为只读的，只读属性必须在声明时或构造函数里被初始化。

// 参数属性通过给构造函数添加一个访问限定符来声明。在一个地方定义并初始化一个成员。
class Animal{
  constructor(private name:string){

  }
  move(distanceInMeters:number){
    console.log(`${this.name} moved ${distanceInMeters}m`)
  }
}

let passcode='secret'
class Employee{
  private _fullName:string
  get fullName():string{
    return this._fullName
  }
  set fullName(newName:string){
    if(passcode&&passcode == 'secret'){
      this._fullName=newName
    }
    else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}
let employee=new Employee()
employee.fullName='Bob '
if(employee.fullName){
  console.log(employee.fullName)
}

// static定义的静态属性存在于类本身上。实例访问这个属性需要在属性前加上类名.

// 抽象类做为其他派生类的基类使用，可以包含成员的实现细节。一般不会直接被实例化。abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

abstract class Department{
  constructor(public name :string){}
  printName():void{
    console.log('Department name'+this.name)
  }
  abstract printMeeting():void
}
class AccountingDepartment extends Department{
  constructor(){
    super('Accounting and Auditing')
  }
  printMeeting(): void {
    console.log('the accounting Department meets each Monday at 10am')
  }
  generateReports():void{
    console.log('generating accounting reports..')
  }
}
// 创建一个对抽象类型的引用
let department:Department
// department=new Department() 无法创建抽象类的实例。
// 对抽象子类进行实例化和赋值
department= new AccountingDepartment()
department.printName()
department.printMeeting()
// department.generateReports() 类型“Department”上不存在属性“generateReports”。

// let instance : ClassA; 表示的是 instance 的类型是ClassA的实例。let classA: typeof ClassA; 表示的是 classA 的类型就是 ClassA。
// 在 TypeScript 中，typeof 操作符可以用来获取一个变量或对象的类型。
class Greeter{
  static standardGreeting='hello , there';
  greeting:string
  greet(){
    if(this.greeting){
      return 'hello,'+this.greeting
    }else{
      return Greeter.standardGreeting
    }
  }
}
let greeter1:Greeter
greeter1=new Greeter()
console.log(greeter1.greet())
// typeof Greeter，意思是取Greeter类的类型
let greeterMaker:typeof Greeter   = Greeter
greeterMaker.standardGreeting='hey snowball'
let greeter2:Greeter=new greeterMaker()
console.log(greeter2.greeting)