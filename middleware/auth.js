const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  // console.log("Received Authorization Header:", authHeader);

  // Check if the Authorization header exists and has the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // console.error("Authorization header missing or incorrect format.");
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
  // console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, "fre32#892dhey@479d"); // Use environment variable or fallback secret
    // console.log("Decoded Token:", decoded);
    
    req.user = decoded; // Attach decoded user data to request
    next(); // Move to the next middleware
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid Token." });
  }
};
