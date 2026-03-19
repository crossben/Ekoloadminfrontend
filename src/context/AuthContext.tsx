import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ekolo_admin_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await api.get('/me');
          setUser(response.data);
        } catch (error) {
          console.error("Auth initialization failed", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password, type: 'admin' });
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('ekolo_admin_token', access_token);
      setToken(access_token);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Identifiants incorrects');
    }
  };

  const logout = () => {
    localStorage.removeItem('ekolo_admin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
