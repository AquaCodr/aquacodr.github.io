全文参考这个[B站视频]( https://www.bilibili.com/video/BV139bD6gEa8/?share_source=copy_web&vd_source=c2f1619c1cf7dfa94c6f0b72bb020bd2)
## 下载

官网地址：[pi官网](https://pi.dev)


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

添加新的session:
```
/new # 打开新对话，清空模型上下文
```

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

想回退代码可以结合git使用

```shell
/clone # 克隆分支
/fork # 截断并克隆分支
/compact # 手动触发上下文压缩

```

## 扩展插件

[offcial-extensions](https://pi.dev/packages)

安装命令可以直接从官网复制，卸载直接将install->uninstall
	这些都是全局的安装和卸载

项目级安装——在安装命令后接`-l`

[pi-web-access](https://pi.dev/packages/pi-web-access)

[pi-subagents](https://pi.dev/packages/pi-subagents)
调用插件自带技能：
```bash
/skill:pi-subagents
```
可以在并行启动subagents进行开发

[pi-mcp-adapter](https://pi.dev/packages/pi-mcp-adapter)
可以接入高德地图之类的MCP服务

[pi-btw](https://pi.dev/packages/pi-btw?name=btw)
btw-旁路对话(不打扰AI工作的问答)
```bash
/btw <questions> # enter a subsession to chat
^C # exit the subsession
```

[@plannotator/pi-extension](https://pi.dev/packages/@plannotator/pi-extension?name=plan)
plan mode
```bash
/plan-mode # before dive into a work,AI first give a plan for adapt
/plan-mode # type again to shut the plan mode
```

[@narumitw/pi-goal](https://pi.dev/packages/@narumitw/pi-goal?name=goal)
goal mode
	give AI a goal that it always go for
```bash
/goal <the final goal>
```

[@quintinshaw/pi-dynamic-workflows](https://pi.dev/packages/@quintinshaw/pi-dynamic-workflows?name=workflow)
dynamic workflows
	自动调度子代理协同工作，在单词对话里面实现大规模长时间的任务执行
```bash
workflows <task>
/workflows # 查看后台工作，查看每个子代理的工作情况
```

[pi-wechat-assistant](https://pi.dev/packages/pi-wechat-assistant?name=wechat)
```bash
/wechat login # 扫码配对
/wechat start # 实现手机对话
```

## skills

skills存储目录：
	项目目录/.agents/skills/skill-name1/SKILL.md
全局目录：
	~/.agents/skills/skill-name1/SKILL.md

github:
[playwright-cli](https://github.com/microsoft/playwright-cli)
	让AI获得浏览器自动化能力
```bash
打开google，搜索并进入 pi agent 的官网，让我能看到执行过程
```

skillhub:
[skillhub官网](https://skillhub.cn)

[markdown-converter](https://skillhub.cn/skills/zcwl/markdown-converter)
	把任意格式的文档转换为markdown格式


## Pi-web
[pi-web](https://github.com/agegr/pi-web)
	pi网页版适配

```bash
@agegr/pi-web@latest # 打开pi-web
```

## 记忆系统

> 怎么给Pi增加跨 session 的记忆？

在项目根目录创建`AGENTS.md`

全局目录：
```bash
~/.pi/agent/AGENTS.md # 对所有目录生效
~/.pi/agent/APPEND_SYSTEM.md # 追加系统提示词，拥有高优先级的提示词
```

## 安全约束

1. 使用虚拟机，如windows的wsl, Hyper v, docker

2. 插件法  [@gotgenes/pi-permission-system](https://pi.dev/packages/@gotgenes/pi-permission-system?name=permission), 执行敏感操作前弹出审批窗口

## 编写属于自己的插件

Pi 自己也具有编写插件的功能：
> 编写一个插件，我需要你先根据 IP 查询我的地理坐标，然后根据我的地理坐标查询我当地的天气，最后把天气展示到对话窗口上面。

> 给自己开发一个插件，这个插件禁止 AI 后续编辑、读取 .env 文件，如果 AI 尝试操作，直接阻止并提示“这是受保护文件”。

> 给你自己写一个安全插件。
> 
> 当你准备执行 rm 命令时，
> 先弹出确认框询问我是否运行执行。

## 架构与SDK

参见Pi github [这里](https://github.com/earendil-works/pi/tree/main/packages)
这是一个教科书式的agent架构，想做agent开发可以学习










