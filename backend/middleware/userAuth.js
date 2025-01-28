
function userAuth(req, res, next){
    console.log('Checking session:', req.session);
    if(req.session){
        next();
        console.log('Middleware auth sucess');
    }else{
        console.log('Middleware auth error');
        return res.status(406).send({
            errorAuth: 'Middleware auth error'
        })
    }
};

module.exports = userAuth;