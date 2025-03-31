import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3000;

const services = {
  cliente: 'http://localhost:8080',
  funcionario: 'http://localhost:8081',
  reserva: 'http://localhost:8082',
  voos: 'http://localhost:8083',
  auth: 'http://localhost:8084',
};

app.use('/clientes', createProxyMiddleware({
  target: services.cliente,
  changeOrigin: true,
  pathRewrite: {
    '^/clientes': '/clientes',
  },
}));

app.use('/funcionarios', createProxyMiddleware({
  target: services.funcionario,
  changeOrigin: true,
  pathRewrite: {
    '^/funcionarios': '/funcionarios',
  },
}));

app.use('/reservas', createProxyMiddleware({
  target: services.reserva,
  changeOrigin: true,
  pathRewrite: {
    '^/reservas': '/reservas',
  },
}));

app.use('/voos', createProxyMiddleware({
  target: services.voos,
  changeOrigin: true,
  pathRewrite: {
    '^/voos': '/voos',
  },
}));

app.listen(port, () => {
    console.log(`Api gateway listening at http://localhost:${port}`)
})
