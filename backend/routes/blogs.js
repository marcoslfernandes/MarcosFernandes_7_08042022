const express = require('express');
const router = express.Router();
const publiCtrl = require('../controls/blogs');

// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer');


router.post('/signup/:id', publiCtrl.createPost);
router.delete('/del/:id', publiCtrl.deletePost);
router.get('/posts/', publiCtrl.findAll);

// router.put('/:id', auth, multer, publiCtrl.modifyPubli);

module.exports = router;