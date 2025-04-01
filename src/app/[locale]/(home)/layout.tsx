import Loading from './loading';
import { Suspense } from 'react';
import Navbar from './components/navbar';
import GoogleAnalytics from './components/google-analytics';
import GoogleAdsense from './components/google-adsense';
import Footer from './components/footer';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';

export default async function RootLayout({
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
      <Footer></Footer>
    </>
  );
}
