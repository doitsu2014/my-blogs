import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Home | ducth.dev',
  description: 'Welcome to ducth.dev! Explore insights, tutorials, and discussions on technology and software engineering.',
  openGraph: {
    title: 'Home | ducth.dev',
    description: 'Explore insights, tutorials, and discussions on technology and software engineering.',
    url: 'https://ducth.dev',
    images: [
      {
        url: '/images/duc-tran.png',
        width: 640,
        height: 1080,
        alt: 'Doitsu Technology Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | ducth.dev',
    description: 'Explore insights, tutorials, and discussions on technology and software engineering.',
    images: ['/images/duc-tran.png'],
  },
};

export default function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  console.log('locale', locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="avatar mb-4">
          <div className="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              className=""
              src="/images/duc-tran.png"
              alt="Doitsu Technology Logo"
              width={640}
              height={1080}
              priority
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary">
          Welcome to <span className="text-secondary">ducth.dev</span>!
        </h1>
        <p className="mt-4 text-lg text-base-content">
          Hi, I’m Duc! This blog is your go-to destination for insights, tutorials, and discussions
          on technology and software engineering. Whether you're a seasoned developer or just
          starting out, let's learn and grow together in the world of tech.
        </p>

        <Link href={`/categories`} className="btn btn-primary mt-6">
          Explore Articles
        </Link>
      </div>
    </div>
  );
}
