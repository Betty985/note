{
    let a=10;
    var b=2
}
// a 
//  ReferenceError: a is not defined
b
for(let i=0;i<3;i++){
    let i='abc'
    console.log(i)
}
// abc
// abc
// abc
// 设置循环变量的那部分是一个父作用域，循环体内部是一个子作用域
// var tmp=21
// {
//     tmp='let' //Cannot access 'tmp' before initialization
//     let tmp
// }
// 只要块级作用域内存在let命令，它所声明的变量就绑定这个区域，不再受外部影响。
// typeof x //Cannot access 'x' before initialization
// let x
typeof undeclared