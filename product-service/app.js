const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connection successful'));

// Routes
app.use('/api/products', productRoutes);

const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log(`Product Service running on port ${port}`);
});
