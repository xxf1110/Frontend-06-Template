学习笔记

### reg.exec(str)

如果匹配成功，exec() 方法返回一个数组（包含额外的属性 index 和 input ），并更新正则表达式对象的 lastIndex 属性。完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应正则表达式内捕获括号里匹配成功的文本。
如果匹配失败，exec() 方法返回 null，并将 lastIndex 重置为 0 。

note: 不要把正则表达式字面量（或者RegExp构造器）放在 while 条件表达式里。由于每次迭代时 lastIndex 的属性都被重置，如果匹配，将会造成一个死循环。要确保使用了'g'标记来进行全局的匹配，否则会造成死循环。

get: exec()与string.matchAll(reg) 类似, matchAll 返回的一个迭代器
get: match() 使用g标志时，返回匹配成功文本；不使用g时，返回匹配的文本和捕获组

### LL AST | 四则运算

#### 词法分析
 
通过正则匹配拿到对应的词，通过generator函数拿到数组结构此法分析结果

#### 语法分析

Expression: 结合 AdditveExpression 和 Expression
AdditveExpression: 结合 AdditveExpression 和 MultiplicaliveExpression 
MultiplicaliveExpression: 结合 MultiplicaliveExpression 和 Number
