function $(el) {
  return document.querySelector(el);
}
function eventTest(a, e) {
  console.log("第一个参数传值会覆盖event，可以用$event占位");
  console.log(a, e);
}
// throttle
function sayHi() {
  let delay = 1000;
  let func = function () {
    console.log("hi,我是时间戳实现的节流函数");
  };
  var pre = Date.now();
  return (function () {
    var that = this;
    var args = arguments;
    var now = Date.now();
    console.log(now - pre >= delay);
    if (now - pre >= delay) {
      func.apply(that, args);
      pre = Date.now();
    }
  })();
}
function myalert(a, e) {
  alert("hello");
  console.log(a, e.target);
}
function message() {
  let name = this.com.name;
  let tel = this.com.tel;
  let msg = name + "——" + tel.substring(tel.length - 4, tel.length);
  return msg;
}
// 回到顶部
function top() {
  var timer = null;
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(function fn() {
    let oTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (oTop > 0) {
      scrollTo(0, oTop - 50);
      timer = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(timer);
    }
  });
  //   scrollTo(0, 0);
}
function hasScrollbar() {
  let show =
    document.body.scrollHeight >
    (window.innerHeight || document.documentElement.clientHeight);
  this.show = show;
}
export { $, eventTest, sayHi, myalert, message, top, hasScrollbar };
