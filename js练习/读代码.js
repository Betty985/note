// ['1', '2', '3'].map(parseInt)
map方法创建一个新数组newArr，其结果是arr中的每个元素都调用一个提供的函数后返回的结果。
let newArr = arr.map(function callback(currentValue, index, array) {},[thisArg])

其中callback回调函数中会有三个参数currentValue, index, array。
parseInt()函数解析一个字符串参数，并返回一个指定基数的整数（默认为10）。
const initValue = parseInt(string[, radix]);

// string 要解析的值。如果参数不是一个string，则将会自动转换成一个字符串
/*
radix 一个介于2~36之间的整数，表示基数
如果 radix 是 undefined、0或未指定的，JavaScript会假定以下情况：
1. 如果输入的 string以 "0x"或 "0X"（一个0，后面是小写或大写的X）开头，那么radix被假定为16，字符串的其余部分被当做十六进制数去解析。
2. 如果输入的 string以 "0"（0）开头， radix被假定为8（八进制）或10（十进制）。具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。
3. 如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。*/

// 返回一个整数或者NAN

对于每个迭代的map，parseInt()传递两个参数：字符串和基数，所以实际执行的代码是：
['1', '2', '3'].map((currentValue, index) => {
	return parseInt(currentValue, index)
})
即返回的值为
parseInt('1', 0)	// 1
parseInt('2', 1)	//NAN
parseInt('3', 2)	//NAN
