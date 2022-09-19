 declare namespace myLib{
    function makeGreeting(s:string):string
    let numberOfGreetings:number
}
// 函数重载
declare function getWidget(n:number):Widget
declare function getWidget(s:string):Widget[]
// 接口
interface GreetingSettings{
    greeting:string;
    duration?:number;
    color?:string
}
declare function greet(setting:GreetingSettings):void;
// 类型别名
type GreetingLike=string|(()=>string)|MyGreeter;
declare function greet1(g:GreetingLike):void

// 命名空间来组织类型
declare namespace GreetingLib{
    interface LogOptions{
        verbose?:boolean
    }
    interface AlertOptions{
        modal:boolean;
        title?:string;
        color?:string
    }
}
declare namespace GreetingLib.Options {
    // Refer to via GreetingLib.Options.Log
    interface Log {
      verbose?: boolean;
    }
    interface Alert {
      modal: boolean;
      title?: string;
      color?: string;
    }
  }
// 类
declare class Greeter1 {
    alert(arg0: { modal: boolean; title: string; }):void
    log(arg0: { verbose: boolean; }):void
    constructor(greeting: string);
    greeting: string;
    showGreeting(): void;
  }
// 全局变量
declare var foo: number;
// 全局函数
declare function greet(greeting: string): void;