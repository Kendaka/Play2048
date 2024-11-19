const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config(); 

const app = express(); 

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// use the authentication routes under the /api/auth path
app.use('/api/auth', authRoutes);

// a simple route for testing if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening on port 5000');
});
