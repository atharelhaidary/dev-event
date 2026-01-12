import type { NextConfig } from "next";

const nextConfig: NextConfig =  {
  // productionBrowserSourceMaps: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  transpilePackages: ['antd', '@ant-design', 'rc-', 'rc-table', 'rc-picker',  '@ant-design/icons'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    // إضافة هذه الإعدادات لمنع الكوكيز
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    disableStaticImages: false,
  }, 
  compress: true,
  poweredByHeader: false,
  reactCompiler: true ,
  // headers
  async headers() {
    return [
      {
        source: '/(.*)', // لكل الصفحات
        headers: [
          // 1. Content Security Policy (CSP)
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' https: 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https:;
              font-src 'self' https: data:;
              connect-src 'self' https:;
              frame-src 'self' https:;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\n/g, ' ').trim()
          },
          
          // 2. HTTP Strict Transport Security (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          
          // // 3. Cross-Origin Opener Policy (COOP)
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()' // منع FLoC
          }
          
          // // 4. Cross-Origin Resource Policy (CORP)
          // {
          //   key: 'Cross-Origin-Resource-Policy',
          //   value: 'same-origin',
          // },
          
          // 5. X-Frame-Options (Clickjacking protection)
          // {
          //   key: 'X-Frame-Options',
          //   value: 'frame-ancestors',
          // },
          
          // // 6. X-Content-Type-Options
          // {
          //   key: 'X-Content-Type-Options',
          //   value: 'nosniff',
          // },
          
          // // 7. Referrer-Policy
          // {
          //   key: 'Referrer-Policy',
          //   value: 'strict-origin-when-cross-origin',
          // },
          
          // // 8. Permissions-Policy
          // {
          //   key: 'Permissions-Policy',
          //   value: 'camera=(), microphone=(), geolocation=(), payment=()',
          // },
          
          // // 9. X-XSS-Protection (للمتصفحات القديمة)
          // {
          //   key: 'X-XSS-Protection',
          //   value: '1; mode=block',
          // },
        ],
      },
    ];
  },

  



  // async redirects() {
  //   const isDevelopment =  process.env.ENV_CODE === 'development'
  
  //   if (isDevelopment) {
  //     return []
  //   }
    
  //   // ⬇️ استخدم متغير environment
  //   const DOMAIN = String(process.env.NEXT_PUBLIC_DOMAIN || 'youtube.com')
  //   const cleanDomain = DOMAIN.replace(/^https?:\/\//, '')
    
  //   return [
  //     {
  //       source: '/:path*',
  //       missing: [
  //         {
  //           type: 'header',
  //           key: 'x-forwarded-proto',
  //           value: 'https',
  //         },
  //       ],
  //       destination: `https://${cleanDomain}/:path*`, // ⬅️ تأكد من https://
  //       permanent: true,
  //     },
  //   ]
  // },

  /* config options here */
};

export default nextConfig;


// report-uri /api/csp-report;
    // require-trusted-types-for 'script';
              // trusted-types antd-css default ;