引用值（或者对象）是某个特定引用类型的实例。引用类型是把数据和功能组织到一起的结构。
# Date
- Date.parse()方法接收一个表示日期的字符串参数，尝试将这个字符串转换为表示该日期的毫秒数。如果字符串参数不表示日期会返回NaN。如果直接把字符串参数传给Date构造函数，Date会在后台调用Date.parse()。
- Date.UTC()方法也返回字符串的毫秒表示，传参是年、零起点月数、日、时、分、秒和毫秒。（年和月是必需的，日默认为1，其他参数默认为0）。
- Date.now()返回表示方法执行时日期和时间的毫秒数。
# RegExp
匹配模式的标记：g,i,m,y,u,s。
- 正则表达式可以使用字面量形式定义。
- 也可以使用RegExp构造函数（模式字符串，和可选的标记字符串）。所有的元字符都必须二次转义。

实例方法：
- exec()，主要用于配合捕获组使用。这个方法只接收一个参数，即要应用模式的字符串。如果找到了匹配项，则返回包含第一个匹配信息的数组;如果没找到匹配项，则返回 null。返回的数组虽然是 Array 的实例，但包含两个额外的属性:index 和 input。index 是字符串中匹配模式的起始位置，input 是要查找的字符串。这个数组的第一个元素是匹配整个模式的字符串， 其他元素是与表达式中的捕获组匹配的字符串。如果模式中没有捕获组，则数组只包含一个元素。如果模式设置了全局标记，则每次调用 exec()方法会返回一个匹配的信息。如果没有设置全局标 记，则无论对同一个字符串调用多少次 exec()，也只会返回第一个匹配的信息。
- test()，接收一个字符串参数。如果输入的文本与模式匹配，则参数 返回 true，否则返回 false。
# 原始值包装类型
3种特殊的引用类型：Boolean、Number和String.
每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象。在通过new实例化引用类型后，得到的实例会在离开作用域时被销毁，而自动创建的原始值包装对象则只存在于访问它的那行代码执行期间。

Object构造函数能根据传入值的类型返回相应的原始值包装类型的实例。
## Boolean
- 永远不要使用Boolean对象。
## Number
- Number 类型重写了 valueOf()、toLocaleString()和 toString()方 法。valueOf()方法返回 Number 对象表示的原始数值，另外两个方法返回数值字符串。toString() 方法可选地接收一个表示基数的参数，并返回相应基数形式的数值字符串。
- toFixed()方法返回包含指定小数点位数的数值字符串，如果数值本身的小数位超过了参数指定的位数，则四舍五入到最接近的小数位。
- toExponential()，返回以科学记数法(也称为指数记数法)表 示的数值字符串。接收一个参数，表示结果中小数的位数。
- Number.isInteger()方法，用于辨别一个数值是否保存为整数。
- Number.isSafeInteger()方法鉴别整数是否在安全范围内。
## String
- charAt()方法返回给定索引位置的字符，由传给方法的整数参数指定。
- charCodeAt()方法可以查看指定码元的字符编码。这个方法返回指定索引位置的码元值，索引以整数指定。
- fromCharCode()方法用于根据给定的 UTF-16 码元创建字符串中的字符。这个方法可以接受任意多个数值，并返回将所有数值对应的字符拼接起来的字符串。
- 16 位只能唯一表示 65 536 个字符。这对于大多数语言字符集是足够了，在 Unicode 中称为基本多语言平面(BMP)。为了 表示更多的字符，Unicode 采用了一个策略，即每个字符使用另外 16 位去选择一个增补平面。这种每个 字符使用两个 16 位码元的策略称为代理对。为正确解析既包含单码元字符又包含代理对字符的字符串，可以使用 codePointAt()来代替 charCodeAt()。fromCharCode()也有一个对应的 fromCodePoint()。这个方法接收任意数量的码点，返回对应字符拼接起来的字符串。
- concat()，用于将一个或多个字符串拼接成一个新字符串。
- slice()、substr()和 substring()。这 3 个方法都返回调用它们的字符串的一个子字符串，而且都接收一或两个参数。第一个参数表示子字符串开始的位置，第二个参数表示子字符串结束的位置。对 slice()和 substring()而言，第二个参数是提取结束的位置(即该位置之前的字符会被提取出来)。对 substr()而言，第二个参数表示返回的子字符串数量。 任何情况下，省略第二个参数都意味着提取到字符串末尾。与 concat()方法一样，slice()、substr()和 substring()也不会修改调用它们的字符串，而只会返回提取到的原始新字符串值。
- indexOf()和 lastIndexOf()。这两个方法从字符串中搜索传入的字符串，并返回位置(如果没找到，则返回-1)。两者的区别在于，indexOf()方法 从字符串开头开始查找子字符串，而 lastIndexOf()方法从字符串末尾开始查找子字符串。
- startsWith()、 endsWith()和 includes()。这些方法都会从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值。它们的区别在于，startsWith()检查开始于索引 0 的匹配项，endsWith()检查开始于索 引(string.length - substring.length)的匹配项，而 includes()检查整个字符串。startsWith()和 includes()方法接收可选的第二个参数，表示开始搜索的位置。如果传入第二 5 个参数，则意味着这两个方法会从指定位置向着字符串末尾搜索，忽略该位置之前的所有字符。endsWith()方法接收可选的第二个参数，表示应该当作字符串末尾的位置。如果不提供这个参数， 那么默认就是字符串长度。
- trim()方法。这个方法会创建字符串的一个副本，删除前、 后所有空格符，再返回结果。
- repeat()方法。在所有字符串上都提供了repeat()方法。这个方法接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果。
- padStart()和padEnd()方法。如果小于指定长度，则在相应一边填充字符，直至满足长度条件。这两个方法的第一个参数是长度，第二个参数是可选的填充字符串，默认为空格 (U+0020)。
- 字符串迭代与解构。字符串的原型上暴露了一个@@iterator 方法，表示可以迭代字符串的每个字符。
```js
let message = "abc";
let stringIterator = message[Symbol.iterator]();
console.log(stringIterator.next()); // {value: "a", done: false} 
console.log(stringIterator.next()); // {value: "b", done: false} 
console.log(stringIterator.next()); // {value: "c", done: false} 
console.log(stringIterator.next()); // {value: undefined, done: true}
```
在 for-of 循环中可以通过这个迭代器按序访问每个字符。可以通过解构操作符来解构。
- toLowerCase()、toLocaleLowerCase()、toUpperCase()和 toLocaleUpperCase()。toLocaleLowerCase()和 toLocaleUpperCase()方法旨在基于 特定地区实现。
- match()方法，这个方法本质上跟 RegExp 对象的 exec()方法相同。match()方法接收一个参数，可以是一个正则表达式字符串，也可以是一个 RegExp 对象。
- search()。这个方法唯一的参数与match()方法一样:正则表达式字符串或 RegExp 对象。这个方法返回模式第一个匹配的位置索引，如果没找到则返回1。search() 始终从字符串开头向后匹配模式。
- replace()方法。这个方法接收两个参数，第一个 参数可以是一个 RegExp 对象或一个字符串(这个字符串不会转换为正则表达式)，第二个参数可以是 一个字符串或一个函数。
- split()。这个方法会根据传入的分隔符将字符串拆分成数组。作为分隔符的参数可以是字符串，也可以是 RegExp 对象。(字符串分隔符不会被这个方法当成 正则表达式。)还可以传入第二个参数，即数组大小，确保返回的数组不会超过指定大小。
- localeCompare()，这个方法比较两个字符串。如果按照字母表顺序，字符串应该排在字符串参数前头，则返回负值。(通常是-1，具体还要看与实际值相关的实现。)如果字符串与字符串参数相等，则返回 0。如果按照字母表顺序，字符串应该排在字符串参数后头，则返回正值。(通常是1，具体还要看与实际值相关的实现。)
# 单例内置对象
当代码开始执行时，全局上下文中会存在两个内置对象:Global 和 Math。
## Global
- isNaN()、isFinite()、parseInt()和 parseFloat()
- URL 编码方法。encodeURI()和 encodeURIComponent()方法用于编码统一资源标识符(URI)，以便传给浏览器。有效的 URI 不能包含某些字符，比如空格。encodeURI()不会编码属于 URL 组件的特殊字符，比如冒号、斜杠、问号、 井号，而 encodeURIComponent()会编码它发现的所有非标准字符。与 encodeURI()和 encodeURIComponent()相对的是 decodeURI()和 decodeURIComponent()。 decodeURI()只对使用 encodeURI()编码过的字符解码。decodeURIComponent()解码所有被 encodeURIComponent()编码的字符，基本上就是解码所有特殊值。
- eval()方法。这个方法就是一个完整的 ECMAScript 解释器，它接收一个参数，即一个要执行的 ECMAScript(JavaScript)字符串。
- 浏览器将 window 对象实现为 Global 对象的代理。
## Math
- min()和 max()方法用于确定一组数值中的最小值和最大值。这两个方法都接收任意多个参数。
- 把小数值舍入为整数的 4 个方法:Math.ceil()、Math.floor()、Math.round() 和 Math.fround()。Math.ceil()方法始终向上舍入为最接近的整数。Math.floor()方法始终向下舍入为最接近的整数。Math.round()方法执行四舍五入。Math.fround()方法返回数值最接近的单精度(32 位)浮点值表示。
- Math.random()方法返回一个 0~1 范围内的随机数，其中包含 0 但不包含 1。