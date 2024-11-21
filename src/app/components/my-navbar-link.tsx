'use client';

import { NavbarLink } from 'flowbite-react';
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
    <NavbarLink href={slug} active={pathname === slug}>
      {displayName}
    </NavbarLink>
  );
}
