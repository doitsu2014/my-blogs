import React from 'react';

const gaId = process.env.SEO_GOOGLE_ANALYTICS_ID;

const GoogleAnalytics: React.FC = () => {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
        `
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
