JSX是一种嵌入式的类似XML的语法。 它可以被转换成合法的JavaScript，尽管转换的语义是依据不同的实现而定的。 JSX因React框架而流行，但是也被其它应用所使用。 TypeScript支持内嵌，类型检查和将JSX直接编译为JavaScript。
  
TypeScript具有三种JSX模式：preserve，react和react-native。 这些模式只在代码生成阶段起作用, 类型检查并不受影响。 
- 在preserve模式下生成代码中会保留JSX以供后续的转换操作使用（比如：Babel）。 另外，输出文件会带有.jsx扩展名。 
- react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js。 
- react-native相当于preserve，它也保留了所有的JSX，但是输出文件的扩展名是.js。

类型断言：as 操作符。因为如果用尖括号表示类型断言会给jsx的语法带来解析的困难。

# 类型检查
固有元素总是以一个小写字母开头，基于值的元素总是以一个大写字母开头。传入JSX元素里的属性类型的查找方式不同。 固有元素属性本身就支持，然而自定义的组件会自己去指定它们具有哪个属性。

固有元素：固有元素使用特殊的接口JSX.IntrinsicElements来查找。 默认地，如果这个接口没有指定，会全部通过，不对固有元素进行类型检查。 然而，如果这个接口存在，那么固有元素的名字需要在JSX.IntrinsicElements接口的属性里查找。

基于值的元素会简单的在它所在的作用域里按标识符查找。
定义方式：
- 无状态函数组件 (SFC)：第一个参数是props对象。由于无状态函数组件是简单的JavaScript函数，所以我们还可以利用函数重载。
- 类组件：如果MyComponent是ES6的类，那么它的类类型就是这个类。 如果MyComponent是个工厂函数，类类型为这个函数。（元素类的类型和元素实例的类型）。一旦建立起了类类型，实例类型就确定了，为类类型调用签名的返回值与构造签名的联合类型。**在ES6类的情况下，实例类型为这个类的实例的类型，并且如果是工厂函数，实例类型为这个函数返回值类型。**
由于这两种基于值的元素在JSX表达式里无法区分，因此我们首先会尝试将表达式做为无状态函数组件进行解析。如果解析成功，那么我们就完成了表达式到其声明的解析操作。如果按照无状态函数组件解析失败，那么我们会继续尝试以类组件的形式进行解析。如果依旧失败，那么将输出一个错误。

# 属性类型检查
- 固有元素：JSX.IntrinsicElements属性的类型
- 基于值的元素： 它取决于先前确定的在元素实例类型上的某个属性的类型。 至于该使用哪个属性来确定类型取决于JSX.ElementAttributesProperty。

元素属性类型用于的JSX里进行属性的类型检查支持可选属性和必须属性。
如果一个属性名不是个合法的JS标识符（像data-*属性），并且它没出现在元素属性类型里时不会当做一个错误。
# 子孙类型检查
从TypeScript 2.3开始，我们引入了children类型检查。children是元素属性(attribute)类型的一个属性(property)。 与使用JSX.ElementAttributesProperty来决定props名类似，我们可以利用JSX.ElementChildrenAttribute来决定children名。 JSX.ElementChildrenAttribute应该被声明在单一的属性(property)里。可以像其它属性一样指定children的类型。如不特殊指定子孙的类型，将使用React typings里的默认类型。
# JSX结果类型
默认地JSX表达式结果的类型为any。可以通过指定JSX.Element接口自定义这个类型。但接口是一个黑盒，不能从接口里检索元素、属性或jsx的子元素的类型信息。
# 嵌入的表达式
JSX允许使用{ }标签来内嵌表达式。
要想一起使用JSX和React应该使用React类型定义。 这些类型声明定义了JSX合适命名空间来使用React。

