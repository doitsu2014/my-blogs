'use client';
import LeftMenu from './components/left-menu';
import { useLayout } from './layoutContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLayout();
  return (
    <main className="flex-1 p-6 bg-base-100 overflow-auto">
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      {children}
    </main>
  );
}
