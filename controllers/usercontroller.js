const router = require('express').Router();
const User = require('../db').import('../models/user.js');
const jwt = require('jsonwebtoken');

/* ************************
 *** USER REGISTER ***
 ************************* */

router.post('/register', (req, res) => {
  User.create({
    username: req.body.user.username,
    passwordhash: req.body.user.passwordhash,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      res.json({
        user: user,
        message: 'User successfully created',
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/* ************************
 *** USER LOGIN ***
 ************************* */

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({
          user: user,
          message: 'User successfully logged in',
          sessionToken: token,
        });
      } else {
        res.send('User does not exist.');
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
