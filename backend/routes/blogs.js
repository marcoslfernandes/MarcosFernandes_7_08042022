const express = require('express');
const router = express.Router();
const publiCtrl = require('../controls/blogs');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/:id', multer, publiCtrl.createPost);
router.delete('/del/:id', publiCtrl.deletePost);
router.get('/', publiCtrl.findAll);

// router.put('/:id', auth, multer, publiCtrl.modifyPubli);

module.exports = router;