const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connection successful'));

// Routes
app.use('/api/orders', orderRoutes);

const port = process.env.PORT || 8002;
app.listen(port, () => {
    console.log(`Order Service running on port ${port}`);
});
