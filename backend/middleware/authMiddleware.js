const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.header("Authorization");

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // If token starts with "Bearer ", extract the actual token
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim(); // Remove "Bearer " from the token string
  }
  

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user; // Attach user data to the request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
