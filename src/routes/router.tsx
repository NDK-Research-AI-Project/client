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
import NewChat from '../pages/chat/NewChat';
import ViewGlossary from '../pages/glossary/viewGlossary';
import UploadGlossary from '../pages/glossary/uploadGlossary';

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
          { path: 'chat/new', element: <NewChat /> },
          { path: 'chat/:sessionId', element: <NewChat /> }, // Dynamic route for existing chat sessions
          {
            path: 'document',
            element: <Navigate to="/document/view" replace />,
          },
          { path: 'document/view', element: <ViewDocument /> },
          { path: 'document/upload', element: <UploadDocument /> },
          {
            path: 'glossary',
            element: <Navigate to="/glossary/view" replace />,
          },
          { path: 'glossary/view', element: <ViewGlossary /> },
          { path: 'glossary/upload', element: <UploadGlossary /> },
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
