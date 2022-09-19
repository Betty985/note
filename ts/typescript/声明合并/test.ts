interface Animal{
}
interface Dog{}
interface Cat{}
interface Box {
    height: number;
    width: number;
    clone(animal: Animal): Animal;
}

interface Box {
    scale: number;
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

let box: Box = {height: 5, width: 6, scale: 10, clone(animal: Animal): Animal{return animal}}

interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}
console.log(Document)

// 合并命名空间和类
class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    // 如果没有export呢？
    export class AlbumLabel { }
}

// 扩展枚举型
enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string):any {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}
console.log(Color)
console.log(Color.mixColor('yellow'))