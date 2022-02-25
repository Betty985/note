let arr = [1,2,3]


// ajax
function myAjax(obj){
    let {url,methods,success,error}=obj;
    let xhr =new XMLHttpRequest();
    xhr.open(methods,url,true);
    /*XMLHttpRequest.send() 方法接受一个可选的参数，其作为请求主体；
        如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。*/
    xhr.send(null);
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4){
            if(xhr.status==200)
                success(xhr.responseText)
            else error(xhr.responseText)
        }
    }
    
}
myAjax({
    url:"https://www.runoob.com/try/ajax/ajax_info.txt",
    methods:"GET",
    success:(res)=>{console.log(res)},
    error:(res)=>{console.log(res)}
})

// promise ajax
function myPromiseAjax(obj){}
myPromiseAjax({
    url:"https://www.runoob.com/try/ajax/ajax_info.txt",
    methods:"GET",
    success:(res)=>{console.log(res)},
    error:(res)=>{console.log(res)}
})
// instanceof
function myInstanceOF(left,right){}
myInstanceOF([],Array) 
myInstanceOF([],Object)
