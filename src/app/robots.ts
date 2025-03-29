import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const hostname = process.env.PROXY_HOST || '';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${hostname}/sitemap.xml`,
  }
}