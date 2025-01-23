import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { getCategories } from './services/categories';
import Loading from './loading';
import { Suspense } from 'react';
import Navbar from './components/navbar';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'My Blogs - Home Page',
  description: 'There is my blogs website'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  const date = new Date();
  const year = date.getFullYear();
  return (
    <html lang="en" data-theme="nord">
      <head></head>
      <body className={`${roboto.className} antialiased`}>
        <Navbar links={categories}></Navbar>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
