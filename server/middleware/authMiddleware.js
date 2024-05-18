// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Get token from request headers
  const token = req.headers.authorization;
  // console.log(token);
  // console.log("above");
  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Verify token
  jwt.verify(token.replace("Bearer ", ""), "secret", (err, decoded) => {
    if (err) {
      //console.log("ehehehe");
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    // Attach userId to request object for further use
    req.userId = decoded.userId;
    //console.log(decoded.userId);
    next();
  });
};

module.exports = {
  authenticate,
};
