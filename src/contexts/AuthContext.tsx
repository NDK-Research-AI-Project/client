import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/axios/api';
import { ApiError } from '../services/axios/types';
//import { set } from 'react-hook-form';

// Development flag
const IS_DEV_MODE = true;

// Mock user data for development
const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
};

const MOCK_TOKEN = 'mock-jwt-token';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(IS_DEV_MODE ? MOCK_USER : null);
  // const [token, setToken] = useState<string | null>(
  //   IS_DEV_MODE ? MOCK_TOKEN : null
  // );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    IS_DEV_MODE ? true : false
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    IS_DEV_MODE ? false : true
  );

  const validateUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get<{ user: User }>('/auth/verify');
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Token validation failed:', apiError.message);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (IS_DEV_MODE) {
      // Auto-login for development
      setUser(MOCK_USER);
      //setToken(MOCK_TOKEN);
      return;
    }
    //TODO : there will be async error
    validateUser();
  }, []);

  const login = async (email: string, password: string) => {
    if (IS_DEV_MODE) {
      // Mock successful login
      setUser(MOCK_USER);
      //setToken(MOCK_TOKEN);
      localStorage.setItem('token', MOCK_TOKEN);
      return;
    }
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Login failed');
    }
  };

  const logout = () => {
    if (IS_DEV_MODE) {
      setUser(null);
      //setToken(null);
      localStorage.removeItem('token');
      return;
    }
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    // Reset API instance authorization header
    api.defaults.headers.common['Authorization'] = '';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
