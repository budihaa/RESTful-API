const express = require('express');
const router = express.Router();

// import middleware for auth user
const checkAuth = require('./../middleware/checkAuth');

// import controller
const orderController = require('./../controllers/orders');

router.get('/', checkAuth, orderController.getAllOrders);

router.post('/', checkAuth, orderController.createOrder);

router.get('/:orderId', checkAuth, orderController.getSingleOrder);

router.delete('/:orderId', checkAuth, orderController.deleteOrder);

module.exports = router;
