import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true
      }
    ];
  },
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true
    },
  }
};

export default nextConfig;
