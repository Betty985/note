<template>
  <div :id="'jump' + count">
    <h1 v-if="test[count] && test[count].title">
      {{ test[count].title }}
    </h1>
    <slot></slot>
  </div>
</template>
<script>
import { $, eventTest, sayHi, myalert, message } from "@n/tool.js";
import { test, com } from "@n/data.js";
export default {
  data() {
    return {
      test,
      com,
      show: false,
      count: this.iid,
    };
  },
  props: ["iid"],
  methods: {
    eventTest,
    sayHi,
    myalert,
    message,
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
};
</script>
<style scoped></style>
