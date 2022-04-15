const express = require('express');
const router = express.Router();
const userCtrl = require('../controls/user');
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id/del', userCtrl.delete);
router.put('/update/:id', userCtrl.updateUser);
router.get('/users', userCtrl.findAll)
module.exports = router;