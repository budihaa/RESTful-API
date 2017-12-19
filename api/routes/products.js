const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "GET Products"
  })
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: "POST Products"
  })
});

// routes for individual product
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if(id == "special") {
    res.status(200).json({
      message: "You have discovered the special ID",
      id: id
    });
  } else {
    res.status(200).json({
      message: "You got spesific ID"
    });  
  }  
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: "Updated Product"
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: "Deleted Product"
  });
});

module.exports = router;