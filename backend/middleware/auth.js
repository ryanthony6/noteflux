const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  // Check if token is present
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user; // Attach the user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    res.clearCookie("token"); // Clear the token cookie
    return res.redirect("/login");
  }
}

module.exports = { verifyToken };
