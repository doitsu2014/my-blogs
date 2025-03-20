'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarItem({
  displayName,
  slug
}: Readonly<{
  displayName: string;
  slug: string;
}>) {
  const pathName = usePathname();
  return (
    <Link className={pathName === slug ? 'active' : ''} href={slug}>
      {displayName}
    </Link>
  );
}
