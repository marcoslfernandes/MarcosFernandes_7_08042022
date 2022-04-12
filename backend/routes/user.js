const express = require('express');
const router = express.Router();

const userCtrl = require('../controls/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id/del', userCtrl.delete);

module.exports = router;