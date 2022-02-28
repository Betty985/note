<a name="jq9al"></a>
# css选择器
在HTML中，id和class是元素最基本的两个属性。一般情况下，id和class都可以用来选择元素，以便进行CSS操作或者JavaScript操作。
<a name="SgcjJ"></a>
## 元素选择器
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627639235345-825cd2a3-a15e-4102-a048-342227c64acc.png#clientId=u8fde0e01-16a4-4&from=paste&height=147&id=uf5735bdf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=293&originWidth=387&originalType=binary&ratio=1&size=12464&status=done&style=none&taskId=u618a0633-9423-46f0-92ab-3031bd27ceb&width=193.5)![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627639261794-7ec107f8-99ba-42ac-aef6-5041eaaa5495.png#clientId=u8fde0e01-16a4-4&from=paste&height=148&id=u9dbe525f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=296&originWidth=446&originalType=binary&ratio=1&size=42799&status=done&style=none&taskId=ud34ee4e0-a618-49dd-b45e-f2a834cfce3&width=223)
<a name="xbQWo"></a>
## id选择器
id属性具有唯一性。<br />对于id选择器，id名前面必须要加上前缀“#”
<a name="ifFs7"></a>
## class选择器
以为同一个页面的相同元素或者不同元素设置相同的class，然后使相同class的元素具有相同的CSS样式。<br />class名前面必须要加上前缀英文句号（.）
<a name="i1LEx"></a>
## 后代选择器
后代选择器，就是选择元素内部中某一种元素的所有元素：包括子元素和其他后代元素（如“孙元素”）<br />父元素和后代元素必须要用空格隔开，表示选中某个元素内部的后代元素<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627639959715-9fe159bd-7569-42c2-9e05-23e17fddccc6.png#clientId=u8fde0e01-16a4-4&from=paste&height=142&id=uf19ae77a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=283&originWidth=477&originalType=binary&ratio=1&size=38397&status=done&style=none&taskId=ucf49a989-33e6-4912-81ed-27273a408c5&width=238.5)
<a name="BNK8P"></a>
## 群组选择器
群组选择器，指的是同时对几个选择器进行相同的操作。<br />对于群组选择器，两个选择器之间必须要用英文逗号（,）隔开<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627640484096-4cc726c5-bcf6-431d-905a-ca01b4e37152.png#clientId=u8fde0e01-16a4-4&from=paste&height=149&id=u79a622f1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=298&originWidth=453&originalType=binary&ratio=1&size=39503&status=done&style=none&taskId=u0b459eab-fdd4-49db-9129-77cd5eb2085&width=226.5)
<a name="JyvNZ"></a>
## 全选 * 选择器
全选
<a name="LUvtg"></a>
# 字体样式
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627641528288-5967f572-8dff-4db1-94bb-538894c8d96d.png#clientId=u8fde0e01-16a4-4&from=paste&height=141&id=u3ac4cd38&margin=%5Bobject%20Object%5D&name=image.png&originHeight=282&originWidth=796&originalType=binary&ratio=1&size=34687&status=done&style=none&taskId=ue3e2e2bf-6145-43b2-b720-0cc0266ad0d&width=398)<br />除了字体颜色，其他字体属性都是以“font”前缀开头的
<a name="oUPpZ"></a>
## 字体类型font-family
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627641569847-2059bf38-d21f-4c2d-9dfa-8f2bf550ffe3.png#clientId=u8fde0e01-16a4-4&from=paste&height=28&id=u61f242a2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=55&originWidth=595&originalType=binary&ratio=1&size=6379&status=done&style=none&taskId=u02230c0f-50e7-4293-95a5-16c3076b07c&width=297.5)<br />font-family可以指定多种字体。使用多个字体时，将按从左到右的顺序排列，并且以英文逗号（,）隔开。<br />比较美观的中文字体有微软雅黑、苹方，英文字体有Times New Roman 、Arial和Verdana。
<a name="c5rcS"></a>
## 字体大小font-size
font-size属性取值有两种：一种是“关键字”，如small、medium、large等；另外一种是“像素值”，如10px、16px、21px等。px属于相对单位，因为屏幕分辨率的不同，1px的大小也是不同的。此外，还有em、百分比等
<a name="WAEln"></a>
## 字体粗细font-weight
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627643370799-ea305f6d-c8de-48bb-aeef-313d340381f6.png#clientId=u8fde0e01-16a4-4&from=paste&height=39&id=u74d0f468&margin=%5Bobject%20Object%5D&name=image.png&originHeight=78&originWidth=292&originalType=binary&ratio=1&size=4267&status=done&style=none&taskId=u28e0637d-b4b0-41b2-8241-b656e53916a&width=146)![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627643394788-7a2d0b6b-9341-42f8-9d72-1880c396a455.png#clientId=u8fde0e01-16a4-4&from=paste&height=126&id=uac8e8838&margin=%5Bobject%20Object%5D&name=image.png&originHeight=252&originWidth=787&originalType=binary&ratio=1&size=34521&status=done&style=none&taskId=uf319f646-ceff-43c2-8426-39df0b94e2c&width=393.5)
<a name="SCRdX"></a>
## 字体风格font-style
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627643604736-343d38b7-c86e-40f7-95bd-648ecd00e0df.png#clientId=u8fde0e01-16a4-4&from=paste&height=112&id=u2fb7c9f1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=224&originWidth=744&originalType=binary&ratio=1&size=26259&status=done&style=none&taskId=u9dafea77-6539-4056-a664-4e3edb033c3&width=372)有些字体有斜体italic属性，但有些字体却没有italic属性。oblique是让没有italic属性的字体也能够有斜体效果。
<a name="pJCkN"></a>
# 文本样式
使用了“font”和“text”两个前缀来区分这两类样式<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627644233330-87dd25e3-881d-4e45-a690-9838b7ff7177.png#clientId=u8fde0e01-16a4-4&from=paste&height=221&id=u4988f926&margin=%5Bobject%20Object%5D&name=image.png&originHeight=442&originWidth=1580&originalType=binary&ratio=1&size=149342&status=done&style=none&taskId=u6891e4e1-912a-4b6c-8421-2e5f7beb1f7&width=790)
<a name="ND00b"></a>
## 首行缩进:text-indent
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627644266074-7653e719-9485-4804-bffc-b14217d66b99.png#clientId=u8fde0e01-16a4-4&from=paste&height=29&id=u8ed3501f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=58&originWidth=354&originalType=binary&ratio=1&size=4598&status=done&style=none&taskId=uc93b3e61-9188-4572-a266-7564a2c2b82&width=177)<br />**中文段落首行一般需要缩进两个字的空间。想要实现这个效果，那么text-indent值应该是font-size值的2倍**。
<a name="yJlZ6"></a>
## 水平对齐:text-align
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627644527663-cfa8f0ff-c2d4-46d4-a70c-5d8e8b51cd90.png#clientId=u8fde0e01-16a4-4&from=paste&height=129&id=u86f78722&margin=%5Bobject%20Object%5D&name=image.png&originHeight=257&originWidth=1608&originalType=binary&ratio=1&size=71769&status=done&style=none&taskId=u31957097-60f6-485c-9b41-21c8e320a1a&width=804)<br />text-align属性不仅对文本有效，对图片（img元素）也有效。
<a name="XYGAk"></a>
## 文本修饰: text-decoration
text-decoration属性来定义文本的修饰效果（下划线、中划线、顶划线）
<a name="tOAYK"></a>
## 大小写:text-transform
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1627645226128-11441bba-180e-452f-8cef-6614ff73b386.png#clientId=u8fde0e01-16a4-4&from=paste&height=161&id=u623c8987&margin=%5Bobject%20Object%5D&name=image.png&originHeight=322&originWidth=1494&originalType=binary&ratio=1&size=114730&status=done&style=none&taskId=u3e281daf-8727-478a-8fd3-94be71e8b0c&width=747)
<a name="hkixg"></a>
## 行高:line-height
控制一行文本的高度。
<a name="DcOo7"></a>
## 间距:letter-spacing、word-spacing  报错
letter-spacing属性控制字与字之间的距离。word-spacing属性定义两个单词之间的距离。
