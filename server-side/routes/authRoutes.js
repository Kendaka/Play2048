const express = require('express');
const {
  registerUser,
  loginUser,
  updateHighScore, 
  getHighScore,
  refreshAccessToken,
  getLeaderboard
} = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authMiddleware'); 

const router = express.Router();

// Protected route to fetch the high score of the logged-in user
router.get('/highscore', authenticateJWT, getHighScore);

// Route to register a new user
router.post('/register', registerUser);

// Route to refresh the access token using a valid refresh token
router.post('/refresh-token', refreshAccessToken);

// Route for user login
router.post('/login', loginUser);

// Protected route to update the high score of the logged-in user
router.put('/highscore', authenticateJWT, updateHighScore);

// Public route to fetch the leaderboard (top 10 users)
router.get('/leaderboard', getLeaderboard);

module.exports = router;
