import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: [
  "100",
  "200",
  "300",
  "400", 
  "500", 
  "600", 
  "700", 
  "800", 
  "900"
] });


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
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Aref+Ruqaa|Mirza|Roboto"
        />
      </head>

      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
