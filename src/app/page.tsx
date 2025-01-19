import Image from 'next/image';

export default function Home() {
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
        <button className="btn btn-primary mt-6">Explore Articles</button>
      </div>
    </div>
  );
}
