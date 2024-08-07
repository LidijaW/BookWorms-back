import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
