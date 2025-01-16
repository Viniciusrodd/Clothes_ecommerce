
const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.get('/test', userController.teste);
router.post('/product', userController.create);

module.exports = router;