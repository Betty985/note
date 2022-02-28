// 事件总线（发布订阅模式）
class EventEmitter{
    constructor(){
        this.cache={}
    }
    on(name,fn){
        if(this.cache[name]){
            this.cache[name].push(fn)
        }else{
            this.cache[name]=[fn]
        }
    }
    off(name,fn){
        let tasks=this.cache[name]
        if(tasks){
  // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
            const index=tasks.findIndex(f=>f===fn||f.callback===fn)
            if(index>=0){
                tasks.splice(index,1)
            }
        }
    }
    emit(name,once=false,...args){
        if(this.cache[name]){
            // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
            let tasks =this.cache[name].slice()
            for(let fn of tasks){
                fn(...args)
            }
            if(once){
                delete this.cache[name]
            }
        }
    }
}
let eventBus=new EventEmitter()
let fn1=function(name,age){
    console.log(`${name} ${age}`)
}
let fn2=function(name,age){
    console.log(`hello ,${name} ${age}`)
}
eventBus.on('aaa',fn1)
eventBus.on('aaa',fn2)
eventBus.emit('aaa',false,'布兰',12)
// 解析URL参数为对象
function parseParam(url){
    // 将？后面的字符串取出来
    const paramsStr=/.+\?(.+)$/.exec(url)[1];
    // 将字符串以&分割后存在数组中
    const paramsArr=paramsStr.split('&')
    let paramsObj={}
    // 将params存到对象中
    paramsArr.forEach(param=>{
        if(/=/.test(param)){
            // 处理有value的参数
            let [key,val]=param.split('=')
            val=decodeURIComponent(val)
            val=/^\d+$/.test(val)?parseFloat(val):val
            if(paramsObj.hasOwnProperty(key)){
                paramsObj[key]=[].concat(paramsObj[key],val)
            }else{
            paramsObj[key]=val;
        }
        }else{
            paramsObj[param]=true
        }
    })
    return paramsObj
}
parseParam("https://www.baidu.com/s?ie=UTF-8&wd=nih")
// 字符串模板
function render(template,data){
    const reg=/\{\{(\w+)\}\}/;
    if(reg.test(template)){
        const name =reg.exec(template)[1];
        template=template.replace(reg,data[name])
        return render(template,data)
    }
    return template
}
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12,
    sex:1
}
render(template, person); // 我是布兰，年龄12，性别undefined
// 图片懒加载
let imgList=[...document.querySelectorAll('img')]
let len=imgList.length
const imgLazyLoad=(function(){
    let count =0 
    return function(){
        let deleteIndexList=[]
        imgList.forEach((img,index)=>{
 // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
// 如果是标准盒子模型，元素的尺寸等于width/height + padding + border-width的总和。
            // 如果box-sizing: border-box，元素的的尺寸等于 width/height。
            let rect=img.getBoundingClientRect()
            if(rect.top<window.innerHeight){
                img.src=img.dataset.src
                deleteIndexList.push(index)
                count++
                if(count===length){
                    document.removeEventListener('scroll',imgLazyLoad)
                }
            }
        })
        imgList=imgList.filter((img,index)=>!deleteIndexList.includes(index))
    }
})()
document.addEventListener('scroll',imgLazyLoad)
