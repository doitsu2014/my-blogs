import React from 'react';
import Head from 'next/head';

const GoogleAdsense: React.FC = () => {
  return (
    <Head>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-6ENZT9HK87"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576013286531110"
            crossorigin="anonymous"></script>
          `
        }}
      />
    </Head>
  );
};

export default GoogleAdsense;
