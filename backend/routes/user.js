const express = require('express');
const router = express.Router();

const userCtrl = require('../controls/user');

router.post('/signup', userCtrl.store);
// router.post('/login', userCtrl.login);

module.exports = router;