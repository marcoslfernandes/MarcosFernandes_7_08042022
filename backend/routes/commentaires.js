const express = require('express');
const router = express.Router();

const commentCtrl = require('../controls/commentaires');
// const auth = require('../middleware/auth');

router.post('/:id', commentCtrl.createComment);
router.delete('/del/:id', commentCtrl.deleteComment);
router.get('/', commentCtrl.findAll);


module.exports = router;