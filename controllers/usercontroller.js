const router = require('express').Router();
const User = require('../db').import('../models/user.js');

/* ************************
 *** USER REGISTER ***
 ************************* */

router.post('/register', (req, res) => {
  User.create({
    username: req.body.user.username,
    passwordhash: req.body.user.passwordhash,
  })
    .then(function createSuccess(user) {
      res.json({ user: user });
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
        res.status(200).json({ user: user });
      } else {
        res.send('User does not exist.');
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
