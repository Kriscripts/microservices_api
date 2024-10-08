const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id);
        res.status(201).json({ status: 'success', token, data: { user: newUser } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: 'fail', message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({ status: 'fail', message: 'Incorrect username or password' });
    }

    const token = signToken(user._id);
    res.status(200).json({ status: 'success', token });
};
