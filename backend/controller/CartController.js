
const mongoose = require('mongoose');
const clothesModel = require('../models/clothesModel');
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');

class Cart{
    async addProductCart(req, res){
        const {userId, productId} = req.body;
        
        if(!userId || !productId){
            return res.status(400).send({
                emptyCamps: 'Empty products fields',
            });
        }

        try{
            let productAdd = await cartModel.create({
                user: userId,
                clothes: productId
            });
            console.log('New product add into a cart');
            res.status(200).send({
                productAdd
            });
        }
        catch(error){
            return res.status(500).send({
                addError: 'Internal server error at add product at cart'
            });
        };
    };
};

module.exports = new Cart();