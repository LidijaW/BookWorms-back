const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    messages: [{ type: String }],
    date: { type: Date, default: Date.now },
    ad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
