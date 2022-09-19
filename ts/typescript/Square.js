var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function createSquare(config) {
    // ...
    return { color: "red", area: 100 };
}
// let c={ colour: "red", width: 100 }
var mySquare = createSquare({ colour: "red", width: 100 });
console.log(mySquare);
var mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
console.log(mySearch);
var myArray;
myArray = ['Bob', 'Fred'];
var myStr = myArray[0];
console.log(myStr);
var Clock = /** @class */ (function () {
    function Clock() {
    }
    Clock.prototype.setTime = function (d) {
        var day = new Date();
        return day;
    };
    return Clock;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log('beep beep');
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log('tick tock');
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
// 接口继承类。继承类的成员但不包括其实现。继承一个拥有私有或受保护成员的类的接口类型只能被这个类或其子类实现。
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
// class Image implements SelectableControl{
//   private state:any  
//   select() {  }
// }
// 报错信息：类“Image”错误实现接口“SelectableControl”。类型具有私有属性“state”的单独声明。
// ts使用的是结构性类型系统。比较两种不同的类型时，如果所有成员的类型都是兼容的，那么它们的类型就是兼容的。当比较private或protected成员时，如果一个类型包含private或者protected成员，只有另外一个类型中也存在这样一个成员，并且它们来自同一处声明时，才认为这两个类型时兼容的。
// private成员不能在声明它的类的外部访问。protected成员在派生类中仍然可以访问。
// readonly 关键字将属性设置为只读的，只读属性必须在声明时或构造函数里被初始化。
// 参数属性通过给构造函数添加一个访问限定符来声明。在一个地方定义并初始化一个成员。
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distanceInMeters) {
        console.log("".concat(this.name, " moved ").concat(distanceInMeters, "m"));
    };
    return Animal;
}());
var passcode = 'secret';
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == 'secret') {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee();
employee.fullName = 'Bob ';
if (employee.fullName) {
    console.log(employee.fullName);
}
// static定义的静态属性存在于类本身上。实例访问这个属性需要在属性前加上类名.
// 抽象类做为其他派生类的基类使用，可以包含成员的实现细节。一般不会直接被实例化。abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log('Department name' + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, 'Accounting and Auditing') || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log('the accounting Department meets each Monday at 10am');
    };
    AccountingDepartment.prototype.generateReports = function () {
        console.log('generating accounting reports..');
    };
    return AccountingDepartment;
}(Department));
// 创建一个对抽象类型的引用
var department;
// department=new Department() 无法创建抽象类的实例。
// 对抽象子类进行实例化和赋值
department = new AccountingDepartment();
department.printName();
department.printMeeting();
// department.generateReports() 类型“Department”上不存在属性“generateReports”。
// let instance : ClassA; 表示的是 instance 的类型是ClassA的实例。let classA: typeof ClassA; 表示的是 classA 的类型就是 ClassA。
// 在 TypeScript 中，typeof 操作符可以用来获取一个变量或对象的类型。
var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function () {
        if (this.greeting) {
            return 'hello,' + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    };
    Greeter.standardGreeting = 'hello , there';
    return Greeter;
}());
var greeter1;
greeter1 = new Greeter();
console.log(greeter1.greet());
// typeof Greeter，意思是取Greeter类的类型
var greeterMaker = Greeter;
greeterMaker.standardGreeting = 'hey snowball';
var greeter2 = new greeterMaker();
console.log(greeter2.greeting);
