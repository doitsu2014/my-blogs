import Loading from './loading';
import { Suspense } from 'react';
import Navbar from './components/navbar';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* {categories[0].id} */}
      <Navbar></Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
