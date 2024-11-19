This project is a modern, web-based version of the classic 2048 game, built using React for the game mechanics. The game features color-coded tiles for each value up to 2048, 
ensuring a visually distinct experience. Designed with simplicity in mind, it provides smooth gameplay, ideal for users seeking a fun, relaxing challenge or a brain-training 
exercise to enhance logical thinking.

Features:
- *Leaderboard*: Track and compete for high scores, encouraging players to push their limits.
- *Sound Effects*: Enjoy engaging sound effects for tile movements, merges, winning, and losing conditions.
- *User Authentication*: Create an account to save your progress and scores.
- *Simple & Smooth Gameplay*: The game mechanics are intuitive and easy to navigate for a seamless user experience.
- *Responsive Design*: Fully responsive layout optimized for both desktop and mobile devices.

Instructions:
To run this project locally, follow these steps:

1. **Clone the repository**:
   git clone https://github.com/kendaka/G-2048.git

2. **Navigate to the project folder**:
   cd 2048-game

3. **Install dependencies for both the frontend and backend**:
   - For the frontend (React app):
     cd client
     npm install

   - For the backend (Express app):
     cd ../server
     npm install

4. **Set up the PostgreSQL database** using pgAdmin or any other PostgreSQL client and configure the connection string in the backend.

5. **Run the app**:
   - Start the backend:
     cd server
     npm start

   - Start the frontend:
     cd client
     npm start
     
6. Visit http://localhost:3000 to play the game!

Usage Guide
To start playing, you must first register by creating an account. Make sure your username and password meet the required criteria. Once registered, 
simply log in with your credentials to access the game and start playing. The game is designed to be straightforward, offering a hassle-free experience for users to enjoy.

Tech Stack:
- *Frontend*: React, Tailwind CSS, Axios
- *Backend*: Express.js, Sequelize
- *Database*: PostgreSQL, pgAdmin
- *Others*: Node.js, npm

Contribution Guidelines
We welcome contributions to improve this project! If you’d like to contribute, please follow these guidelines:

1. Fork the repository and create your own branch:
   git checkout -b feature-name

2. Make your changes and commit them with descriptive messages:
   git commit -m "Added new feature"

3. Push your changes to your fork:
   git push origin feature-name

4. Open a pull request with a clear description of your changes, and we’ll review it as soon as possible.

