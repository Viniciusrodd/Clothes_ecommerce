
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

class User{
    async registerUser(req, res){
        const {name, email, password} = req.body;

        try{
            if(!name || !email || !password){
                return res.status(400).send({
                    errorFields: 'Error at register fields'
                });
            };

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            await userModel.create({
                name, email, password: hash
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
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({
                emptyCamps: "Fields for login doesn't exist"
            });
        }
   
        try{
            const user = await userModel.findOne({ email });

            if(!user){
                return res.status(404).send({
                    notFind: "User datas doesn't exist"
                });
            }

            if (!user.password) {
                return res.status(404).send({
                    error: "User password is missing in the database"
                });
            }

            const comparePass = await bcrypt.compare(password, user.password);
            if(!comparePass){
                return res.status(406).send({
                    status: false, 
                    error: 'User password not found'
                });                
            }

            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email
            }
            console.log('Session created:', req.session.user);
            return res.status(200).send({
                successMsg: "User login successfully",
                user
            });
        }
        catch(error){
            console.log('Internal error at login user', error);
            return res.status(500).send({
                serverError: 'Internal error at login user', error
            });
        };
    };

    async userAuthTest(req, res){
        const email = req.session.user
        console.log('emaillllll: ', email)
        try{
            const user = await userModel.findOne({ email });
            console.log(user)
            if(!user){
                return res.status(404).send({
                    errorMsg: 'Error at userAuthTest, user not finded'
                });    
            }
            return res.status(200).send({
                user
            })
        }
        catch(error){
            console.log('Internal server error at userAuthTest');
            return res.status(500).send({
                errorMsg: 'Internal error at userAuthTest'
            });
        };
    };
};


module.exports = new User();