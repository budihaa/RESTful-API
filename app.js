const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Import routes files
const productRoutes = require('./api/routes/products'); 
const orderRoutes = require('./api/routes/orders');

// Use morgan to log on console what happen
app.use(morgan('dev'));

// Body Parser to read json data from user
app.use(bodyParser.urlencoded({extended: false})); // to read encoded URL
app.use(bodyParser.json());

// Handling CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATH, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Set the routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handling
// error 404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// error for anywhere in this app
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;
