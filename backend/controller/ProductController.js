
const clothesModel = require('../models/clothesModel');
const mongoose = require('mongoose');

class Product{
    async CreateProduct(req, res){
        const { name, size, price, description } = req.body;
        const image = req.file;

        if (!name || !size || !price || !description) {
            return res.status(400).send({
                emptyCamps: 'Empty products fields',
            });
        }

        if (!image) {
            try {
                await clothesModel.create({
                    name,
                    size,
                    price,
                    description,
                });
                console.log('New product created successfully without image');
                return res.status(200).send({ 
                    msg: 'New product created successfully without image' 
                });
            } catch (error) {
                console.log('Error creating product without image:', error);
                return res.status(500).send({
                    errorCreate: 'Error creating product without image',
                });
            }
        }
        try{ 
            await clothesModel.create({
                name,
                size,
                price,
                description,
                image: image.buffer.toString('base64')
            })

            console.log('New product with image created sucess')
            return res.status(200).send({msg: 'New product created sucess with image'});
        }
        catch(error){
            console.log('New product creation FAIL', error)
            return res.status(500).send({
                errorCreate: 'The product error at created'
            })
        }
    }

    
    async Products(req, res){
        try{
            let products = await clothesModel.find();
            if(!products){
                return res.send({
                    status: 404,
                    errorProductFind: 'The product not finded in DB'
                });
            };

            //console.log('Product finded sucess');
            res.status(200).send({
                products
            })
        }
        catch(error){
            console.log('The product find error', error)
            return res.json({
                status: 500,
                errorProduct: 'The product find error'
            });
        };
    };


    async Delete(req, res){
        const prodId = req.params.id;
        
        let isProduct = await clothesModel.findOne({
            _id: prodId
        });

        if(!isProduct){
            return res.status(404).send({
                notFound: "Error at find product to delete, doesn't exist"
            });
        }

        try{
            await clothesModel.deleteOne({ _id: prodId });
            return res.status(200).send({
                message: 'Product deleted successfully',
            });
        }
        catch(error){
            console.error('Error deleting product:', error);
            return res.status(500).send({
                errorServer: 'An error occurred while deleting the product. Please try again later.',
            });
        }
    };


    async findProductByid(req, res){
        const id = req.params.id;

        try{
            let product = await clothesModel.findOne({ _id: id });
            if(!product){
                return res.status(404).send({
                    errorFind: "Server Can't find a product by id"
                });
            };

            return res.status(200).send({
                findProd: 'Product finded by id with success',
                product
            });
        }
        catch(error){
            return res.status(500).send({
                errorEdit: 'Internal server error at findProductByid()'
            });
        };
    };


    async editProduct(req, res){
        const id = req.params.id
        const { name, size, price, description } = req.body;
        const image = req.file;

        if(!name || !size || !price || !description){
            return res.status(400).send({
                emptyFields: 'Product edit failed, are empty fields'
            });
        }

        try{
            if(image == undefined){
                await clothesModel.updateOne({ _id: id }, {
                    $set: {
                        name,
                        size,
                        price,
                        description
                    }
                });
                return res.status(200).send({msgUpdate: 'Product without image updated sucess'});    
            }

            const productUpdate = await clothesModel.updateOne({ _id: id }, {
                $set: {
                    name,
                    size,
                    price,
                    description,
                    image: image.buffer.toString('base64')
                }
            })

            if(productUpdate){
                return res.status(200).send({msgUpdate: 'Product with image updated sucess'});    
            }
        }
        catch(error){
            console.error('Error during product update editProduct():', error);
            return res.status(500).send({
                editError: 'Server internal erro at editProduct()', error
            });
        };
    };
};

module.exports = new Product();