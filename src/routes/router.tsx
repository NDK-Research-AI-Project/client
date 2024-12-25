import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import Chat from '../pages/chat/Chat';
import SignIn from '../pages/auth/signIn/SignIn';
import SignUp from '../pages/auth/signUp/SignUp';
import ResetPassword from '../pages/auth/resetPassword/ResetPassword';
import ViewDocument from '../pages/document/ViewDocument';
import UploadDocument from '../pages/document/UploadDocument';
import Settings from '../pages/settings/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <Navigate to="/chat" replace /> },
          { path: 'chat', element: <Chat /> },
          {
            path: 'document',
            element: <Navigate to="/document/view" replace />,
          },
          { path: 'document/view', element: <ViewDocument /> },
          { path: 'document/upload', element: <UploadDocument /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/signin" replace /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
]);
