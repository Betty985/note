import { createApp } from "vue";
import App from "./App.vue";

let vm = createApp(App);
let p = new Promise(() => {
  console.log("开始模板解析");
});
p.then(
  setTimeout(() => {
    vm.mount("#app");
  }, 500)
);
