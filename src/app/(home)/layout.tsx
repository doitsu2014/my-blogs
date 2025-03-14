import Loading from './loading';
import { Suspense } from 'react';
import Navbar from '../components/navbar';
import { getBlogCategories } from '../services/categories';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getBlogCategories();

  return (
    <>
      {/* {categories[0].id} */}
      <Navbar
        links={categories.map((e) => ({
          id: e.id,
          displayName: e.displayName,
          slug: e.slug
        }))}
      ></Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
