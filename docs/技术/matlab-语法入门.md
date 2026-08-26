### 界面

界面包括指令窗、当前目录、工作路径、命令窗口、工作区、历史命令记录
### 指令

| 命令名       | 作用                 |
| --------- | ------------------ |
| ↑/↓       | 向前向后调回已输入的命令       |
| clc       | 清除命令窗口中的内容         |
| clear     | 从工作空间清除所有的变量       |
| load      | 导入磁盘里的变量文件到工作空间    |
| help<函数名> | 在命令窗口显示MATLAB函数的帮助 |

**常用快捷键**：
- Ctrl+C (终止运行)
- Ctrl+R (批量批注)
- Ctrl+T (批量取消注释)
**文件格式**：
- 程序文件.m
- 数据文件.mat
- 图形文件.fig
### MATLAB 计算
#### 矩阵和数组的生成
- 显式元素列表输入： `e = [第一行；第二行；第三行 ]`
- from:step:to 方式：`e=1:0.5:2`
- rand (m, n): 产生均匀分布的随机矩阵    m：行数， n：列数
- randn (m, n)：产生正态分布的随机矩阵
#### 矩阵和数组的索引
1. 矩阵表示用方括号
	- 同行不同列用逗号或空格间隔
	- 同列不同行用分号间隔
2. 矩阵索引用圆括号
	- 索引第 i 行 j 列元素：a ( i , j )
	- 索引某一整行用冒号：a ( i . : )
#### 矩阵取值、赋值
1. 取值：A ( 14 )，A ( 4 , 3 )
2. 赋值：A ( 14 ) = 100
3. 范围取值：A [8:13]，A[ 2 :3 . : ] ;取整个第二、三行
4. 范围赋值：A[8 : 13] = 100，A [2 : 3 , 2:4 ] = [99 , 99 . 99 ; 88, 88 ,88 ] ;给第二到三行的第二到四列赋值
#### 矩阵寻值
> 学会find函数的用法

1. 返回下标
	- int = find (A == 6);
	- int = find (A>=6 & A < 15);
	- int = find (A < 6 | A > 15);
2. 返回行号与列号
	- [ row , col ] = find ( A== 6);
	- [ row , col ] = find (A >= 6 & A < 15 );
	- [ row , col ] = find (A < 6 | A > 15);
#### 常用矩阵函数
- ones %创建特定大小的一矩阵
- zeros %创建特定大小的零矩阵
- rand %创建特定大小的随机矩阵
- size %计算矩阵大小
- length %计算向量长度
- find %寻找符合搜索条件的矩阵元素位置
#### 矩阵计算

这里将 MATLAB 的**矩阵运算（线性代数）**与**数组运算（逐元素）**的核心差异浓缩为一张速查表：

|**运算功能**|**矩阵运算 (Matrix)**|**数组运算 (Element-wise)**|**关键区别简述**|
|---|---|---|---|
|**乘法**|`*`|`.*`|`*` 是矩阵内积；`.*` 是对应位置相乘|
|**右除**|`/`|`./`|`/` 相当于乘逆矩阵；`./` 是对应位置相除|
|**左除**|`\`|`.\`|`\` 常用于解线性方程组；`.\` 是后者除以前者|
|**乘方**|`^`|`.^`|`^` 要求是方阵(A*A)；`.^` 是每个元素各自求幂|
|**转置**|`'`|`.'`|`'` 会对复数取共轭；`.'` 仅交换行列|

#### 基本数学运算符

| **数学表达**      | **matlab表达**     | **数学表达**                    | **matlab表达**              |        |
| ------------- | ---------------- | --------------------------- | ------------------------- | ------ |
| $a+b$         | a+b              | $i$                         | i                         |        |
| $a-b$         | a-b              | $4 \cdot 10^3$              | 4e3 or 4*10^3             |        |
| $ab$          | a*b              | $3-4i$                      | 3-4_i or 3-4_j            |        |
| $3xy$         | 3_x_y            | $\sin x, \arctan x, \cdots$ | sin(x), atan(x), $\cdots$ |        |
| $\frac{a}{b}$ | a/b or a\b       | $e^x$                       | exp(x)                    |        |
| $a^b$         | a^b              | $\ln x$                     | log(x)                    |        |
| $\sqrt{x}$    | sqrt(x) or x^0.5 | $\log x$                    | log10(x)                  |        |
| $\pi$         | pi               | $\\                         | x$                        | abs(x) |
| $e$           | exp(1)           |                             |                           |        |

#### 基本数学函数：

|**函数**|**说明**|**函数**|**说明**|
|---|---|---|---|
|abs(x)|绝对值|median(x)|中位数|
|sin(x)|正弦值|sinh(x)|双曲正弦值|
|exp(x)|自然指数|asin(x)|反正弦值|
|log(x)|自然对数|inv(x)|逆矩阵|
|sqrt(x)|平方根|rank(x)|秩|
|min(x)|最小值|round(x)|四舍五入至整数|
|max(x)|最大值|floor(x)|向下取整|
|mean(x)|平均值|ceil(x)|向上取整|
|sort(x)|排序|transpose(x) = x'|转置|
|std(x)|标准差|||

### MATLAB 画图
#### 常用信号表示
- 指数信号:K\*exp(a\*t)  
- 正弦信号:K\*sin(w\*t+phi)和K\*cos(w\*t+phi)  
- 复指数信号:K\*exp((a+i\*b)\*t)  
- 矩形脉冲信号:rectpuls(t,width)  
- 周期矩形脉冲信号:square(t,DUTY),函数  的默认周期为2\*pi,其中DUTY参数表示信号的占  空比,即在一个周期脉冲宽度(正值部分)与脉冲  周期的比值。占空比默认为0.5。  
- 单位阶跃信号:y=(t>=0)
#### 图形窗口创建
- figure( n ) %创建新的画图窗口
- subplot (n , m , k) %使n $\times$  m幅子图中的第k幅成为当前图
- hold on ; hold off %同一窗口多次叠绘
#### 绘图函数
plot %连贯的图
stem %离散的图
#### 图片自定义设置
- 图题:title()  
-  坐标轴名:xlabel();ylabel()  
- 图例:legend()  
- 添加图中文字注释:text(x,y,s) 在坐标x,y处添加语句s 
- 设置坐标轴长度:axis([x1 x2 y1 y2]);xlim();ylim()
### MATLAB 编程
#### for-end结构

- for循环

格式：
 ```
  for variable=expression 
	statement
 end
 ```
 
例子：
```
A=zeros(1,1000);
for i=1:length(A)  
	A(i)=sqrt(i);  
end
```


- for循环嵌套

格式：
```
for variable1=expression1  
	statement1  
	for variable2=expression2  
		statement2  
	end  
end
```

例子：
```
A=zeros(30,50);  
for i=1:size(A,1)  
	for j=1:size(A,2)  
		A(i,j)=i^2+j^2;  
	end  
end
```
#### while-end结构

格式：
```
while condition  
	statement 
end
```

例子：
```
num=0;  
target=10;  
while abs(target‐num^2) > 0.01  
	num=num+0.001;  
end
```
#### if-else-end结构

- 只有if

格式：
```
if condition  
	statement  
end
```

例子：
```
Signal=rand(1,100)*1000; %随机信号  
Signal_new=Signal;  
for i=1:length(Signal)  
	if Signal (i)<100  
		Signal_new(i)=Signal(i)*10;  
	end  
end
```

- if-elseif-else

格式：
```
If condition1  
	statement 1  
elseif condition2  
	statement 2  
else  
	statement 3  
end
```

例子：
```
Signal=rand(1,100)*1000;  
Signal_new=Signal;  
for i=1:length(Signal)  
	if Signal(i)<100  
		Signal_new(i)=Signal(i)*10;  
	elseif Signal(i)>=100 & Signal(i)<500  
		Signal_new(i)=Signal(i)*2;  
	end  
end
```