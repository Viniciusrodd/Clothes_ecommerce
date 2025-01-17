
const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/test', userController.teste);
router.post('/product', upload.single('image'), userController.createProduct);
router.get('/products', userController.products);


module.exports = router;