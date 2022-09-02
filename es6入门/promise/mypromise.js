/*细节
 * this指向
 * then
 * 执行异常:抛出错误会触发reject，then传入的参数不是函数会被忽略
 * 异步
 * 回调保存
 * 链式*/
// 解决class的this指向问题：箭头函数，bind，proxy
class Commitment {
  // 创建静态属性
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  constructor(func) {
    this.status = Commitment.PENDING;
    this.result = null;
    // 数组是先入先出的
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    //原生promise：在执行函数里抛出错误会触发reject方法
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      //  直接执行而不是创建实例后执行，所以不需要绑定了
      this.reject(error);
    }
  }
  // 原生promise: 可以给resolve和reject函数传参
  resolve(result) {
    setTimeout(() => {
      if (this.status == Commitment.PENDING) {
        this.status = Commitment.FULFILLED;
        this.result = result;
        this.resolveCallbacks.forEach((callback) => {
          callback(result);
        });
      }
    });
  }
  reject(result) {
    setTimeout(() => {
      if (this.status == Commitment.PENDING) {
        this.status = Commitment.REJECTED;
        this.result = result;
        this.rejectCallbacks.forEach((callback) => {
          callback(result);
        });
      }
    });
  }
  // 原生promise规定：then里面的两个参数如果不是函数的话就要被忽略
  then(onFULFILLED, onREJECTED) {
    // 链式
    return new Commitment((resolve, reject) => {
      onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : () => {};
      onREJECTED = typeof onREJECTED === "function" ? onREJECTED : () => {};
      if (this.status === Commitment.PENDING) {
        this.resolveCallbacks.push(onFULFILLED);
        this.rejectCallbacks.push(onREJECTED);
      }
      if (this.status === Commitment.FULFILLED) {
        setTimeout(() => {
          onFULFILLED(this.result);
        });
      }
      if (this.status === Commitment.REJECTED) {
        setTimeout(() => {
          onREJECTED(this.result);
        });
      }
    });
  }
}
console.log("第一");
let commitment = new Commitment((resolve, reject) => {
  console.log("第二");
  setTimeout(() => {
    resolve("成功");
    console.log("第四");
  });
  reject("失败");
  // throw new Error("抛出异常");
});
commitment.then(
  // 成功时执行的函数
  (result) => {
    console.log(result);
  },
  // 失败时执行的函数
  (result) => {
    console.log(result);
  }
);

console.log("第三");
