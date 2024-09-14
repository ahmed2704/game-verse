const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/games');
const reviewCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/games'

// POST /api/games
// router.get('/', gameCtrl.index);

// GET /api/games/rawGIdx
router.get('/rawGIdx', gameCtrl.rawGIdx);

// GET /api/games/rawGShow
router.get('/rawGShow/:id', gameCtrl.rawGShow);

// POST /api/games/:id/reviews
router.post('/:id/reviews', reviewCtrl.createReview);

// PUT /api/games/:gameId/reviews/:reviewId
router.put('/:gameId/reviews/:reviewId', reviewCtrl.updateReview);

// DELETE /api/games/:gameId/reviews/:reviewId
router.delete('/:gameId/reviews/:reviewId', reviewCtrl.deleteReview);

module.exports = router;