import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import { getCategories } from './services/categories';
import Loading from './loading';
import { Suspense } from 'react';
import MyNavbarLink from './components/my-navbar-link';
import Link from 'next/link';

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
    <html lang="en" data-theme="lofi">
      <head></head>
      <body className={`${roboto.className} antialiased`}>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link className="btn btn-ghost text-xl" href="/">
              <div className="w-10 rounded-full">
                <Image
                  src="/images/doitsu-technology-logo.png"
                  width={45}
                  height={45}
                  className="mr-3"
                  alt="D Tech"
                />
              </div>
              Duc Tran
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 space-x-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <MyNavbarLink
                    slug={`/blogs/${category.slug}`}
                    displayName={category.displayName}
                    key={category.id}
                  ></MyNavbarLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Suspense fallback={<Loading />}>{children}</Suspense>

        <footer className="footer text-base-content p-10 flex justify-between">
          <aside>
            <Image
              src="/images/doitsu-technology-logo.png"
              width={100}
              height={100}
              className="mr-3"
              alt="D Tech"
            />
            <p>
              Duc Tran
              <br />
              Copyright ©️ {year}
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Contents</h6>
            <Link className="link link-hover" href="/about-us">
              About me
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
