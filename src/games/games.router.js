const express = require('express');
const { list,add } = require('./games.controller');
const router = express.Router();

router.get('/',list);
router.post('/:name', add);

module.exports = router;