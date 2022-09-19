symbol类型的值是通过Symbol构造函数创建的。
Symbol是不可改变且唯一的。
symbols也可以被用做对象属性的键。
Symbols也可以与计算出的属性名声明相结合来声明对象的属性和类成员。（`[symbol]`类似于字符串，用作属性名或方法名）

# 属性
`Symbol.hasInstance`。Symbol.hasInstance用于判断某对象是否为某构造器的实例。因此你可以用它自定义 instanceof 操作符在某个类上的行为。
`Symbol.isConcatSpreadable`。内置的Symbol.isConcatSpreadable符号用于配置某对象作为Array.prototype.concat()方法的参数时是否展开其数组元素。
`Symbol.iterator` Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。
`Symbol.match` 指定了匹配的是正则表达式而不是字符串。String.prototype.match() 方法会调用此函数。
`Symbol.replace` 这个属性指定了当一个字符串替换所匹配字符串时所调用的方法。String.prototype.replace() 方法会调用此方法。
`Symbol.search` Symbol.search 指定了一个搜索方法，这个方法接受用户输入的正则表达式，返回该正则表达式在字符串中匹配到的下标，这个方法由以下的方法来调用 String.prototype.search()。
`Symbol.species` 知名的 Symbol.species 是个函数值属性，其被构造函数用以创建派生对象
`Symbol.split` Symbol.split 指向 一个正则表达式的索引处分割字符串的方法。 这个方法通过 String.prototype.split() 调用。
`Symbol.toPrimitive` Symbol.toPrimitive 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。
`Symbol.toStringTag` Symbol.toStringTag 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。