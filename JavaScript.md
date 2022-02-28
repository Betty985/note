> <a name="sqvUL"></a>
# ​预编译

```javascript
function fn(a,c)
{
 console.log(a);
var a= 123;
console.log(a);
console.log(c);
function a( ){}
if (false) {var d=678}
console.log(d);
console.log(b);
var b = function (){ }
console.log(b)
function c(){}
console.log(c)}
fn(1,2)
```
预编译<br />作用域的创建阶段预编译的阶段预编译的时候做了哪些事情<br />js的变量对象AO对象 供js引擎自己去访问的<br />1、创建了ao对象 2、找形参和变量的声明 3、实参和形参相统― 4、找函数声明会覆盖变量的声明

object 对象<br />var person = {//对象名<br />属性名/键名 ： 属性值/键值，<br />}<br />.length求字符串长度

1. typeof（ ）返回类型 null返回对象 数字与字符的运算返回number
1. Object = 引用类型
1. undefined类型转换后为NaN
1. 显式类型转换 															Number（ ） String（） Boolean() 							parseInt (值，原进制)转换为整型 数字和字符组合，以字符开头转换成NaN，以数字开头转换成字符前的数字 num.toFixed(小数位数） .toString(radix)
1. 隐式类型转换																										 a++ 数学运算 比较运算（都是字符型比较ascll码值）转换成数字类型 字符+数字=字符 全等===不进行隐式转换 undefined==null 与0无关 +-将字符串转换为数字类型
1. isNaN（）过程：Number()->NaN->bool
1. prompt(_msg,defaultText_)prompt()方法用于显示可提示用户进行输入的对话框。
1. 高内聚，低耦合 模块单一责任制 																		
1. 函数只有被调用才会执行 。函数命名以字母 _ $开始
1. 函数赋值给变量 ，以表达式定义函数 **匿名函数**表达式/函数字面量。函数名仅函数内可见
1. 形参和实参数量可不等，可在函数内更改已传递的实参argument的值，可计算长度。实参存在堆内存，函数内重新赋值的值存在栈内存
1. return 终止函数 ；返回任意值同时终止
1. || &&能判断出来不再判断后面的表达式
1. 作用域
1. **递归代替循环**




1. 参数默认值undefined，打印形参或实参不是undefined的值。
1. 条件表达式 条件？结果1：结果2
1. 预编译 检查语法错误 -预编译-解释一行，执行一行
1. 函数声明整体提升，变量声明提升，赋值不提升。
1. 暗示全局变量 存在在window对象中就不报错 
1. AO 活跃对象 															

     寻找形参和变量声明-实参值赋值给形参-找函数声明，<br />     赋值-执行 										       <br />    预编译之后的工作由执行完成

7. Uncaught TypeError: a is not a function  at <anonymous> 函数名与变量同名，函数会报错
7. GO（global object）全局上下文===window 					找变量-找函数声明-执行
7. 同名 局部变量优先 function > var
7. 先从AO中找
7. undefined==false
7. typeof结果为字符串，typeof没声明的变量不会报错
7. ！！空串 为0 ！！空格串为1
7. **“!!” ——两个叹号表示把目标值转化为布尔值，相当于使用Boolean()方法**
7. 优先级

函数表达式不提升<br />**函数**

1. 没有传值给形参在函数里赋值没用
1. 实参存在堆内存，形参存在栈内存。但存在映射。栈内存存地址。
1. scope 



当内部函数返回到外部并保存时，一定会产生闭包，闭包会产生原来的作用域不释放。过度的闭包可能会导致内存泄露或加载过慢。<br />**​立即执行函数:自动执行，执行完成后立即释放 IIFE（immediately invoked function expression）**

1. 初始化函数最好用立即执行函数
- （function(）{})();
- (function(){}());w3c规范
1. 表达式才能被执行符号执行
1. 函数声明转化成表达式可以加 + - ！|| &&
1. 逗号运算只返回最后一个值
<a name="mkkOd"></a>
# 数组及数组常用方法

- 方法的作用和含义
- 方法的实参（类型和含义）
- 方法的返回值
- 原来的数组是否会发生改变
<a name="PmJFA"></a>
## 实现数组增删改的方法
>       **都会修改原有的数组**

> push：向末尾追加内容
> @params 多个任意类型
> @return 新增后的数组的长度

> unshift：向数组开始追加内容
> @params 多个任意类型
> @return 新增后的数组的长度 
> //基于原生ES6展开运算符，把原来的数组克隆一份，在新的数组中创建第一项，其余的内容使用原始数组的信息
> array =[   ,...array]

1. shift：删除数组的第一项

​<br />
> @params 
> @return 删除后的数组的长度
> //基于原生js的delete，把数组当成普通的对象，可以删除掉某一项内容，但是不会影响数组本身的结构特点，长度不变

1. pop：删除数组中的最后一项
> @params 
> @return 删除后的数组的长度
> //基于原生js
> 数组长度--

1. splice：数组增删改

​<br />
> @params ：n,m 从索引n开始删除m个元素（不写m 是删除到末尾）
> @return ：把删除的部分用新数组存储起来返回

​<br />
<a name="w3sIl"></a>
## 数组的拼接和查询
不改变原数组

1. slice：实现数组的查询
> @params ：n,m都是数字，从索引n开始，找到索引为m的地方（不包含m这一项）m不写找到末尾
> @return：把找到的内容以一个新数组的形式返回
> slice(0)数组克隆，浅克隆

2. concat：实现数组拼接
> @params ：多个任意类型
> @return：拼接后的新数组（不改变原数组）

<a name="Fle0o"></a>
## 把数组转换为字符串

1. toString:把数组转换为字符串
> @params 
> @return：转换后的新数组（不改变原数组），每一项按逗号分隔

2. join：把数组转换为字符串
> @params ：指定的分隔符（字符串格式）默认是逗号
> @return：转换后的新数组（不改变原数组）

<a name="IBgeP"></a>
## 检查数组中是否包含某一项

3. indexOf/lastIndexOf：检测当前项在数组中第一次或最后一次出现位置的索引

原数组不变
> @params ：要检索的内容
> @return：这一项出现的位置索引值，如果数组中没有这一项，返回-1

也可以使用includes<br />​

<a name="GzXOm"></a>
# Map
对象的键名只能是字符串，而map的键名可以是随便什么东西。
```javascript
// 对象名作为另一个对象的键名时会变成字符串
// 输出{"[object Object]":"001"}
let li={ name:'lily'}; 
let hello={[li]:"001"};
console.log(hello);
// 可以用toString()方法或者"[object Object]"取值
console.log(hello["[object Object]"]);
console.log(hello[li.toString()]);
```
```javascript
// Map的键名可以是字符串、函数、对象、数值
let map=new Map();
map.set("name",'Lily');
map.set(function (){},"函数" );
map.set({},"对象");
map.set(1,"数值");
console.log(map);
/*输出结果是Map(4) {'name' => '字符串', ƒ => '函数', {…} => '对象', 1 => '数值'} */

// 也可以在构造的时候添加值
let map=new Map([["string","字符串"],[1,"数字"]]);console.log(map);
//Map(2) {'string' => '字符串', 1 => '数字'}
// 可以进行链式操作
map.set(1,"数值").set("链式操作","也可以");
```
<a name="AkCqN"></a>
# <br />js数据渲染机制和堆栈内存


<a name="UbQ3b"></a>
## 数据渲染机制
变量声明赋值

1. 声明一个变量，没有赋值（默认是undefined）(stack)；
1. 在当前作用域开辟一个位置存储值。基本类型值存储到当前栈内存值区域中；
1. 关联变量和值（赋值）

复杂值存储

1. 在内存中分配一块新内存，用来存储引用类型值（heap）。内存有一个16进制地址，地址存在栈内存的值存储空间；
1. 把对象中的键值对依次存储到堆内存中
1. 关联堆内存地址和变量

改值是原地址，改数组是开辟新内存指向新地址。<br />引用值存的是16进制地址。<br />基本数据类型和引用数据类型区别：<br />基本类型按值操作，引用类型操作堆内存地址（按引用地址操作）<br />存储内存不同；<br />创建函数，函数名存储16进制地址，地址存储的是代码字符串。<br />私有作用域：把之前创建函数时存储的字符串代码执行。<br />​

在js中'.'的优先级比'='高.<br />赋值是右结合性<br />内存嵌套会造成内存无限溢出.
<a name="nAoZj"></a>
## 数据类型检测

- typeof [val] :用来检测数据类型的运算符
   - typeof检测出来的结果是一个字符串，字符串中包含对应的类型。只要两个以上同时检测最后结果必然是“string”。注意双引号
   - 局限性 typeof null检测出来是object，但null不是对象； 无法细分出当前值是普通对象还是数组对象等，因为只要是对象数据类型，返回结果都是object
- instanceof ：用来检测当前实例是否隶属于某个类
- constructor：基于构造函数检测数据类型（基于类）
- Object.prototype.toString.call() ：检测数据类型最好的办法
<a name="kVuuG"></a>
## 操作语句
<a name="RoqWC"></a>
### 判断：if else,三元运算符，switch case
<a name="LrMem"></a>
## 堆栈内存
栈内存：作用域

1. **提供一个供js代码自上而下执行的环境（代码都是在栈中执行的，执行栈）**
1. 基本数据类型比较简单，都是直接在栈内存中开辟一个位置，把值直接存储进去
1. 当栈内存被销毁，存储的基本值也会跟着销毁

​

堆内存：引用值对应的空间

1. 存储引用类型值的（对象：键值对  函数：代码字符串）
1. 当堆内存释放销毁，引用值就彻底没了
1. 堆内存释放只有一个条件，堆内存没有被任何的变量或者其他东西占用，浏览器会在空闲的时候，自主进行内存回收，把所有不被占用的堆内存销毁掉（谷歌浏览器）IE浏览器采用内存占用计数器。内存泄露是IE计数记错了，无法销毁。
1. null是空对象指针，通过空对象指针可以让原始变量或者其他东西谁都不指向，堆内存没有被占用，浏览器会销毁。
<a name="zKIb3"></a>
## 底层机制
栈内存是浏览器执行代码的环境。分出变量存储空间和值存储空间<br />语句进入主线程叫进栈执行，执行完出栈下一行代码才能继续执行<br />浏览器js代码执行：

1. 从内存中分配出一块内存，用来执行代码（栈内存）；
1. 分配一个主线程用来自上而下执行代码
<a name="hrOhu"></a>
# 函数
<a name="pKZQu"></a>
#### 返回值
函数返回值默认是undefined。<br />无法访问函数内部变量所以有返回值。<br />返回的都是值。<br />形参赋默认值可以===或者typeof。<br />return可以用来终止程序。<br />arguments 函数内置的实参集合

1. 类数组集合，集合中存储着所有函数执行时，传递的实参信息；
1. 不论是否设置形参，arguments都存在；
1. 不论是否传递实参，arguments也都存在。

arguments.calle：存储的是当前函数本身（一般不用，js严格模式下禁止使用这些属性）<br />js没有重载
<a name="PaQaa"></a>
## 函数的底层运行机制
创建函数——执行函数<br />创建函数，开辟的堆内存中存储的是函数体中的代码，但是是按照字符串存储的。<br />每一次函数执行的目的都是把函数体中的代码先从字符串变为代码执行，形成一个全新的私有栈内存。<br />[vo 和ao](https://www.jianshu.com/p/edb2be5866eb)
<a name="xtgb1"></a>
## 箭头函数
如果函数只有一行return，可以省略return和大括号。<br />形参赋值默认值：当没有给形参传递实参的时候，执行默认<br />箭头函数没有arguments，但剩余运算符可以获取到传递的实参集合（它是数组）
```javascript
//形参赋值默认值:当没有给形参传递实参的时候，执行默认值
let sum = (n = 0,m = 0)=> n +m;
//任意数求和
let sum=(...arg)=>eval(arg.join('+');
```
箭头函数不能使用arguments、super和new.target，也不能用作构造函数。此外，箭头函数也没有prototype属性。
<a name="BtEo7"></a>
## Math
> 数学函数：但是它是对象，对象中存储了很多操作数字的属性和方法，所以叫数字函数。

<a name="vszVp"></a>
#### Math中常用属性和方法

1. Math.abs(数字)
> 获取绝对值。传递的值不是数字类型，先基于Number（）转换为数字

2. Math.ceil/floor(数字）
> 向上取整和向下取整

3. Math.round()
> 四舍五入。

4. Math.max/min(值1，值2等等)
> 获取一堆数中的最大值和最小值

5. Math.sqrt/pow()
> sqrt :给一个数开平方。负数开方式NaN
> pow：计算一个数的幂

6. Math.random()
> 获取0~1之间的随机小数
> 获取[n~m]之间的随机整数
> Math.round(Math.random()*(m-n)+n)

<a name="B2x0H"></a>
# 对象、构造函数、实例化
<a name="yAVjf"></a>
## 对象
对象里面的函数叫方法。<br />不是函数的叫属性。<br />可以用**点语法直接赋值增加**属性，点语法赋值为匿名函数可以增加方法。<br />**关键字delete可以删除，方法后面加括号会执行。**<br />方法可以对属性进行操作（可以是对象用点语法，也可以是this）<br />this就是对象本身。<br />数组的indexOf方法可以返回数字在数组的第几位。<br />数组的splice方法可以从第n位开始删除m个数（n,m)。<br />数组的push方法可以给数组增加元素。
<a name="VgHNT"></a>
#### 创建对象的方式：
对象字面量（对象直接量）：声明一个变量，将变量赋值给对象。属性名可以是字符串或数值，数值属性会自动转换为字符串。该方法定义对象时，并不会实际调用Object构造函数。<br />使用new操作符和Object构造函数。构造函数：系统自带的构造函数<br />表达式上下文指的是期待返回值的上下文。{ 出现在赋值操作符后面表示一个表达式的开始；出现在语句上下文表示一个语句块的开始。<br />​

属性一般是通过点语法来存取的，也可以使用中括号（里面是属性名的字符串形式）来存取属性，属性名中包含可能会导致语法错误的字符，或含保留字、关键字时可以使用中括号语法。
<a name="P7eZM"></a>
## 对象通过构造函数实例化<br />构造函数

1. 用系统自带的构造函数。new Object
1. 自定义构造函数。大驼峰是和普通函数区别开的一个方法。this指向实例化对象。创造的对象是完全独立的。

可以传参（最好传对象进去）<br />for循环里的数组元素赋值给一个变量可以优化for循环性能。
<a name="f93Qc"></a>
# 垃圾回收
执行环境负责在代码执行是管理内存。通过自动内存管理实现内存分配和闲置资源回收。<br />**基本思路是确定哪个变量不会再使用，然后释放它占用的内存。**<br />浏览器发展史上用过的两种主要标记策略是标记清理和引用计数。
<a name="L9QlB"></a>
### 标记清理
是最常用的垃圾回收策略。当变量进入上下文就会被加上存在于上下文中的标记。当变量离开上下文，也会被加上离开上下文的标记。<br />标记方式：反转某一位，维护“在上下文中”和“不在上下文中”两个变量列表。
<a name="wyEOt"></a>
### 引用计数
对每个值都记录它被引用的次数。
<a name="IGSpy"></a>
#### 问题

- 循环引用，对象A的指针指向对象B，而对象B也引用了对象A。在函数结束后还会存在，如果函数被多次调用，会导致大量内存永远不会释放。解决：在确保不使用的情况下切断原生JavaScript对象与DOM元素之间的连接。
<a name="AmX4a"></a>
### 性能
无论什么时候开始收集垃圾，都能让它尽快结束工作。IE7发布后，JavaScript引擎的垃圾回收程序被调优为动态改变分配变量、字面量或数组槽位等会触发垃圾回收的阈值。
<a name="Cxqb6"></a>
### 内存管理
在使用垃圾回收的编程环境中，开发者通常无须关心内存管理。为避免运行大量js的网页耗尽系统内存而导致操作系统崩溃，分配给浏览器的内存较少。内存限制不仅影响变量分配，也影响调用栈以及能够同时在一个线程中执行的语句数量。<br />将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用的最佳手段就是保证在执行代码时只保存必要的数据。如果数据不再必要，那么把它设置为null，从而释放其引用。这也可以叫作解除引用。这个建议最适合全局变量和全局对象的属性。局部变量在超出作用域后会被自动解除引用。<br />解除对一个值的引用并不会自动导致相关内存被回收。解除引用的关键在于确保相关的值已经不在上下文里了

- 通过const和let声明提升性能。因为const和let都是块作用域，可能会更早得让垃圾回收程序介入。
- V8 JavaScript引擎绘制代码运行期间将创建的对象和隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类的对象性能更好。多数的Javascript 引擎会采用哈希表的方式来存取属性和寻找方法。而为了加快对象属性和方法在内存中的查找速度，V8引擎引入了隐藏类(Hidden Class)的机制，起到给对象分组的作用。             解决方案就是避免JavaScript的“先创建再补充”（ready-fire-aim）式的动态属性赋值，并在构造函数中一次性声明所有属性。动态删除属性与动态添加属性导致的后果一样。最佳实践是把不想要的属性设置为null。
- 内存泄露。
   -  意外声明全局变量是最常见也是最容易修复的内存泄露问题。在window对象上创建的属性，只要window本身不被清理就不会消失。只要在变量声明前加上关键字即可。
   - 定时器也可能导致内存泄露。定时器回调通过**闭包**造成内存泄露。
<a name="EI5gZ"></a>
### 静态分配与对象池
减少浏览器执行垃圾回收的次数。开发者无法直接控制什么时候开始收集垃圾，但可以间接控制触发垃圾回收的条件。减少浏览器执行垃圾回收的次数。<br />浏览器决定何时运行垃圾回收程序的一个标准就是对象更替的速度。如果有很多对象被初始化，然后一下子又都超出了作用域，那么垃圾回收调度程序会发现这里对象更替的速度很快，从而会更频繁地安排垃圾回收，这样会影响性能。该问题的解决方案是不要动态创建对象。一个策略是使用对象池。在初始化的某一时刻，可以创建一个对象池，用来管理一组可回收的对象。由于没发生对象初始化，垃圾回收探测就不会发现有对象更替，因此垃圾回收程序就不会那么频繁地运行。静态分配是优化的一种极端形式。<br />​<br />
<a name="uxrQF"></a>
# 变量提升
<a name="pdrN5"></a>
## 什么是变量提升
浏览器为了能够让代码自上而下执行，首先会开辟一块内存（栈内存）作为作用域或执行上下文<br />当浏览器开辟出供代码执行的栈内存后，代码并没有自伤而下立即执行，而是把当**前作用域中所有带var/function关键字的进行提前声明和定义，这就是变量提升机制。**
<a name="XFRfJ"></a>
## 为什么有变量提升
> JS对变量或函数有两步操作，解析和执行。<br />在解析阶段，JS会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。
> 全局上下文：变量定义，函数声明<br />函数上下文：变量定义，函数声明，this，arguments<br />在执行阶段，就是按照代码的顺序依次执行。<br />（1）提高性能
> 在JS代码执行之前，会进行**语法检查和预编译**，并且这一操作**只进行一次**。这么做就是**为了提高性能**，如果没有这一步，那么每次执行代码前都必须重新解析一遍该变量（函数），但变量（函数）的代码并不会改变，解析一遍就够了。
> 

> 在解析的过程中，还会为函数生成预编译代码。在预编译时，会统计声明了哪些变量、创建了哪些函数，并对函数的代码进行压缩，去除注释、不必要的空白等。这样做的好处就是每次执行函数时都可以直接为该函数分配栈空间（不需要再解析一遍去获取代码中声明了哪些变量，创建了哪些函数），并且因为代码压缩的原因，代码执行也更快了。
> 

> （2）容错性更好
> 有时代码很复杂可能因为疏忽而先使用后定义了，由于变量提升的存在，会正常运行。
> 总结：
> 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间<br />声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行

等号赋值关联值存储和变量存储<br />带var的只是提前声明，如果只声明没有赋值，默认值是undefined<br />带function的不仅声明还会赋值，让变量和某个值进行关联。<br />引用类型值（对象和函数）

1. 开辟一个新的内存（堆内存 16进制的内存地址
1. 把内容存储在堆内存中（对象存储的是键值对，函数存储的是函数体中的代码字符串
1. 让变量和地址关联在一起

函数表达式方式，使用var来创建，变量提升阶段只会声明变量，不会赋值，不能执行。<br />let和const不存在变量提升机制。
<a name="WYgrc"></a>
# 原始包装类型
为了方便操作原始值，ECMAScript提供了3种特殊的引用类型：Boolean、Number和String。<br />每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，从而暴露出操作原始值的各种方法。<br />在以读模式访问字符串值的任何时候，后台都会执行以下3步：<br />（1）创建一个String类型的实例；（2）调用实例上的特定方法；（3）销毁实例。<br />引用类型与原始值包装类型的主要区别在于对象的生命周期。在通过new实例化引用类型后，得到的实例会在离开作用域时被销毁，而自动创建的原始值包装对象则只存在于访问它的那行代码执行期间。<br />在原始值包装类型的实例上调用typeof会返回"object"，所有原始值包装对象都会转换为布尔值true。<br />Object构造函数作为一个工厂方法，能够根据传入值的类型返回相应原始值包装类型的实例。<br />使用new调用原始值包装类型的构造函数，与调用同名的转型函数并不一样。
<a name="OUmxk"></a>
## Boolean
创建一个Boolean对象，就使用Boolean构造函数并传入true或false。<br />所有对象在布尔表达式中都会自动转换为true。
<a name="eYkqM"></a>
## Number
Number类型和Boolean类型都重写了valueOf()方法
> 与Boolean类型一样，Number类型重写了valueOf()、toLocaleString()和toString()方法。valueOf()方法返回Number对象表示的原始数值，另外两个方法返回数值字符串。toString()方法可选地接收一个表示基数的参数，并返回相应基数形式的数值字符串

- toFixed()方法返回包含指定小数点位数的数值字符串。（四舍五入）
- toExponential()方法用于格式化数值，返回以科学计数法表示的数值字符串。
- toPrecision()方法会根据情况返回最合理的输出结果，可能是固定长度，也可能是科学记数法形式。这个方法接收一个参数，表示结果中数字的总位数（不包含指数）。里面的参数是用几位数字表示
- isIntegar()方法可以辨别一个数值是否为整数。IEEE 754数值格式有一个特殊的数值范围，在这个范围内二进制值可以表示一个整数值。
- isSafeIntegar()方法鉴别整数是否在安全数值范围内。这个数值范围从Number.MIN_SAFE_INTEGER（-253+ 1）到Number.MAX_SAFE_INTEGER（253-1）。对超出这个范围的数值，即使尝试保存为整数，IEEE 754编码格式也意味着二进制值可能会表示一个完全不同的数值。
<a name="u8Twj"></a>
## String
String对象的方法可以在所有字符串原始值上调用。3个继承的方法valueOf()、toLocaleString()和toString()都返回对象的原始字符串值。<br />每个String对象都有一个length属性，表示字符串中字符的数量。即使字符串中包含双字节字符，也会按单字符来技术。
> JavaScript字符串有16位码元组成。对多数字符来说，每16位码元对应一个字符。

- charAt()方法返回给定索引位置的字符，由传给方法的整数参数指定。JavaScript字符串使用了两种Unicode编码混合的策略：UCS-2和UTF-16。对于可以采用16位编码的字符（U+0000~U+FFFF），这两种编码实际上是一样的。
- charCodeAt()方法可以查看指定码元的字符编码。返回指定索引位置的码元值，索引以指数指定。
- fromCharCode()方法用于根据给定的UTF-16码元创建字符串中的字符。可以接受任意多个数值，并返回将所有数值对应的字符拼接起来的字符串。16位只能唯一表示65536个字符。在Unicode中称为基本多语言平面（BMP）。为了表示更多的字符，Unicode采用了一个策略，即每个字符使用另外16位去选择一个增补平面。这种每个字符使用两个16位码元的策略称为**代理对**。
- codePointAt()接收16位码元的索引并返回该索引位置上的码点（code point）。码点是Unicode中一个字符的完整标识。
- normalize()方法对字符串应用规范化形式。Unicode提供了4种规范化形式，可以将类似上面的字符规范化为一致的格式，无论底层字符的代码是什么。这4种规范化形式是：NFD（NormalizationForm D）、NFC（Normalization Form C）、NFKD（Normalization Form KD）和NFKC（NormalizationForm KC）。可以使用normalize()方法对字符串应用上述规范化形式，使用时需要传入表示哪种形式的字符串："NFD"、"NFC"、"NFKD"或"NFKC"。
<a name="YvdLp"></a>
#### 字符串操作方法

-  concat()将一个或多个字符串拼接成一个新字符串。可以接收任意多个参数，一次性拼接多个字符串。
- slice()返回调用它们的字符串的一个子字符串，第一个参数是子字符串开始的位置，第二个参数表示子字符串提前结束的位置。将所有负值参数都当成字符串长度加上负参数值。
- substr()返回调用它们的字符串的一个子字符串，第一个参数是子字符串开始的位置，第二个参数表示返回的子字符串数量。省略第二个参数意味着提取到字符串末尾。第一个负参数值当成字符串长度加上该值，将第二个负参数值转换为0。
- substring()返回调用它们的字符串的一个子字符串。第一个参数表示子字符串开始的位置，第二个参数表示子字符串结束的位置。会将所有负参数值都转换为0。会将较小的参数作为起点，将较大的参数作为终点。
<a name="JrPFN"></a>
#### 字符串位置方法
<a name="q8LPc"></a>
# 宏任务与微任务
JavaScript是单线程的，只有一个调用栈，按照先入后出的顺序执行，一次调用一个，可以嵌套。<br />在执行调用栈的时候会先执行同步的任务 ，发现异步任务时会把异步任务放入队列里面。<br />异步任务列为宏任务队列和微任务队列，队列按照先入先出的规则。<br />​

宏任务队列有：

- 新程序或子程序被直接执行
- 事件的回调函数
- setTimeout()和setInterval()
- requestAnimationFrame
- I/O操作
- setImmediate
- UI rendering等

微任务队列有

- Promise.then() .catch() .finally()
- MutationObserver
- Object.observe等


<br />事件循环是一个不断循环的机制，会不断找可以执行的任务来执行，执行完同步任务（即清空了调用栈以后），<br />首先执行微任务队列，可能有浏览器渲染，然后执行宏任务。<br />首先执行宏任务（script)，在调用栈为空的时候，事件循环优先执行微任务，并且清空微任务队列才会看一下需不需要渲染，渲染以后执行下一轮宏任务。宏任务一轮结束后(调用栈清空后），事件循环又发现微任务，执行微任务，重复上述操作。没有其余微任务的时候，宏任务就可以一直清空宏任务队列了。<br />​<br />
<a name="n14mL"></a>
# this
默认绑定  ：全局范围，window。严格模式undefined<br />隐式绑定  ：调用对象的方法，指向调用<br />硬绑定  ： call(),apply()想绑定哪个绑定哪个<br />构造函数绑定  ：绑定实例<br />箭头函数  ：指向嵌套的第一个普通函数<br />​<br />
<a name="VWQ2G"></a>
# 闭包的重点是作用域链
<a name="pv1iK"></a>
# 图片懒加载
可视范围是有限的，滚动到网页下面才能浏览看不到的图片。
<a name="j3gc0"></a>
## 事件监听
监听scroll这个事件，鼠标滚动就触发。窗口显示区的高度：window.innerHeight.<br />图片到视窗顶部的距离：元素的getBoundingClientRect().top。图片未能看见即图片距离视窗顶部的距离大于窗口显示区的高度。缺点：滚动事件会被触发很多次，可能导致任务堆积。页面加载了也会触发事件，消耗资源。
<a name="sbNnv"></a>
## IntersectionObserver构造函数
交叉观察，观察目标元素和可视窗口会产生交叉区域。
```javascript
const observer = new IntersectionObserver(callback第一个参数是回调函数)
//回调函数一般执行两次，分别在目标元素能看见和看不见的时候执行
observer.observe(DOM节点)
observer.unobserve(DOM节点)
```
```html
<p>一大段没用的话。好的好几十搜狐大红撒娇山东爱技术的酸中毒随机动画算</p>
  <p>  时代光华岁记叙文是东瓜宇大街韩国电影古交电话费一堆数</p>
  <p>一大段没用的话。好的好几十搜狐大红撒娇山东爱技术的酸中毒随机动画算</p>
  <p>  时代光华岁记叙文是东瓜宇大街韩国电影古交电话费一堆数</p>
  <p>一大段没用的话。好的好几十搜狐大红撒娇山东爱技术的酸中毒随机动画算</p>
  <p>  时代光华岁记叙文是东瓜宇大街韩国电影古交电话费一堆数</p>
<img data-src="https://cdn.colorhub.me/wuEG8mO-d_bVQyKmQd9IKHj37pSNd0zdmNT47jCxBpg/auto/0/500/ce/0/bG9jYWw6Ly8vOGYv/MGEvMTlmZjkyNjg1/YTMxZDM0MzVjMDdh/MGFiMzBhOGU5MzI1/YzdlOGYwYS5qcGVn.jpg"/>
<img data-src="https://cdn.colorhub.me/JewdNdNjNPWINJUSLOh8lhho7m7VyeYeYBARqseFXdc/auto/0/500/ce/0/bG9jYWw6Ly8vNWQv/YTYvMDRmOGI1ZjA3/Y2MyMGQxZmU5ZmJm/Y2Q3NmQzNjI3OTA2/NjNjNWRhNi5qcGVn.jpg"/>
<h1>这是结尾</h1>
```
```javascript
const imgs =document.querySelectorAll("img");
const callbacko=entries=>{
    //forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
    //array.forEach(function(currentValue, index, arr), thisValue)
    entries.forEach(
      //entry就是回调函数的当前元素
       entry=>{
            if(entry.isIntersecting){
        const img=entry.target;
        const dsrc=img.getAttribute("data-src");
        img.setAttribute("src",dsrc);
        observer.unobserve(img);
        console.log("触发咯");
    }
       }
    )
}
const observer = new IntersectionObserver(callbacko);
imgs.forEach(img=>{
    observer.observe(img);
})
```
> **IntersectionObserver接口** (从属于[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗([viewport](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport))交叉状态的方法。祖先元素与视窗([viewport](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport))被称为**根(root)。**

> **rootMargin**
> 一个在计算交叉值时添加至根的边界盒([bounding_box(en-US)](https://developer.mozilla.org/en-US/docs/Glossary/bounding_box))中的一组偏移量，类型为字符串(string) ，可以有效的缩小或扩大根的判定范围从而满足计算需要。语法大致和CSS 中的[margin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 属性等同; 可以参考 [The root element and root margin](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#the_root_element_and_root_margin) in [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)来深入了解margin的工作原理及其语法。默认值是"0px 0px 0px 0px"。

> **IntersectionObserver()**构造器创建并返回一个[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)对象。 如果指定rootMargin则会检查其是否符合语法规定，检查阈值以确保全部在0.0到1.0之间，并且阈值列表会按升序排列。如果阈值列表为空，则默认为一个[0.0]的数组。

> **callback**
> 当元素可见比例超过指定阈值后，会调用一个回调函数，此回调函数接受两个参数：
> **entries**
> 一个[IntersectionObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry)对象的数组，每个被触发的阈值，都或多或少与指定阈值有偏差。
> **observer**
> 被调用的[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)实例。

> <a name="Dn6pB"></a>
## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver#%E6%96%B9%E6%B3%95)
> [IntersectionObserver.disconnect()](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/disconnect)
> 使IntersectionObserver对象停止监听工作。
> [IntersectionObserver.observe()](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/observe)
> 使IntersectionObserver开始监听一个目标元素。
> [IntersectionObserver.takeRecords()](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/takeRecords)
> 返回所有观察目标的[IntersectionObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry)对象数组。
> [IntersectionObserver.unobserve()](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/unobserve)
> 使IntersectionObserver停止监听特定目标元素。

<a name="xOIk1"></a>
# map() parseInt()
map()数组是对数组里面的元素进行迭代，同时处理函数，然后返回一个数组。<br />map里面的参数第一个是元素，第二个是序号，第三个是数组本身。不定义也是存在的。<br /> parseInt（）括号里面输入字符串可以返回整数。0x开头按十六进制算。<br />第一个参数是需要转换成整数的字符串，第二个参数是基数，参数为0 是十进制；参数小于2或大于36 返回NaN.
<a name="SpTvH"></a>
# 原型对象和原型对象
__proto__属性在对象创建时生成，原名[[prototype]]，指向原型对象。<br />构造函数的prototype属性指向原型对象。<br />原型对象的constructor属性指向构造函数。<br />存在没有原型的对象，可以用Object.create方法，将第一个参数设置为null
> Object.create()方法是ECMAScript 5中新增的方法，这个方法用于创建一个新对象。被创建的对象继承另一个对象的原型，在创建新对象时可以指定一些属性。
> 语法: Object.create(proto[,propertiesObject]) <br />proto: 对象，要继承的原型 <br />propertiesObject: 对象，可选参数，为新创建的对象指定属性对象。

new一个对象的过程：

1. 创建一个新对象；
1. 新对象执行[[prototype]]连接。构造函数的prototype赋值给对象的__proto__属性；
1. 新对象和函数调用的this绑定。
1. 执行构造函数中的代码。
1. 如果没有返回值自动返回新对象

调用的时候优先使用自己的方法，自己没有在使用父级方法；<br />函数可以作为对象使用，也可以作为构造函数使用。
```javascript
var F=function(){};
Object.prototype.a=function(){};
Function.prototype.b=function(){};
var f = new F();//f有a函数没有b函数
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1635692648708-fa3ec615-937d-4d58-86cb-e2bea1207afc.png#clientId=uf0d8d5cb-d4fd-4&from=paste&height=56&id=u9e8589fe&margin=%5Bobject%20Object%5D&name=image.png&originHeight=112&originWidth=272&originalType=binary&ratio=1&size=5163&status=done&style=none&taskId=u1dd29914-3d0e-4233-b942-5101a932961&width=136)
<a name="B7iqn"></a>
# script标签defer和async
同步：后面的任务只能等前面的执行完才能执行，容易阻塞。<br />​

异步async：后面的任务不必等前面的任务执行完，但是只有一个出口。浏览器加载页面，立即下载同时继续加载页面。但脚本执行时间不确定。async适合第三方脚本。<br />​

推迟defer：异步增加条件，需要前面的任务先出去。浏览器立刻下载，等到浏览器解析完HTML后执行脚本。适合有DOM有关联的脚本。<br />同步带来的阻塞弊端：浏览器遇到script标签会先停下来把里面的内容执行完。如果有外部文件需要等待下载和执行。<br />​

async和defer适合外部脚本，要注意兼容问题。
<a name="oxhJG"></a>
# 构造函数
<br />构造函数的this

包装类型包装后再参与运算会变成原始值

包装成了对象，但是赋值了保存不了，所以删除了

length 数组截断,对string无效因为不能保存

重名函数会被覆盖<br />函数声明后面不能跟执行符号，会报错<br />字符串没有length属性，不过经过了一层包装类
<a name="ja7hI"></a>
# 原型和原型链
<br />prototype是定义构造函数构造出的每个对象的公共祖先。所有被该构造函数构造出的对象都可以继承原型上的属性和方法。实例对象不能增删改自己的祖先。

proto下面的constructor指向构造函数本身，可以更改。this里面的__proto__存了构造函数的prototype属性，它是一个键名。<br />​

​<br />
