const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    messages: [String],
    date: {
        type: Date,
        required: true
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
