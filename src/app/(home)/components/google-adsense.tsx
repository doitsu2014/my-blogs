import React from 'react';
import Head from 'next/head';

const GoogleAdsense: React.FC = () => {
  return (
    <Head>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576013286531110"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576013286531110"></script>
          `
        }}
      />
    </Head>
  );
};

export default GoogleAdsense;
