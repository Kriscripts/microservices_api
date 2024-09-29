const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connection successful'));

// Routes
app.use('/api/payments', paymentRoutes);

const port = process.env.PORT || 8003;
app.listen(port, () => {
    console.log(`Payment Service running on port ${port}`);
});
