## class

## new

## forEach
```js
/*
* forEach([1, 2], value => console.log(value))
 * // => Logs `1` then `2`.
*/

function myforEach(arr,fn){
    for(let i=0,length=arr.length;i<length;i++){
        fn.apply(this,[arr[i],i,arr])
    }
}
myforEach([1, 2], (v,i,arr) => console.log(v,i,arr))
```
## map

## slice

## every

## some

## reduce

...