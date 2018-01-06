const mongoose = require('mongoose');

// import model
const Product = require('./../models/products');
const Order = require('./../models/orders');

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .select('_id product qty')
    .populate('product', 'name') // like join table, but only show product name
    .exec()
    .then((results) => {
      res.status(200).json({
        totalOrders: results.length,
        orders: results.map((result) => {
          return {
            _id: result.id,
            product: result.product,
            qty: result.qty,
            request: {
              type: 'GET',
              desc: 'Get single order',
              url: 'http://localhost:3000/orders/' + result._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.createOrder = (req, res, next) => {
  // Validasi apakah productId
  Product.findById(req.body.product)
    .then((productId) => {
      // Klo productId ga ketemu
      if (!productId) {
        return res.status(404).json({
          message: 'Product not found.',
        });
      }

      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.product,
        qty: req.body.qty,
      });
      return order.save().then((result) => {
        res.status(201).json({
          message: 'Order created successfully',
          createdOrder: {
            _id: result._id,
            product: result.product,
            qty: result.qty,
          },
          request: {
            type: 'GET',
            desc: 'Get individual order that just created',
            url: 'http://localhost:3000/orders/' + result._id,
          },
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.getSingleOrder = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select('_id product qty')
    .populate('product')
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Order not found.' });
      }

      res.status(200).json({
        order: {
          _id: result._id,
          product: result.product,
          qty: result.qty,
        },
        request: {
          type: 'GET',
          desc: 'Get all orders',
          url: 'http://localhost:3000/orders/',
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.deleteOrder = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Order successfully deleted',
        request: {
          type: 'POST',
          desc: 'Create new order',
          url: 'http://localhost:3000/orders/',
          body: { product: 'productId', qty: 'Number' },
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
