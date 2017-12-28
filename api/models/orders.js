const mongoose = require('mongoose');

// import Product model
const Product = require('./products');

const OrderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  // create relation
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  // automatically asign to 1 if the qty not asigned
  qty: { type: Number, default: 1 },
});

module.exports = mongoose.model('Order', OrderSchema);
