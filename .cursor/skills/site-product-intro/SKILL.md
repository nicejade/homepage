---
name: site-product-intro
description: >-
  Use when the user shares a product or website URL to add to the 倾城之链
  catalog in src/configs, e.g. 产品介绍, 介绍这个网站, 加到配置, 180 字.
---

# 站点产品介绍

用户给出一个产品网址时，打开页面，写一条约 180 个汉字的简体中文介绍，写入 `src/configs/` 里对应分类文件的 `list`。条目形状以 `src/configs/aiagent.ts` 为准。

介绍必须来自该页面上能读到的事实。页面打不开、正文是空壳、或看不出产品是什么时，停下来说明，不要凭域名或记忆编造。

## 条目

字段顺序与 `aiagent.ts` 一致。`desc` 写成一行单引号字符串。

```ts
{
  title: '产品名 | 一句中文定位',
  link: 'https://example.com/',
  desc: '约 180 个汉字的介绍'
}
```

- `title`：`产品名 | 中文定位`。定位取自官网标题或副标题，一句话，不重复 `desc`。
- `link`：用户给的规范网址。去掉末尾斜杠以外的跟踪参数；不要写 `?ref=niceshare.site`（卡片组件会自己加）。
- `desc`：简体中文，四句，按这个顺序写——它是什么；解决什么问题、怎么做；一到两个页面上写明的具体能力；适合谁、用完能做什么。产品名和通用缩写保留英文。口号用中文引号 “”。
- `stars`：只有用户给出 1–5 时才写，放在 `link` 和 `desc` 之间。
- `declining`：只有用户说明该产品已不宜推荐时才写 `declining: true`。

汉字只计 `[\u4e00-\u9fff]`。英文、数字、标点不算。目标 **180**，允许 **160–200**。保存前用下面的命令计数，超出范围就改 `desc` 再计，通过后再写入。

```bash
python3 -c 'import re,sys; print(len(re.findall(r"[\u4e00-\u9fff]", sys.stdin.read())))'
```

## 放入哪个文件

用户点名了分类标题或文件名时，用那个文件。否则按下表选唯一最贴切的一项。两项同样贴切时，先问用户，不要写入。

| 文件 | 分类 | 放入 |
| --- | --- | --- |
| `aiagent.ts` | 智能代理 | Agent、MCP、多代理框架、Agent Skills |
| `aitools.ts` | 人工智能 | 模型实验室、模型托管、LLM API |
| `chatbot.ts` | 智能问答 | 对话产品 |
| `coding.ts` | 编码开发 | AI 编程、编辑器、格式化 |
| `search.ts` | 智能搜索 | AI 搜索 |
| `front-end.ts` | 前端开发 | UI 框架、打包与包管理 |
| `back-end.ts` | 后台开发 | 运行时、数据库、服务端框架 |
| `document.ts` | 文档构建 | 文档站生成器 |
| `webDevTools.ts` | 网站优化 | SEO、监控、PWA |
| `terminal.ts` | 终端工具 | CLI、Shell、Git |
| `softwares.ts` | 常用软件 | 桌面与本地应用 |
| `services.ts` | 在线服务 | 在线工具、图标、图片与 PDF |
| `cloudservices.ts` | 云上服务 | 托管、云、代码托管 |
| `payment.ts` | 支付服务 | 支付与跨境收付 |
| `social.ts` | 社交资讯 | 社交网络 |
| `entertain.ts` | 休闲娱乐 | 视频、音乐、影视 |
| `learning.ts` | 技能学习 | 课程、路线图、语言学习 |

`projects.ts`（个人作品）和 `selfhosted.ts`（部署服务）只收作者自己的项目。第三方产品不要放进去。`homepage.ts` 没有被 `src/configs/index.ts` 引入，除非用户点名该文件，否则不要写。不要新建配置文件，也不要改 `index.ts`。

## 步骤

1. 打开用户给的链接，读完产品自身的介绍（标题、副标题、功能、适用对象）。
2. 在 `src/configs/*.ts` 里按主机名和路径查找同一链接（忽略末尾 `/`）。已存在则只更新该条的 `title` 和 `desc`，保留原有 `stars` 与 `declining`。不存在则插入目标文件 `list` 的第一项，原有条目原样下移。
3. 缩进、引号、逗号与该文件现有条目一致。`desc` 里不要出现单引号 `'`。
4. 写入后重新计数，并再搜一次链接，确认只有一条。
5. 不要提交。回复里给出文件路径、分类名、`title`、汉字数，以及最终 `desc`。
