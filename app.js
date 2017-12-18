const express = require('express');
const app = express();

// Send JSON Data
app.use( (req, res, next) => {
  res.status(200).json({
    greetings : "Hello World"
  });
});

module.exports = app;