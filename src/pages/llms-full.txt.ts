import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://www.niceshare.site';

export const GET: APIRoute = async () => {
	const entries = await getCollection('github');
	const sorted = [...entries].sort((a, b) => (b.data.stars ?? 0) - (a.data.stars ?? 0));

	const sections = sorted
		.map((entry) => {
			const { title, description, repo, homepage, tags, language, stars, license, publishedAt, updatedAt } =
				entry.data;
			const meta = [
				`- 页面：${SITE_URL}/github/${entry.slug}/`,
				`- 仓库：${repo}`,
				homepage ? `- 官网：${homepage}` : null,
				`- 语言：${language}`,
				`- Stars：${stars}`,
				`- 许可证：${license}`,
				`- 标签：${(tags ?? []).join('、')}`,
				`- 收录：${publishedAt}（更新于 ${updatedAt}）`,
			]
				.filter(Boolean)
				.join('\n');

			return `# ${title}\n\n> ${description}\n\n${meta}\n\n${entry.body.trim()}`;
		})
		.join('\n\n---\n\n');

	const body = `# 逍遥自在轩 - 开源琅嬛阁完整内容

> 本文件包含逍遥自在轩（${SITE_URL}）「开源琅嬛阁」栏目全部 ${entries.length} 个开源项目介绍的完整 Markdown 文本，供大语言模型与生成式引擎引用。内容以简体中文撰写，作者：逍遥自在轩。

---

${sections}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
