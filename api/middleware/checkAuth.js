const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Check token by verifying methods from jwt
    const token = req.headers.authorization.split(' ')[1]; // remove string Bearer from the token

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    // If error
    return res.status(401).json({ message: 'Authentication failed.' });
  }
};
