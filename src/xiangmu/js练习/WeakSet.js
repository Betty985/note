// es6新增的“弱集合”是一种新的集合类型。
/*
WeakSet是Set的兄弟类型，API是set的子集
弱：是指垃圾回收程序对待“弱集合”中的值的方式
 */
const ws11 = new WeakSet();
// 弱集合中的值只能是Object或继承自它的类型
const val11={id:1},
val22={id:2},
val33={id:3};
// 构造函数可以接收一个可迭代对象
// 使用数组初始化弱集合
const ws12=new WeakSet([val11,val22,val33]);
// 初始化是一个全有或全无的操作。一个值无效会导致整个初始化失败
console.log(ws11,ws12);
