
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

    async editUser(req, res){
        const userId = req.params.userID;
        const { name, email } = req.body.userData;
        
        if(!name || !email){
            console.log('Bad request at name, email request');
            return res.status(400).send('Bad request at name, email request');
        }
        try{
            const userExist = await userModel.find({
                _id: userId
            });

            if(!userExist){
                console.log('Data not found');
                return res.status(404).send('Data not found');
            }

            const dataUpdated = await userModel.updateOne({ _id: userId }, {
                $set: { 
                    name,
                    email
                }
            });

            if(dataUpdated){
                return res.status(200).send({ msg: 'data updated' });
            }
        }
        catch(error){
            console.log('Internal server error at edituser', error);
            return res.status(500).send('Internal server error at edituser', error);
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
                sameSite: 'Strict',
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 dias
            });
            return res.status(200).send({
                successMsg: "User login successfully",
                user: user.name
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
        //console.log("Cookies recebidos:", req.cookies);
        const token = req.cookies.token; //Avoid Error if req.cookies being undefined
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

        res.json({ message: "User is authenticated", user: req.user });
    };

    logOut(req, res){
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
        res.json({ message: "User logged out successfully" }); 
    };

    async userData(req, res){
        const userId = req.params.userID;
        if(!userId){
            return res.status(400).send('Bad request at userId');
        }
        try{
            const userdata = await userModel.find({
                _id: userId
            });

            if(!userdata){
                console.log('Error at find userdata by id');
                return res.status(404).send('Error at find userdata by id');
            }

            return res.status(200).send({
                userdata
            })
        }
        catch(error){
            console.log('Internal error server at get userData', error);
            return res.status(500).send('Internal error server at get userData', error);
        };
    };
};


module.exports = new User();