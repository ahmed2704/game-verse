const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
  rawgId: { type: String, required: true },
  name: { type: String, required: true },
  genre: [String],
  platforms: [String],
  description: String,
  image: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Game", gameSchema);
