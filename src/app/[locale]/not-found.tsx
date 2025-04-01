'use client';

import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-xl font-semibold mt-2">Page Not Found</p>
        <div className="mt-6 space-x-4">
          <button className="btn btn-primary" onClick={() => router.push('/')}>
            Go Home
          </button>
          <button className="btn btn-secondary" onClick={() => router.push('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}