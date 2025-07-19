import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://192.168.100.3:8081',
  realm: 'DocsIA',
  clientId: 'client-frontend',
};

const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = async (): Promise<boolean> => {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    });
    
    if (authenticated) {
      console.log('Usuário autenticado:', keycloak.tokenParsed);
    }
    
    return authenticated;
  } catch (error) {
    console.error('Erro ao inicializar Keycloak:', error);
    return false;
  }
};

export const login = () => {
  keycloak.login();
};

export const logout = () => {
  keycloak.logout();
};

export const getToken = () => {
  return keycloak.token;
};

export const isLoggedIn = () => {
  return !!keycloak.token;
};

export const updateToken = (minValidity = 30) => {
  return keycloak.updateToken(minValidity);
};

export const getUserInfo = () => {
  return keycloak.tokenParsed;
};

export const getUserProfile = async () => {
  try {
    return await keycloak.loadUserProfile();
  } catch (error) {
    console.error('Erro ao carregar perfil do usuário:', error);
    return null;
  }
};

export const hasRole = (role: string) => {
  return keycloak.hasRealmRole(role);
};

export const getAccountUrl = () => {
  return keycloak.createAccountUrl();
};

export default keycloak;