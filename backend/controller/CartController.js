
const mongoose = require('mongoose');
const clothesModel = require('../models/clothesModel');
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');

class Cart{
    async addProductCart(req, res){
        const {userId, productId} = req.body;
        console.log(userId)
        console.log(productId)

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
                return res.status(404).send({ error: "User or product not found" });
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


    async findProductsCart(req, res){
        const userId = req.body.userid;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('Invalid user id.');
        }

        try{
            const cartResult = await cartModel.find({
                user: new mongoose.Types.ObjectId(userId) 
            })
            let itemsIds = []
            cartResult.forEach((elements) =>{
                elements.items.forEach((itens) =>{
                    //console.log(itens._id)
                    itemsIds.push(itens.product);
                })
            })

            const productsFound = await clothesModel.find({
                _id: { $in: itemsIds }
            })
            //console.log(productsFound)
            return res.status(200).send({
                productsFound
            })
        }
        catch(error){
            console.error('Erro in search:', error)
            return res.status(500).send({
                findError: 'Internal server error at findProductCart()'
            })
        }
    }


    async removeProductCart(req, res){
        const userId = req.params.userid;
        const productId = req.params.productid;

        if(!productId || !userId){
            return res.status(400).send('Bad request');
        }

        try{
            const updatedCart = await cartModel.findOneAndUpdate( // deleteOne deleted all document, just need a items[]
                { user: new mongoose.Types.ObjectId(userId) }, // filter by user
                { $pull: { items: { product: new mongoose.Types.ObjectId(productId) } } }, // Remove item from array items[]
                { new: true } // Return a updated document
            );
    
            if (!updatedCart) {
                return res.status(404).send({ error: 'Cart not found' });
            }
    
            return res.status(200).send({ message: 'Item removido com sucesso' });
        }
        catch(error){
            console.log('Internal server error at removeProductCart()', error);
            return res.status(500).send({
                removeError: 'Internal server error at removeProductCart()'
            });
        };
    };


    async finalPurchase(req, res){
        const { products, customer } = req.body;
        console.log(products)
        console.log(customer)

        if(products === undefined || customer === undefined){
            return res.status(400).send('Bad request from product and costumer');
        }

        try{
            const formattedProduct = products.map((item) => ({
                externalId: item._id,
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: parseFloat(item.price).toFixed(2) * 100 // convertendo para centavos
            }));

            const response = await axios.post('https://api.abacatepay.com/v1/billing/create', {
                frequency: 'ONE_TIME',
                methods: ['PIX'],
                products: formattedProduct,
                returnUrl: 'http://localhost:8080/carrinho',
                completionUrl: 'http://localhost:8080/comprafinalizada',
                customer: customer
            }, {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Bearer abc_dev_UzEuMMg4H0xDHm6P64PBXSqp' // Token da API
                }
            });

            return res.status(200).send(response);
        }
        catch(error){
            console.log('Internal server error at final purchase', error);
            return res.status(500).send('Internal server error at final purchase', error);
        };
    };
};

module.exports = new Cart();