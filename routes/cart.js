const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const {addToCart, getCart, deleteCart, increaseCart, decreaseCart} = require('../controllers/cart');

router.post('/add', authenticateToken, addToCart);

router.get('/mycart', authenticateToken, getCart);

router.delete('/remove/:id',authenticateToken, );

router.patch('/increase/:id', authenticateToken,);

router.patch('/decrease/:id', authenticateToken,)

module.exports = router;