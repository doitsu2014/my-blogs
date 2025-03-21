'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavbarItem from './navbar-item';
import Image from 'next/image';

export default function Navbar({
  links
}: Readonly<{
  links: { id: string; displayName: string; slug: string }[];
}>) {
  const pathName = usePathname();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          <div className="w-10 rounded-full">
            <Image
              src="/images/doitsu-technology-logo.png"
              width={45}
              height={45}
              className="mr-3"
              alt="D Tech"
            />
          </div>
          Duc Tran
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-1">
          {links.map((link) => (
            <li key={link.id}>
              <NavbarItem
                slug={`/categories/${link.slug}`}
                displayName={link.displayName}
                key={link.id}></NavbarItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
