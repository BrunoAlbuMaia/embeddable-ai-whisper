import React, { createContext, useContext, useState, useEffect } from 'react';
import { initKeycloak, login as keycloakLogin, logout as keycloakLogout, getUserInfo, isAuthenticated } from '@/lib/keycloak';

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  preferred_username: string;
}

interface AuthContextType {
  user: User | null;
  login: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await initKeycloak();
        
        if (authenticated) {
          const userInfo = getUserInfo();
          if (userInfo) {
            setUser(userInfo);
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (): Promise<boolean> => {
    try {
      keycloakLogin();
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    keycloakLogout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};