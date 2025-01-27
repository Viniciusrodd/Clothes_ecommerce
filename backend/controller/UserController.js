
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

    async login(req, res){
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).send({
                emptyCamps: "Fields for login doesn't exist"
            });
        }
   
        try{
            let fieldsExist = await userModel.find({name, email, password});
            if(fieldsExist.length === 0){
                return res.status(404).send({
                    notFind: "User datas doesn't exist"
                });
            }

            return res.status(200).send({
                successMsg: "User login successfully",
                fieldsExist
            })
        }
        catch(error){
            console.log('Internal error at login user', error);
            return res.status(500).send({
                serverError: 'Internal error at login user', error
            });
        };
    };
};


module.exports = new User();