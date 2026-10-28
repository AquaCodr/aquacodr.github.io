## 下载

官网地址：[pi官网](pi.dev)

下载
```npm
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

## 首次使用配置

终端选择任意文件夹地址，输入：
```
pi
```

配置模型：
```
/login
```

切换模型：
```
/model
```
或者：
`control`+`L`

切换模型思考强度：
```
/thinking
```
或者：
`shift`+`tab`

输入框换行：
`shift`+`回车`
或者：
`control`+`g` 打开临时记事本编辑提示词

最下面状态栏介绍：
$\uparrow$ 15k:
	含义：整个多轮对话(session)的输入token
	新开session，清空上下文窗口：`/new`
$\downarrow$ 11k:
	含义：整个对话输出的token
R17k:
	含义：cache read, 命中缓存的token数
CH94.8%:
	含义：cache hit rate，最近一次请求的缓存命中率
$0.437:
	含义：这次对话的预估成本
4.6%/1.0M:
	含义：现在占用了模型4.6%的上下文窗口
auto:
	含义：上下文压缩机制为自动压缩，上下文达到阈值时pi会自动使用一次上下文压缩

图片粘贴：
`control`+`v`

选中文件：
`@`+`目录/文件名`

如果agent正在跑，想要加提示词：
直接追加指令，会显示Steering(引导)

如果不想直接打断，可以排队：
`option`+`回车`，会显示follow-up
如果想修改队列中的提示词：
`option`+$\uparrow$

> [!note] 一次性非交互模式
> ```
> pi -p "查找下今天青岛天气，在桌面写一个《天气.txt》文件"
> ```

## 会话管理

从最近的一次session继续对话：
```
pi -c
```

挑选一个session进行对话：
```
pi -r
```

对话树：
```
/tree
```
可以基于某一个状态给对话创建分支

>[!warning] 注意
> 树只能回退对话历史，不能回退代码

想