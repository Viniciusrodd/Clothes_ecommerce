
const mongoose = require('mongoose');
const clothesModel = require('../models/clothesModel');
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');

class Cart{
    async addProductCart(req, res){
        const {userId, productId} = req.body;
        console.log('userid ', userId)
        console.log('productid ', productId)

        if(!userId || !productId){
            return res.status(400).send({
                emptyCamps: 'Empty products fields',
            });
        }

        try{
            //verify if user/product exist
            const [user, product] = await Promise.all([
                userModel.findById(userId),
                clothesModel.findById(productId)
            ]);

            if (!user || !product) {
                return res.status(404).send({ error: "Usuário ou produto não encontrado" });
            }

            //Search for user cart
            let cart = await cartModel.findOne({ user: userId });

            if (!cart) {
                // Create new cart if doesn't exist
                cart = await cartModel.create({
                    user: userId,
                    items: [{ product: productId }]
                });
            } else {
                // Verifica se o produto já está no carrinho
                const existingItem = cart.items.find(item => item.product.equals(productId));

                if (existingItem) {
                    existingItem.quantity += 1; // Incrementa quantidade
                } else {
                    cart.items.push({ product: productId }); // Adiciona novo item
                }

                await cart.save();
            }

            res.status(200).send(cart);
        }
        catch(error){
            return res.status(500).send({
                addError: 'Internal server error at add product at cart'
            });
        };
    };
};

module.exports = new Cart();