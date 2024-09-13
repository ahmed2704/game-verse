const Game = require("../models/game");
const baseURL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_KEY;

module.exports = {
  // index,
  rawGIdx,
  rawGShow,
};

//INDEX GAMES FROM RAWG
async function rawGIdx(req, res) {
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
    const game = await fetch(`${baseURL}/games/${req.params.id}?key=${API_KEY}`);
    const gameJson = await game.json();
    
    res.status(200).json(gameJson);
  } catch (err) {
    res.status(500).json(err);
  }
};


// //INDEX
// async function index(req, res) {
//   try {
//     const games = await Game.find({})
//     .populate('genre');
//     res.status(200).json(games);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };