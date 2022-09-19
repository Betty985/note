var box = { height: 5, width: 6, scale: 10, clone: function (animal) { return animal; } };
console.log(Document);
// 合并命名空间和类
var Album = /** @class */ (function () {
    function Album() {
    }
    return Album;
}());
(function (Album) {
    // 如果没有export呢？
    var AlbumLabel = /** @class */ (function () {
        function AlbumLabel() {
        }
        return AlbumLabel;
    }());
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
// 扩展枚举型
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));
(function (Color) {
    function mixColor(colorName) {
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
    Color.mixColor = mixColor;
})(Color || (Color = {}));
console.log(Color);
console.log(Color.mixColor('yellow'));
