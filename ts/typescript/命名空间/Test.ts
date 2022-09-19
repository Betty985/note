/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log("'" + s + "' " + (validators[name].isAcceptable(s) ? " matches " : " does not match ") + name);
    }
}
/* 
当涉及到多文件时，我们必须确保所有编译后的代码都被加载了。 我们有两种方式。
* 第一种方式，把所有的输入文件编译为一个输出文件，需要使用--outFile标记： 
   tsc --outFile sample.js Test.ts
* 第二种方式，我们可以编译每一个文件（默认方式），那么每个源文件都会对应生成一个JavaScript文件。 然后，在页面上通过<script>标签把所有生成的JavaScript文件按正确的顺序引进来.
*/