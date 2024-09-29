const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

// Load environment variables
const authServiceUrl = process.env.AUTH_SERVICE_URL;
const productServiceUrl = process.env.PRODUCT_SERVICE_URL;
const orderServiceUrl = process.env.ORDER_SERVICE_URL;
const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL;

// Validate that all service URLs are loaded
if (!authServiceUrl || !productServiceUrl || !orderServiceUrl || !paymentServiceUrl) {
    throw new Error('One or more service URLs are missing from environment variables');
}

// Log the service URLs to check if they're loaded correctly
console.log('Creating proxy for auth service:', authServiceUrl);
console.log('Creating proxy for product service:', productServiceUrl);
console.log('Creating proxy for order service:', orderServiceUrl);
console.log('Creating proxy for payment service:', paymentServiceUrl);

// Set up the proxies
router.use('/auth', createProxyMiddleware({ target: authServiceUrl, changeOrigin: true }));
router.use('/products', createProxyMiddleware({ target: productServiceUrl, changeOrigin: true }));
router.use('/orders', createProxyMiddleware({ target: orderServiceUrl, changeOrigin: true }));
router.use('/payments', createProxyMiddleware({ target: paymentServiceUrl, changeOrigin: true }));

module.exports = router;
