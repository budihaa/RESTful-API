const mongoose = require('mongoose');

// Create Schema and data types
const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { required: true, type: String },
  price: { required: true, type: Number },
  productImage: { required: true, type: String },
});

// export model, so the model can be use by another files
module.exports = mongoose.model('Product', ProductSchema);
