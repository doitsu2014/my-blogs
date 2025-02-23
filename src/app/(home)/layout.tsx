import Loading from './loading';
import { Suspense } from 'react';
import Navbar from '../components/navbar';
import { getCategories } from '../services/categories';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <>
      <Navbar links={categories}></Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
