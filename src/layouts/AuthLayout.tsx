import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
  className?: string;
}

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

const AuthLayout: React.FC<AuthLayoutProps> = ({
  className = '',
}): JSX.Element => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-50 ${className}`}
    >
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;
