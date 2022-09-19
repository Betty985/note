当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 一些内置的类型如Array，Map，Set，String，Int32Array，Uint32Array等都已经实现了各自的Symbol.iterator。 对象上的Symbol.iterator函数负责返回供迭代的值。
for..of会遍历可迭代的对象，调用对象上的Symbol.iterator方法。
for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。
# 代码生成
- 当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。 在非数组值上使用for..of语句会得到一个错误，就算这些非数组值已经实现了Symbol.iterator属性。（生成for循环）
- 当目标为兼容ECMAScipt 2015的引擎时，编译器会生成相应引擎的for..of内置迭代器实现方式。