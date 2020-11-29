学习笔记
### Proxy
Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

note: 注意浏览器兼容，平常的业务代码中不建议使用，一般都是用于底层库
get: 如何在js中拿到一个函数执行所引用的对象？
    可以通过Proxy 代理相应的对象，函数引用代理对象，通过执行这个函数就可以在get中拿到引用的相应属性，从而间接的拿到引用

### 响应式对象
通过代理对象实现

对代理对象添加监听，当输入框的值变化时去修改代理对象，监听到代理对象的值变化通知相应使用的地方作更改。

### range操作
range 表示一个包含节点与文本节点的一部分的文档片段

##### range 属性(只读)：
range.endContainer 返回包含 Range 终点的节点
range.endOffset  表示 Range 终点在 endContainer 中的位置的数字
range.startOffset 表示 Range 起点在 startContainer 中的位置的数字
其他属性...

##### 定位方法：
Range.setStart()    设置 Range 的起点
Range.setEnd()  设置 Range 的终点
Range.selectNode()  使 Range 包含某个节点及其内容
其他...

##### 编辑方法： 获取节点，改变内容
Range.cloneContents() 返回一个包含 Range 中所有节点的文档片段
Range.deleteContents() 从文档中移除 Range 包含的内容。
Range.insertNode() 在 Range 的起点处插入一个节点。
其他...
