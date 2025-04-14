import React from 'react';

const client = process.env.SEO_GOOGLE_ADSENSE_CLIENT;

const GoogleAdsense: React.FC = () => {
  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}></script>
    </>
  );
};

export default GoogleAdsense;
