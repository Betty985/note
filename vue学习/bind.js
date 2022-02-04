// 数据代理
let person = {
  name: "hi",
  sex: 1,
};
let number = 12;
let config = {
  // // 默认为undefined
  // value: 13,
  // 默认为false
  enumerable: true,
  // // 默认为false
  // writable: false,
  // // 是否可删，默认为false
  // configurable: false,
  // 读取该属性值时调用函数,返回属性值
  get: function () {
    console.log(`正在读取`);
    return number;
  },
  // 修改该属性值时调用函数,且收到修改后的值
  set(value) {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    $("#app").style.background = `rgb(${r},${g},${b})`;
    console.log(`值被修改为${value}`);
    number = value;
  },
};
Object.defineProperty(person, "age", config);
delete person.age;
//   for (key in person) {
//     console.log(`@ ${key}`);
//   }
console.log("来自数据代理", Object.values(person));
