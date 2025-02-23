import { auth, signIn } from '@/auth';
import LeftMenu from './components/left-menu';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Left Sidebar */}
      <LeftMenu />

      {/* Right Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-base-200 p-4">{children}</div>
      </main>
    </div>
  );
}
