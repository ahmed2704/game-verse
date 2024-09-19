import React, { useEffect, useState } from "react";
import * as gameService from "../../services/gameService";
import styles from "./LikeListPage.module.css";

import { NavLink } from "react-router-dom";

const LikeListPage = () => {
  const [likedGames, setLikedGames] = useState([]);

  useEffect(() => {
    fetchLikedGames();
  }, []);

  const fetchLikedGames = async () => {
    try {
      const games = await gameService.fetchLikedGames();
      setLikedGames(games);
    } catch (error) {
      console.error("Error fetching liked games:", error);
    }
  };

  const handleRemoveLike = async (gameId) => {
    try {
      const updatedGame = await gameService.toggleLike(gameId);
      const updatedGames = likedGames.filter((game) => game._id !== gameId);
      setLikedGames(updatedGames);
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  return (
    <div>
      <h1>Your Liked Games</h1>
      <div className={styles.gameGrid}>
        {likedGames.length > 0 ? (
          likedGames.map((game) => (
            <div key={game._id} className={styles.gameCard}>
              <img
                src={game.image}
                alt={game.name}
                className={styles.gameImage}
              />
              <div className={styles.gameInfo}>
                <h2>{game.name}</h2>
                <NavLink to={`/games/rawGShow/${game.rawgId}`}>
                  <button className={styles.button}>Details</button>
                </NavLink>
                <button
                  onClick={() => handleRemoveLike(game._id)}
                  className={styles.button}
                >
                  Remove Like
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You haven't liked any games yet!</p>
        )}
      </div>
    </div>
  );
};

export default LikeListPage;
