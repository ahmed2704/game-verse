const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/games');
const reviewCtrl = require('../controllers/reviews');

// All paths start with '/api/games'

// GET /api/games/rawGIdx
router.get('/rawGIdx', gameCtrl.rawGIdx);

// GET /api/games/rawGShow
router.get('/rawGShow/:id', gameCtrl.rawGShow);

// GET /api/games/search
router.get('/search', gameCtrl.search);

// GET /api/games/liked
router.get('/liked', gameCtrl.getLikedGames);

// PUT /api/games/:id/toggleLike
router.put('/:id/toggleLike', gameCtrl.toggleLike);

// POST /api/games/:id/reviews
router.post('/:id/reviews', reviewCtrl.createReview);

// PUT /api/games/:gameId/reviews/:reviewId
router.put('/:gameId/reviews/:reviewId', reviewCtrl.updateReview);

// DELETE /api/games/:gameId/reviews/:reviewId
router.delete('/:gameId/reviews/:reviewId', reviewCtrl.deleteReview);

module.exports = router;