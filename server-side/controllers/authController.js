require('dotenv').config(); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

// register a new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // validate username and password
  if (username.length < 3) {
    return res.status(400).json({ message: 'Username should be at least 3 characters long.' });
  }

  if (!/\d/.test(password)) {
    return res.status(400).json({ message: 'Password should contain at least one number.' });
  }

  try {
    // check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = await User.create({ username, password: hashedPassword });

    // generate a JWT token for authentication
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// login an existing user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // generate short-lived access token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // generate long-lived refresh token
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // return tokens and user details
    res.status(200).json({
      message: 'Login successful',
      token,
      refreshToken,
      username: user.username,
      highScore: user.highScore, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// update the high score for the authenticated user
const updateHighScore = async (req, res) => {
  const { score } = req.body; // new score submitted by the user
  const userId = req.user.id; // user ID retrieved from the authenticated request

  try {
    // find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // update the high score only if the new score is higher
    if (score > user.highScore) {
      user.highScore = score;
      await user.save();
    }

    res.status(200).json({ highScore: user.highScore }); // return the updated high score
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating high score' });
  }
};

// retrieve the authenticated user's high score
const getHighScore = async (req, res) => {
  const userId = req.user.id; // user ID retrieved from the authenticated request

  try {
    const user = await User.findByPk(userId); // find the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ highScore: user.highScore }); // return the user's high score
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Please try to re-login' });
  }
};

// refresh the access token using the refresh token
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// retrieve the top 10 users based on high scores
const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.findAll({
      attributes: ['username', 'highScore'], // select only username and highScore
      order: [['highScore', 'DESC']], // descending order
      limit: 10, // top 10 user
    });
    res.status(200).json(topUsers); // return the top 10 users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching leaderboard data' });
  }
};

module.exports = { registerUser, loginUser, updateHighScore, getHighScore, refreshAccessToken, getLeaderboard };
