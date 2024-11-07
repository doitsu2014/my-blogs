import Image from "next/image";

export default function Home() {
  return (
      <div className="flex justify-center">
        <Image
          className="dark:invert"
          src="/images/doitsu-technology-logo.svg"
          alt="Doitsu Technology Logo"
          width={640}
          height={1080}
          priority
        />
      </div>
  );
}
