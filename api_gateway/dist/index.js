"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});
app.use('/clientes', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:8080',
    changeOrigin: true,
    logger: console,
    pathRewrite: {
        '^/clientes': ''
    }
}));
const services = {
    funcionarios: 'http://localhost:8081/funcionarios',
    reservas: 'http://localhost:8082/reservas',
    voos: 'http://localhost:8083/voos',
    auth: 'http://localhost:8084',
};
Object.entries(services).forEach(([route, target]) => {
    app.use(`/${route}`, (0, http_proxy_middleware_1.createProxyMiddleware)({
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
