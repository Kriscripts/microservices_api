const Order = require('../models/orderModel');

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({ status: 'success', data: { orders } });
};

exports.createOrder = async (req, res) => {
    const newOrder = await Order.create(req.body);
    res.status(201).json({ status: 'success', data: { order: newOrder } });
};
