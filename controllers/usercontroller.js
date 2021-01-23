const router = require('express').Router();
const User = require('../db').import('../models/user.js');

/* ************************
 *** USER REGISTER ***
 ************************* */

router.post('/register', (req, res) => {
  User.create({
    username: req.body.user.username,
    passwordhash: req.body.user.passwordhash,
  }).then(res.send('This is our user/register endpoint'));
});

module.exports = router;
