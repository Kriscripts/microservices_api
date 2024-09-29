const { createProxyMiddleware } = require('http-proxy-middleware');

// Proxy for Auth Service
exports.authServiceProxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
});

// Proxy for Product Service
exports.productServiceProxy = createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
});

// Proxy for Order Service
exports.orderServiceProxy = createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
});

// Proxy for Payment Service
exports.paymentServiceProxy = createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE_URL,
    changeOrigin: true,
});
