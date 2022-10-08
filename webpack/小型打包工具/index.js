const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const { transformFromAst } = require("babel-core");
const { relative } = require("path");
const tranverse = require("babel-traverse").default;
function readCode(filePath) {
  // 读取文件内容
  const content = fs.readFileSync(filePath, "utf-8");
  // 生成AST
  const ast = babylon.parse(content, {
    sourceType: "module",
  });
  // 寻找当前文件的依赖关系
  const dependencies = [];
  tranverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });
  // 通过AST将代码转为ES5
  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });
  return {
    filePath,
    dependencies,
    code,
  };
}
function getDependencies(entry) {
  // 读取入口文件
  const entryObject = readCode(entry);
  const dependencies = [entryObject];
  // 遍历所有文件依赖关系
  for (const asset of dependencies) {
    // 获得文件目录
    const dirname = path.dirname(asset.dependencies);
    // 遍历当前文件依赖关系
    asset.dependencies.forEach((relativePath) => {
      // 获得绝对路径
      const absolutePath = path.join(dirname, relativePath);
      // css文件逻辑就是将代码插入style标签中
      if (/\.css$/.test(absolutePath)) {
        const content = fs.readFileSync(absolutePath, "utf-8");
        const code = `
        const style=document.createElement('style');
        style.innerText=${JSON.stringify(content).replace(/\\r\\n/g, "")}
        document.head.appendChild(style)
        `;
        dependencies.push({
          filePath: absolutePath,
          relativePath,
          dependencies: [],
          code,
        });
      } else {
        // js代码是否需要继续查找是否有依赖关系
        const child = readCode(absolutePath);
        child.relativePath = relativePath;
        dependencies.push(child);
      }
    });
  }
  return dependencies;
}
function bundle(dependencies, entry) {
  let modules = "";
  // 构建函数参数
  // 生成{'./entry.js':function(module,exports,require){}}
  dependencies.forEach((dep) => {
    const filePath = dep.relativePath || entry;
    modules += `'${filePath}':(
      function (module,exports,require){${dep.code}}
    )`;
  });
  // 构建require函数，目的是为了获取模块暴露出来的内容
  const result = `
  (function(modules){
    function require(id){
      const module={exports:{}}
      modules[id](module,modules.exports,require)
      return module.exports
    }
    require('${entry}')
  })(${modules})
  `;
  // 当生成的内容写入到文件中
  fs.writeFileSync("./bundle.js", result);
}
