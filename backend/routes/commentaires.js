const express = require('express');
const router = express.Router();

const commentCtrl = require('../controls/commentaires');
const auth = require('../middleware/auth');

router.post('/:id', auth, commentCtrl.createComment);
router.delete('/del/:id', commentCtrl.deleteComment);
router.get('/:id', commentCtrl.findAll);
router.get('/:id', commentCtrl.findOne);

module.exports = router;