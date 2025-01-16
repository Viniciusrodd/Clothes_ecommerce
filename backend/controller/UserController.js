
const clothesModel = require('../models/mongoModel');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = ({ storage });

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
        try{ 
            let newProduct = await clothesModel.create({
                name,
                size,
                price,
                description,
                image: image.buffer.toString('base64')
            })

            console.log('New product created sucess')
            return res.json({
                status: 200,
                msgCreate: 'The product sucess in creation'
            })
        }
        catch(error){
            console.log('New product created FAIL')
            return res.json({
                status: 500,
                errorCreate: 'The product error at created'
            })
        }
    }
};

module.exports = new User();