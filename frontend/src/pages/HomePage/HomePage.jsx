import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import * as gameService from '../../services/gameService'; 
import Search from '../../components/SearchBar/SearchBar';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllGames = async () => {
    const gamesData = await gameService.rawGIdx();
    setGames(gamesData.results);
  };

  const handleSearch = async (e) => {
    e.preventDefault();  
    if (searchQuery !== '') {
      console.log(searchQuery);
      const searchResults = await gameService.search(searchQuery);
      setGames(searchResults.results);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h1>Browse Games</h1>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={handleSearch}
        />
      </header>

      <div className={styles.gameGrid}>
        {games.map(game => (
          <div key={game.id} className={styles.gameCard}>
            <img src={game.background_image} alt={game.name} className={styles.gameImage} />
            <div className={styles.gameInfo}>
              <h2>{game.name}</h2>
              <p>Rating: {game.rating}</p>
              <button className={styles.button}>Like</button>
              <button className={styles.button}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;