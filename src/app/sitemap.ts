import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const hostname = process.env.PROXY_HOST || '';
  return [
    {
      url: `${hostname}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${hostname}/categories`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    }
  ];
}
