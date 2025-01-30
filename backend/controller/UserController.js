
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretToken = 'hfbdsab3o21h4b321khb';

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

            let tokenVar = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email
            }, secretToken)

            res.cookie('token', tokenVar, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });
            return res.status(200).send({
                successMsg: "User login successfully"
            });
        }
        catch(error){
            console.log('Internal error at login user', error);
            return res.status(500).send({
                serverError: 'Internal error at login user', error
            });
        };
    };

    verifyToken(req, res, next){
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ 
                error: "Not authenticated" 
            });
        }

        jwt.verify(token, secretToken, (err, data) =>{
            if(err){
                return res.status(403).json({ error: "Invalid token" });
            }
            req.user = data;
            next();
        });
    };
};


module.exports = new User();