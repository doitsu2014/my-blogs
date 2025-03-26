import Loading from './loading';
import { Suspense } from 'react';
import Navbar from './components/navbar';
import GoogleAnalytics from './components/google-analytics';
import GoogleAdsense from './components/google-adsense';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleAnalytics />
      <GoogleAdsense />
      <Navbar></Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
