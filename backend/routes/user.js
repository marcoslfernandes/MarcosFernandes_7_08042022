const express = require('express');
const router = express.Router();
const userCtrl = require('../controls/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id/del', auth, userCtrl.delete);
router.put('/update/:id', auth, userCtrl.updateUser);
router.get('/users', userCtrl.findAll);
router.get('/profil/:id', userCtrl.findOne);
router.get('/postuser/:id', userCtrl.findOnePost);

module.exports = router;