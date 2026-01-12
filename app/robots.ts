// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/', // ✅ اسمح بكل الصفحات
      disallow: [
        '/api/',      // API routes
        '/_next/',    // Next.js internal
        '/admin/',    // Admin pages
        '/*/not-found', // صفحات 404
        '/not-found'
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_BASE_URL,
  }
}