const Game = require("../models/game");
const baseURL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_KEY;

module.exports = {
  // index,
  rawGIdx,
  rawGShow,
  showLikedGames,
  search,
};

//INDEX GAMES FROM RAWG
async function rawGIdx(req, res) {
  console.log('rawGIdx');
  try {
    const games = await fetch(`${baseURL}/games?key=${API_KEY}`);
    const gamesJson = await games.json();
    res.status(200).json(gamesJson);
  } catch (err) {
    res.status(500).json(err);
  }
};

//SHOW GAME FROM RAWG
async function rawGShow(req, res) {
  try {
    let game = await Game.findOne({ rawgId: req.params.id }).populate('reviews.user');

    if (!game) {
      const rawgResponse = await fetch(`${baseURL}/games/${req.params.id}?key=${API_KEY}`);
      const gameJson = await rawgResponse.json();

      game = new Game({
        rawgId: gameJson.id,
        name: gameJson.name,
        genre: gameJson.genres.map(g => g.name),
        platforms: gameJson.platforms.map(p => p.platform.name),
        description: gameJson.description,
        image: gameJson.background_image,
        reviews: []
      });

      await game.save();
    }

    res.status(200).json({ game, reviews: game.reviews });
  } catch (err) {
    res.status(500).json(err);
  }
}

//SEARCH games from RAWG
async function search(req, res) {
  console.log(req.query.search);
  console.log(req.body);
  try {
    const games = await fetch(`${baseURL}/games?key=${API_KEY}&search=${req.query.search}`);
    const gamesJson = await games.json();
    res.status(200).json(gamesJson);
  } catch (err) {
    res.status(500).json(err);
  }
}

//INDEX GAMES FROM MY DATABASE
async function showLikedGames(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('likes');
    if (!user || !user.likes.length) {
      return res.status(404).json({ message: 'No liked games found.' });
    }
    res.status(200).json(user.likes);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
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