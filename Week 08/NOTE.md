学习笔记
### 浏览器工作原理
URL→HTTP→HTML→Parse→DOM→CSS computing→Layout→render→Bitmap(图片)

### 状态机
状态机不是实际机器设备，而是一个数学模型，通常体现为一个状态转换图
有限状态机: 每一个状态就是一个独立的机器，每个状态接受的输入是一致的，用函数表示状态机就应该是纯函数。

State 状态: 一个状态机至少要包含两个状态。
Event 事件: 事件就是执行某个操作的触发条件或者口令。
Action 动作: 事件发生以后要执行动作。编程的时候，一个 Action 一般就对应一个函数。
Transition 变换: 从一个状态变化为另一个状态。

Moore状态机: 每一个机器都有确定的下一个状态
Mealy状态机: 根据输入决定下一个状态

js实现状态机
一系列返回状态函数的状态函数

状态机在编程中的应用：正则表达式 网络协议等

### 网络模型

HTTP: 应用层 表示层 会话层   require('http')
TCP: 传输层                require('net')
internet: 网络
4G/5G/wifi: 数据链路 物理层

### 实现http

实现思路: 使用基于传输层的net模块，使用Mealy状态机来处理字符数据
get: 插件的封装可以先从使用上入手

1、发送请求 
http Content-Type 属性必须有值
实例化request 传输参数做处理
调用send() 连接服务端写入处理好的参数 监听数据返回 返回promise

2、解析状态和header
使用状态机解析状态和header

3、解析body
使用状态机解析body

4、返回解析数据
将处理好的数据 resolve 出去