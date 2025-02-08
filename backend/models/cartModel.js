
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    //user reference
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', //ref model de user
        required: true, //required field
        unique: true // Assure unique cart for user
    },
    //product reference
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clothes',
        required: true
    },
    //quantity of products
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true //Fields createdAt e updatedAt automatically created
});

//model
const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;