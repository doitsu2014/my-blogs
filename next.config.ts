import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    });

    return config;
  },
  async redirects() {
    return [
      // Basic redirect
    ];
  },
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true
    }
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
// export default nextConfig;
