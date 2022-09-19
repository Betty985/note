// 函数类型包含两部分：参数类型和返回值类型。只要参数类型是匹配的，那么就认为它是有效的函数类型。在函数和返回值类型之前使用`=>`符号，使之清晰明了。返回值类型是函数类型的必要部分。如果函数没有返回任何值，必须指定返回值类型为void。

// 在赋值语句的一边指定了类型但是另一边没有类型的话，ts编译器会自动识别出类型。

// 传递给一个函数的参数个数必须与函数期望的参数个数一致。
// 在参数名旁使用？实现可选参数的功能。可选参数必须跟在必须参数后面。
// 为参数提供一个默认值，当用户没有传递这个参数或者传递的值的undefined时，使用默认值。它们叫做有默认初始值的参数。带默认值的参数不必放在必须参数后，可以通过传入undefined获取默认值。
// 可选参数与末尾的默认参数共享参数类型。
function buildName(firstName:string,lastName?:string):string{
    if(lastName){
        return firstName+' '+lastName
    }else{
        return firstName
    }
}
let result=buildName('B')
// let result2=buildName('b','a','c') 应有 1-2 个参数，但获得 3 个。
function buildName1(firstName: string='hi', lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName1(undefined,"Bob");   

// 剩余参数。必要参数，默认参数和可选参数表示某个参数。参数个数未知时，可以把所有参数收集到一个变量里。
function buildName2(firstName:string,...restOfName:string[]){
   return firstName+' '+restOfName.join(' ')
}
let employeeName=buildName2('a','b','c','d')

// this参数
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// 重载
// 方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。
