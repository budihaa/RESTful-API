const express = require('express');
const app = express();

// Import routes files
const productRoutes = require('./api/routes/products'); 
const orderRoutes = require('./api/routes/orders');

// Set the routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;