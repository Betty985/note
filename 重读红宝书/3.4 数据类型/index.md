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

- parseInt()函数更专注于字符串是否包含数值模式。
