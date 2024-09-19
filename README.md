# GameVerse

## Overview
**GameVerse** is a web application that allows users to explore a wide variety of games, view detailed information about each game, and interact with the platform by liking games and adding them to their personal liked list. Users can also write reviews on specific games and manage their liked games list. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and integrates with the RAWG.io API to fetch game data.

You can access the deployed application here: [GameVerse on Heroku](https://game--verse-e51913efbf43.herokuapp.com/)

## Features
- Browse games from the RAWG.io API
- View detailed information about each game
- Search for games by name
- Like and unlike games
- View and manage your list of liked games
- Add, edit, and delete reviews on games

## Credits

### Game Data
All game data, including images, descriptions, and other game-related information, is provided by [RAWG.io](https://rawg.io/). RAWG is a video game database and game discovery service that offers an extensive API for accessing game details.

### Acknowledgments
- **RAWG.io**: For providing an extensive and easily accessible API that allows developers to fetch detailed information about a vast array of video games.

- **Jan**: for showing me rawG and providing the search bar and bug fixes

- **THE CAVE**: for ...

## Screenshots

### Home Page
![Home Page Screenshot](https://i.imgur.com/DwfvLAI.png)

### Game Details Page
![Game Details Screenshot](https://i.imgur.com/bk0up7g.png)

### Liked Games List
![Liked Games Screenshot](https://i.imgur.com/L4eIvHt.png)

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

---

Enjoy exploring GameVerse!