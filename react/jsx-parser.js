// 解析jsx
module.exports=function () {
    return {
        /**
         * 插件挂载的manipulateOptions钩子函数
         * @param {*} opts :BaseParser 类的参数
         * @param {*} parserOpts : BaseParser 实例
         * parserOpts.plugins.push('jsx') 就表明在 parse 过程中需要识别 jsx 语法了。
         * 在 .babelrc 文件中配置了这个插件后，parse 阶段就会读取这些插件的 manipulateOptions 属性，
         * 在执行 parse 过程中也就是执行 hasPlugins('jsx') 为 true。
         */
        manipulateOptions:function manipulateOptions(opts,parserOpts){        
       //  parserOpts转换插件:这些插件用于转换你的代码。
            parserOpts.plugins.push('jsx');
        }
    };
};