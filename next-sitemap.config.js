/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.PROXY_HOST || 'https://ducth.dev',
  generateRobotsTxt: true, // (optional)
  exclude: ['/admin'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://ducth.dev/additional-sitemap.xml' // <==== Add here
    ]
  }
};
