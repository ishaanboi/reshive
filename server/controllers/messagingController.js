const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const message = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content
        });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getConversation = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id }
            ]
        }).sort('timestamp');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecentChats = async (req, res) => {
    try {
        const messages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: req.user._id },
                        { receiver: req.user._id }
                    ]
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: {
                        sender: "$sender",
                        receiver: "$receiver"
                    },
                    doc: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" }
            }
        ]);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
