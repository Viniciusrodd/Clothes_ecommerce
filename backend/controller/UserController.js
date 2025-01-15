
class User{
    teste(req, res){
        return res.json({
            status: 200,
            msg: 'Sucess testing'
        });
    };
};

module.exports = new User();