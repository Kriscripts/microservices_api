const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const httpProxy = require('http-proxy-middleware'); // Ensure you have this installed
const gatewayRoutes = require('./routes/gatewayRoutes');

console.log('Loaded AUTH_SERVICE_URL:', process.env.AUTH_SERVICE_URL);
console.log('Loaded PRODUCT_SERVICE_URL:', process.env.PRODUCT_SERVICE_URL);
console.log('Loaded ORDER_SERVICE_URL:', process.env.ORDER_SERVICE_URL);
console.log('Loaded PAYMENT_SERVICE_URL:', process.env.PAYMENT_SERVICE_URL);

const app = express();

// Set a timeout for all requests
const TIMEOUT = 10000; // Timeout in milliseconds (10 seconds)
app.use((req, res, next) => {
    res.setTimeout(TIMEOUT, () => {
        console.log('Request has timed out.');
        res.status(504).send('Gateway Timeout');
    });
    next();
});

// Proxy settings with individual timeouts
app.use('/api/auth', httpProxy({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    timeout: TIMEOUT, // Proxy timeout
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(502).send('Bad Gateway');
    }
}));

app.use('/api/product', httpProxy({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    timeout: TIMEOUT, // Proxy timeout
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(502).send('Bad Gateway');
    }
}));

app.use('/api/order', httpProxy({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
    timeout: TIMEOUT, // Proxy timeout
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(502).send('Bad Gateway');
    }
}));

app.use('/api/payment', httpProxy({
    target: process.env.PAYMENT_SERVICE_URL,
    changeOrigin: true,
    timeout: TIMEOUT, // Proxy timeout
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(502).send('Bad Gateway');
    }
}));

// Start the API Gateway server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
