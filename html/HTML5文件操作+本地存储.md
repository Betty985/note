<a name="y8MlR"></a>
# 文件操作
<a name="EeLZY"></a>
## multiple和accept属性
文件上传input元素有两个重要属性：multiple和accept。<br />multiple属性表示“是否选择多个文件”。为元素添加multiple属性后，就可以选择多个文件了。当选择成功后，按钮右侧不再显示文件的名称，而是显示文件的总量。当将鼠标指针移到上面时，就会显示全部上传文件的详细列表<br />​

使用“opacity: 0;”来隐藏原来的表单元素<br />使用了opacity:0;之后，表单还占据着原来的位置，点击原来的位置，还可以继续使用表单的功能<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628506208150-3968d0f6-5701-4c2f-8b0b-b241b5a8c912.png#clientId=u6af390c1-757b-4&from=paste&height=73&id=ub2c5ca5c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=146&originWidth=725&originalType=binary&ratio=1&size=12076&status=done&style=none&taskId=u758865b1-09da-4e58-b4b7-832787fda35&width=362.5)<br />accept属性用于设置文件的过滤类型（MIME类型）<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628505781792-8273570e-f47f-40b8-96bc-003b024fc74a.png#clientId=u6af390c1-757b-4&from=paste&height=398&id=uc2c49c95&margin=%5Bobject%20Object%5D&name=image.png&originHeight=796&originWidth=984&originalType=binary&ratio=1&size=198839&status=done&style=none&taskId=u2deca137-7fbd-4061-af58-a217093d14c&width=492)<br />如果想要同时设置多个过滤类型，可以使用英文逗号（,）隔开
<a name="bEhPR"></a>
## file对象
在文件上传元素中，将会产生一个FileList对象，它是一个类数组对象，表示所有文件的集合。其中，每一个文件就是一个File对象。想要获取某一个文件对象（即File对象），需要获取FileList对象，然后再通过数组下标形式来获取。<br />file对象属性![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628507242206-40a9a751-6850-4956-baab-312c8c1253c5.png#clientId=u6af390c1-757b-4&from=paste&height=150&id=u9f1d2ccc&margin=%5Bobject%20Object%5D&name=image.png&originHeight=300&originWidth=1172&originalType=binary&ratio=1&size=85531&status=done&style=none&taskId=u8160dbb7-1721-4186-a97a-967f92c9589&width=586)
<a name="ZrZl9"></a>
## FileReader对象
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628586953618-20de4d61-679a-4c32-9e8e-2d6c0ad6d655.png#clientId=uda142a80-faf1-4&from=paste&height=186&id=u2d0e7ca0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=372&originWidth=1148&originalType=binary&ratio=1&size=172281&status=done&style=none&taskId=u8529c32a-bf8c-4a6e-bb86-a5802000e14&width=574)<br />readAsText()方法有两个参数：第1个参数为File对象，第2个参数为文本的编码方式，默认值为“utf-8”。<br />readAsBinaryString()方法将文件读取为二进制字符串，后端可以通过这段字符串来存储文件。<br />abort()方法可以用来中止读取操作<br />FileReader对象提供了6个事件，用于检测文件的读取状态<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628587116260-8c85d721-0315-49fd-9e94-7856b0cfba56.png#clientId=uda142a80-faf1-4&from=paste&height=216&id=u63a6e615&margin=%5Bobject%20Object%5D&name=image.png&originHeight=431&originWidth=1223&originalType=binary&ratio=1&size=111565&status=done&style=none&taskId=u4e7b03e9-f840-4b39-abf3-632e4a48944&width=611.5)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628587130255-5e51d5ad-e0ed-4cff-b7db-6ecb67b12fe6.png#clientId=uda142a80-faf1-4&from=paste&height=136&id=u04942a9a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=271&originWidth=602&originalType=binary&ratio=1&size=27594&status=done&style=none&taskId=u6435a683-a002-4b28-8a84-92b2687ded4&width=301)<br />开始读取文件，无论成功或失败，实例的result属性（即this.result）都会被填充。如果读取成功，则this.result的值就是当前文件的内容；如果读取失败，则this.result的值为null。<br />(没有实现可能是因为this.result和onchange方法重载
<a name="PTjeI"></a>
## Blob对象
代表原始二进制数据<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1628595571688-a0c7f2b3-746b-4e09-b7b5-51fd9427841a.png#clientId=u6319eb92-0934-4&from=paste&height=36&id=uf122149c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=72&originWidth=683&originalType=binary&ratio=1&size=7690&status=done&style=none&taskId=u070501d9-1368-448d-bd9b-9e4f6855096&width=341.5)<br />Blob()构造函数有两个参数，这两个参数都是可选参数，而并非必选参数。<br />第1个参数dataArray是一个数组，数组中的元素可以是以下类型的对象。▶ String对象（即字符串）▶ Blob对象（即其他Blob对象）▶ ArrayBuffer对象▶ ArrayBufferView对象<br />第2个参数type是一个字符串，表示Blob对象的MIME类型
<a name="Mddrv"></a>
# 本地存储
<a name="lQ8CT"></a>
## cookie
在浏览器端存储用户的某些数据<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629112643284-f35fbcbd-0973-46f1-a502-6b3a4e0ff1e9.png#clientId=u93993086-88b0-4&from=paste&height=284&id=uab5d6bd6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=568&originWidth=956&originalType=binary&ratio=1&size=124802&status=done&style=none&taskId=u935cdffc-e2f0-4df0-be48-517f58ca5cd&width=478)<br />为了解决Cookie这种方式的限制，HTML5新增了3种全新的数据存储方式：localStorage、sessionStorage和indexedDB。其中，localStorage用于永久保存客户端的少量数据，sessionStorage用于临时保存客户端的少量数据，而indexedDB用于永久保存客户端的大量数据。
<a name="RKDYa"></a>
## localStorage
使用localStorage对象来“永久”保存客户端的少量数据。即使浏览器被关闭了，使用localStorage对象保存的数据也不会丢失，下次打开浏览器访问网站时仍然可以继续使用。对于localStorage来说，每一个域名可以保存5MB数据，现在绝大多数浏览器都已经支持localStorage<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629112915043-28e8dece-4f61-452c-adb3-a2436baf91b9.png#clientId=u93993086-88b0-4&from=paste&height=163&id=u2e333ed1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=326&originWidth=858&originalType=binary&ratio=1&size=49188&status=done&style=none&taskId=u1cb94dd8-d651-45b6-9c53-f4b26c4ec7e&width=429)
<a name="DC6nH"></a>
## sessionStorage
“暂时”保存客户端的少量数据。sessionStorage对象跟localStorage对象非常相似，两者有着完全相同的方法<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629198952904-8f1ec7cb-fb12-4b59-8366-b4dfa029c828.png#clientId=ue2d845dd-928f-4&from=paste&height=152&id=u1b3ad831&margin=%5Bobject%20Object%5D&name=image.png&originHeight=303&originWidth=836&originalType=binary&ratio=1&size=46656&status=done&style=none&taskId=u96b1e4ad-d961-4a53-8e91-e13ecd6b165&width=418)<br />sessionStorage对象跟localStorage对象也有本质上的区别：sessionStorage对象保存的是“临时数据”，用户关闭浏览器后，数据就会丢失；而localStorage对象保存的是“永久数据”，用户关闭浏览器后，数据依然存在<br />localStorage和sessionStorage都是window对象下的子对象。localStorage.getItem()其实是window.localStorage.getItem()的简写。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629199124890-3944489e-7a86-4b3e-a873-e59edff32d9c.png#clientId=ue2d845dd-928f-4&from=paste&height=323&id=u4b30f687&margin=%5Bobject%20Object%5D&name=image.png&originHeight=645&originWidth=983&originalType=binary&ratio=1&size=105976&status=done&style=none&taskId=ue48d6d40-6baf-4717-bcea-4904c1f8257&width=491.5)
<a name="Oayl3"></a>
## indexedDB
indexedDB是一种存储在客户端本地的NoSQL数据库，用于在本地存储大量数据。<br />indexedDB是一个“对象数据库”。
<a name="JCZtg"></a>
### 操作“数据库”
<a name="SWWYG"></a>
#### 创建数据库
使用indexedDB对象的open()方法来创建或者打开一个数据库。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629338841022-6c546ef5-55e4-4ef4-8ac0-556d997ceb37.png#clientId=ub385cc9c-dcab-4&from=paste&height=205&id=u8597c577&margin=%5Bobject%20Object%5D&name=image.png&originHeight=410&originWidth=908&originalType=binary&ratio=1&size=53279&status=done&style=none&taskId=u3c9c17b2-5e70-4b8d-9649-963d7dfc9e8&width=454)<br />indexedDB对象是window对象下的一个子对象。使用indexedDB对象的open()方法来创建或打开一个数据库。open()方法有两个参数：第1个参数是数据库名；第2个参数是数据库版本号。<br />如果数据库已经存在，则open()方法表示打开数据库；如果数据库不存在，则open()方法表示创建数据库。<br />window.indexedDB.open()方法返回一个请求对象，我们将其赋值给变量request。该请求对象有两个事件：onerror事件和onsuccess事件。onerror事件表示请求失败时触发的事件，onsuccess事件表示请求成功时触发的事件。<br />请求对象request除了onerror和onsuccess这两个事件外，还有一个onupgradeneeded事件，它表示版本号更新时触发的事件。对于对象仓库的创建，我们一般都是在onupgradeneeded事件中操作的。<br />​

e.target.result获取的是一个IDBDatabase对象。通过IDBDatabase对象，我们可以获取数据库的各种信息如数据库名、版本号等
<a name="vHhvQ"></a>
#### 删除数据库
使用indexedDB对象的deleteDatabase()方法来删除数据库。<br />deleteDatabase()方法有一个参数，这个参数是数据库名。跟open()方法一样，deleteDatabase()方法同样会返回一个请求对象。该请求对象也有两个事件：onerror事件和onsuccess事件。onerror事件表示请求失败所触发的事件，onsuccess事件表示请求成功所触发的事件。<br />​

创建数据库和删除数据库命令同时出现，删除不会执行？
<a name="Y7PR9"></a>
###  操作“对象仓库”
在indexedDB中，一个对象仓库就是一张表。<br />用IDBDatabase对象的createObjectStore()方法来创建一个新的对象仓库。<br />createObjectStore()方法有两个参数：第1个参数是“对象仓库名”；第2个参数用于设置对象仓库的主键。<br />主键是一个递增的数字，可以使用下面这一句代码：![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629342835383-c977c898-3acf-459c-85a2-cad47974721b.png#clientId=ub385cc9c-dcab-4&from=paste&height=61&id=u6a5161ac&margin=%5Bobject%20Object%5D&name=image.png&originHeight=121&originWidth=893&originalType=binary&ratio=1&size=16438&status=done&style=none&taskId=ubc200340-54e7-41c7-a357-1c4000d5113&width=446.5)<br />db.createObjectStore()方法返回一个ObjectStore对象。<br />ObjectStore对象的add()方法往对象仓库中添加数据。store.add()会返回一个请求对象。该请求对象也有两个事件：onerror和onsuccess。onerror表示添加数据失败时所触发的事件，onsuccess表示添加数据成功时所触发的事件。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629343025637-b3d0e6ba-c891-49cf-b977-104b0c85454d.png#clientId=ub385cc9c-dcab-4&from=paste&height=35&id=ua9a2ab2f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=69&originWidth=792&originalType=binary&ratio=1&size=13548&status=done&style=none&taskId=u26ee7ca9-f249-414e-8c89-ac33c46cd06&width=396)<br />创建IndexedBD 数据库的时候，很容易有缓存和版本的问题
<a name="m95gY"></a>
#### 增删改查
在indexedDB中，凡是涉及对象仓库的增删查改，都是使用事务来处理。事务，简单来说就是“一组操作步骤”。这组操作步骤要么全部执行，要么一步也不执行。<br />凡是对象仓库的增删查改，都是在请求对象request的onsuccess事件中操作的。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629345694226-e4547ae9-4968-4604-8875-8b2301c059b9.png#clientId=ub385cc9c-dcab-4&from=paste&height=243&id=ud6f61d7a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=486&originWidth=978&originalType=binary&ratio=1&size=79377&status=done&style=none&taskId=ub153774d-30e5-4c88-9c8f-eafc986811d&width=489)![image.png](https://cdn.nlark.com/yuque/0/2021/png/12952106/1629345708282-360360cd-5ae8-467a-8d83-31bc77cae441.png#clientId=ub385cc9c-dcab-4&from=paste&height=95&id=u4d2036d3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=190&originWidth=428&originalType=binary&ratio=1&size=10654&status=done&style=none&taskId=u292ab5b5-99a4-48a1-ab89-477bf5fbf17&width=214)<br />使用事务的add()方法来为对象仓库增加数据。<br />

