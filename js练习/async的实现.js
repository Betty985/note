function asyncToGenerator(generatorFn){
    // 返回一个新的函数
    return function(){
        // 先调用generator函数，生成迭代器
        const gen=generatorFn.apply(this,arguments)
        // 返回一个promise
        return new Promise((resolve,reject)=>{
            // 跨过yield的阻碍
            // key有next和throw两种取值，分别对应了gen的next和throw方法
            // arg参数用来把promise resolve出来的值交给下一个yield
            function step(key,arg){
                let generatorResult
                try{
                    generatorResult=gen[key](arg)
                }catch(err){
                    return reject(error)
                }
                const {value,done}=generatorResult
                if(done){
                    // 已经完成就直接resolve这个promise
                    return resolve(value)
                }else{
                    return Promise.resolve(value).then(function onFullfilled(value){
                        step('next',value)
                    }),function onRejected(err){
                        step('throw',err)
                    }
                }
            }
            step('next')
        })
    }
}
