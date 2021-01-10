学习笔记
### CSS 研究
#### @rule
@charset: https://www.w3.org/TR/css-syntax-3/
@import: https://www.w3.org/TR/css-cascade-4/
@media: https://www.w3.org/TR/css3-conditional/
@page: https://www.w3.org/TR/css-page-3/
@counter-style: https://www.w3.org/TR/css-counter-styles-3/
@keyframes: https://www.w3.org/TR/css-animations-1/
@fontface: https://www.w3.org/TR/css-fonts-3/
@supports: https://www.w3.org/TR/css3-conditional/
@namespace: https://www.w3.org/TR/css-namespaces-3/
重要：@media @keyframes @fontface

#### rule

##### selector
分组(selector_group): ,
组合选择器(combinator_selector): > <space> + ~ 
基本选择器(basic_selector): type * . # []
伪类选择器(pseudo): : ::

##### key
properties:
css 属性

variables:
定义: --变量名 
使用: var(--变量名)
无效属性会覆盖，变量可以作为key，也可以作为值

##### value
值类型:
函数：calc()、min()、max()
数字：number
长度：length

#### 选择器语法
简单选择器：type * .class #id [attr=value] :hover ::before
复合选择器：
<简单选择器> <简单选择器> <简单选择器>
\* 或者div 必须写在最前面 
复杂选择器：
<复合选择器> <sp> <复合选择器>
<复合选择器> > <复合选择器>
<复合选择器> + <复合选择器>
<复合选择器> ~ <复合选择器>
<复合选择器> || <复合选择器>

#### 选择器优先级
选取四元组[], 一个进制数N, 优先级S <br>
四元组第一位为inline, 第二位为id, 第三位为class、属性、伪类, 第四位为type、伪元素。
s = [0] * N^3 + [1] * N^2 + [2] * N^1 + [3] * N^0

note: 
忽略*选择器 <br>
:is() :not():has() 是由参数决定, 在其选择器列表参数中被最具体的复杂选择器的特异性所取代。<br>
:nth-child() or :nth-last-child() 是伪类本身作为一个伪类选择器 外加 最具体的特异性的特异性复杂选择在其选择器列表参数（如果有）。<br>
:where（）伪类的特异性被替换为零 <br>

#### 伪类
链接行为：:any-link :link : visited :hover :active :focus :target
树行为：:empty :nth-child() :first-child
逻辑型：:not() :where() :has()


#### 伪元素
产生盒类型：::before ::after 
包裹型(已经产生盒)： ::first-line ::first-letter
first-letter 支持float display


