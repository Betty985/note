import {
  $,
  eventTest,
  sayHi,
  myalert,
  message,
  top,
  hasScrollbar,
} from "./tool.js";
import { test, com } from "./data.js";
Vue.config.productionTip = false; //关闭提示
Vue.config.devtools = true; //配置是否允许 vue-devtools 检查代码。

var vm = new Vue({
  // el: "#app",
  data: {
    test,
    com,
    show: false,
  },
  methods: {
    eventTest,
    sayHi,
    myalert,
    message,
    top,
    hasScrollbar,
  },
  computed: {
    compute: {
      get() {
        let name = this.com.name;
        let tel = this.com.tel;
        let msg = name + "——" + tel.substring(tel.length - 4, tel.length);
        return msg;
      },
      set(value) {
        const arr = value.split("——");
        this.com.name = arr[0];
        this.com.tel = arr[1];
        console.log("信息被修改为:", value);
      },
    },
    /*计算属性只读可以简写为
    compute：function(){
        get函数里的代码
    }
    或
    compute(){
       get函数里的代码 
    }
    */
  },
  watch: {
    com: {
      deep: true,
      handler(value, old) {
        console.log(`监听到计算属性compute改变`);
      },
      //   不能用对象数组的元素作为key?
      //   "test[2]": {
      //     deep: true,
      //     handler(value, old) {
      //       console.log(`value：${old}=> ${value}`);
      //     },
      //   },
    },
  },
  mounted() {
    $("#loading").style.display = "none";
    $("#app").style.display = "block";
  },
});
let p = new Promise(() => {
  console.log("开始模板解析");
});
p.then(
  setTimeout(() => {
    vm.$mount("#app");
  }, 500)
);
