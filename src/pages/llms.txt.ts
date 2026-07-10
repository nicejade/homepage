import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://www.niceshare.site';

export const GET: APIRoute = async () => {
	const entries = await getCollection('github');
	const sorted = [...entries].sort((a, b) => (b.data.stars ?? 0) - (a.data.stars ?? 0));

	const projectLines = sorted
		.map(
			(entry) =>
				`- [${entry.data.title}](${SITE_URL}/github/${entry.slug}/): ${entry.data.description}`,
		)
		.join('\n');

	const body = `# 逍遥自在轩（NiceShare）

> 逍遥自在轩是一个中文个人主页与精选工具导航站点，汇集生活和工作中频繁使用的工具、软件和服务，涵盖 AI 工具、编程开发、文档资源、在线服务等分类；并设有「开源琅嬛阁」栏目，为 ${entries.length} 个高质量 GitHub 开源项目提供中文深度介绍（核心特性、替代方案对比、适用人群与上手指南）。

站点基于 Astro + Starlight + Svelte + TailwindCSS 构建，全站静态生成，内容以简体中文撰写。

## 核心页面

- [首页 - 精选工具与资源导航](${SITE_URL}/): 按分类（AI 工具、编程开发、在线服务、云服务、学习资源等）汇集的精选站点与工具导航
- [开源琅嬛阁 - GitHub 开源项目导航](${SITE_URL}/github/): 收录 AI 编程、本地模型、工作流自动化与开发者生产力方向的高质量开源项目
- [关于逍遥自在轩](${SITE_URL}/about): 项目诞生初衷、技术栈、项目结构、使用方法和部署指南

## 开源项目介绍（开源琅嬛阁）

每个页面包含项目介绍、核心特性、对用户价值、与替代方案对比、适应人群与如何使用等章节。

${projectLines}

## 其他资源

- [完整内容文本版](${SITE_URL}/llms-full.txt): 全部开源项目介绍的完整 Markdown 文本
- [RSS Feed](${SITE_URL}/feed.xml): 最新收录内容订阅
- [Sitemap](${SITE_URL}/sitemap-index.xml)
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
