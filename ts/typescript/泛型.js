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
// 类型变量是一种特殊的变量，只用于表示类型而不是值。
// T捕获用户传入的类型
function identity(arg) {
    return arg;
}
// 传入所有的参数包含类型参数
var a = identity('my');
// 类型推论
var b = identity('my');
// 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样。可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
// 使用带有调用签名的对象字面量来定义泛型函数
var myIndentity = identity;
var myIndentity1 = identity;
// 泛型类
// 直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。泛型类指的是实例部分的类型
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var stringNumeric = new GenericNumber();
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// 在泛型约束中使用类型参数
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
// getProperty(x, "m"); // 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数。
// 在泛型里使用类类型
{
    function create(c) {
        return new c();
    }
    var BeeKeeper_1 = /** @class */ (function () {
        function BeeKeeper() {
            this.hasMask = true;
        }
        return BeeKeeper;
    }());
    var ZooKeeper_1 = /** @class */ (function () {
        function ZooKeeper() {
            this.nametag = 'zoo';
        }
        return ZooKeeper;
    }());
    var Animal_1 = /** @class */ (function () {
        function Animal() {
            this.numLegs = 2;
        }
        return Animal;
    }());
    var Bee = /** @class */ (function (_super) {
        __extends(Bee, _super);
        function Bee() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.keeper = new BeeKeeper_1();
            return _this;
        }
        return Bee;
    }(Animal_1));
    var Lion = /** @class */ (function (_super) {
        __extends(Lion, _super);
        function Lion() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.keeper = new ZooKeeper_1();
            return _this;
        }
        return Lion;
    }(Animal_1));
    function createInstance(c) {
        return new c();
    }
    var a_1;
    createInstance(Lion).keeper.nametag; // typechecks!
    a_1 = createInstance(Bee).keeper.hasMask; // typechecks!
    console.log(a_1);
}
