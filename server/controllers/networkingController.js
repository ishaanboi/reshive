const User = require('../models/User');
const Connection = require('../models/Connection');

exports.searchResearchers = async (req, res) => {
    try {
        const { query } = req.query;
        const regex = new RegExp(query, 'i');
        const users = await User.find({
            $or: [
                { name: regex },
                { researchInterests: regex },
                { institution: regex }
            ]
        }).select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.sendRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;

        const existing = await Connection.findOne({
            sender: req.user.id,
            receiver: receiverId
        });

        if (existing) return res.status(400).json({ message: 'Connection already requested' });

        const connection = new Connection({
            sender: req.user.id,
            receiver: receiverId
        });

        await connection.save();
        res.status(201).json({ message: 'Connection request sent' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.acceptRequest = async (req, res) => {
    try {
        const connection = await Connection.findByIdAndUpdate(
            req.params.id,
            { status: 'accepted' },
            { new: true }
        );
        res.status(200).json(connection);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getConnections = async (req, res) => {
    try {
        const connections = await Connection.find({
            $or: [
                { sender: req.user.id, status: 'accepted' },
                { receiver: req.user.id, status: 'accepted' }
            ]
        }).populate('sender receiver', '-password');

        res.status(200).json(connections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
