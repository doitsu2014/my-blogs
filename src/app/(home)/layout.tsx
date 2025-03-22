import Loading from './loading';
import { Suspense } from 'react';
import Navbar from './components/navbar';
import GoogleAnalytics from './components/google-analytics';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleAnalytics />
      <Navbar></Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
