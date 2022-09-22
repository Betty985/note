# number

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d94b8fa773a74bcca0be66933de52e3e~tplv-k3u1fbpfcp-watermark.image?)
存储浮点值使用的内存空间是存储整数值的两倍。所以 js 总是想办法把值转换为整数。  
对于非常大或非常小的数值，浮点值可以用科学计数法来表示。
浮点值的精确度最高可达 17 位小数，但是还会有微小的舍入错误。

```js
0.1 + 0.2 == 0.3; //false
```

解决：

- toFixed(）
  toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
  (0.1+0.2).toFixed(4)===0.3.toFixed(4)
- 设置误差范围（机器精度）——Number.EPSILON
  x = 0.2;
  y = 0.3;
  z = 0.1;
  equal = (Math.abs(x - y + z) < Number.EPSILON);
  Number.EPSILON  属性表示 1 与 Number 可表示的大于 1 的最小的浮点数之间的差值。
  EPSILON  属性的值接近于  2.2204460492503130808472633361816E-16，或者  2^-52。

js 中的最小数值在`Number.MIN_VALUE` 中，最大数值在`Number.MAX_VALUE`中。
超出范围会自动转换为 ±Infinity（Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY 也可以获取正、负 Infinity。）。Infinity 没有可用于计算的数值表示形式。可以使用`isFinite()`函数确定值是不是有限大。
isNaN()函数判断这个参数是否“不是数值”。任何不能转换为数值的值都会导致这个函数返回 true。还可以用于测试对象，会首先调用对象的 valueOf()方法，如果返回的值不可以转换为数值再调用 toString()方法。

## 数值转换

- Number()

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d29695740f654677a2a3ad4754192596~tplv-k3u1fbpfcp-watermark.image?)
如果将一元加应用到非数值，则会执行与使用 Number()转型函数一样的类型转换。

- parseInt()函数更专注于字符串是否包含数值模式。接收第二个参数，用于指定底数(进制数)。
- parseFloat()始终忽略字符串开头的零。只解析十进制值

在js中,0、+0、-0相除会返回NaN。分子是非0值，分母是有符号0或无符号0，会返回 Infinity 或-Infinity。

任何涉及NaN的操作始终返回NaN；NaN不等于包括NaN在内的任何值。

isNaN()函数会尝试把它转换为数值。任何不能转换为数值的值都会导致这个函数返回 true。


`3.toString()`报错是因为`.`是小数点
`3..toString() //'3'`第二个点是访问符
# undefined
增加undefined这个特殊值是为了正式明确空对象指针和未初始化变量的区别。
输出未声明的变量会报错；`Uncaught ReferenceError: xx is not defined`

对未声明的变量调用delete不会报错，但是没用。在严格模式下会抛出错误。`Uncaught SyntaxError: Delete of an unqualified identifier in strict mode. `

永远不必显式地将变量值设置为undefinded。

# null
null值表示一个空对象指针，所以typeof传一个null会返回‘object’。

undefined是由null值派生而来的，因此ECMA将它们定义为表面上相等。

只要变量要保存对象，而当时又没对象可以保存就要用null来填充变量。
# boolean
要将一个其他类型的值转换为布尔值，可以调用特定的Boolean（）转型函数。使用两个叹号(!!)，相当于调用了转型函 数 Boolean()。

false、''、0、NaN、null、undefined会被转为false。
# string
## 字符字面量
字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符。
```
\n 换行
\t 制表
\b 退格
\r 回车
\f 换页
\\ 反斜杠(\)
\' 单引号(')，在字符串以单引号标示时使用，例如'He said, \'hey.\'
\" 双引号(")，在字符串以双引号标示时使用，例如"He said, \"hey.\""
\` 反引号(`)，在字符串以反引号标示时使用，例如`He said, \`hey.\``
\xnn 以十六进制编码nn 表示的字符(其中 n 是十六进制数字 0~F)，例如\x41 等于"A"
\unnnn 以十六进制编码 nnnn 表示的 Unicode 字符(其中 n 是十六进制数字 0~F)，例如\u03a3 等于希腊字 符"Σ"
```
## 字符串的特点
不可变，要修改某个字符串值，必须销毁原始字符串，然后将包含新值的另一个字符串保存到该变量。
## 转为字符串
- 几乎所有值都有的 toString()方法。这个方法唯一的用途就是返回当前值的字符串等价物。字符串值的toString方法只是简单返回自身的副本。对数值调用toString可以接收一个底数作为参数。String（）转型函数可以区分undefined和null。因为 null 和 undefined 没有 toString()方法， 所以 String()方法就直接返回了这两个值的字面量文本。
- 加号操作符给一个值加上空字符串。
## 模板字面量
保留换行字符，可以跨行定义字符串。
## 字符串插值
模板字面量最常用的一个特性是支持字符串插值，也就是可以在一个连续定义中插入一个或多个 值。字符串插值通过在${}中使用一个 JavaScript 表达式实现。
## 模板字面量标签函数
模板字面量也支持定义标签函数(tag function)，而通过标签函数可以自定义插值行为。标签函数会接收被插值记号分隔后的模板和对每个表达式求值的结果。
## 原始字符串
使用模板字面量也可以直接获取原始的模板字面量内容(如换行符或 Unicode 字符)，而不是被转换后的字符表示。为此，可以使用默认的 String.raw 标签函数。
# symbol
 symbol实例是唯一、不可变的，符号的作用是用来创建唯一记号，确保对象属性使用唯一标识符。
 使用Symbol函数初始化，可以传入字符串参数作为对符号的描述。
 Symbol()函数不能与 new 关键字一起作为构造函数使用。这样做是为了避免创建符号包装对象。
 如果你确实想使用符号包装对象，可以借用 Object()函数:` Object(Symbol())`。
 凡是可以使用字符串或数值作为属性的地方，都可以使用符号。
- Object.getOwnPropertyNames()返回对象实例的常规属性数组
- Object.getOwnPropertySymbols()返回对象实例的符号属性数组。这两个方法的返回值彼此互斥。
- Object.getOwnPropertyDescriptors()会返回同时包含常规和符号属性描述符的对象。
- Reflect.ownKeys()会返回两种类型的键
## 全局符号注册表
- Symbol.for()方法，对每个字符串键都执行幂等操作。第一次使用某个字符串调用时，它会检查全局运行时注册表，发现不存在对应的符号，于是就会生成一个新符号实例并添加到注册表中。后续使用相同 字符串的调用同样会检查注册表，发现存在与该字符串对应的符号，然后就会返回该符号实例。它的参数会被转为字符串，不传参是undefinded。
- Symbol.keyFor()来查询全局注册表，这个方法接收符号，返回该全局符号对应的字符串键。参数不是全局符号会返回undefined，不是符号会报错。
## 常用内置符号

- Symbol.asyncIterator

根据 ECMAScript 规范，这个符号作为一个属性表示“一个方法，该方法返回对象默认的 AsyncIterator。 由 for-await-of 语句使用”。换句话说，这个符号表示实现异步迭代器 API 的函数。
- Symbol.hasInstance

根据 ECMAScript 规范，这个符号作为一个属性表示“一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例。由 instanceof 操作符使用。这个属性定义在 Function 的原型上，因此默认在所有函数和类上都可以调用。
在 ES6 中，instanceof 操作符会使用 Symbol.hasInstance 函数来确定关系。以 Symbol. hasInstance 为键的函数会执行同样的操作，只是操作数对调了一下。
```
function Foo() {}
let f = new Foo();
console.log(Foo[Symbol.hasInstance](f)); // true
```
- Symbol.isConcatSpreadable  

根据 ECMAScript 规范，这个符号作为一个属性表示“一个布尔值，如果是 true，则意味着对象应 该用 Array.prototype.concat()打平其数组元素”。ES6 中的 Array.prototype.concat()方法会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例。覆盖 Symbol.isConcat- Spreadable 的值可以修改这个行为。
- Symbol.iterator

根据 ECMAScript 规范，这个符号作为一个属性表示“一个方法，该方法返回对象默认的迭代器。 由 for-of 语句使用”。换句话说，这个符号表示实现迭代器 API 的函数。
-  Symbol.match
-  Symbol.replace
-  Symbol.search
-  Symbol.species
-  Symbol.toPrimitive
-  Symbol.toStringTag
# object
ECMAScript 只要求在给构造函数提供参数时使用括号。如果没有参数，那么完全可以省略括号(不推荐):
`let o = new Object; // 合法，但不推荐`
## 位操作符
ECMAScript 12 中的所有数值都以 IEEE 754 64 位格式存储，但位操作并不直接应用到 64 位表示，而是先把值转换为
32 位整数，再进行位操作，之后再把结果转换为 64 位。有符号整数使用 32 位的前 31 位表示整数值。第 32 位表示数值的符号，如 0 表示正，1 表示负。这 一位称为符号位(sign bit)，它的值决定了数值其余部分的格式。
负值以一种称为二补数(或补码)的二进制编码存储。
- 确定绝对值的二进制表示
- 反加1

特殊值 NaN 和 Infinity 在位操作中都会被当成 0 处理。
按位非操作符用波浪符(~)表示；
按位与操作符用和号(&)表示；
按位或操作符用管道符(|)表示；
按位异或用脱字符(^)表示；
## 指数操作符
ECMAScript 7 新增了指数操作符，Math.pow()现在有了自己的操作符**。
## 相等操作符
ECMAScript 中的等于操作符用两个等于号(==)表示，如果操作数相等，则会返回 true。不等于 操作符用叹号和等于号(!=)表示，如果两个操作数不相等，则会返回 true。这两个操作符都会先进 行类型转换(通常称为强制类型转换)再确定操作数是否相等。
在转换操作数的类型时，相等和不相等操作符遵循如下规则。 
- 如果任一操作数是布尔值，则将其转换为数值再比较是否相等。false 转换为 0，true 转换为 1。
- 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。
- 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法取得其原始值，再根据前面的规则进行比较。

在进行比较时，这两个操作符会遵循如下规则。
- null 和 undefined 相等。
-  null 和 undefined 不能转换为其他类型的值再进行比较。
- 如果有任一操作数是 NaN，则相等操作符返回 false，不相等操作符返回 true。记住:即使两个操作数都是 NaN，相等操作符也返回 false，因为按照规则，NaN 不等于 NaN。
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true。否则，两者不相等。

- for-in 语句是一种严格的迭代语句，用于枚举对象中的非符号键属性；
- for-of 语句是一种严格的迭代语句，用于遍历可迭代对象的元素；

标签语句用于给语句加标签，语法如下:`label: statement`

with 语句的用途是将代码作用域设置为特定的对象，其语法是:`with (expression) statement;`
使用 with 语句的主要场景是针对一个对象反复操作，这时候将代码作用域设置为该对象能提供便利。

最佳实践是函数要么返回值，要么不返回值。只在某个条件下返回值的函数会带来 麻烦，尤其是调试时。
严格模式对函数也有一些限制:
- 函数和函数的参数不能以 eval 或 arguments 作为名称;
- 两个命名参数不能拥有同一个名称。
如果违反上述规则，则会导致语法错误，代码也不会执行