Play2048

2048 Game - Full Stack App

A full-stack 2048 game built with React, Express, and PostgreSQL, featuring user registration, login, guest play, sound effects, and a leaderboard.

Players can play this full-stack 2048 game as a guest or register to keep score. Upon logging in, users can store their high scores in the database, which also safely records their username and password. The software also has a registration and login form. The top ten players are shown on the leaderboard according to their high scores. The top score is saved locally on the user's computer when they are playing as guests. A variety of events, including tile motions, wins, and defeats, cause the game's sound effects to play. Despite being responsive, the application is not built for mobile play because mobile devices do not allow for tile movements.

## Technologies Used
- *Frontend:* React, Tailwind CSS
- *Backend:* Node.js, Express.js
- *Database:* PostgreSQL, pgAdmin
- *Other:* Sound effects (using an audio library), LocalStorage for guest high scores.

## Features
- *Registration and Login*: Create an account or log in to save high scores in the database.
- *Guest Play*: Play as a guest, with high scores saved locally on the device.
- *Leaderboard*: Display the top 10 users with the highest scores.
- *Sound Effects*: Sounds for tile movements, wins, and losses.
- *Responsive Design*: The app works well on different screen sizes, though not optimized for mobile play

## Installation Instructions

1. Clone the repository to your local machine:
   git clone https://github.com/Kendaka/2Play2048.
   
2. Navigate to the project directory:
   cd Play2048
   
3. Install dependencies for both the client and server:

   For frontend (React-app)
   cd client-side
   npm install

   For backend (Express app)
   cd ../server-side
   npm install
   
4. Set up the PostgreSQL database. You will need to create a .env file in the server directory with your database connection details:
     host: process.env.DB_HOST,      
     dialect: process.env.DB_DIALECT,
     username: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
   
5. Run both the client and server:
     Start the backend server and the front end react app:
     npm start
   
6. Open your browser and visit http://localhost:3000 to play the game!


Usage Instructions
  - Playing as a Guest: Click the "Play as Guest" button to start the game. Your high score will be saved in your browser's local storage.
  - Registering / Logging In: Create a new account or log in to save your high score to the server and view the leaderboard.
  - Leaderboard: The top 10 players with the highest scores will be displayed on the leaderboard.

Please feel free to fork the repository, make modifications, and send a pull request if you would like to contribute to this project. Please be sure to adhere to the coding style and, if necessary, incorporate tests. 

