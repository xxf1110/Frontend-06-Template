学习笔记
## 组件化

### 概念
state properties attribute methods inherit Event Children Config lifecycle

### state
组件的状态

### config 
一次配置，不可再更改

### attribute
强调描述性

### property
强调从属关系

### Event
传递信息

### Children
content children: 传进来多少子组件就渲染多少组件
template children: 以子组件为模板渲染，数量看数据规模

### lifecycle
created    
mount: mount <--> unmount
render/updete
distory


### jsx
在经过转转换后jsx直接调用的是一个createElement函数 默认是React.createElemnt 函数参数第一个传入的是type(html类型或者是一个类) 第二个是属性 后面经过createElemnt()调用的子元素
