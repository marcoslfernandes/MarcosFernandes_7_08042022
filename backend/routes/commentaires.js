const express = require('express');
const router = express.Router();

const commentCtrl = require('../controls/commentaires');
// const auth = require('../middleware/auth');

router.post('/:id', commentCtrl.createComment);
// router.delete('/:id', auth, commentCtrl.deleteComment);
// router.get('/', auth, commentCtrl.getComment);


module.exports = router;