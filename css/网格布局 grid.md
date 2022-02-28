<a name="aqYuL"></a>
# 网格布局
<a name="awuFl"></a>
# 简介
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1633011779877-9c9074df-53db-4874-a1a1-d7a4632a19d6.png#clientId=u4d56b454-4af5-4&from=paste&height=228&id=u4f3ac2da&margin=%5Bobject%20Object%5D&name=image.png&originHeight=456&originWidth=873&originalType=binary&ratio=1&size=137888&status=done&style=none&taskId=ud75c0946-f81a-44ef-a5a0-ed5db90bf3d&width=436.5)<br />元素上声明 display：grid 或 display：inline-grid 来创建一个网格容器。声明 display：grid 则该容器是一个块级元素，设置成 display: inline-grid 则容器元素为行内元素<br />grid-template-columns 属性设置列宽，grid-template-rows 属性设置行高，这两个属性在 Grid 布局中尤为重要<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1633012337606-5fb1c333-d0ea-4faa-983b-4c66cb2c8753.png#clientId=u4d56b454-4af5-4&from=paste&height=165&id=u8842cd6d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=329&originWidth=571&originalType=binary&ratio=1&size=30290&status=done&style=none&taskId=udb43f6d4-575d-4220-b0fd-7a791424877&width=285.5)<br />repeat() 函数：可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。<br />**auto-fill 关键字**：表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。grid-template-columns: repeat(auto-fill, 200px) 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素<br />​

**fr 关键字**：Grid 布局还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。fr 单位代表网格容器中可用空间的一等份。grid-template-columns: 200px 1fr 2fr 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。<br />​

**minmax() 函数**：我们有时候想给网格元素一个最小和最大的尺寸，minmax() 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值。grid-template-columns: 1fr 1fr minmax(300px, 2fr) 的意思是，第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍。<br />​

**auto 关键字**：由浏览器决定长度。通过 auto 关键字，我们可以轻易实现三列或者两列布局。grid-template-columns: 100px auto 100px 表示第一第三列为 100px，中间由浏览器决定长度<br />​

grid-row-gap 属性、grid-column-gap 属性分别设置行间距和列间距。grid-gap 属性是两者的简写形式。<br />​<br />
<a name="SVz4z"></a>
## grid-template-areas 
属性用于定义区域，一个区域由一个或者多个单元格组成<br />一般这个属性跟网格元素的 grid-area 一起使用，我们在这里一起介绍。 <br />​<br />
<a name="TpIeX"></a>
## grid-auto-flow 属性
grid-auto-flow 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图英文数字的顺序 one,two,three...。这个顺序由 grid-auto-flow 属性决定，默认值是 row。。在实际应用中，我们可能想让下面长度合适的填满这个空白，这个时候可以设置 grid-auto-flow: row dense，表示尽可能填满表格。<br />grid-auto-flow: column，表示先列后行<br />​<br />
<a name="EQHUr"></a>
## justify-items 属性、align-items 属性以及 place-items 属性
justify-items 属性设置单元格内容的水平位置（左中右），align-items 属性设置单元格的垂直位置（上中下）<br />stretch：拉伸，占满单元格的整个宽度（默认值）<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1633013422695-a5712cf9-7879-4c5a-a3e2-62941105adbf.png#clientId=u4d56b454-4af5-4&from=paste&height=40&id=u4ac5640e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=79&originWidth=571&originalType=binary&ratio=1&size=7830&status=done&style=none&taskId=u5c42e5ae-13c7-477a-b9ee-0823c4248e2&width=285.5)
<a name="xmj4K"></a>
## justify-content 属性、align-content 属性以及 place-content 属性
justify-content 属性是整个内容区域在容器里面的水平位置（左中右），align-content 属性是整个内容区域的垂直位置（上中下）<br /> **justify-content**: **start** **|** **end** **|** **center** **|** **stretch** **|** **space-**around **|** **space-**between **|** **space-**evenly;   **align-content**: **start** **|** **end** **|** **center** **|** **stretch** **|** **space-**around **|** **space-**between **|** **space-**evenly;  
<a name="pEzqk"></a>
## grid-auto-columns 属性和 grid-auto-rows 属性
在讲 grid-auto-columns 属性和 grid-auto-rows 属性之前，先来看看隐式和显示网格的概念<br />**隐式和显示网格**：显式网格包含了你在 grid-template-columns 和 grid-template-rows 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列<br />假如有多余的网格（也就是上面提到的隐式网格），那么它的行高和列宽可以根据 grid-auto-columns 属性和 grid-auto-rows 属性设置。它们的写法和grid-template-columns 和 grid-template-rows 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高<br /> 
<a name="ehctc"></a>
## grid-column-start 属性、grid-column-end 属性、grid-row-start 属性以及grid-row-end 属性
可以指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线
<a name="GHMKz"></a>
## grid-area 属性
grid-area 属性指定项目放在哪一个区域
