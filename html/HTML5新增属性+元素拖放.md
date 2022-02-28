<a name="pdgmZ"></a>
# 新增属性
<a name="czSoy"></a>
## 公共属性
<a name="usp8V"></a>
### hidden
显示或隐藏某一个元素。hidden只有一个属性值：hidden。可以简写为：<element hidden></element>。
<a name="VKvn1"></a>
### draggable
定义某一个元素是否可以被拖动。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628475039390-e2925593-1092-44b7-806b-e9cfafb35455.png#clientId=u1e51c571-14ab-4&from=paste&height=35&id=u0d861d4e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=70&originWidth=759&originalType=binary&ratio=1&size=8962&status=done&style=none&taskId=ua10d0449-a57e-40c8-ab70-399a9240a1e&width=379.5)<br />draggable有两个属性值：true和false。默认值为false。当取值为true时，表示元素可以被拖动；当取值为false时，表示元素不可以被拖动。draggable="true"只能定义元素可以被拖动这一个行为，拖动后并不会改变元素的位置。<br />auto：浏览器自己判断元素是否能被拖拽 ( 默认 )
<a name="F397Q"></a>
### contenteditable
定义某个元素的内容是否可以被编辑。<br />contenteditable有两个属性值：true和false。默认值为false。

- true 或空字符串，表示元素是可编辑的；
- false 表示元素不是可编辑的。
- 如果没有设置该属性，其默认值继承自父元素

[MDN 全局属性contenteditable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)​
<a name="ZoBSE"></a>
### data-*
元素实现自定义属性。<br />“data-”只是一个前缀，后面接一个小写的字符串![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628476550436-e012e720-4757-48da-afec-4197cd27205c.png#clientId=u1e51c571-14ab-4&from=paste&height=142&id=u30307168&margin=%5Bobject%20Object%5D&name=image.png&originHeight=283&originWidth=1252&originalType=binary&ratio=1&size=66124&status=done&style=none&taskId=u17f7998e-d05c-49a5-a1fc-e9a84b68649&width=626)<br />可以使用DOM操作中的obj.dataset.xxx来获取data-*属性的值。其中，obj是一个DOM对象，xxx是data-的后缀字符。<br />如果是data-xxx格式，则应该写成obj.dataset.xxx。<br />如果是data-xxx-yyy格式，则应该写成obj.dataset.xxxYyy
<a name="kDG1g"></a>
##  input元素的新增属性
<a name="jIVar"></a>
### autocomplete
实现文本框的自动提示功能。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628477447253-ccd8f1ce-88dd-4b5f-9ba7-79c34de79b2f.png#clientId=u1e51c571-14ab-4&from=paste&height=44&id=u10be1f23&margin=%5Bobject%20Object%5D&name=image.png&originHeight=88&originWidth=760&originalType=binary&ratio=1&size=8667&status=done&style=none&taskId=u978cb142-72e6-4b3f-b6d0-167536d1d7e&width=380)<br />默认on。规定启用自动完成功能。<br />autocomplete属性有两个属性值：on和off。on表示开启，off表示关闭。autocomplete属性一般都是结合datalist元素来实现自动提示功能。<br />适用于所有文本框型的input元素，包括text、password、email、url、tel等。
<a name="keosI"></a>
### autofocus
在HTML5之前，都是使用JavaScript的focus()方法来实现的。<br />用autofocus属性来实现文本框自动获取焦点。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628478114865-fe7151ef-46f8-421c-8ed4-ea0c1c4a1895.png#clientId=u1e51c571-14ab-4&from=paste&height=38&id=ud1fe01d4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=75&originWidth=719&originalType=binary&ratio=1&size=7830&status=done&style=none&taskId=u6dfa8b5e-fb21-4128-94f5-1b084d6e93b&width=359.5)<br />autofocus只有一个属性值：autofocus。可以直接简写为：<input type="text"autofocus />。
<a name="yOZ7a"></a>
### placeholder
为文本框添加提示内容。
<a name="bmnyQ"></a>
### required 
定义文本框输入内容不能为空。<br />required只有一个属性值：required。可以简写为：<input type="text" required />。
<a name="mDAL0"></a>
### pattern
为文本框添加验证功能。<br />pattern属性取值是一个正则表达式
<a name="dd3Fb"></a>
## form元素的新增属性
<a name="u7GmE"></a>
### novalidate
禁用form元素的所有文本框内置的验证功能。<br />novalidate只有一个属性值：novalidate。可以直接简写为：<form novalidate></form>。
<a name="RRleb"></a>
# 元素拖放
“源元素”指的是被拖曳的那个元素，“目标元素”指的是源元素最终被释放到的那个元素。<br />源元素触发的事件<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628480705650-2ca8cfdf-0495-4e06-a320-6fcb203bbf03.png#clientId=u1e51c571-14ab-4&from=paste&height=128&id=ub8c9e843&margin=%5Bobject%20Object%5D&name=image.png&originHeight=255&originWidth=1324&originalType=binary&ratio=1&size=72238&status=done&style=none&taskId=u5758b3d3-1e29-42a3-8a91-325e8d1d955&width=662)<br />目标元素触发的事件<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628480754909-c89238ac-7ca3-4663-be64-7d88ef86219e.png#clientId=u1e51c571-14ab-4&from=paste&height=128&id=u3ca13b9f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=255&originWidth=1176&originalType=binary&ratio=1&size=103932&status=done&style=none&taskId=u96e4af4b-08d8-4659-b39b-3b01a7f18ea&width=588)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628480791294-68f502eb-2151-4781-824d-5c08a4f7ed71.png#clientId=u1e51c571-14ab-4&from=paste&height=98&id=udc411f00&margin=%5Bobject%20Object%5D&name=image.png&originHeight=195&originWidth=1340&originalType=binary&ratio=1&size=183623&status=done&style=none&taskId=uaa66937c-3954-4ab8-b916-13f89dbfcd4&width=670)<br />e.offsetX、e.offsetY分别表示鼠标相对于触发事件的对象的X坐标、Y坐标，e.pageX、e.pageY分别表示鼠标相对于当前窗口的X坐标、Y坐标。
<a name="I453h"></a>
##  dataTransfer对象
dataTransfer对象主要用于在“源元素”与“目标元素”之间传递数据。<br />开始拖放源元素时（ondragstart事件），调用setData()方法保存数据；然后在放入目标元素时（ondrop事件），调用getData()方法读取数据。
<a name="HukQR"></a>
### setData()方法
在拖放操作中可以使用setData()方法保存数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628492601192-a3ccee6b-8972-4e32-9338-986d59feaf4f.png#clientId=u1e51c571-14ab-4&from=paste&height=284&id=u7e277d88&margin=%5Bobject%20Object%5D&name=image.png&originHeight=567&originWidth=897&originalType=binary&ratio=1&size=69018&status=done&style=none&taskId=ub835eec9-fb13-4c4e-8fa1-8b67373b403&width=448.5)
<a name="XkUzZ"></a>
### getData()方法
在拖放操作中，可以使用getData()方法读取数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628492667748-8ff2e695-177b-4aef-8690-78c70f3831c2.png#clientId=u1e51c571-14ab-4&from=paste&height=132&id=uac9462cc&margin=%5Bobject%20Object%5D&name=image.png&originHeight=263&originWidth=422&originalType=binary&ratio=1&size=16984&status=done&style=none&taskId=u84d2df78-0b44-443a-b058-546d3b656ec&width=211)

