学习笔记
### 语言分类
非形式语言：
中文、英文
形式语言：
大部分编程语言

乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
0- 型文法（无限制文法或短语结构文法）包括所有的文法。
1- 型文法（上下文相关文法）生成上下文相关语言。
2- 型文法（上下文无关文法）生成上下文无关语言。
3- 型文法（正规文法）生成正则语言。

谱系是下上级包含关系，比如：1属于0型，3属于1，2型

### 产生式(BNF)
产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的
一系列符合文法规则（Backus-Naur Form，BNF）的语句

巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法
描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。

用尖括号括起来的名称表示语法结构名

语法结构分为：
基础终结符
复合非终结符

point: 终结符是指最终在代码中出现的字符

引号和中间字符表示终结符
可以有括号
*号表示重复多次
|表示或
+表示至少有一次

举个栗子：
四则运算
1 + 2 * 3
终结符
number + -
非终结符
addtiveExpression
multiplicativeExpression

其他产生式：ABNF EBNF等

### 现代语言的分类
形式语言-用途：
数据描述语言：JSON HTMl XAML CSS SQL
编程语言：C C++ C# ruby go java javascript python Haskell Lisp T-SQL Clojure

形式语言表达方式：
声明型语言：JSON HTMl XAML CSS SQL Haskell Lisp T-SQL Clojure 
命令型语言：C C++ C# ruby go java javascript python 

### 编程语言的性质
图灵完备性
命令型-图灵机

静态和动态语言： https://www.cnblogs.com/raind/p/8551791.html
强类型： 无隐式转换
弱类型： 有隐式转换
协变与逆变： https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html
类型系统：
    动态类型系统只在用户机器能找到(比如：C)
    静态类型系统只在编码时保留(比如: js)

泛型：
    协变与逆变


### JavaScript Types
#### Boolean
真值假值
#### Null
有值但是为空 typeof null === 'object'
#### Undefined
undefined 未定义
js里面undefined 是全局变量 并不是关键字 所以获取undefined 可以时候用void关键字 void 0

#### Symbol
符号 每一个都不一样 用于Object属性名
#### BigInt
任意大的整数 表示大于 2^53 - 1 的整数
#### Number
IEEE 754 双精度浮点类型64为 
符号占1位 精度位52 11个指数位 
0. .1  都是合法的  0. toString() 0..toString() 破坏语法结构就不会报错 
#### String
字节 码点 编码
语法：单、双引号、反引号

#### js对象 Object
唯一标识 状态 行为
状态描述对象 状态的改变即为行为 
在设计对象状态和行为时，要遵循行为改变状态的原则

#### 对象分类
宿主对象(host Objects): 由js宿主环境所提供的对象，它的行为完全由宿主环境所决定
    比如： window
内置对象(Built-in Objects): 由js语言本身所提供的对象
    固有对象：由标准制定，随着js运行时创建而被创建的实例
    原生对象：可以由用户通过Array、RegExp等内置的构造器或者特殊语法所创建的对象
    普通对象： 由{}、Object、class关键字定义类创建的兑现 能够被原型继承


原生对象分类：
基础类型：Boolean、String、Number、Symbol、Object
数据结构：Array、Map、Set、Date、RegExp、Promise、Function、Proxy、Math
错误对象：Error、TypeError等
二进制：ArrayBuffer、SharedArrayBuffer、DataView
类型数组对象：Float32Array、Float64Array、Int8Array、Int16Array、Int32Array、UInt8Array、UInt16Array、UInt32Array

特殊行为的对象
Array：Array 的 length 属性根据最大的下标自动发生变化。
Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
bind 后的 function：跟原来的函数相关联



