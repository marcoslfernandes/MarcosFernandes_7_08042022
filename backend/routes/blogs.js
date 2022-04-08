const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const publiCtrl = require('../controls/blogs');

router.get('/', auth, publiCtrl.getAllPubli);
router.post('/', auth, multer, publiCtrl.createPubli);
router.get('/:id', auth, publiCtrl.getOnePubli);
router.put('/:id', auth, multer, publiCtrl.modifyPubli);
router.delete('/:id', auth, publiCtrl.deletePubli);

module.exports = router;