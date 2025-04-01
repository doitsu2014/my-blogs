import React from 'react';

const GoogleAnalytics: React.FC = () => {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-6ENZT9HK87"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6ENZT9HK87');
        `
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
