async函数是generator函数的语法糖，可以看作多个异步操作，包装成的一个promise对象。async函数就是把generator函数的星号替换成async，把yield替换成await。      
async函数对generator函数的改进：
- 内置执行器。generator函数的执行必须靠执行器，而async函数自带执行器。generator函数，需要调用next方法或者用co模块，才能真正执行，得到最后结果。（co模块用于generator函数的自动执行）
- 更好的语义。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
- 更广的适用性。co模块约定，yield命令后面只能是Thunk函数或者Promise对象，而async函数的await命令后面可以是Promise对象和原始类型的值。
- 返回值是promise。async函数的返回值是Promise对象，可以用then方法指定下一步操作。