const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Fetch the user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;
    console.log("Authenticated user:", { _id: user._id, email: user.email });
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
