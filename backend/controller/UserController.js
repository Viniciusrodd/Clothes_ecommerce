
const userModel = require('../models/userModel');

class User{
    async registerUser(req, res){
        const {name, email, password} = req.body;

        try{
            if(!name || !email || !password){
                res.status(404).send({
                    errorFields: 'Error at register fields'
                });
            };

            res.status(200).send({
                sucessMsg: 'User registered with sucess'
            })
        }
        catch(error){
            res.status(500).send({
                error: 'Internal server error at registerUser', error
            });
        };
    };
};


module.exports = new User();