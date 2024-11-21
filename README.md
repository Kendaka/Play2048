2048 Game 🎮
A full-stack implementation of the classic 2048 game, built using modern web technologies. This project combines an engaging front-end gameplay experience with a robust back-end system for user management and high-score tracking.

Features ✨

Core Gameplay:
Play the classic 2048 puzzle game with sound effects for moves, wins, and losses.
Interactive buttons for Undo, Restart, and Toggle Sound functionality.

User Authentication:
Register a new account or log in to track your high scores globally.
Play as a guest without logging in, with high scores stored locally.

Leaderboard:
View the Top 10 High Scores of registered users fetched from the database.

Responsive Design:
Designed with Tailwind CSS for a seamless experience across devices.

Technologies Used 🛠️

Frontend
React.js: Dynamic UI and state management.
Tailwind CSS: Fast and customizable styling.

Backend
Node.js and Express: Server-side logic and routing.
PostgreSQL: Persistent data storage.
Sequelize: Object-Relational Mapping (ORM) for database management.

Other
Audio Effects: Engaging sounds for actions using the HTML5 Audio API.


Installation and Setup ⚙️

Prerequisites
Node.js and npm installed
PostgreSQL installed and running

Clone the Repository
git clone 'https://github.com/Kendaka/Play2048'
cd Play2048  

Backend Setup
Install dependencies:
cd server-side  
npm install  

Set up environment variables:
Create a .env file in the backend directory and add:
env
  DB_HOST,      
  DB_DIALECT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME, 
  JWT_SECRET
  
Run database migrations (if applicable):
npx sequelize-cli db:migrate  
Start the backend server:
npm start  

Frontend Setup
Install dependencies:
cd client-side  
npm install  

Start the frontend development server:
npm start  

Access the Application
Open your browser and navigate to http://localhost:3000.


How to Play 🎲
Log In or Play as Guest:

Register and log in to track your high scores.
Use "Play as Guest" to play without creating an account.

Move Tiles:
Use 'a', 's', 'd', 'w' arrows keys to combine tiles with the same number. Aim for 2048!

Score Tracking:
Your current and best scores are displayed during the game.
Logged-in users can see their scores saved globally.

Check Leaderboard:
View the top 10 global scores of all registered players.


![image](https://github.com/user-attachments/assets/5da06b49-af48-46e2-9115-f20a1b230b1f)
![image](https://github.com/user-attachments/assets/18adf071-a015-4817-901d-ad12e5e484cc)
![image](https://github.com/user-attachments/assets/8984deb6-1967-4d1c-8eab-76d0dbfd4ced)



Contributing 🤝
Contributions are welcome. Please, feel free to open issues or submit pull requests to improve this project.
