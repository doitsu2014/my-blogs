/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.PROXY_HOST || 'https://ducth.dev',
  generateRobotsTxt: true, // (optional)
  // ...other options
  additionalSitemaps: ['https://ducth.dev/additional-sitemap.xml'],
  exclude: ['/admin'],

};
