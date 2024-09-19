# GameVerse

## Overview
**GameVerse** is a web application that allows users to explore a wide variety of games, view detailed information about each game, and interact with the platform by liking games and adding them to their personal liked list. Users can also write reviews on specific games and manage their liked games list. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and integrates with the RAWG.io API to fetch game data.

## Features
- Browse games from the RAWG.io API
- View detailed information about each game
- Search for games by name
- Like and unlike games
- View and manage your list of liked games
- Add, edit, and delete reviews on games

## Technologies Used
- **Frontend**: React, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose for schema management)
- **API Integration**: RAWG.io API for game data
- **Authentication**: JWT-based authentication
- **State Management**: React's useState and useEffect hooks


## API Routes

### Backend Routes (Express API)
- **GET /api/games/rawGIdx** - Fetch a list of games from RAWG.io API
- **GET /api/games/search** - Search for a game
- **GET /api/games/:id** - Get detailed information about a game
- **POST /api/games/:id/reviews** - Add a review for a game
- **PUT /api/games/:gameId/reviews/:reviewId** - Edit a review
- **DELETE /api/games/:gameId/reviews/:reviewId** - Delete a review
- **PUT /api/games/:id/toggleLike** - Like or unlike a game
- **GET /api/games/liked** - Get all games liked by the user

## User Authentication
This app uses JSON Web Tokens (JWT) for user authentication. Users need to sign up and log in to interact with the platform (e.g., liking games and adding reviews).

### Sign Up / Log In
- Users can sign up or log in with their email and password.
- Authenticated users are issued a JWT, which is stored in local storage for future API requests.

## Liking a Game
Users can toggle likes for games. When a game is liked, it is added to the user's list of liked games. If the user "unlikes" the game, it is removed from their list.

## Reviews
Users can write reviews for games they have played. Reviews can be edited or deleted by the user who created them.

## Known Issues / Bugs
- Ensure proper MongoDB and RAWG.io API integration.
- Likes are reflected in real-time in the UI after successful toggling.

## Future Enhancements
- Implement advanced search features (e.g., by genre or platform).
- Add pagination to improve the game browsing experience.
- Optimize performance for fetching large amounts of data from RAWG.io.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Enjoy exploring GameVerse!
