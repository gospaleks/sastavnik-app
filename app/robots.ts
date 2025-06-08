import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL;

  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          '/api/',
          '/admin/',
          '/sastavi/[essayId]/izmena',
          '/_next/',
          '/public/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
