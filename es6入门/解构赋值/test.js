// let [foo] = {};   //{} is not iterable
// let [x='默认值']=[undefined]
// let [y='默认值']=[null]
// function f() {
//     console.log('aaa');
//     return "惰性求值"
//   }
//   let [x = f()] = [];
let {log} =console
var [x = y,y =1] = [];     // x=1; y=1
log(x,y)