<a name="AmRWm"></a>
# 新增元素
<a name="k8YNk"></a>
## 结构元素
在HTML5中，新增了一组结构元素，以帮助完善页面的语义化，提高可读性、可维护性以及SEO（即搜索引擎优化）。HTML5新增的主要结构元素有6个：header、nav、article、aside、section、footer。
<a name="bphLn"></a>
### header元素
header元素一般用于3个地方：页面头部、文章头部（article元素）和区块头部（section元素）。
<a name="qo7fW"></a>
### nav元素
nav元素一般用于3个地方：顶部导航、侧栏导航和分页导航。
<a name="dkhfG"></a>
### article元素
article元素一般只会用于一个地方：文章内容部分。我们可以把article看成一个独立的部分，它内部可以包含标题以及其他部分。
<a name="CmUrj"></a>
### aside元素
de元素一般用于表示跟周围区块相关的内容<br />如果aside元素放在article元素或section元素之中，则aside内容必须与article内容或section内容紧密相关。<br />如果aside元素放在article元素或section元素之外，则aside内容应该是与整个页面相关的，比如相关文章、相关链接、相关广告等。
<a name="QNVos"></a>
### section元素
section元素一般用于某一个需要标题内容的区块。如果页面某个区块不需要标题，直接使用div元素就可以了。如果需要标题，则建议使用section元素。
<a name="NQg7N"></a>
### footer元素
ooter元素一般用于两个地方：一个是“页面底部”，另一个是“文章底部”。
<a name="hGMRJ"></a>
## 表单元素
HTML5在HTML4.01的基础上，对表单进行了以下两个方向的扩展。▶ 新增input元素类型▶ 新增其他表单元素
<a name="YvJEk"></a>
### 新增input元素类型
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628239169489-8e7225ae-1dcc-42cf-8d73-ce9239ce9cfb.png#clientId=uce7103ff-efe1-4&from=paste&height=357&id=u6239c429&margin=%5Bobject%20Object%5D&name=image.png&originHeight=713&originWidth=838&originalType=binary&ratio=1&size=88199&status=done&style=none&taskId=u3bd11bf0-abbe-4814-ad78-75a5c41f45f&width=419)<br />email类型的文本框采用了浏览器内置的验证机制，而浏览器内置的验证机制必须使用submit按钮才会触发。<br />tel和URL如果想要达到验证效果，需要结合pattern属性来实现。
<a name="w7aTe"></a>
#### range
当type属性取值为“range”时，我们可以通过拖动滑动条获取某一个范围内的数字。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628240924748-d65ed1be-3150-4dd6-86d7-29c893065a4c.png#clientId=uce7103ff-efe1-4&from=paste&height=279&id=u09758113&margin=%5Bobject%20Object%5D&name=image.png&originHeight=558&originWidth=983&originalType=binary&ratio=1&size=59452&status=done&style=none&taskId=u2065a4ac-b5f9-4990-9a55-7f995e1ff30&width=491.5)
<a name="yUGRE"></a>
#### number
可以通过使用微调按钮来获取某一个范围的数字。<br />min属性用于设置最小值，max属性用于设置最大值，step属性用于设置间隔数。它们的属性取值可以是整数，也可以是小数。
<a name="rmCZJ"></a>
#### color
value属性用于设置颜色初始值，格式必须是十六进制颜色值如#F1F1F1
<a name="U6lIW"></a>
#### date
当type属性取值为“date”时，我们可以直接使用浏览器自带的日历工具来获取日期（年、月、日）。
<a name="IpWAK"></a>
#### time
当type属性取值为“time”时，我们可以直接使用浏览器自带的工具来获取时间（时、分）。
<a name="eq7V6"></a>
#### mouth week
<a name="smdjJ"></a>
## 新增表单元素
<a name="XHthb"></a>
### keygen
用keygen元素来生成页面的密钥。如果表单内部有keygen元素，则提交表单时，keygen元素将生成一对密钥：一个保存在客户端，称为“私密钥（PrivateKey）”；另一个发送到服务器，称为“公密钥（PublicKey）”。
<a name="ARTzr"></a>
### datalist
用output元素来定义表单元素的输出结果或计算结果。
<a name="vTTMz"></a>
### output
用output元素来定义表单元素的输出结果或计算结果。
<a name="WSQtX"></a>
## 新增	其他元素
<a name="aW1E7"></a>
### address 
为“整个页面”或者“某一个article元素”添加地址信息（电子邮件或真实地址）。<br />当address元素应用于整个页面时，它一般放于整个页面的底部（footer元素内部），表示该网站所有者的地址信息。
<a name="FSqr2"></a>
### time
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628247094485-53082878-723e-45e6-85c6-75bec62e7acd.png#clientId=uce7103ff-efe1-4&from=paste&height=32&id=u2889bc9a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=63&originWidth=566&originalType=binary&ratio=1&size=5861&status=done&style=none&taskId=u61e1fe1e-3bb8-42bc-a63d-c32e308ae9a&width=283)<br />datetime属性取值是一个时间，可以省略不写。datetime属性中的时间是提供给搜索引擎看的，而time标签内的时间是提供给用户看的，两者内容可以一样也可以不一样。
<a name="HNOm7"></a>
### progress 
用progress元素以进度条的形式来显示某一个任务的完成度，如上传文件、下载文件等。<br />max属性表示最大值，value属性表示当前值。progress元素默认最小值也是0。max和value必须是0或正数，并且max值必须大于等于value值。
<a name="oJVlP"></a>
### meter
用进度条的形式来显示数据所占的比例。  
<a name="vScJT"></a>
### figure和figcaption 
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628247862170-80ffb0ba-a293-4a0c-8329-65482401bd21.png#clientId=uce7103ff-efe1-4&from=paste&height=262&id=ub46a55b3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=523&originWidth=867&originalType=binary&ratio=1&size=57279&status=done&style=none&taskId=u561b0a5b-0073-4a16-8d6e-2c0e2f0fd42&width=433.5)
<a name="WpqUO"></a>
### fieldset和legend
使用fieldset元素来给表单元素进行分组。其中，legend元素用于定义某一组表单的标题<br />使用fieldset和legend有两个作用：增强表单的语义；定义fieldset元素的disabled属性来禁用整个组中的表单元素。
<a name="uEcEp"></a>
##  改良后的元素
<a name="JIOUv"></a>
### a
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628249205605-2a6680da-70f5-4e18-b6b2-e8726bcc48fd.png#clientId=uce7103ff-efe1-4&from=paste&height=66&id=ue098041f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=131&originWidth=636&originalType=binary&ratio=1&size=28870&status=done&style=none&taskId=uc069acb6-7cb8-468d-952a-0a4ad779d86&width=318)<br />download属性用于为文件取一个新的文件名。如果download属性值省略，则表示使用旧的文件名。
<a name="vL9tG"></a>
### ol
reversed属性，用于设置列表顺序为降序显示。
<a name="UkhHf"></a>
### script元素
cript元素新增了两个属性：defer和async。这两个属性的作用都是加快页面的加载速度，两者区别如下。<br />▶ defer属性用于异步加载外部JavaScript文件，当异步加载完成后，该外部JavaScript文件不会立即执行，而是等到整个HTML文档加载完成才会执行。<br />▶ async属性用于异步加载外部JavaScript文件，当异步加载完成后，该外部JavaScript文件会立即执行，即使整个HTML文档还没有加载完成。defer和async都是异步加载的，两者区别在于，异步加载外部JavaScript文件完成后何时执行。从上面也可以看出，defer属性相对于async属性来说，更符合大多数开发场景对脚本加载执行的要求。
<a name="rq4fE"></a>
## ​<br />
