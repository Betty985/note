const fs = require('fs');
const readFile=function(fileName){
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName,(error,data)=>{
            if(error) {
                return reject(error)
            }
            resolve(data)
        })
    })
}
const gen=function* (){
   const f1=yield readFile('/index.js')
   const f2=yield readFile('/index.html')                 
   console.log(f1.toString())
   console.log(f2.toString())
}
gen()