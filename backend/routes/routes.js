
const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const userController = require('../controller/UserController');
const cartController = require('../controller/CartController');
const ordersController = require('../controller/OrdersController');

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
router.put('/user/:id', userController.editUser);
router.post('/login', userController.login);
router.get('/authCheck', userController.verifyToken);
router.get('/logout', userController.logOut);
router.get('/userData/:userID', userController.userData);
router.put('/userAddress/:userID', userController.addressAdd);
router.post('/isClientAdd/:userID', userController.isClientAdd);


//port 2300 //Cart
router.post('/cart', cartController.addProductCart);
router.post('/cartProducts', cartController.findProductsCart);
router.delete('/cartRemoveProducts/:userid/:productid' , cartController.removeProductCart);
router.post('/createClient', cartController.createCliente);
router.post('/compraFinal', cartController.finalPurchase);
router.get('/chargeClients', cartController.chargeOfClients);


//port 2300 //Orders
router.post('/createOrder', ordersController.createOrder);
router.get('/findOrders/:userID', ordersController.findOrders);


module.exports = router;