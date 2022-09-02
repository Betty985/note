var undefined = 1;
console.log(undefined); //浏览器控制台是undefined,vscode是1
function test() {
  var undefined = 1;
  console.log(undefined); //1
}