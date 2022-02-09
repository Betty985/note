import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// 路径查找
const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};
// 设置别名
const alias = {
  "@": pathResolve("src"),
  "@n": pathResolve("note"),
  "@build": pathResolve("build"),
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { alias },
});
