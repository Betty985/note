# package.json

它必须是实际的 JSON，而不仅仅是 JavaScript 对象字面量。

```json
{
  //如果想发布你的包，package.json 中最重要的就是名称和版本字段，因为它们是必需的。名称和版本共同构成一个假定完全唯一的标识符。对包的更改应该与版本的更改一起出现。 如果不打算发布包，名称和版本字段是可选的。
  "name": "",
  "version": "1.0.0",
  //  一个字符串。在 npm 搜索中列出的一段描述，有助于人们发现您的包。
  "description": "",
  //  一个关键字的字符串数组把放在里面。它在 npm 搜索中列出，有助于人们发现你的包。
  "keywords": [],
  // 项目主页的 url
  "homepage": "https://github.com/owner/project#readme",
  // 报告项目问题的url或电子邮件地址。这些对于遇到您的包裹问题的人很有帮助。如果提供了一个 url，它将被 npm bugs 命令使用。
  "bugs": "https://github.com/owner/project/issues",
  "bugs": {
    "url": "https://github.com/owner/project/issues",
    "email": "project@hostname.com"
  },
  // "author" 是一个人， "contributors" 是一组人。
  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)",
  "contributors": [
    {
      "name": " Rubble",
      "email": "b@rule.com",
      "url": "http://brubble.tumblr.com/"
    },
    {
      "name": "Barney ",
      "email": "b@rube.com",
      "url": "http://barnbble.tumblr.com/"
    }
  ],
  //  可以指定一个包含 URL 的对象，该 URL 提供有关帮助资助开发包的方法的最新信息，字符串 URL或它们的数组
  "funding": [
    {
      "type": "individual",
      "url": "http://example.com/donate"
    },
    "http://example.com/donateAlso",
    {
      "type": "patreon",
      "url": "https://www.patreon.com/my-account"
    }
  ],
  // npm包作为依赖安装时要包括的文件，格式是文件正则的数组，["*"]代表所有文件。也可以使用npmignore 来忽略个别文件。包含文件、目录或 glob 模式（*、**/* 等）将使该文件在打包时包含在 tarball 中。省略该字段则默认值为 ["*"]，这意味着它将包括所有文件。 files字段优先级最大，不会被npmignore和.gitignore覆盖。
  "files": [
    "package.json",
    "README",
    "LICENSE / LICENCE",
    "main 字段里的文件"
  ],
  // 程序入口的模块ID。省略该字段则默认值为包根文件夹中的 index.js。
  "main": "src/main.js",
  // 如果模块打算在客户端使用，则应使用browser字段而不是main字段。这有助于提示用户它可能依赖于 Node.js 模块中不可用的原语。 （例如window）
  "browser": "",
  // 开发可执行文件时，bin字段可以帮助你设置链接，不需要手动设置PATH。
  "bin": {
    "myapp": "./cli.js"
  },
  // 如果设置为 true，则可以防止应用程序/软件包被意外发布到 npm 上。
  "private": true,
  // 一组可以运行的 node 脚本。
  "scripts": {
    "start": "npm run dev",
  },
  // 作为依赖安装的 npm 软件包的列表。
  "dependencies": {
    "vue": "^2.5.2"
  },
  // 设置作为开发依赖安装的 npm 软件包的列表。只需安装在开发机器上，而无需在生产环境中运行代码。
  "devDependencies": {
    "babel-core": "^6.22.1",
  },
  // 指定npm包与主npm包的兼容性，当开发插件时是需要的
  "peerDependencies": {
    "tea": "2.x"
  },
  // 用于在 dependencies, optionalDependencies 和 devDependencies 中声明的依赖项的补充元信息。
  "peerDependenciesMeta": {
    "soy-milk": {
      "optional": true
    }
  },
  // 你的软件能够运行的 Node 版本和 npm 版本等
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  // 用于告知要支持哪些浏览器（及其版本）。 Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  // 可选的workspaces字段是一个文件模块数组，描述了本地文件系统中的位置，安装客户端应该通过查找这些位置来找到需要符号链接到顶级node_modules文件夹的每个工作空间。
  "workspaces": [
    "./packages/*"
  ],
  // “config”对象可用于设置在升级后持续存在的包脚本中使用的配置参数。
  "config": {
    "port": "8080"
  },
  //软件包的许可证，以便人们知道如何使用它，以及您的限制。
  "license": "BSD-3-Clause"
}
```

# 参考
- [npmjs](https: //docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependenciesmeta)
- [pnpm](https: //pnpm.io/zh/package_json)