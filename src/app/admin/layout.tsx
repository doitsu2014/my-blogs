import { auth } from '@/auth';
import LeftMenu from './components/left-menu';
import { LayoutProvider, useLayout } from './layoutContext';
import { MainLayout } from './layoutMain';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <LayoutProvider>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <LeftMenu />
        <MainLayout>{children}</MainLayout>
      </div>
    </LayoutProvider>
  );
}
