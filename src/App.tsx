import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes/router';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
