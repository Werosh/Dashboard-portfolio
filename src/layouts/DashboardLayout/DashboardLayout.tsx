import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutGroup } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { CustomCursor } from '../../components/CustomCursor';
import { useSidebar } from '../../hooks/useSidebar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isOpen, isMobile, isTablet } = useSidebar();

  return (
    <LayoutGroup>
      <CustomCursor />
      <div className="min-h-screen bg-[var(--bg)] relative">
        <div className="animated-bg" />
        <div className="content-overlay">
          <Navbar />
          <Sidebar />
          <main
            className={`pt-16 transition-all duration-300 ease-in-out ${
              isMobile
                ? 'ml-0'
                : isTablet
                ? 'md:ml-[80px]'
                : isOpen
                ? 'lg:ml-[260px]'
                : 'lg:ml-[80px]'
            }`}
          >
            <div className="p-6 lg:p-8">
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </LayoutGroup>
  );
};

