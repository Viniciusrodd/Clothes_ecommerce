
const clothesModel = require('../models/mongoModel');

class User{
    teste(req, res){
        return res.json({
            status: 200,
            msg: 'Sucess testing'
        });
    };

    async createProduct(req, res){
        const { name, size, price, description } = req.body;
        const image = req.file;
        if(image == undefined){
            await clothesModel.create({
                name,
                size,
                price,
                description,
            })
            .then(() =>{
                console.log('New product created sucess without image');
                return res.status(200);
            }).catch((error) => console.log('New product without image created FAIL', error));
        }
        try{ 
            let newProduct = await clothesModel.create({
                name,
                size,
                price,
                description,
                image: image.buffer.toString('base64')
            })

            console.log('New product with image created sucess')
            return res.status(200)
        }
        catch(error){
            console.log('New product with image created FAIL', error)
            return res.json({
                status: 500,
                errorCreate: 'The product error at created'
            })
        }
    }

    async products(req, res){
        try{
            let products = await clothesModel.find();
            if(!products){
                return res.json({
                    status: 404,
                    errorProductFind: 'The product not finded in DB'
                });
            };

            //console.log('Product finded sucess');
            res.status(200).json({
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
};

module.exports = new User();