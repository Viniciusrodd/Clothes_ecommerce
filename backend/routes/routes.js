
const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const userController = require('../controller/UserController');

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

module.exports = router;