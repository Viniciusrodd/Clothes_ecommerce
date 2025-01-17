
const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

//port 2300
router.get('/test', userController.Teste);
router.post('/product', upload.single('image'), userController.CreateProduct);
router.get('/products', userController.Products);
router.delete('/product/:id', userController.Delete);


module.exports = router;