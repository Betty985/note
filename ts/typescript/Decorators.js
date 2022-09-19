"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/* 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。 装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。*/
/*
装饰器工厂：要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。
 */
function color(value) {
    return function (target) {
    };
}
/*
装饰器组合：多个装饰器可以同时应用到一个声明上。它们求值方式与复合函数相似。
* 由上至下依次对装饰器表达式求值。
* 求值的结果会被当作函数，由下至上依次调用。
 */
function f() {
    console.log('f():evaluated');
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function g() {
    console.log('g():evaluated');
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    __decorate([
        f(),
        g(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], C.prototype, "method", null);
    return C;
}());
/*
装饰器求值：
类中不同声明上的装饰器将按以下规定的顺序应用：

* 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
* 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
* 参数装饰器应用到构造函数。
* 类装饰器应用到类。
 */
// 类装饰器紧靠类声明在其前面被声明。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中(.d.ts)，也不能用在任何外部上下文中（比如declare的类）。类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
var Greeter1 = /** @class */ (function () {
    function Greeter1(msg) {
        this.greeting = msg;
    }
    Greeter1.prototype.greet = function () {
        return 'hi, ' + this.greeting;
    };
    Greeter1 = __decorate([
        sealed,
        __metadata("design:paramtypes", [String])
    ], Greeter1);
    return Greeter1;
}());
var guest = new Greeter1('lily');
delete guest.greet;
guest.greet = function () { return 'bye,' + this.greeting; };
console.log('greeter', guest.greet());
function classDecorator(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = 'new property';
            _this.hello = 'override';
            return _this;
        }
        return class_1;
    }(constructor));
}
var Greeter2 = /** @class */ (function () {
    function Greeter2(m) {
        this.property = "property";
        this.hello = m;
    }
    Greeter2 = __decorate([
        classDecorator,
        __metadata("design:paramtypes", [String])
    ], Greeter2);
    return Greeter2;
}());
console.log(new Greeter2("world"));
/*
方法装饰器:方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件(.d.ts)，重载或者任何外部上下文（比如declare的类）中。

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
成员的名字。
成员的属性描述符。
 */
var Greeter3 = /** @class */ (function () {
    function Greeter3(message) {
        this.greeting = message;
    }
    Greeter3.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    __decorate([
        enumerable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Greeter3.prototype, "greet", null);
    return Greeter3;
}());
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        console.log(target, propertyKey, descriptor);
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
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () { return this._x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () { return this._y; },
        enumerable: false,
        configurable: true
    });
    __decorate([
        configurable(false),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Point.prototype, "x", null);
    __decorate([
        configurable(false),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Point.prototype, "y", null);
    return Point;
}());
function configurable(value) {
    return function (target, propertyKey, descriptor) {
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
var Greeter4 = /** @class */ (function () {
    function Greeter4(message) {
        this.greeting = message;
    }
    Greeter4.prototype.greet = function () {
        var formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    };
    __decorate([
        format("Hello, %s"),
        __metadata("design:type", String)
    ], Greeter4.prototype, "greeting", void 0);
    return Greeter4;
}());
var formatMetadataKey = Symbol("format");
function format(formatString) {
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target, propertyKey) {
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
var Greeter5 = /** @class */ (function () {
    function Greeter5(message) {
        this.greeting = message;
    }
    Greeter5.prototype.greet = function (name) {
        return "Hello " + name + ", " + this.greeting;
    };
    __decorate([
        validate,
        __param(0, required),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Greeter5.prototype, "greet", null);
    return Greeter5;
}());
var requiredMetadataKey = Symbol("required");
function required(target, propertyKey, parameterIndex) {
    var existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
function validate(target, propertyName, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        var requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (var _i = 0, requiredParameters_1 = requiredParameters; _i < requiredParameters_1.length; _i++) {
                var parameterIndex = requiredParameters_1[_i];
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        return method.apply(this, arguments);
    };
}
