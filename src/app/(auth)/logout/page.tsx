'use client';
import { signOut } from 'next-auth/react';

export default async function AuthLogout() {
  return signOut({
    redirect: true,
    redirectTo: '/'
  });
}
