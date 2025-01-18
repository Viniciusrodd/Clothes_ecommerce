
const clothesModel = require('../models/mongoModel');

class User{
    Teste(req, res){
        return res.json({
            status: 200,
            msg: 'Sucess testing'
        });
    };

    async CreateProduct(req, res){
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
                return res.status(200).send({msg: 'New product created sucess without image'});
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
            return res.status(200).send({msg: 'New product created sucess with image'});
        }
        catch(error){
            console.log('New product with image created FAIL', error)
            return res.json({
                status: 500,
                errorCreate: 'The product error at created'
            })
        }
    }

    async Products(req, res){
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

    Delete(req, res){
        const prodId = req.params.id;

        clothesModel.deleteOne({ _id: prodId })
        .then(() =>{
            console.log('Product deleted with sucess');
            return res.status(200).send({ 
                message: 'Product deleted successfully' 
            });
        })
        .catch((error) =>{
            return res.status(500).send({
                errorMsg: 'Internal server error at Delete()'
            });
        })
    };
};

module.exports = new User();