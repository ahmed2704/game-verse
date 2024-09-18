import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as gameService from "../../services/gameService";
import styles from "./GameDetailsPage.module.css";
import LogRocket from "logrocket";


const GameDetailsPage = ({ user }) => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    fetchGameDetails();
  }, [id]);

  const fetchGameDetails = async () => {
    console.log(user, "user");
    try {
      const data = await gameService.rawGShow(id);
      if (data.game) {
        setGameDetails(data.game);
        setReviews(data.reviews || []);
      } else {
        const rawgGame = await gameService.fetchFromRawg(id);
        const savedGame = await gameService.createGameInDB(rawgGame);
        setGameDetails(savedGame);
        setReviews(savedGame.reviews || []);
      }
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (!reviewText.trim()) return;

    try {
      if (editingReviewId) {
        const updatedGame = await gameService.updateReview(gameDetails._id, editingReviewId, { content: reviewText });
        setReviews(updatedGame.reviews);
        setEditingReviewId(null);
      } else {
        const newReview = await gameService.createReview(id, { content: reviewText });
        setReviews([...reviews, newReview]);
      }
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleEditReview = (review) => {
    setReviewText(review.content);
    setEditingReviewId(review._id);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await gameService.deleteReview(gameDetails._id, reviewId);
      const updatedReviews = reviews.filter(
        (review) => review._id !== reviewId
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (!gameDetails) return <div>Loading...</div>;
  return (
    <div>
      <h1>{gameDetails.name}</h1>
      <img
        src={gameDetails.image}
        alt={gameDetails.name}
        style={{ width: "100%" }}
      />
      <div dangerouslySetInnerHTML={{ __html: gameDetails.description }}></div>

      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <p>{review.content}</p>
            {user && review.user && review.user._id === user._id && (
              <div>
                <button onClick={() => handleEditReview(review)}>Edit</button>
                <button onClick={() => handleDeleteReview(review._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Be the first one to write a review!</p>
      )}

      <h2>{editingReviewId ? "Edit" : "Add"} a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          required
        />
        <button type="submit">
          {editingReviewId ? "Update" : "Submit"} Review
        </button>
      </form>
    </div>
  );
};

export default GameDetailsPage;