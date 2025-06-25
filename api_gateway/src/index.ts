import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Proxy dedicado para /login
app.use('/login', createProxyMiddleware({
  target: 'http://ms-auth:8084',
  changeOrigin: true,
  pathRewrite: (path, req) => '/login',
  logger: console,
}));

// Proxy dedicado para /logout
app.use('/logout', createProxyMiddleware({
  target: 'http://ms-auth:8084',
  changeOrigin: true,
  pathRewrite: (path, req) => '/logout',
  logger: console,
}));

app.use('/clientes', createProxyMiddleware({
  target: 'http://ms-cliente:8080',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const fullPath = `/clientes${path}`;
    return fullPath.endsWith('/') ? fullPath.slice(0, -1) : fullPath; // Tive que adicionar isso aqui porque por algum motivo para /clientes ele manda para /clientes/ e quebra tudo
  },
  logger: console,
}));

const services = {
  funcionarios: 'http://ms-funcionarios:8081',
  reservas: 'http://ms-reserva:8082',
  voos: 'http://ms-voos:8083',
  auth: 'http://ms-auth:8084',
  aeroportos: 'http://ms-voos:8083'
};

Object.entries(services).forEach(([route, target]) => {
  app.use(`/${route}`, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      if (route === 'auth') {
        return path.replace(/^\/auth/, '');
      }
      return path === '/' ? `/${route}` : `/${route}${path}`;
    },
    logger: console,
  }));
});
app.get('/', (req, res) => {
  res.json({ services: Object.keys(services).concat('clientes') });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada no API Gateway.' });
});

app.listen(port, () => {
  console.log(`🛡️ API Gateway rodando em http://localhost:${port}`);
});
