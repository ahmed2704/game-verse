const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/games');

// All paths start with '/api/games'

// POST /api/games
// router.get('/', gameCtrl.index);

router.get('/rawGIdx', gameCtrl.rawGIdx);

module.exports = router;