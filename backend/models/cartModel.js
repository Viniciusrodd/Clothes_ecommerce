
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    //user reference
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', //ref model de user
        required: true, //required field
    },
    //product reference
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'clothes',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, {
    timestamps: true //Fields createdAt e updatedAt automatically created
});

//model
const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;