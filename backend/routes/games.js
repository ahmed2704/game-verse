const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/games');
const reviewCtrl = require('../controllers/reviews');

// All paths start with '/api/games'

// POST /api/games
// router.get('/', gameCtrl.index);

// GET /api/games/rawGIdx
router.get('/rawGIdx', gameCtrl.rawGIdx);

// GET /api/games/rawGShow
router.get('/rawGShow/:id', gameCtrl.rawGShow);

// POST /api/games/:id/reviews
router.post('/:id/reviews', reviewCtrl.createReview);

module.exports = router;