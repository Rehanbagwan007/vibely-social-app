import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {isMobile ? (
        <>
          {/* Mobile Layout */}
          <main className="pb-16">
            {children}
          </main>
          <MobileNav />
        </>
      ) : (
        <>
          {/* Desktop Layout */}
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;