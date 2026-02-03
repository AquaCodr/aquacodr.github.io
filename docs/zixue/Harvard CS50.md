# Harvard CS50自学笔记

## 资源汇总

[中文精翻课程](https://www.bilibili.com/video/BV1Rm421V7zw)

[英文原声课程](https://www.bilibili.com/video/BV1Hr421F7VC)

[cs50x | CS自学社区](https://www.learncs.site/docs/curriculum-resource/cs50x)

[scratch](https://scratch.mit.edu) 是由麻省理工学院开发的可视化编程语言

[VS Code 线上网站](https://code.cs50.io)

[C语言简化手册](https://manual.cs50.io)

这是哈佛学院CS50 2023年春季课程

## Lecture0 Scratch 2026.1.23

### Notes

> what ultimately matters in this course is not so much where you end up relative to your classmates but where you end up relative to yourself when you began

bit

1 byte = 8 bits

kilobytes(KB),megabytes(MB),gigabytes(GB)

Unary,Binary,Decimal 

ASCII——数字和字母间的映射关系

![ASCII 映射](https://www.learncs.site/assets/images/cs50Week0Slide93-77f49b95d596756f4fe9752473e06e50.png)

RGB(Blue,Green,Red)

pixel

abstruction/algorithm

[scratch](https://scratch.mit.edu) 是由麻省理工学院开发的可视化编程语言

### Problem Set

[作业：我制作的scratch小游戏](https://scratch.mit.edu/projects/1270436180)

## Lecture1 C 2026.1.25

### Notes

source code / machine code

terminal(CLI,command line interface/命令行界面)

GUI，graphical user interface/图形用户界面

[C语言简化手册](https://manual.cs50.io)

Control-C可以中断正在运行的程序

常用命令：

ls——list的缩写，功能：列出当前文件夹中的所有文件

mv——move的缩写，格式：`mv` +`old name`+`new name`,功能：移动或重命名

cd——change direction的缩写，功能：切换目录/文件夹

cp——copy，功能：复制文件

mkdir——make a directory，功能：创建文件夹

rm——remove，功能：删除（使用这个命令要小心）

rmdir——remove directory，功能：删除目录

const int n=4; #声明n为常量，防止错误编辑n值犯错

> correctness is important , design is important , style is important

> 注释是某种程度上的Pseudocode(伪代码)

int 一般使用32bit,算入正负数，最高表示到2^{32-1}-1

long int 一般使用64bit，最高到2^{64-1}-1

truncation/截断     `int` $\to $ ​ ​`float`

type casting  数据类型转换

floating-point imprecision/浮点不精确 `float` $\to$ `double` 

> now with all of this computational ability and code comes a responsibility to actually write correct code.

### Problem Set

```c title="hello.c"
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    string name = get_string("What's your name? ");
    printf("hello,%s\n", name);
}
```

```c title="mario-less.c"
#include <cs50.h>
#include <stdio.h>

int get_n(void);
void build_bricks(int size);

int main(void)
{
    // 写入n值
    int n = get_n();

    // 输出砖块
    build_bricks(n);
}


int get_n(void)
{
    int n;
    do
    {
        n = get_int("Height: ");
    }
    while(n<1);
    return n;
}

void build_bricks(int size)
{
    for(int i = 0;i < size;i++)
    {
        int k = size - i - 1;
        while(k > 0)
        {
            printf(" ");
            k--;
         }

        for(int j = 0;j < i+1;j++)
        {
            printf("#");
        }
        printf("\n");
    }
}
```

```c title="mario-more.c"
#include <cs50.h>
#include <stdio.h>

int get_n(void);
void build_bricks(int size);

int main(void)
{
    // Read n from keyboard
    int n = get_n();

    // Build the bricks
    build_bricks(n);
}



int get_n(void)
{
    int height;
    do
    {
    height = get_int("Height: ");
    }
    while(height < 1 ||height > 8);
    return height;
}

void build_bricks(int size)
{
    for(int i = 0;i < size;i++)
    {
        int k = size - 1 - i;
        while(k>0)
        {
            printf(" ");
            k--;
        }
        for(int j = 0;j <= i;j++)
        {
            printf("#");
        }
        printf("  ");
        for(int h = 0;h <= i;h++)
        {
            printf("#");
        }
        printf("\n");
    }
}
```

```c title="credit.c"
#include <cs50.h>
#include <stdio.h>
void judge(long int number);

int main()
{
    // 写入卡号n
    long int n = get_long("Number: ");

    // 判断卡号是否合法,合法时发卡机构
    judge(n);
}


void judge(long int number)
{
    // 计算Luhn数
    long int keep = number;
    long int card = number;
    int count = 0;
    while(number / 10 != 0)
    {
        int k = number / 10 % 10;
        if((0 <= k * 2) && (k*2<=9))
        {
            count = count + 2 * k;
        }
        else
        {
            count = count + (2 * k) % 10 + (2 * k) / 10;
        }
        number = number / 100;
    }
    while(keep != 0)
    {
        count = count + keep % 10;
        keep = keep / 100;
    }
    // 提取卡首位
    int m;
    while(card != 0)
    {
        m = card;
        card = card / 10;
    }

    // 判断合法性及银行
    if(count % 10 != 0)
    {
        printf("INVALID\n");
    }
    else if(m == 4)
    {
        printf("VISA\n");
    }
    else if(m == 3)
    {
        printf("AMEX\n");
    }
    else if(m == 5 )
    {
        printf("MASTERCARD\n");
    }
}

```

### Practice Problem

```c title="half.c"
// Calculate your half of a restaurant bill
// Data types, operations, type casting, return value

#include <cs50.h>
#include <stdio.h>

float half(float bill, float tax, int tip);

int main(void)
{
    float bill_amount = get_float("Bill before tax and tip: ");
    float tax_percent = get_float("Sale Tax Percent: ");
    int tip_percent = get_int("Tip percent: ");

    printf("You will owe $%.2f each!\n", half(bill_amount, tax_percent, tip_percent));
}

// TODO: Complete the function
float half(float bill, float tax, int tip)
{
    float n = (bill * (1.00 + tax/100.00) * (1.00 + (float)tip / 100.00)) / 2.00;
    return n;
}
```

```c title="prime.c"
#include <cs50.h>
#include <stdio.h>

bool prime(int number);

int main(void)
{
    int min;
    do
    {
        min = get_int("Minimum: ");
    }
    while (min < 1);

    int max;
    do
    {
        max = get_int("Maximum: ");
    }
    while (min >= max);

    for (int i = min; i <= max; i++)
    {
        if (prime(i))
        {
            printf("%i\n", i);
        }
    }
}

bool prime(int number)
{
    // TODO
    int flag = 0;

    for(int x = 2;x < number;x++)
    {
        if(number % x == 0)
        {
            flag = 1;
        }
    }

    if(flag == 1 || number == 1)
    {
        return (false);
    }
    else
    {
        return (true);
    }
}
```

### Lab

```c title="population.c"
#include <cs50.h>
#include <stdio.h>

int get_size(void);
int get_end(int start);
int calculate_years(int x_1,int x_2);

int main(void)
{
    // TODO: Prompt for start size
    int n = get_size();

    // TODO: Prompt for end size
    int m = get_end(n);
    
    // TODO: Calculate number of years until we reach threshold
    int x = calculate_years(n,m);
    
    // TODO: Print number of years
    printf("Years: %i\n", x);
}


int get_size(void)
{
    int size;
    do
    {
        size = get_int("Start size: ");
    }
    while(size < 9);
    return size;
}

int get_end(int start)
{
    int end;
    do
    {
        end = get_int("End size: ");
    }
    while(end < start);
    return end;
}


int calculate_years(int x_1,int x_2)
{
    int flag = 0;

    while(x_1 < x_2)
    {
        x_1 = x_1 + x_1 / 3 - x_1 / 4;
        flag++;
    }
    return flag;
}
```
## Lecture2 Arrays 2026.1.28

### Notes

preprocessing

compiling

assembling

linking

 How to debug?

- printf
- debugger     `debug50` +`./文件名` 
- rubber duck  talk to someone/something to find the bug

> don't solve problems by staring at your screen endlessly for minutes,for hours. At that point. It's time to walk away, time to talk to the duck if you've already exhausted some of those tools.

types: `bool` (1 byte) , `int` (4 bytes) ,`long` (8 bytes) ,`float` (4bytes) ,`double` (8 bytes) ,`char` (1 byte) ,`string` (? bytes)

`string` 本身是一个数组

` int main(void)`

`int main(int argc, string argv[])`

argv——字符串数组（存入命令行）， argc——记录命令行长度

### Problem Set
