import { auth, signIn } from '@/auth';
import LeftMenu from './components/left-menu';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <LeftMenu />

      <main className="flex-1 p-6 bg-base-100 overflow-auto">{children}</main>
    </div>
  );
}
