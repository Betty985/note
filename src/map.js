/*
var array = [1,2,3,4]
array.map((item,index,arr)=>{
    console.log('index:',index,'arr:',arr)
    return item+1
})
//result [2, 3, 4, 5]

*/

Array.prototype.myMap=function(fn,self){
    let arr = this
    let length = arr.length
    let result = []
    self = self||window
    for(let i=0;i<length;i++){
            result.push(fn.apply(self,[arr[i],i,arr]))
    }
    return result
}

//测试
var array = [1,2,3,4]
array.myMap((item,index,arr)=>{
    console.log('index:',index,'arr:',arr)
    return item+1
})
