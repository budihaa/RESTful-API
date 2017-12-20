const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "GET orders"
  })
});

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    qty: req.body.qty
  }
  res.status(201).json({
    message: "POST orders",
    order: order 
  })
});

// routes for individual order
router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: "You got individual order",
    id: req.params.orderId
  })
});

router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: "Updated order"
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: "Deleted order"
  });
});

module.exports = router;