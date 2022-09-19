// 类型变量是一种特殊的变量，只用于表示类型而不是值。
// T捕获用户传入的类型
function identity<T>(arg:T):T{
    return arg
}
// 传入所有的参数包含类型参数
let a=identity<string>('my')
// 类型推论
let b=identity('my')
// 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样。可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

// 使用带有调用签名的对象字面量来定义泛型函数
let myIndentity:{<T>(arg:T):T}=identity

// 泛型接口
// interface G{
//     <T>(arg:T):T
// }
// let myIndentity1 :G=identity
interface G<T>{
    (arg:T):T
}
let myIndentity1 :G<number>=identity

// 泛型类
// 直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。泛型类指的是实例部分的类型
class GenericNumber<T>{
    zeroValue:T;
    add:(x:T,y:T)=>T
}
let stringNumeric = new GenericNumber<string>();

// 泛型约束。定义接口来描述约束条件，使用接口和extends关键字实现约束。
interface Lengthwise{
    length:number
}
function loggingIdentity <T extends Lengthwise>(arg:T):T{
    console.log(arg.length)
    return arg
}

// 在泛型约束中使用类型参数

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数。

// 在泛型里使用类类型
{
function create<T>(c:{new():T}):T{
    return new c()
}

class BeeKeeper{
    hasMask:boolean=true
}
class ZooKeeper{
    nametag:string='zoo'
}
class Animal{
    numLegs:number=2
}
class Bee extends Animal {
    keeper: BeeKeeper=new BeeKeeper()
}

class Lion extends Animal {
    keeper: ZooKeeper=new ZooKeeper()
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
let a:string|boolean
createInstance(Lion).keeper.nametag // typechecks!
a=createInstance(Bee).keeper.hasMask  // typechecks!
console.log(a)
}