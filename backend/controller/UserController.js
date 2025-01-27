
const userModel = require('../models/userModel');

class User{
    async registerUser(req, res){
        const {name, email, password} = req.body;

        try{
            if(!name || !email || !password){
                return res.status(400).send({
                    errorFields: 'Error at register fields'
                });
            };
            await userModel.create({
                name, email, password
            });
            //console.log('User register sucessfully');
            return res.status(200).send({
                sucessMsg: 'User register sucessfully'
            });
        }
        catch(error){
            res.status(500).send({
                error: 'Internal server error at registerUser', error
            });
        };
    };

    
};


module.exports = new User();