import React, { createContext, useContext, useState, useEffect } from 'react';
import keycloak, { initKeycloak, logout as keycloakLogout, getUserInfo, getUserProfile } from '@/services/keycloak';
import type { KeycloakProfile } from 'keycloak-js';

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profile?: KeycloakProfile;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  updateProfile: () => Promise<void>;
  getAccountUrl: () => string;
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
          await loadUserData();
        }
      } catch (error) {
        console.error('Erro na inicialização da autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Setup token refresh
    const interval = setInterval(() => {
      keycloak.updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log('Token atualizado');
          }
        })
        .catch(() => {
          console.log('Falha ao atualizar token');
        });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const loadUserData = async () => {
    try {
      const userInfo = getUserInfo();
      const profile = await getUserProfile();
      
      if (userInfo) {
        const userData: User = {
          id: userInfo.sub || '',
          email: userInfo.email || '',
          name: userInfo.name || profile?.firstName + ' ' + profile?.lastName || userInfo.preferred_username || '',
          username: userInfo.preferred_username || '',
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          profile
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    setUser(null);
    keycloakLogout();
  };

  const updateProfile = async () => {
    await loadUserData();
  };

  const getAccountUrl = () => {
    return keycloak.createAccountUrl();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, updateProfile, getAccountUrl }}>
      {children}
    </AuthContext.Provider>
  );
};