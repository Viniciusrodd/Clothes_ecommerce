
const mongoose = require('mongoose');
const ordersModel = require('../models/ordersModel');

class Orders{
    async createOrder(req, res){
        const { userId, products, paymentMethod, orderCreatedAt, status } = req.body;
        if(!userId || !products || !paymentMethod || !orderCreatedAt || !status){
            return res.status(400).send('bad request fields at create order route');
        }
        
        try{
            const ordersAdd = await ordersModel.create({
                userId, products, paymentMethod, orderCreatedAt, status
            })
            if(!ordersAdd){
                console.error('Error at orders add query, try again...');
            }

            console.log('Add orders request success!!!');
            return res.status(200).send('Add orders request success!!!');
        }
        catch(error){
            console.log('Internal server error at create order for user', error);
            return res.status(500).json({
                error: 'Internal server error at create order for user',
                errorMsg: error.response?.data || error.message
            });
        };
    };


    async findOrders(req, res){
        const userId = req.params.userID;
        try{
            const orders = await ordersModel.find({
                userId 
            });
            if(orders.length === 0){ 
                console.log('Error at find order by userId...');
                return res.status(404).send('Error at find order by userId...')
            }

            return res.status(200).json({
                success: 'Find orders query success',
                orders
            });
        }
        catch(error){
            console.error('Internal server error at findOrders request', error);
            return res.status(500).json({
                error: 'Internal server error at findOrders request',
                errorMsg: error.response?.data || error.message
            });
        };
    };
}

module.exports = new Orders()