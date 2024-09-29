const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.route('/')
    .get(paymentController.getAllPayments)
    .post(paymentController.createPayment);

module.exports = router;
