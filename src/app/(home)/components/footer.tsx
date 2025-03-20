'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavbarItem from './navbar-item';
import Image from 'next/image';

export default function Footer() {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith('/admin');
  return !isAdmin ? (
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
        <ul className="menu menu-horizontal px-1 space-x-1"></ul>
      </div>
    </div>
  ) : (
    <></>
  );
}
