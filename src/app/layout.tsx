import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';

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
  return (
    <html lang="en" data-theme="nord">
      <head></head>
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
