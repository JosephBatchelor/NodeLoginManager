const User = require("../Model/users.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../MiddleWare/authtoken.js");
const { secretKey } = require("../config.js");

exports.get_profile = async (req, res) => {
  // Get the user ID from the token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    // Find the user in the database
    User.findById(userId, { username: 1, email: 1 }, (error, user) => {
      if (error) {
        console.error(error);
        res.status(500).send("Server error");
      } else if (!user) {
        res.status(404).send("User not found");
      } else {
        // Return the user's personal information
        res.status(200).json({
          username: user.username,
          email: user.email,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized");
  }
};
