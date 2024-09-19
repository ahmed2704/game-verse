const Game = require("../models/game");
const axios = require("axios");
const API_KEY = process.env.RAWG_KEY;
const baseURL = `https://api.rawg.io/api`;

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};

// CREATE REVIEW
async function createReview(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    let game = await Game.findOne({ rawgId: req.params.id });

    if (!game) {
      const rawgResponse = await axios.get(
        `${baseURL}/games/${req.params.id}?key=${API_KEY}`
      );
      if (!rawgResponse.data) {
        return res.status(404).json({ error: "Game not found on RAWG API" });
      }

      game = new Game({
        rawgId: rawgResponse.data.id,
        name: rawgResponse.data.name,
        genre: rawgResponse.data.genres.map((g) => g.name),
        platforms: rawgResponse.data.platforms.map((p) => p.platform.name),
        description: rawgResponse.data.description,
        image: rawgResponse.data.background_image,
        likes: [],
        reviews: [],
      });

      await game.save();
    }

    const review = {
      user: req.user._id,
      game: game._id,
      content: req.body.content,
      rating: req.body.rating,
    };

    const newReview = game.reviews.create(review);
    game.reviews.push(newReview);
    await game.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// UPDATE REVIEW
async function updateReview(req, res) {
  try {
    const game = await Game.findById(req.params.gameId).populate('reviews.user');
    const review = game.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    review.content = req.body.content || review.content;
    review.rating = req.body.rating || review.rating;

    await game.save();

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteReview(req, res) {
  try {
    const game = await Game.findById(req.params.gameId);
    const review = game.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    game.reviews.remove({ _id: req.params.reviewId });

    await game.save();

    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
