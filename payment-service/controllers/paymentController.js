const Payment = require('../models/paymentModel');

exports.getAllPayments = async (req, res) => {
    const payments = await Payment.find();
    res.status(200).json({ status: 'success', data: { payments } });
};

exports.createPayment = async (req, res) => {
    const newPayment = await Payment.create(req.body);
    res.status(201).json({ status: 'success', data: { payment: newPayment } });
};
