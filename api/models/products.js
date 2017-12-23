const mongoose = require('mongoose');

// Create Schema and data types
const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

// export model, so the model can be use by another files
module.exports = mongoose.model('Products', ProductSchema);