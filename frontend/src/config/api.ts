// Configuração centralizada da API
const getApiUrl = (): string => {
  // Verifica se tem uma URL explícita definida
  if (process.env.NEXT_PUBLIC_API_GATEWAY_URL) {
    return process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  }

  // Detecta se está rodando em ambiente Docker
  const isDocker = process.env.NODE_ENV === 'production' || 
                   process.env.DOCKER_ENV === 'true' ||
                   typeof window !== 'undefined' && window.location.hostname !== 'localhost';

  if (typeof window === 'undefined') {
    // Server-side rendering
    return isDocker ? 'http://api_gateway:8000' : 'http://localhost:8000';
  }
  
  // Client-side: verifica se está acessando via Docker
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Desenvolvimento local - usa localhost
    return 'http://localhost:8000';
  } else {
    // Produção/Docker - usa a mesma origem da aplicação mas porta 8000
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:8000`;
  }
};

export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  ENDPOINTS: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    CLIENTES: '/clientes',
    FUNCIONARIOS: '/funcionarios',
    RESERVAS: '/reservas',
    VOOS: '/voos'
  }
};

export default API_CONFIG;
