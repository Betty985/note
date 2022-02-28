<a name="OU0R8"></a>
# 简介 
CSS3新技术包括以下11个方面。<br />▶ 新选择器▶ 文本样式▶ 颜色样式▶ 边框样式▶ 背景样式▶ CSS3变形▶ CSS3过渡▶ CSS3动画▶ 多列布局▶ 弹性布局▶ 用户界面
<a name="xeSSB"></a>
## 浏览器私有前缀
由于CSS3新增的一些属性尚未成为W3C标准的一部分，因此对于这些属性来说，每种内核的浏览器都只能识别“带有自身私有前缀的属性”。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1630929649536-517931d0-0e69-49e1-b015-da42b0777c4f.png#clientId=u41488343-00c8-4&from=paste&height=159&id=uaf569b5a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=317&originWidth=1577&originalType=binary&ratio=1&size=90655&status=done&style=none&taskId=ua212c507-2880-4669-9e83-8a2fddb7637&width=788.5)<br />对于IE6~IE8的兼容，我们可以借助ie-css3.htc这个扩展文件来实现<br />▶ 当前元素一定要有定位属性，如position:relative或position:absolute，否则ie-css3.htc无法生效。<br />▶ ie-css3.htc文件支持的CSS3属性有限，暂时只支持border-radius、box-shadow、text-shadow属性。<br />Can I use这个网站上，输入想要查找的属性，会显示非常详细的信息
