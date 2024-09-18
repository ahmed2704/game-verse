const { get } = require("mongoose");
const Game = require("../models/game");
const baseURL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_KEY;

module.exports = {
  // index,
  rawGIdx,
  rawGShow,
  getLikedGames,
  search,
  toggleLike,
  getOrCreateGame,
};

//INDEX GAMES FROM RAWG
async function rawGIdx(req, res) {
  console.log("rawGIdx");
  try {
    const games = await fetch(`${baseURL}/games?key=${API_KEY}`);
    const gamesJson = await games.json();
    res.status(200).json(gamesJson);
  } catch (err) {
    res.status(500).json(err);
  }
}

//SHOW GAME FROM RAWG
async function rawGShow(req, res) {
  try {
    let game = await getOrCreateGame(req.params.id);

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json(err);
  }
}

//SEARCH games from RAWG
async function search(req, res) {
  console.log(req.query.search);
  console.log(req.body);
  try {
    const games = await fetch(
      `${baseURL}/games?key=${API_KEY}&search=${req.query.search}`
    );
    const gamesJson = await games.json();
    res.status(200).json(gamesJson);
  } catch (err) {
    res.status(500).json(err);
  }
}

//INDEX GAMES FROM MY DATABASE
async function getLikedGames(req, res) {
  try {
    const games = await Game.find({ likes: req.user._id });
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function toggleLike(req, res) {
  try {
    
    const game = await getOrCreateGame(req.params.id);
    const index = game.likes.findIndex((id) => id.equals(req.user._id));

    if (index > -1) {
      game.likes.splice(index, 1);
    } else {
      game.likes.push(req.user._id);
    }

    await game.save();
    res.status(200).json(game);
  } catch (error) {
    console.error("Error in toggleLike:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//HELPER FUNCTION
async function getOrCreateGame(rawgId) {
  let game = await Game.findOne({ rawgId }).populate("reviews.user");

  if (!game) {
    const rawgResponse = await fetch(
      `${baseURL}/games/${rawgId}?key=${API_KEY}`
    );
    const gameJson = await rawgResponse.json();

    game = new Game({
      rawgId: gameJson.id,
      name: gameJson.name,
      genre: gameJson.genres.map((g) => g.name),
      platforms: gameJson.platforms.map((p) => p.platform.name),
      description: gameJson.description,
      image: gameJson.background_image,
      reviews: [],
    });

    await game.save();
  }
  return game;
}

// INDEX games in my database
// async function index(req, res) {
//   try {
//     const games = await Game.find({})
//     .populate('reviews');
//     res.status(200).json(games);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
