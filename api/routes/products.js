const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Product = require('./../models/products');

router.get('/', (req, res, next) => {

	// Fetching all data from DB
	Product.find()
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});

});


router.post('/', (req, res, next) => {
  
  // Create instances from model
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  // Saving data to DB
  product.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "POST Products",
      createdProduct: product
    });
  })
  .catch(err => {
		console.log(err);
    res.status(500).json({error: err});
  });

});


// routes for individual product
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  
  // Find spesific id from DB
  Product.findById(id)
  .exec()
  .then(result => {
		console.log("From database", result);
		
		// check if ID not exist
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "ID not found."})
		}
    
  })
  .catch(err => {
		console.log(err);
    res.status(500).json({error: err});
  });

});


router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId;

	// Check if user dont want update all data
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: id }, { $set: updateOps })
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});

});


router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		res.status(500).json({error: err});
	});
});

module.exports = router;