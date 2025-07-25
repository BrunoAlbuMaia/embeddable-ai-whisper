import Keycloak from 'keycloak-js';

// Configuração do Keycloak


// Instância do Keycloak
const keycloak = new Keycloak('./keycloak.json');

// Configurações de inicialização
const keycloakInitOptions = {
  onLoad: 'check-sso' as const,
  pkceMethod: 'S256' as const,
  checkLoginIframe: false,
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  redirectUri: window.location.origin + '/',
};

// Função para inicializar o Keycloak
export const initKeycloak = async (): Promise<boolean> => {
  try {
    const authenticated = await keycloak.init(keycloakInitOptions);
    
    if (authenticated) {
      // Configurar atualização automática do token
      setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            console.log('Token atualizado');
          }
        }).catch(() => {
          console.error('Falha ao atualizar token');
          keycloak.login();
        });
      }, 60000); // Verifica a cada 60 segundos
    }
    
    return authenticated;
  } catch (error) {
    console.error('Erro ao inicializar Keycloak:', error);
    return false;
  }
};

// Função para fazer login
export const login = () => {
  keycloak.login({
    redirectUri: window.location.origin + '/dashboard',
  });
};

// Função para fazer logout
export const logout = () => {
  keycloak.logout({
    redirectUri: window.location.origin + '/',
  });
};

// Função para obter dados do usuário
export const getUserInfo = () => {
  if (keycloak.tokenParsed) {
    return {
      id: keycloak.tokenParsed.sub || '',
      email: keycloak.tokenParsed.email || '',
      name: keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username || '',
      preferred_username: keycloak.tokenParsed.preferred_username || '',
      company: keycloak.tokenParsed.company || 'Minha Empresa',
    };
  }
  return null;
};

// Função para verificar se está autenticado
export const isAuthenticated = () => {
  return keycloak.authenticated || false;
};

// Função para obter o token
export const getToken = () => {
  return keycloak.token;
};

// Exportar a instância do Keycloak para uso direto se necessário
export default keycloak;