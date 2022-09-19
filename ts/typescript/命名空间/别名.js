/*
直接使用导入符号的限定名赋值。 这与使用var相似，但它还适用于类型和导入的具有命名空间含义的符号。 重要的是，对于值来讲，import会生成与原始符号不同的引用，所以改变别名的var值并不会影响原始变量的值。
 */
var Shapes;
(function (Shapes) {
    var Polygons;
    (function (Polygons) {
        var Triangle = /** @class */ (function () {
            function Triangle() {
            }
            return Triangle;
        }());
        Polygons.Triangle = Triangle;
        var Square = /** @class */ (function () {
            function Square() {
            }
            return Square;
        }());
        Polygons.Square = Square;
    })(Polygons = Shapes.Polygons || (Shapes.Polygons = {}));
})(Shapes || (Shapes = {}));
var polygons = Shapes.Polygons;
var sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
