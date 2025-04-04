import LeftMenu from './components/left-menu';
import { LayoutProvider, useLayout } from './layoutContext';
import { MainLayout } from './layoutMain';
import { getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'My Blogs - Admin',
  description: 'There is my blogs website admin page'
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={inter.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Aref+Ruqaa|Mirza|Roboto"
        />
      </head>
      <body className={`antialiased`}>
        <LayoutProvider>
          <div className="flex min-h-screen">
            {/* Left Sidebar */}
            <LeftMenu />
            <MainLayout>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </MainLayout>
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
