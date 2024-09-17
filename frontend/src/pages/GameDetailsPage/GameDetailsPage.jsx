import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as gameService from '../../services/gameService'; 
import { getUser } from '../../services/authService'; 
import styles from './GameDetailsPage.module.css'; 
import LogRocket from 'logrocket';
LogRocket.init('ooaxuu/game-verse');

const GameDetailsPage = ( {user} ) => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');


  useEffect(() => {
    fetchGameDetails();
  }, [id]);

  const fetchGameDetails = async () => {
    try {
      const data = await gameService.rawGShow(id);
      setGameDetails(data.rawgData);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (reviewText.trim()) {
      try {
        const newReview = await gameService.createReview(id, { text: reviewText, rating: 5 });
        setReviews([...reviews, newReview]);
        setReviewText('');
      } catch (error) {
        console.error('Error adding review:', error);
      }
    }
  };

  if (!gameDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{gameDetails.name}</h1>
      <img src={gameDetails.background_image} alt={gameDetails.name} style={{ width: '100%' }} />
      <div dangerouslySetInnerHTML={{__html:gameDetails.description}}></div>

      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <p>{review.content}</p>
            {review.user._id === user._id && (
              <div>
                <button onClick={() => handleEditReview(review)}>Edit</button>
                <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Be the first one to write a review!</p>
      )}

      <h2>Add a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default GameDetailsPage;