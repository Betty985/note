class LRU{
    constructor(size){
        this.size=size
        this.cache=new Map()
    }
    get(key){
        let has=this.cache.has(key)
        if(has){
            let val=this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key,val)
            return val
        }else {
            return new Error('No results found！')
        }
    }
    put(key,val){
        let has=this.cache.has(key)
        if(has){
            this.cache.delete(key)
        }
        this.cache.set(key,val)
        if(this.cache.size>this.size){
            this.cache.delete(this.cache.keys().next().value)
        }
    }
}
