<template>
  <div>
    <cata></cata>
    <div class="content">
      <item iid="0">
        <p>当前时间为：{{ test[0].date }}</p>
      </item>
      <item iid="1">
        <h4>插值语法——解析标签体内容</h4>
        <p>hello,{{ test[1].msg }}</p>
        <h4>指令语法——解析标签</h4>
        <a :href="test[1].url">vnshop </a>
      </item>
      <item iid="2">
        单向数据绑定：<input type="text" :value="test[2].value" />
        双向数据绑定：<input type="text" v-model="test[2].value" />
      </item>
      <item iid="3">
        el
        <li>el:"#app"</li>
        <li>vm.$mount("#app");</li>
        data
        <li>对象式</li>
        <li>函数式</li>
      </item>
      <item iid="4">
        <ol>
          <li v-for="(item, index) in test[4].msg" :key="index">{{ item }}</li>
        </ol>
      </item>
      <item iid="5">
        <p>
          <a
            href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty"
            >Object.defineProperty(obj, prop, descriptor)</a
          >
        </p>
        <p>{{ Object.keys(test) }}</p>
        <p v-for="(item, index) in test[5].msg" :key="index">{{ item }}</p>
      </item>
      <item iid="6">
        <button @click="sayHi">sayHi</button>
        <button @click="eventTest(1, $event)">eventTest</button>
      </item>
      <item iid="7">
        <p v-for="(value, key) in test[7].msg" :key="key">
          . {{ key }}: {{ value }}
        </p>
        <a
          href="https://www.bilibili.com/video/BV1Zy4y1K7SH?p=15&spm_id_from=pageDriver"
          @click.prevent="myalert('a标签', $event)"
          >{{ test[7].msg.prevent }}</a
        >
        <div @click.capture.self="myalert(1, $event)">
          <button @click.stop="myalert(2, $event)">
            {{ test[7].msg.stop }}
          </button>
          <button @click.stop.once="myalert(3, $event)">
            {{ test[7].msg.once }}
          </button>
          <button @click="myalert(4, $event)">{{ test[7].msg.capture }}</button>
        </div>
      </item>
      <item iid="8">
        <input
          type="text"
          placeholder="按下回车弹窗"
          @keyup.enter="myalert(5, $event)"
        />
        <p v-for="(item, index) in test[8].msg" :key="index">{{ item }}</p>
        <input
          type="text"
          placeholder="按下tab弹窗"
          @keydown.tab="myalert(5, $event)"
        />
        <input
          type="text"
          placeholder="按下ctrl弹窗"
          @keydown.ctrl="myalert(6, $event)"
        />
        <input
          type="text"
          placeholder="按下ctrl+alt弹窗"
          @keydown.ctrl.alt="myalert(7, $event)"
        />
      </item>
      <item iid="9">
        姓名案例 (电话保留后四位)
        <li v-for="(item, index) in test[9].msg" :key="index">{{ item }}</li>
        姓名: <input type="text" v-model="com.name" /> 电话:<input
          type="tel"
          v-model="com.tel"
        />
        信息:{{ com.name }}——{{
          com.tel.substring(com.tel.length - 4, com.tel.length)
        }}
        <br />
        姓名: <input type="text" v-model="com.name" /> 电话:<input
          type="tel"
          v-model="com.tel"
        />
        信息:{{ message() }}<br />
        姓名: <input type="text" v-model="com.name" /> 电话:<input
          type="tel"
          v-model.number="com.tel"
        />
        信息:{{ compute }} <br />输入'信息'的新值
        <input type="text" v-model.lazy="compute" />
      </item>
      <item iid="10">
        <li v-for="(v, name) in test[10].msg" :key="name">{{ v }}</li>
      </item>
      <item iid="11">
        <li v-for="(v, name) in test[11].msg" :key="name">{{ v }}</li>
      </item>
      <item iid="12">
        <li v-for="(v, name) in test[12].msg" :key="name">{{ v }}</li>
      </item>
    </div>
    <btn></btn>
  </div>
</template>
<script>
import item from "@/components/note/item.vue";
import cata from "@/components/note/catalogue.vue";
import btn from "@/components/note/top.vue";
import { $, eventTest, sayHi, myalert, message } from "@n/tool.js";
import { test, com } from "@n/data.js";
export default {
  components: {
    item,
    cata,
    btn,
  },

  data() {
    return {
      test,
      com,
      //   show: false,
      id: this.$props,
    };
  },
  methods: {
    $,
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
<style scoped>
@import url("@n/note.css");
</style>
