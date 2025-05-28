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

const services = {
  clientes: 'http://localhost:8080/clientes',
  funcionarios: 'http://localhost:8081/funcionarios',
  reservas: 'http://localhost:8082/reservas',
  voos: 'http://localhost:8083/voos',
  auth: 'http://localhost:8084',
};

Object.entries(services).forEach(([route, target]) => {
  app.use(`/${route}`, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^/${route}`]: '',
    },
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