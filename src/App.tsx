import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes/router';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
