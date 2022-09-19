import 'reflect-metadata'

/* 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。 装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。*/

/* 
装饰器工厂：要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。
 */
function color(value: string) {//装饰器工厂
    return function (target) {//装饰器

    }
}
/* 
装饰器组合：多个装饰器可以同时应用到一个声明上。它们求值方式与复合函数相似。
* 由上至下依次对装饰器表达式求值。
* 求值的结果会被当作函数，由下至上依次调用。
 */
function f() {
    console.log('f():evaluated')
    return function (target, propertyKey: string, descriptor) {
        console.log("f(): called");
    }
}
function g() {
    console.log('g():evaluated')
    return function (target, propertyKey: string, descriptor) {
        console.log("g(): called");
    }
}
class C {
    @f()
    @g()
    method() { }
}

/* 
装饰器求值：
类中不同声明上的装饰器将按以下规定的顺序应用：

* 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
* 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
* 参数装饰器应用到构造函数。
* 类装饰器应用到类。
 */

// 类装饰器紧靠类声明在其前面被声明。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中(.d.ts)，也不能用在任何外部上下文中（比如declare的类）。类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
function sealed(constructor: Function) {
    Object.seal(constructor)
    Object.seal(constructor.prototype)
}
@sealed
class Greeter1 {
    greeting: string
    constructor(msg: string) {
        this.greeting = msg
    }
    greet() {
        return 'hi, ' + this.greeting
    }
}
let guest = new Greeter1('lily')
delete guest.greet
guest.greet = function () { return 'bye,' + this.greeting }
console.log('greeter', guest.greet())

function classDecorator<T extends { new(...args: any[]): {} }>
    (constructor: T) {
    return class extends constructor {
        newProperty = 'new property'
        hello = 'override'
    }
}
@classDecorator
class Greeter2 {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}
console.log(new Greeter2("world"));

/* 
方法装饰器:方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件(.d.ts)，重载或者任何外部上下文（比如declare的类）中。

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
成员的名字。
成员的属性描述符。
 */
class Greeter3 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target,propertyKey,descriptor)
        descriptor.enumerable = value;
    };
}
/* 
访问器装饰器
访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。 访问器装饰器应用于访问器的属性描述符并且可以用来监视，修改或替换一个访问器的定义。 访问器装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如declare的类）里。
访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

* 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
* 成员的名字。
* 成员的属性描述符。
 */
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

/* 
属性装饰器
属性装饰器声明在一个属性声明之前（紧靠着属性声明）。 属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如declare的类）里。
属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

* 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
* 成员的名字。
 */

class Greeter4 {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}


const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    // 报错未解决
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}


/* 
参数装饰器
参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如declare的类）里。

参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

* 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
* 成员的名字。
* 参数在函数参数列表中的索引。

参数装饰器的返回值会被忽略。
 */
class Greeter5 {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}
const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}