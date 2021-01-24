学习笔记

## 重学HTML
### DTD 字符实体
 (&nbsp; &#161;) &lt; &gt; &quot; &amp;

### namespace
XML MathML SVG

### 语义标签
main article section aside header footer 等
html(https://developer.mozilla.org/zh-CN/docs/Web/HTML)


### 语法
Element: <tagname></tagname>
Text: text
Comment: <!-- Comment -->
Documenttype: <!DOCTYPE html>  
CDATA: <![DATA[ ]]>

### DOM API
#### DOM操作
导航类操作:
parentNode parentElement
childNodes children
firstChild  firstElementChlid
lastChild lastElementChild
nextSibling nextElementSibling 
previousSibling previousElementSibling <br>

parentNode parentElement 一定是同一个node <br>

编辑类：appendChild insertBefore removeChild replaceChild <br>

高级操作：
compareDocumentPosition: 比较两个节点的关系
contains: 检查一个节点是否包含另外一个节点
isEqualNode: 检查两个节点是否完全相同
isSameNode: 检查两个节点对否为同一个节点  js ===
cloneNode: 复制一个节点，参数true,连同子节点一起深拷贝

#### 事件
冒泡：更符合人类理解事件，由内向外
捕获：计算机处理事件的过程, 由外向内

第三个参数useCapture 默认false 即冒泡
移动端浏览器把options passive 设置为true，如果需要阻止默认行为，需要把passive 改为false

#### Range
精细操作dom 范围控制 range 不能跳 是一个连续的范围

range api举例：
插入node: insertNode <br>
选择范围: setStart setEnd setStartBefore setStartAfter setEndBefore setEndAfter selectNodeContents selectNode <br>
截取node: extractContents <br>

#### CSSOM 
获取所有的样式表 可以进行操作: document.styleSheets <br>
计算后的css: window.getComputedStyle(ele, pseudoElt) <br>
可选的pseudoElt: ::after, ::before, ::marker <br>

#### CSSOM view
window: 
window.innserWidth window.innerHeight
window.devicePixelRatio
window.screen: width height

scroll: 
element             window
scrollTop              scrollX
scrollLeft             scrollY
scrollBy(x, y)         scrollBy(x, y)
scroll(x, y)           scroll(x, y)
scrollTo(x, y)
scrollIntiView
scrollHeiht

layout: getClientRects() getBoundingClientRect()

#### 浏览器其他API
根据兴趣、工作需要选择几个深入学习




