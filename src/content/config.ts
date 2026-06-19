import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const githubCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		repo: z.string().url().startsWith('https://github.com/'),
		homepage: z.string().url().optional(),
		tags: z.array(z.string()).length(3),
		language: z.string(),
		stars: z.number().int().nonnegative(),
		license: z.string(),
		featured: z.boolean(),
		publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		curationReason: z.string(),
	}),
});

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
	github: githubCollection,
};
