let test = [
  {
    title: "初识vue",
    date: new Date().toLocaleString(),
  },
  {
    title: "vue模板语法",
    msg: " world",
    url: "https://github.com/wsdo/vnshop",
  },
  {
    title: "数据绑定",
    value: "test",
  },
  {
    title: "el和data的两种写法",
  },
  {
    title: "MVVM模型",
    msg: [
      "M:模型，对应data中的数据",
      "V：视图：模板",
      "VM:视图模型：vue实例对象",
    ],
  },
  {
    title: "数据代理",
    msg: {
      question: "什么是数据代理?",
      answer: "通过一个对象代理对另一个对象中属性的操作(读/写)",
    },
  },
  {
    title: "事件处理",
  },
  {
    title: "事件修饰符",
    msg: {
      prevent: "阻止默认事件/  e.preventDefault()",
      stop: "阻止事件冒泡/  e.stopPropagation()",
      once: "事件只触发一次",
      capture: "使用事件的捕获模式",
      self: "只有event.target是当前操作的元素时才触发事件",
      passive: "事件的默认事件立即执行，无需等待回调函数执行完毕",
    },
  },
  {
    title: "键盘事件",
    msg: [
      "tab本来有失焦的功能，键盘弹起已经失去焦点，所以用keydown;",
      "系统修饰键（ctrl shift meta alt) 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才会触发配合keydown使用，正常触发事件；",
    ],
  },
  {
    title: "计算属性",
    msg: [
      "v-model+插值表达式",
      "methods",
      "computed",
      "watch分别监视计算依赖的属性",
    ],
  },
  {
    title: "监视属性",
    msg: [
      "deep:true开始深度监视",
      " immediate: true 该回调将会在侦听开始之后被立即调用",
      "传入回调数组，它们会被逐一调用",
    ],
  },
  {
    title: "绑定样式",
  },
];
let com = {
  name: "笛亚",
  tel: "15510280327",
};
export { test, com };
