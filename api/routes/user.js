const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Package for hashing password
const jwt = require('jsonwebtoken'); // JWT

const User = require('./../models/user');

router.post('/signup', (req, res, next) => {
  // Checking email
  User.find({ email: req.body.email }).then((user) => {
    // klo email sudah ada
    if (user.length >= 1) {
      return res.status(409).json({ message: 'Email exist.' });
    } else {
      // Use bcrypt to hash user password;
      // Salt is method to give the hashed password with string, so user can google the hashed password
      bcrypt.hash(
        req.body.password,
        10, // the saltRound
        (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            // Save to DB
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({ message: 'Account created' });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          } // end else
        }
      );
    } // end else
  });
});

// LOGIN
router.post('/login', (req, res, next) => {
  // Cari user
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      // Klo user ga exist
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed.',
        });
      }

      // Kalo exist, decrypt passwordnya
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        // klo password ga sesuai
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed.',
          });
        }
        // klo password sesuai
        if (result) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Authentication success.',
            token: token,
          });
        }
        res.status(401).json({ message: 'Authentication failed.' });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

// DELETE USER
router.delete('/:userId', (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      return res.status(200).json({
        message: 'User has been deleted.',
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

module.exports = router;
