学习笔记

### 标签(Tag) 元素(Element) 盒(Box)

HTML代码中可以书写开始__Tag__，结束__Tag__ ，和自封闭_Tag___ 。<br>
一对起止_Tag___ ，表示一个_element___ 。<br>
DOM树中存储的是__element__和其它类型的节点（Node）。<br>
CSS选择器选中的是__element__ 。<br>
CSS选择器选中的_element___ ，在排版时可能产生多个__Box__ 。<br>
排版和渲染的基本单位是__Box__ 。<br>

### 盒模型
##### box-sizing
content-box: width = content
border-box: width = content + padding + border

### 正常流
收集盒和文字进行 <br>
计算盒和文字在行中的排布 <br>
计算行的排布 <br>

### IFC 行级排布
从左往右排布
top
bottom
text-top
baseline
text-bottom
line-top
line-bottom 
middle

### BFC 块级排布
从上到下排版

#### float 与 clear
float: 往一个方向挤压 特征是影响生成行盒的尺寸 高度占据范围内都会影响行盒的大小 后一个浮动元素也会受上一个浮动元素的影响 <br>
clear: 找一个干净的空间执行浮动 不阻挡挤压 相当于在新行浮动

一个父元素的子元素全部是float的话 高度会为0,为了撑开高度自适应 可以在一个block元素(微元素)上使用clear both

#### margin 折叠
只有正常流中的同一个BFC 才会产生边距折叠 折叠的边距为边距最大的那个

#### BFC 合并
##### block container: 里面有BFC 能容纳正常流的盒,里面就有BFC
block inline-block table-cell flex items grid-cell table-caption

##### block level box: 外面有BFC
block-level: block flex table grid
inline-level: inline-block inline-flex inline-table inline-grid

##### block box: 里外都有BFC

##### 设立BFC
float 
absolute
block container(such as flex items grid-cells inline-block table-cells)
overflow: visible

##### BFC 合并
能容纳正常流的盒就会产生BFC，除了一种情况： 里外都是BFC 并且overflow为visible的情况下不会设立BFC
影响：
float：不设立BFC，处于float同级的非float 元素像是不存在一样，创建BFC, 就会起作用
边距合并：不设立BFC 边距就会里外都折叠，创建BFC, 里面的BFC不会发生边距折叠


### Flex 排布
收集盒进行
计算在主轴方向的排布
计算在交叉轴方向的排布

分行：根据主轴尺寸分行 no-wrap 强行分配一行
计算主轴：
找出flex元素，主轴剩余尺寸分配给这些元素，若剩余空间为负数则等比压缩剩余元素
计算交叉轴：
根据没一行的最大元素计算行高，根据行高确定元素位置

flex 容器上的 align-items，或子元素上的 align-self，决定子元素在行内交叉轴方向排布；<br>
容器上的 align-content 决定各行在交叉轴上排布后的剩余空间如何分配

### 动画
定义 @rule 规则： @keyframes name
使用：animation: name duration timing-function delay count direction
结合百分比可以使用 transition 分段 使用不同的时间曲线
transiton: property duraion timing-function delay <br>

timing-function 来自三次贝塞尔曲线
贝塞尔曲线可以模拟多种曲线 一定可以模拟直线和抛物线

### 颜色
rgba、hsl、hsv

hsl当需要全局改颜色时 只需要统一改色相 再配合css变量使用 有很好的操作空间 主题切换啥的
### 绘制
几何图形
border
box-shadow

字体
font 
text-decoration

位图
background-image

对于复杂的几何图形可以可以使用svg 对于原生定义的属性尽量不要做定义以外的事情
