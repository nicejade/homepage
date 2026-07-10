import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://www.niceshare.site';
const SITE_TITLE = '逍遥自在轩';
const SITE_DESCRIPTION =
	'逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页，用于汇集生活和工作中频繁使用的工具、软件和服务；并通过「开源琅嬛阁」栏目持续收录与点评高质量 GitHub 开源项目。';

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function toRfc822(date: string): string {
	return new Date(`${date}T00:00:00+08:00`).toUTCString();
}

export const GET: APIRoute = async () => {
	const entries = await getCollection('github');
	const sorted = [...entries].sort((a, b) =>
		(b.data.publishedAt ?? '').localeCompare(a.data.publishedAt ?? ''),
	);

	const latestDate = sorted[0]?.data.updatedAt ?? sorted[0]?.data.publishedAt;
	const lastBuildDate = latestDate ? toRfc822(latestDate) : new Date().toUTCString();

	const items = sorted
		.map((entry) => {
			const url = `${SITE_URL}/github/${entry.slug}/`;
			const categories = (entry.data.tags ?? [])
				.map((tag) => `      <category>${escapeXml(tag)}</category>`)
				.join('\n');
			return `    <item>
      <title>${escapeXml(`${entry.data.title} - 开源琅嬛阁`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(entry.data.description)}</description>
      <pubDate>${toRfc822(entry.data.publishedAt)}</pubDate>
      <dc:creator>${SITE_TITLE}</dc:creator>
${categories}
    </item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_TITLE} | 个人主页</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}/</link>
      <width>512</width>
      <height>512</height>
    </image>
    <copyright>Copyright 2024-present ${SITE_TITLE}. All rights reserved.</copyright>
    <category>Technology</category>
    <category>Open Source</category>
    <category>Tools</category>
${items}
  </channel>
</rss>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
	});
};
