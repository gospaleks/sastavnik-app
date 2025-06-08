import { prisma } from '@/lib/prisma';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL;

  // Essays
  const essays = await prisma.essay.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    where: {
      published: true,
    },
  });
  const essaySitemap = essays.map((essay) => ({
    url: `${baseUrl}/sastavi/${essay.id}`,
    lastModified: essay.updatedAt,
    changeFrequency: 'weekly' as const,
    getPriority: 0.8,
  }));

  // Categories
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
  });
  const categorySitemap = categories.map((category) => ({
    url: `${baseUrl}/kategorije/${category.name}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Static routes
  const routes: string[] = ['/', '/o-nama', '/privatnost', '/dodaj-sastav'];
  const staticSitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // Combine all routes
  return [...essaySitemap, ...categorySitemap, ...staticSitemap];
}
