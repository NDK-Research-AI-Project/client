import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isDemo } from '../configs/app';

export const ProtectedRoute = () => {
  if (isDemo) {
    return <Outlet />;
  }
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
};
