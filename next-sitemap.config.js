/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://aegbao.tj', // Replace with your actual domain
    changefreq: 'daily', // Default changefreq for all URLs
    priority: 0.7, // Default priority for all URLs
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/admin/*', '/api/*'],
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
      additionalSitemaps: [
        'https://aegbao.tj/my-custom-sitemap-0.xml',
      ],
    },
    // Additional configurations for specific URLs
    // Ensure to replace '/en', '/ru', '/en/portfolio', '/ru/portfolio', '/en/brief', '/ru/brief' with actual paths in your project
    i18n: true, // Enable i18n support
    locales: ['en', 'ru', "tj"], // Add all supported locales here
    defaultLocale: 'en', // Default locale
    pagesConfig: {
      '/en': {
        changefreq: 'daily',
        priority: 1.0,
      },
      '/ru': {
        changefreq: 'daily',
        priority: 1.0,
      },
      '/tj': {
        changefreq: 'daily',
        priority: 1.0,
      },
      '/en/about': {
        changefreq: 'weekly',
        priority: 0.8,
      },
      '/ru/about': {
        changefreq: 'weekly',
        priority: 0.8,
      },
      '/tj/about': {
        changefreq: 'weekly',
        priority: 0.8,
      },
      '/en/news': {
        changefreq: 'monthly',
        priority: 0.6,
      },
      '/ru/news': {
        changefreq: 'monthly',
        priority: 0.6,
      },
      '/tj/news': {
        changefreq: 'monthly',
        priority: 0.6,
      },
      '/en/projects': {
        changefreq: 'monthly',
        priority: 0.6,
      },
      '/ru/projects': {
        changefreq: 'monthly',
        priority: 0.6,
      },
      '/tj/projects': {
        changefreq: 'monthly',
        priority: 0.6,
      },
    },
  };
  