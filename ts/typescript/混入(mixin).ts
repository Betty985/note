// 流行一种通过可重用组件创建类的方式，就是联合另一个简单类的代码。
// 替代模式
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }
}
// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}
//  把类当成了接口
class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

class Sprite {
    name = "";
    x = 0;
    y = 0;

    constructor(name: string) {
        this.name = name;
    }
}
type Constructor = new (...args: any[]) => {};
function Scale<TBase extends Constructor>(Base: TBase) {
    return class Scaling extends Base {
        // Mixins may not declare private/protected properties
        // however, you can use ES2020 private fields
        _scale = 1;

        setScale(scale: number) {
            this._scale = scale;
        }

        get scale(): number {
            return this._scale;
        }
    };
}
// ---cut---
// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);

const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.scale);

// 受约束的mixins
type GConstructor<T = {}> = new (...args: any[]) => T
type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>
function Jumpable<TBase extends Positionable>(Base: TBase) {
    return class Jumpable extends Base {
        jump() {
            this.setPos(0, 20)
        }
    }
}

// 不能使用装饰符通过代码流分析提供混合
class Player {
    x = 0;
    y = 0;
}
// The runtime aspect could be manually replicated via
// type composition or interface merging.
type FreezablePlayer = Player & { shouldFreeze: boolean };

const playerTwo = (new Player() as unknown) as FreezablePlayer;
playerTwo.shouldFreeze;

function base<T>() {
    class Base {
        static prop: T;
    }
    return Base;
}

function derived<T>() {
    class Derived extends base<T>() {
        static anotherProp: T;
    }
    return Derived;
}

class Spec extends derived<string>() { }

Spec.prop; // string
Spec.anotherProp; // string

// 静态属性混入
function base1<T>() {
    class Base {
      static prop: T;
    }
    return Base;
  }
   
  function derived1<T>() {
    class Derived extends base1<T>() {
      static anotherProp: T;
    }
    return Derived;
  }
   
  class Spec1 extends derived1<string>() {}
   
  Spec.prop; // string
  Spec.anotherProp; // string
