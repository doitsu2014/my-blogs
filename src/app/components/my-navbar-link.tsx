'use client';

import { usePathname } from 'next/navigation';

export default function MyNavbarLink({
  displayName,
  slug
}: Readonly<{
  displayName: string;
  slug: string;
}>) {
  const pathname = usePathname();
  return (
    <Link href={slug}Dashboard</Link>
    <NavbarLink href={} active={pathname === slug}>
      {displayName}
    </NavbarLink>
  );
}
