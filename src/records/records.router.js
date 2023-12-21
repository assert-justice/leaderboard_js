const express = require('express');
const { list,add } = require('./records.controller');
const router = express.Router();

router.get('/:game_id',list);
router.post('/:game_id/:player_name/:player_score', add);

module.exports = router;