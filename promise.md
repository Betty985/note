 # 异步编程
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
是es6新增的引用类型。创建新期约时需要传入**执行器函数**作为参数,如果不提供执行器函数会报语法错误
```js
let p= new Promise(()=>{})
setTimeout(console.log,0,p);
// 返回了一个值7450
// Promise<pending>
```
>内部操作在期约的执行器函数中完成。执行期函数主要有两项职责：**初始化期约的异步行为和控制状态的最终转换。**
期约是一个有状态的对象，可能处于待定/兑现或拒绝状态
**期约的状态是私有的，不能直接通过javascript检测到。主要是为避免根据读取到的期约状态，以同步方式处理期约对象.** 
调用resolve（）会把状态切换为兑现，调用reject（）会把状态切换为拒绝（抛出错误）。    
```js
let p1 =new Promise((resolve,reject)=>{
    resolve();
})
setTimeout(console.log,0,p1);
let p2=new Promise((resolve,reject)=>{
    reject();
})
setTimeout(console.log,0,p2);
```       
>**执行器函数是同步执行的**。因为执行器函数是期约的初始化程序。
```js
new Promise(()=>{
    setTimeout(console.log,0,'executor')
});
setTimeout(console.log,0,'promise initialized');
// 添加setTimeout可以推迟切换状态
let p = new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
});
// 在console.log 打印期约实例的时候，还不会执行超时回调（resolve（））
setTimeout(console.log,0,p)
// 切换状态不可撤销，继续修改会静默失败
let p=new Promise((resolve,reject)=>{
    resolve();
    reject();
});
setTimeout(console.log,0,p)
// 为避免期约卡在待定状态，可以添加一个定时退出功能
let p=new Promise((resolve,reject)=>{
    setTimeout(reject,10000);
    // 执行函数的逻辑
})
setTimeout(console.log,0,p);
setTimeout(console.log,11000,p);
```
>promis是回调的升级版。在处理一些需要花费较长时间的任务时，使用promise可以进行异步的处理，防止阻塞。
可以为resolve和reject传入参数，参数可以在后面使用。
如果成功就用then表示，如果失败就用catch表示。 用finally表示最后需要执行的代码。
解决了回调地狱，因为有resolve和reject可以得知任务进度
>finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。finally本质上是then方法的特例。
>作者：1号牛
>链接：https://juejin.cn/post/6844904111872147469

```js
const isPregnant = false;
const promise =new Promise((resolve,reject)=>{
    if(isPregnant){
        resolve(`孩子他爹`);
    }else{
        reject(`老公`) ;
    }
})
promise
.then(name=>{
    console.log(`男人成为了${name}`);
})
.catch(name=>{
    console.log(`男人成为了${name}`);
})
.finally(()=>{
    console.log(`他们最后结婚了！`);
})
```
```js
// 图片的异步加载
const imgUrl ="https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=a49823d4a7c379317d3d8e2fdbf49b7d/960a304e251f95ca0da07364c1177f3e6609528f.jpg";
const imgPromise=(url)=>{
    return new Promise ((resolve,reject)=>{
        // 建立图像对象
        // 图像对象名称=new Image([宽度],[高度])
        const img = new Image();
        img.src=url;
        img.onload=()=>{
            resolve(img);
        };
        img.onerror=()=>{
            reject(new Error("图片有错误"));
        }
    })
}
imgPromise(imgUrl)
.then(img=>{
    document.body.appendChild(img);
})
.catch(err=>{
    document.body.innerHTML=err;
})
.finally(
    document.boby.innerHTML+="<h1>promise 实现图片异步加载</h1>"
)
```
## Promise.resolve()
期约并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定。通过调用Promise.resolve()静态方法，可以实例化一个解决的期约。
```js
let p1 =new Promise((resolve,reject)=>{
    resolve()
});
let p2 = Promise.resolve();
// p1 p2两个期约实例是一样的
// 这个解决的期约的值对应着传给Promise.resolve()的第一个参数
setTimeout(console.log,0,Promise.resolve());
setTimeout(console.log,0,Promise.resolve(3));
setTimeout(console.log,0,Promise.resolve(4,5,6));
// 如果传入的参数本身是一个期约，那么它的行为就类似于一个空包装。Promise.resolve()可以说是一个幂等方法
// 这个幂等性会保留传入期约的状态
let p=Promise.resolve(7);
setTimeout(console.log,0,p===Promise.resolve(p));
setTimeout(console.log,0,p===Promise.resolve(Promise.resolve(p)));
// 这个静态方法能够包装任何非期约值
let p =Promise.resolve(new Error('foo'));
setTimeout(console.log,0,p);
```
## Promise.reject()
>Promise.reject()会实例化一个拒绝的期约并抛出一个异步错误。（这个错误不能通过try/catch捕获，只能通过拒绝处理程序捕获）
```js
// 下面两个期约实例是一样的
let p1=new Promise((resolve,reject)=>reject());
let p2=Promise.reject();
// 拒绝期约的理由就是传给Promise.reject()的第一个参数。这个参数也会传给后续的拒绝处理程序
let p =Promise.reject(3);
setTimeout(console.log,0,p);
p.then(null,(e)=>setTimeout(console.log,0,e));
```
**Promise.reject()没有幂等逻辑。如果给它传入期约对象，期约会成为它返回拒绝期约的理由。**
```js
setTimeout(console.log,0,Promise.reject(Promise.resolve()));
```
### 同步/异步执行的二元性
```js
try{
    throw new Error('foo');
}catch(e){
    console.log(e);
}
try{
    Promise.reject(new Error('bar'));
}catch(e){
    console.log(e);
}
```
同步代码没有捕获期约抛出的错误是因为它没有通过异步模式捕获错误。
**期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但是也是异步执行模式的媒介。**
拒绝期约的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步消息队列来处理的。
**代码一旦开始以异步模式执行，唯一与之交互的方式就是使用异步结构（具体来说就是期约）**
## 期约的实例方法
>期约实例的方法是连接外部同步代码和内部异步代码之间的桥梁。
### Promise.prototype.then()
为期约实例添加处理程序的主要方法。
最多接受两个参数：onResolved处理程序和onRejected处理程序。
```js
function onResolved(id){
    setTimeout(console.log,0,id,'resolved');
}
function onRejected(id){
    setTimeout(console.log,0,id,'rejected');
}
let p1=new Promise((resolve,reject)=>setTimeout(resolve,3000));
let p2=new Promise((resolve,reject)=>setTimeout(reject,3000));
p1.then(()=>onResolved('p1'),()=>onRejected('p1'));
p2.then(()=>onResolved('p2'),()=>onRejected('p2'))
```
>传给then（）的任何非函数类型参数都会被静默忽略。没有onResolved参数的话传入undefined。
```js
function onResolved(id){
    setTimeout(console.log,0,id,'resolved');
}
function onRejected(id){
    setTimeout(console.log,0,id,'rejected');
}
let p1 = new Promise((resolve,reject)=>setTimeout(resolve,3000));
let p2 = new Promise((resolve,reject)=>setTimeout(reject,3000));
p1.then('非函数处理程序会静默忽略');
p2.then(null,()=>onRejected('p2'))
//Promise.prototype.then()方法返回一个新的期约实例
// 必须有一个执行器函数作为参数
let p1 =new Promise(()=>{});
let p2 = p1.then();
setTimeout(console.log,0,p1);
setTimeout(console.log,0,p2);
setTimeout(console.log,0,p1===p2)
// 新期约实例基于onResolved处理程序的返回值构建（该处理程序的返回值会通过Promise.resolve()包装生成新期约。如果没有，Promise.resolve()就会包装上一个期约解决后的值。如果没有显示的返回语句，则Promise.resolve()会包装默认的返回值undefined
let p1 =Promise.resolve('foo');
// 若调用then（）时不传处理程序，则原样向后传
let p2=p1.then();
setTimeout(console.log,0,p2);
let p3=p1.then(()=>undefined);
let p4=p1.then(()=>{});
let p5=p1.then(()=>Promise.resolve());
setTimeout(console.log,0,p3);
setTimeout(console.log,0,p4);
setTimeout(console.log,0,p5);
// 如果有显式的返回值，Promise.resolve()会包装这个值
let p6 = p1.then(()=>'bar');
let p7=p1.then(()=>Promise.resolve('bar'));
setTimeout(console.log,0,p6);
setTimeout(console.log,0,p7);
// Promise.resolve()保留返回的期约
let p8=p1.then(()=>new Promise(()=>{}));
let p9=p1.then(()=>Promise.reject());
setTimeout(console.log,0,p8);
setTimeout(console.log,0,p9)
```
