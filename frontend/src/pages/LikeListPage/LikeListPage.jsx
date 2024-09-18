import React, { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService'; 
import styles from './LikedListPage.module.css';


import { NavLink } from 'react-router-dom';

const LikedGamesPage = () => {
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

  return (
    <div>
      <h1>Your Liked Games</h1>
      <div className={styles.gameGrid}>
        {likedGames.length > 0 ? (
          likedGames.map(game => (
            <div key={game._id} className={styles.gameCard}>
              <img src={game.image} alt={game.name} className={styles.gameImage} />
              <div className={styles.gameInfo}>
                <h2>{game.name}</h2>
                <NavLink to={`/games/rawGShow/${game.rawgId}`}>
                  <button className={styles.button}>Details</button>
                </NavLink>
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

export default LikedGamesPage;
