import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
    adCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    adType: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    }
});

const Ad = mongoose.model('Ad', adSchema);

export default Ad;
