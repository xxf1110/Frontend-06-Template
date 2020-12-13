学习笔记

### JavaScript
Atom
Experssion
Statement
Structure
Program/Module

### 运算符和表达式

运算符： + - * / ()

js用产生式描述优先级
以下优先级由高到低，但是优先级高低需要结合具体的语法结构，并不是绝对的

Member：
a.b 
a[b] 
foo\`string\`
super.b
super['b']
new.target
new Foo()  new Foo() 优先级比new Foo高

Reference:
Object  delete
Key     assgin    
Object[Key] 取出的是一个运行时引用类型，不是一个标准类型

Call:
foo()
super()
foo()['b']
foo().b
foo()\`abc\`

Left Handside & Right Handlside
a.b = c 

以下后面都是Right Handlside
Update:
a ++ 
a -- 
-- a
++ a

Unary:
delete a.b
void 0
typeof a
+a
-a
~ a
! a 
await a

Exponental: **
大部分结构都是左结合，除了**(** 是右结合)

Multiplicative: * / %  （* / 要求一定值Number类型）

Addtive: + -
  
Shift: << >> >>>

RelationShip: < > >= <= instanceof in

Equality: == != === !== 

Bitwise: & ^ |

Logical: && || (短路原则)

Conditional: ? :

### Statement
简单语句 复合语句 声明

Completion Record
[\[type]] normal break continue return throw
[\[value]] 基本类型
[\[target]] label

简单语句: 不会容纳其他语句，比如：表达式语句、throw、break、return、debugger、empty

复合语句: block{}、if、switch、iteration、with、labelled、try
注意：try 并不是block语句，而是由try本身实现，并且后面的花括号不能省略。(但使用let const class 声明时作用域是块，块外部无法访问到)

声明: var function / const let class
所有的声明都会有预处理，不管写在哪里，并且会提升到函数级别。 
var function 预处理后可以在声明的位置之前访问，但var是并没有赋值的；而let const class是不允许的，如果在声明之前访问会报错。

### 宏任务 微任务

#### 宏任务
传给js引擎执行的整个代码

#### 微任务
promise.then 产生一个微任务
同一个宏任务里resolve的promise.then会被执行掉
### 事件循环
等待 ==> 获取代码/事件 ==> 执行 ==> 等待
事件循环其实已经跳出了js，并不是属于js引擎或者js本身的范畴。

### 函数调用
函数由声明函数的词法环境和函数组成，所以每个函数都会形成闭包

函数调用栈
栈顶为正在执行的函数，每个栈里有执行上下文和代码，代码所需要的所有信息能都在当前执行上下文中的访问到
执行上下文也会形成一个执行上下文栈

js引擎的内置对象都会被放到Realm中，不同的Realm实例之间是完全独立的
Realm 提供沙箱功能，允许隔离代码，防止那些被隔离的代码拿到全局对象。（iframe 也是沙箱）
Realm内置对象 <a href='https://tc39.es/ecma262/#sec-well-known-intrinsic-objects'>sec-well-known-intrinsic-objects</a>   
