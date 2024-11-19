const jwt = require('jsonwebtoken');

// Middleware to authenticate requests using a JWT
const authenticateJWT = (req, res, next) => {
  // Extract the token from the Authorization header (if it exists)
  const token = req.header('Authorization')?.split(' ')[1]; 
  
  // If no token is found, respond with a 403 (Forbidden) error
  if (!token) {
    return res.status(403).json({ message: 'Authentication token missing' });
  }

  // Verify the token using the secret key from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);  
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach user data (decoded from the token) to the request object
    req.user = { id: decoded.id, username: decoded.username }; 

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateJWT;
