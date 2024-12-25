import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

interface RootLayoutProps {
  className?: string;
}

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center p-5">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

const RootLayout: React.FC<RootLayoutProps> = ({
  className = '',
}): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className={`flex h-screen ${className}`}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`
          flex-1 p-4 transition-all duration-300 h-screen 
          ${isCollapsed ? 'ml-28' : 'ml-72'}
        `}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default RootLayout;
