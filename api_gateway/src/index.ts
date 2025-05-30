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

// Dedicated proxy for /clientes:
app.use('/clientes', createProxyMiddleware({
  target: 'http://ms-cliente:8080',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return path === '/' ? '/clientes' : `/clientes${path}`;
  },
  logger: console,
}));

const services = {
  funcionarios: 'http://ms-funcionarios:8081',
  reservas: 'http://ms-reserva:8082',
  voos: 'http://ms-voos:8083',
  auth: 'http://ms-auth:8084',
};

Object.entries(services).forEach(([route, target]) => {
  app.use(`/${route}`, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => `/${route}${path}`,
    logger: console,
  }));
});

app.get('/', (req, res) => {
  res.json({ services: Object.keys(services) });
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