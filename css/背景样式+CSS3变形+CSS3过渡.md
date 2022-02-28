<a name="nhOYW"></a>
# 背景样式
<a name="HmES0"></a>
## 背景大小：background-size
background-size属性取值有两种：一种是长度值，如px、em、百分比等；另一种是使用关键字<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631534482366-a09da06c-4c84-4389-9ffc-ea8901bfd576.png#clientId=u37a0b1c1-9c13-4&from=paste&height=91&id=u088bd57f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=182&originWidth=1318&originalType=binary&ratio=1&size=114585&status=done&style=none&taskId=u06d44e18-744c-4b96-a6eb-d2304c07283&width=659)<br />width和height这两个属性只能用来定义img标签图片的大小，而不能用于控制背景图片的大小。
<a name="z1KGl"></a>
## 背景位置：background-origin
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631534781891-887effbe-c3a3-4ee9-8378-263f41aac0a3.png#clientId=u37a0b1c1-9c13-4&from=paste&height=34&id=u4c3c2cbd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=67&originWidth=396&originalType=binary&ratio=1&size=5670&status=done&style=none&taskId=u4fdc92ea-36c1-485f-8b1a-4947828e735&width=198)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631534804217-08a15a33-e677-4225-b8d9-395ef0c5dadb.png#clientId=u37a0b1c1-9c13-4&from=paste&height=128&id=ub9e441a9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=256&originWidth=1443&originalType=binary&ratio=1&size=108505&status=done&style=none&taskId=u3c919366-96bc-46f7-86a9-171196c7e36&width=721.5)<br />background-origin往往都是配合background-position来使用的，其中background-origin定义background-position相对于什么位置来定位。
<a name="T3SpT"></a>
## 背景剪切：background-clip
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631535131419-138551d5-0200-4f71-ad7b-fc7c6f1cdd5a.png#clientId=u37a0b1c1-9c13-4&from=paste&height=122&id=ucb002615&margin=%5Bobject%20Object%5D&name=image.png&originHeight=244&originWidth=1499&originalType=binary&ratio=1&size=103982&status=done&style=none&taskId=u88652a9f-7a34-4307-b3aa-6ba3aa1b31c&width=749.5)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631535869131-47eb00bf-92d2-4b3e-ad50-18e18499d2c0.png#clientId=u37a0b1c1-9c13-4&from=paste&height=42&id=u2e164fc8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=83&originWidth=369&originalType=binary&ratio=1&size=7547&status=done&style=none&taskId=u1ec838a7-3c35-4ca9-a558-5d52977bb1b&width=184.5)
<a name="CoFxW"></a>
# CSS3变形——transform
变形（transform）、过渡（transition）、动画（animation）
<a name="s2Pge"></a>
## 平移：translate()
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631536196513-2f737060-3bff-46c2-8b44-b28365ed5900.png#clientId=u37a0b1c1-9c13-4&from=paste&height=110&id=u76ac0f85&margin=%5Bobject%20Object%5D&name=image.png&originHeight=220&originWidth=904&originalType=binary&ratio=1&size=35817&status=done&style=none&taskId=u43fbb86f-2e92-4a5d-9497-ed2cea9e4b2&width=452)
<a name="otKR1"></a>
## 缩放：scale()
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631536598912-e9a0c36a-4fe1-4f0a-ac1c-7752a7fa5595.png#clientId=u37a0b1c1-9c13-4&from=paste&height=81&id=u2e61c2d4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=161&originWidth=852&originalType=binary&ratio=1&size=33251&status=done&style=none&taskId=ubce3f71b-c1bb-41d9-a930-e6febc39ec6&width=426)<br />当x或y取值为0~1时，元素进行缩小；当x或y取值大于1时，元素进行放大。
<a name="eLrKZ"></a>
## 倾斜：skew()
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631537448274-f13d521c-1eea-4683-86ae-ec7d96de10b4.png#clientId=u37a0b1c1-9c13-4&from=paste&height=78&id=u6786fd75&margin=%5Bobject%20Object%5D&name=image.png&originHeight=155&originWidth=877&originalType=binary&ratio=1&size=33143&status=done&style=none&taskId=u609d713d-7834-4168-912e-5b2a726f460&width=438.5)<br />参数x表示元素在x轴方向的倾斜度数，单位为deg（即degree的缩写）。如果度数为正，则表示元素沿x轴方向逆时针倾斜；如果度数为负，则表示元素沿x轴方向顺时针倾斜。参数y表示元素在y轴方向的倾斜度数，单位为deg。如果度数为正，则表示元素沿y轴方向顺时针倾斜；如果度数为负，则表示元素沿y轴方向逆时针倾斜。
<a name="dtwWi"></a>
## 旋转：rotate()
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631538068502-2bde2b3c-2e14-4d39-abd9-e9955cbed48b.png#clientId=u37a0b1c1-9c13-4&from=paste&height=35&id=u9e7ed118&margin=%5Bobject%20Object%5D&name=image.png&originHeight=70&originWidth=435&originalType=binary&ratio=1&size=4884&status=done&style=none&taskId=u181565ac-f9e4-4d1d-a312-b1a30841cfb&width=217.5)<br />指定的角度定义了旋转的量度。若角度为正，则顺时针方向旋转，否则逆时针方向旋转。旋转180°也被称为点反射。
<a name="Kwtq7"></a>
## 中心原点：transform-origin
任何元素都有一个中心原点。默认情况下，元素的中心原点位于x轴和y轴的50%处。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631539348319-baf561a2-bd59-4611-bf88-48f746a55bb8.png#clientId=u37a0b1c1-9c13-4&from=paste&height=32&id=u8635fc68&margin=%5Bobject%20Object%5D&name=image.png&originHeight=63&originWidth=412&originalType=binary&ratio=1&size=5062&status=done&style=none&taskId=u703c1d92-9620-4079-a25b-e64fabfb81c&width=206)<br />transform-origin属性取值有两种：一种是“长度值”，另一种是“关键字”。当取值为长度值时，单位可以为px、em和百分比等。当取值为关键字时，transform-origin属性取值跟background-position属性取值是相似的<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631539664455-1456df84-bdc8-402f-a170-b169e1211bef.png#clientId=u37a0b1c1-9c13-4&from=paste&height=197&id=u527b2d1a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=305&originWidth=718&originalType=binary&ratio=1&size=67545&status=done&style=none&taskId=ub6952906-2fea-4655-bb04-c25e40f3d27&width=464)
<a name="wLP4Z"></a>
# CSS3过渡——transition
可以使用transition属性将元素的某一个属性从“一个属性值”在指定的时间内平滑地过渡到“另一个属性值”，从而实现动画效果。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631623151152-2717c507-eb25-41bd-bbc1-fbf278624d63.png#clientId=u8974d928-d7e8-4&from=paste&height=33&id=u92e53267&margin=%5Bobject%20Object%5D&name=image.png&originHeight=65&originWidth=812&originalType=binary&ratio=1&size=11660&status=done&style=none&taskId=uda649656-15ab-4cbe-83cd-0eb61a6638a&width=406)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631623478025-dded6be0-fb87-4781-bc06-148dd048bc56.png#clientId=u8974d928-d7e8-4&from=paste&height=157&id=uee45f4ae&margin=%5Bobject%20Object%5D&name=image.png&originHeight=314&originWidth=1331&originalType=binary&ratio=1&size=154168&status=done&style=none&taskId=u6bb85b71-fc12-441c-8ce5-271a134b293&width=665.5)<br />transition-property属性取值是“CSS属性”。transition-property取值为all，可以使用transition属性同时对多个CSS属性来实现过渡效果。<br />​

transition-duration属性取值是一个时间，单位为秒（s），可以取小数。<br />transition-timing-function属性取值共有5种<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631623680080-b6ec6854-d572-4c1c-9c34-0d6fd85ea4e7.png#clientId=u8974d928-d7e8-4&from=paste&height=403&id=uebfe1e62&margin=%5Bobject%20Object%5D&name=image.png&originHeight=806&originWidth=778&originalType=binary&ratio=1&size=109745&status=done&style=none&taskId=u96666c06-73b1-4290-8518-d4432cbbd35&width=389)<br />transition-delay属性取值是一个时间，单位为秒（s），可以是小数，默认值为0s。当transition-delay取值为0s时，这个参数可以省略。<br />​

transition属性分别写在“普通状态”和“悬浮状态”（即:hover{}）内<br />移入时效果两者没有区别，但是如果把transition属性写在普通状态内，移出时会有过渡效果；如果把transition属性写在悬浮状态内，移出时没有过渡效果。<br />​

​

CSS变形（transform）呈现的仅仅是一个“结果”，而CSS过渡（transition）呈现的是一个“过程”。
<a name="tDhxK"></a>
# CSS3动画——animation
对于transition属性来说，它只能将元素的某一个属性从一个属性值过渡到另一个属性值。<br />对于animation属性来说，它可以将元素的某一个属性从第1个属性值过渡到第2个属性值，然后还可以继续过渡到第3个属性值，以此类推。<br />transition属性（即CSS3过渡）只能实现一次性的动画效果，而animation属性（即CSS3动画）可以实现连续性的动画效果。<br />animation:动画名称 持续时间 动画方式 延迟时间 动画次数 动画方向;<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631877098857-320610cc-0ad3-4a2d-bd15-5fa2aaa4e027.png#clientId=ude0ad0d2-435c-4&from=paste&height=221&id=u2661ff26&margin=%5Bobject%20Object%5D&name=image.png&originHeight=441&originWidth=1483&originalType=binary&ratio=1&size=215903&status=done&style=none&taskId=u57b87edb-fa73-407a-a12a-0b5d333053d&width=741.5)<br />▶ 定义动画▶ 调用动画<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631877288312-69e6065b-b4d1-4f75-a1ec-320f8c4f2414.png#clientId=ude0ad0d2-435c-4&from=paste&height=321&id=ue3c0dab2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=641&originWidth=548&originalType=binary&ratio=1&size=52191&status=done&style=none&taskId=u447f96b1-c205-4212-bc35-f0f75ff810c&width=274)
<a name="noPCU"></a>
## @keyframes
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631877382088-9f996b55-e666-4e42-8da8-4fa4d653d490.png#clientId=ude0ad0d2-435c-4&from=paste&height=157&id=ufeea12be&margin=%5Bobject%20Object%5D&name=image.png&originHeight=313&originWidth=417&originalType=binary&ratio=1&size=13115&status=done&style=none&taskId=u8cc38387-6c34-4f6b-b828-e59c1068f82&width=208.5)![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631877537422-1b7970fa-c8d6-4fa0-b1a6-89b0c82b39c4.png#clientId=ude0ad0d2-435c-4&from=paste&height=343&id=ub9c2ac96&margin=%5Bobject%20Object%5D&name=image.png&originHeight=685&originWidth=439&originalType=binary&ratio=1&size=38340&status=done&style=none&taskId=u50559732-15d2-413c-ae6e-2524e6f498b&width=219.5)<br />0%表示动画的开始，100%表示动画的结束，0%和100%是必须的。
<a name="d7e11"></a>
## 动画名称：animation-name
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631877879985-865d151e-4a7a-4aa8-936b-512222848f0e.png#clientId=ude0ad0d2-435c-4&from=paste&height=35&id=u2c882fce&margin=%5Bobject%20Object%5D&name=image.png&originHeight=70&originWidth=409&originalType=binary&ratio=1&size=5497&status=done&style=none&taskId=ud8f2ec87-d6b6-4aea-88d5-7b880bb96f1&width=204.5)<br />animation-name调用的动画名需要和@keyframes规则定义的动画名完全一致（区分大小写<br />​<br />
<a name="kWkMg"></a>
## 持续时间：animation-duration
animation-duration属性取值是一个时间，单位为秒（s），可以是小数。
<a name="HK4RI"></a>
## 动画方式：animation-timing-function
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631879203411-61bdba49-524a-45ff-8a62-1dfa68b5656a.png#clientId=ude0ad0d2-435c-4&from=paste&height=35&id=ud4706023&margin=%5Bobject%20Object%5D&name=image.png&originHeight=69&originWidth=556&originalType=binary&ratio=1&size=6573&status=done&style=none&taskId=u291a1163-d6ca-4b84-923c-162df35bf42&width=278)<br />animation-timing-function属性取值共有5种，这跟CSS3过渡的transition-timing-function是一样的<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631879228794-a81dd804-569d-4a60-bf54-0248f9a6faac.png#clientId=ude0ad0d2-435c-4&from=paste&height=404&id=u081fd904&margin=%5Bobject%20Object%5D&name=image.png&originHeight=807&originWidth=794&originalType=binary&ratio=1&size=108624&status=done&style=none&taskId=u410499a4-2714-4761-af20-b78a907f9d0&width=397)
<a name="g5ThZ"></a>
## 延迟时间：animation-delay
animation-delay:时间;<br />animation-delay属性取值是一个时间，单位为秒（s），可以为小数，其中默认值为0s。
<a name="XZswS"></a>
## 播放次数：animation-iteration-count
播放次数：animation-iteration-count<br />animation-iteration-count属性取值有两种：一种是“正整数”，另一种是“infinite”。当取值为n（正整数）时，表示动画播放n次；当取值为infinite时，表示动画播放无数次，也就是循环播放。
<a name="eb6ZY"></a>
## 播放方向：animation-direction
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631879796693-82472b84-9e31-49ab-a2a0-b19636fd1916.png#clientId=ude0ad0d2-435c-4&from=paste&height=40&id=u8132193d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=79&originWidth=539&originalType=binary&ratio=1&size=5871&status=done&style=none&taskId=u976aaead-6f78-4b1d-9a44-2fd48932a6f&width=269.5)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631879853855-9bba5f56-4847-4082-a840-f5d3cf7c0233.png#clientId=ude0ad0d2-435c-4&from=paste&height=129&id=uf6ba0977&margin=%5Bobject%20Object%5D&name=image.png&originHeight=258&originWidth=1617&originalType=binary&ratio=1&size=125606&status=done&style=none&taskId=u6cd802bf-8e18-4bea-8a98-37d0603748a&width=808.5)
<a name="xoq9m"></a>
## 播放状态：animation-play-state
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631879919867-a79b7c44-9a76-445f-915e-ffe8807d5b70.png#clientId=ude0ad0d2-435c-4&from=paste&height=39&id=uf42d2795&margin=%5Bobject%20Object%5D&name=image.png&originHeight=77&originWidth=495&originalType=binary&ratio=1&size=6225&status=done&style=none&taskId=ubd39b81d-5a4b-4c6f-813d-f16ed17f05d&width=247.5)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1631879997552-6f76489a-d1a7-43ea-92a7-af65b50b4b56.png#clientId=ude0ad0d2-435c-4&from=paste&height=97&id=u32f6ca9c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=194&originWidth=1378&originalType=binary&ratio=1&size=48972&status=done&style=none&taskId=ucf431634-a863-4e58-a8bb-e935ca2c90f&width=689)<br />

