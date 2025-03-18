
const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const userController = require('../controller/UserController');
const cartController = require('../controller/CartController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

//port 2300 //Product
router.get('/test', productController.Teste);
router.post('/product', upload.single('image'), productController.CreateProduct);
router.get('/products', productController.Products);
router.delete('/product/:id', productController.Delete);
router.get('/product/:id', productController.findProductByid);
router.put('/product/:id', upload.single('image'), productController.editProduct);


//port 2300 //User
router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.get('/authCheck', userController.verifyToken);
router.get('/logout', userController.logOut);
router.get('/userData', userController.userData);

//port 2300 //Cart
router.post('/cart', cartController.addProductCart);
router.post('/cartProducts', cartController.findProductsCart);
router.delete('/cartRemoveProducts/:userid/:productid' , cartController.removeProductCart);

module.exports = router;