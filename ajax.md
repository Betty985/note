# 什么是 AJAX

浏览器输入 url 后向服务器获取网页资源。浏览器渲染页面后，还想获取更多的网页信息，页面需要刷新，重新渲染。
**AJAX 可以不用重新渲染获取网页信息**
通过 js 操作浏览器内建的 XMLHttpRequest 构造函数与服务器取得联系。
xhr 的属性和方法：

- open(请求方法，URL，是否异步)true 是异步，false 是同步
- readyState 属性记录响应时处于哪个过程
  `0表示未调用open方法;1表示调用了open()方法，但未调用send()方法;2表示发送请求，还没收到响应；3表示收到了部分响应；4表示响应接收完了`
- 发送请求的方法：send(请求体)方法

readyState 属性的数字是从头到尾在变化的，响应状态码是当次请求而响应的数字。
readyState 属性值的变化会触发 readyStatechange 事件，可以用 onreadychange 来监视 readyState 属性值的变化，获取返回的数据，再利用 js 对 dom 的操作实现局部页面刷新。
# 手写Ajax
```js
function myajax(obj){
    let {url,method,success,error}=obj;
let xhr =new XMLHttpRequest();
    xhr.open(method,url,true);
    xhr.send()
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&(xhr.status===200||xhr.status===304))
        {
            success(xhr.responseText)
        }
        else error(xhr.responseText)
            }
}
```

# promise 封装 Ajax

```js
function ajaxPromise(){
    let promise =new Promise((resolve,reject)=>{
       let xhr =new XMLHttpRequest();
       xhr.open("get","url","true");
       xhr.onreadystatechange=()=>{
           if(xhr.readyState===4){
               if(xhr.status>=200&&xhr.status<300||xhr.status===304>){
                   resolve(xhr.responseURL)
               }
           }else {
               reject(new Error(xhr.statusText))
           }
       }
       xhr.send(null);
    })
return promise;
}
ajaxPromise().then(responseURL=>{image.src=responseURL}).catch(statusText=>{
    console.log(statusText)
})
```
