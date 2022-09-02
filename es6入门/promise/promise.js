console.log("第一");
let p = new Promise((resolve, reject) => {
  console.log("第二");
  setTimeout(() => {
    resolve("成功");
    console.log("第四");
  });
  reject("失败");
  // throw new Error("抛出异常");
});
p.then(
  (a) => {
    console.log(a);
  },
  (b) => {
    console.log(b);
  }
);
console.log("第三");
