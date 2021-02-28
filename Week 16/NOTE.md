#### 动画帧
一般帧率60 <br>
使用定时器实现可能会产生积压 <br>
现代浏览器 requestAnimationFrame() <br>

#### 建立Timeline和Animation
Animation 接收动画的主体对象和其他相应的参数 <br>
receive方法接收已变化的时间值 <br>

Timeline 初始化一个Set 用于存储animation  <br>
start() 启动时间线 <br>
add() 添加动画 <br>

#### 暂停 重启
pause: 取消requestAnimationFrame 记录开始暂停的时间 <br>
resume: 计算暂停了多长时间 执行this[TICK] 方法 并在该方法中减去暂停了的时长 <br>

#### 完善动画
deolay: 处理动画延迟 t 减掉 延迟时间 <br>
timingFunc处理时间曲线: 利用贝塞尔曲线来模拟时间曲线 <br>
reset: 重置时间线 <br>

#### 时间线状态管理
添加状态 用于管理时间线处在哪个时期

#### 手势基础
允许识别误差 容错范围 10px <br>

start --> (移动距离<=10px) --> tap(end) <br>
start --> (移动距离>=10px) --> pan start --> move -->（速度>？）--> flick <br>
start --> (移动距离>=10px) --> pan start --> move --> pan end <br>
start -->(0.5s)--> press start --> press end <br>
start -->(0.5s)--> (移动距离>=10px) --> pan start <br>


#### 鼠标操作
对mouse事件和touch事件进行抽象，使其更关注处理逻辑，不用担心是mouse还是touch事件 <br>

移动端touchmove事件一定是在同一个元素上touchstart后触发 没有办法越过touchstart触发touchmove <br>

touch 事件下的changedTouches touchlist 每个Touch 对象代表一个触点; 每个触点都由其位置，大小，形状，压力大小，和目标 element 描述<br>

touch 事件结束正常情况下是touchend, 非正常的情况会触发touchcancel，比如：alert() <brs>

#### 手势逻辑
对手势基础三条线实现，press 通过setTimeout实现 <br>

#### 鼠标事件
全局变量isListeningMouse 控制事件只监听一次 <br>
contexts 记录每次start 产生的context 用于记录手势相关信息 <br>
处理鼠标事件: <br>
button 记录当前触发的鼠标按键序号 0 1 2 3 4 <br>
buttons 鼠标事件触发按下的按键值(掩码设计) 1 2 4 8 16 或者为其中几个之和， 注意： 右键为 2，中键为 4 与button顺序相反 <br>

思路： 当鼠标down时，创建context 存起来，在move时取对应的context值使用，up时 清除context <br>
存context 使用map, 方便取值 key 取值将 1 << button 转为 1 2 4 8 16 <br>

#### 派发事件
dispatchEvent(event) <br>


#### flick事件
浏览器实现差异，取500ms以内的点计算速度, 根据分析测试速度大于1.5 可以认为触发flick <br>


#### 封装
结构: new Listener(element, new Recognizer(new Dispatcher(element))) <br>
Listener: 监听element的mouse touch事件 <br>
Recognizer: 处理抽象事件 press tap pan flick <br>
Dispatcher: 派发事件 <br>

### 应用手势动画
将封装好的手势库、时间线与组件结合。起用css transition <br>

note: 添加一个end事件，避免按住没有移动不形成pan事件放开无法再移动 <br>

### 添加属性
添加属性和事件监听 <br>

