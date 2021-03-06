const mongoose = require('mongoose');

// Model
const Product = require('./../models/products');

exports.getAllProducts = (req, res, next) => {
  // Fetching all data from DB
  Product.find()
    .select('_id name price productImage') // to select only several fields that show
    .exec()
    .then((results) => {
      const response = {
        totalData: results.length, // itung berapa ada data
        products: results.map((result) => {
          // map into new array
          return {
            _id: result._id,
            name: result.name,
            price: result.price,
            productImage: result.productImage,
            request: {
              type: 'GET',
              desc: 'Get single product',
              url: 'http://localhost:3000/products/' + result._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.createProduct = (req, res, next) => {
  // Create instances from model
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path, // save image path to DB
  });

  // Saving data to DB
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Created product successfully',
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: 'GET',
            desc: 'Get this individual product',
            url: 'http://localhost:3000/products/' + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.getSingleProduct = (req, res, next) => {
  // take the id from url
  const id = req.params.productId;

  // Find spesific id from DB
  Product.findById(id)
    .select('_id name price productImage')
    .exec()
    .then((result) => {
      // check if ID not exist
      if (result) {
        res.status(200).json({
          product: result,
          request: {
            type: 'GET',
            desc: 'Get all products',
            url: 'http://localhost:3000/producst/',
          },
        });
      } else {
        res.status(404).json({ message: 'ID not found.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;

  // Check if user dont want update all data
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product successfully updated',
        request: {
          type: 'GET',
          desc: 'Get updated product',
          url: 'http://localhost:3000/products/' + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product successfully deleted',
        request: {
          type: 'POST',
          desc: 'Create new product',
          url: 'http://localhost:3000/products/',
          body: { name: 'String', price: 'Number' },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
