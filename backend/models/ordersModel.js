
const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'clothes' },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    paymentMethod: { type: String, required: true, default: 'PIX' },
    orderCreatedAt: { type: String, required: true },
    status: { type: String, required: true, enum: ['Pendente', 'Pago', 'Enviado', 'Entregue', 'Cancelado'], default: 'Pendente' }
})

const orderModel = mongoose.model('order', ordersSchema);
module.exports = orderModel;