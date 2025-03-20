import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';

export const roboto_mono = Roboto({
  weight: '400'
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
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Aref+Ruqaa|Mirza|Roboto"
        />
      </head>

      <body className={`${roboto_mono.className} antialiased`}>{children}</body>
    </html>
  );
}
