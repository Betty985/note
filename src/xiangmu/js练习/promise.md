 异步：只要不想为等待某个一步操作而阻塞线程执行，就可以使用
以往的异步编程模式：深度嵌套的回调函数（俗称“回调地狱”）
```js
function double (value){
    setTimeout(()=>setTimeout(console.log,0,value*2),1000);   
}
double(3);
// 大约1000毫秒后会打印出6
```
异步返回值   广泛接受的策略是给异步操作提供一个包含使用异步返回值的回调
```js
function double(value,callback){
    setTimeout(()=>{callback(value*2)},1000)
}
double(3,(x)=>console.log(`i was given:${x}`));
```
失败处理  异步操作会出现成功回调和失败回调
必须在初始化异步操作时定义回调，异步函数的返回值只在短时间内存在，只有预备好将这个短时间内存在的值作为参数的回调才能接收到它
```js
function double(value,success,failure){
    setTimeout(()=>{
        try{
            if(typeof value!=='number'){
                throw 'must privide number as first argument';
            }
            success(2*value);
        }catch(e){
            failure(e);
        }
    },1000);
}
const successCallback=(x)=>console.log(`success:${x}`);
const failureCallback=(e)=>console.log(`failure:${e}`);
double(3,successCallback,failureCallback);
double('b',successCallback,failureCallback);
```
嵌套异步回调
```js
function double(value,success,failure){
    setTimeout(
        ()=>{
            try{
                if(typeof value !=='number'){
                    throw 'must provide number as first argument';
                }
                success(2*value);
            }catch(e){
                failure(e);
            }
        },1000
    )
}
const successCallback=(x)=>{
    double(x+1,(y=>{console.log(`success:${y}`)}))
}
const failureCallback=(e)=>console.log(`failure:${e}`);
double(3,successCallback,failureCallback);
//结果是14
```
# 期约
是es6新增的引用类型。创建新期约时需要传入执行器函数作为参数,如果不提供执行器函数会报语法错误
```js
let p= new Promise(()=>{})
setTimeout(console.log,0,p);
// 返回了一个值7450
// Promise<pending>
```
期约是一个有状态的对象，可能处于待定/兑现或拒绝状态
** 期约的状态是私有的，不能直接通过javascript检测到。**
主要是为避免根据读取到的期约状态，以同步方式处理期约对象.
** 
1111111