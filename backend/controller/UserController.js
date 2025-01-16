
const clothesModel = require('../models/mongoModel');
class User{
    teste(req, res){
        return res.json({
            status: 200,
            msg: 'Sucess testing'
        });
    };

    async create(req, res){
        const product = req.body;
        try{
            let newProduct = await clothesModel.create({
                name: 'camisa x',
                size: 'xxl',
                price: 19.90,
                description: 'Flexible product',
                image: ''
            })

            return res.json({
                status: 200,
                msgCreate: 'The product sucess in creation'
            })
        }
        catch(error){
            return res.json({
                status: 500,
                errorCreate: 'The product error at created'
            })
        }
    }
};

module.exports = new User();